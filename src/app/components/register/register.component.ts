import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ComunicacionesService } from 'src/app/servicios/comunicaciones.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  contador:number=0;
  id = '';
  myForm: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private comunicaionesService:ComunicacionesService,
    private router2:Router,private route:ActivatedRoute,
    private fb: FormBuilder,
    private firestore:Firestore, 
  ) {    
    this.formReg = new FormGroup({
      nombre: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      // phone: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])]
    })    
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nombre: new FormControl(),
      email: ['', [Validators.email, Validators.required]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])]
  });
  }

  onSubmit() {
    if(this.myForm.get('nombre')?.value==null || this.myForm.get('email')?.value==null || this.myForm.get('password')?.value==null){
      alert("No puede haber espacios vacios")
    }else{
      this.userService.register(this.myForm.value)
      .then(response => {
        console.log(response);




        alert("Usuario añadido correctamente")

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {           
            // this.mail=user.uid!;
            console.log('User:', user.uid);
            // this.add_token(token,user.uid)
    
            // routerLink="/especialistas/{{id}}/{{resultados.nombre}}/"
            const queryRef = collection(this.firestore, 'users');

            setDoc(doc(queryRef, user.uid), {
              name:this.myForm.get('nombre')!.value,
              email:this.myForm.get('email')!.value,
              id:user.uid,
              password:this.myForm.get('password')!.value,
              cliente:true,
              socio:true
            }) .then(() => {
              // window.alert('Usuario agregado a la bd correctamente!');
              // this.router.navigate(['/']);
              this.router.navigate(['/login']);

              //notificacion
              // this.mandarnotificacion();
            })
            .catch((error) => {
              window.alert('Error al agregar la reserva');
            });

            // const data = {
            //   nombre:this.myForm.get('nombre')!.value,
            //   email:this.myForm.get('email')!.value,
            //   cliente_id_r:user.uid,
            //   password:this.myForm.get('password')!.value,
            //   cliente:true,
            //   socio:true
            // };
            // const placeRef = collection(this.firestore, 'users');
            // addDoc(placeRef, data)
            //   .then(() => {
            //     window.alert('Usuario agregado a la bd correctamente!');
            //     // this.router.navigate(['/']);
            //     this.router.navigate(['/login']);

            //     //notificacion
            //     // this.mandarnotificacion();
            //   })
            //   .catch((error) => {
            //     window.alert('Error al agregar la reserva');
            //   });

          } else {
            console.log('No se encuentra el usuario :(',user );
            // this.router.navigate(['/']);
            alert("No se encuentra el usuario :(")
    
          }
        });


     






      })
      .catch(error =>   alert("Correo invalido")
    );
    
      }
    
  }

  minLengthValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value || value.length < 7) {
      return { 'minlength': true };
    }
    return null;
  }
  // goToRuta2(id:number){
  //   this.router.navigate(['/app-place-list',id])
  // }

}

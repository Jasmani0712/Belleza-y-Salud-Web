import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Timestamp, collection, getDocs, query } from '@angular/fire/firestore';
import { Storage,getDownloadURL,listAll,ref, uploadBytes } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { now } from 'moment';
import { ReservaInterface } from 'src/app/interfaces/reserva.interface';
import { ReservasService } from 'src/app/services/reservas.service';
// import { Cat } from 'src/app/interfaces/cat.interface';
import { ComunicacionesService } from 'src/app/servicios/comunicaciones.service';
// import  from 'firebase/app';
// import { Timestamp } from 'firebase-admin/firestore'
@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent implements OnInit{


  
  cats: ReservaInterface[];
  photo: string[];
  contador:number =0;
  id = '';
  uid2:string="";
  name2:string="";
  mail:string="";
  fecha:string="dsdd";
  fechadate:Date;
  // s:Timestamp=.now();
  // currentDate: firebase.firestore.Timestamp;
   t = Timestamp.now();
    datee = this.t.toDate();
    
    convertirATextoFecha(timestamp: Timestamp): string {
      const date = timestamp.toDate();
      return date.toLocaleDateString(); // Ajusta el formato según tus necesidades
    }
    convertirAHora(timestamp: Timestamp): string {
      const date = timestamp.toDate();
      return date.toLocaleTimeString(); // Ajusta el formato según tus necesidades
    }
    convertirAHora2(timestamp: Timestamp): string {
      const date = timestamp.toDate();
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false // Ajusta a `false` si deseas usar formato de 24 horas
      };
      return date.toLocaleTimeString(undefined, options);
    }
  constructor(
    private reservasService: ReservasService,
    private comunicaionesService:ComunicacionesService,
    private router2:Router,private route:ActivatedRoute,
  ) {
    this.cats = [{
      id:'',
      cliente_comentario_r: '',
      celular_r: 'Esto es una prueba',
      salon_r: '',
      servicio_r: '',
      cliente_r:'',
      especialista_r:'',
      fechahora_r:Timestamp.fromDate(new Date()),
      photo_r: 'assets/bys.jpg',
      opinion_r:'',
      calificacion_r:0,
      correo_r:'',
      oculto:''
    }];
    this.photo = [];
    this.fechadate=new Date();
    // this.currentDate = firebase.firestore.Timestamp.now();


  }
  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const name=user.displayName;
        // const mail=user.email;

        console.log("uid de usuario:>> "+uid+" name: "+name+" mail: "+user.email);
        this.uid2=uid;
        this.name2=name!;
        this.mail=user.email!;
        this.reservasService.getReservas(this.uid2).subscribe(cat => {
          this.cats = cat;
          console.log("cat siisisi :"+this.uid2)
    
        })

      } else {
        // User is signed out
        // ...
      }
    });
    // this.id=this.route.snapshot.paramMap.get('id');
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id !== null ? id : '';
    console.log("cat siisisi ss:"+this.uid2+"   dsfsd")
   
    this.fecha="234";
    this.fechadate=new Date();
    // fechahora_r:Timestamp.fromDate(new Date()),

    
  }
  // async onClickDelete(cat: ReservaInterface) {
  //   const response = await this.catService.deleteCat(cat);
  //   console.log(response);
  // }
  // async onClickUpdate(cat: ReservaInterface) {
  //   const response = await this.catService.updateCat(cat);
  //   console.log(response);
  // }
  

  // goToRuta2(id:number){
  //   this.router2.navigate(['/app-place-list',id])
  // }
}

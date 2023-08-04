
import { Component, OnInit } from '@angular/core';
import { FirebaseApp, FirebaseAppModule, firebaseApp$ } from '@angular/fire/app';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, Timestamp, addDoc, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaInterface } from 'src/app/interfaces/reserva.interface';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
import { DatePipe, Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit{
  id = '';
  servicio='';
  especialista='';
  fecha='';
  hora='';
  fechahora:Date=new Date();
  formulario: FormGroup;
  fecha_string='';
  uid2:string="";
  name2:string="";
  mail:string="";
  foto_shop:string;
  token:string;
  constructor(
      private firestore:Firestore, 
      private route:ActivatedRoute,
      private r:FirebaseApp,
      //  private dialog: MatDialog,
      private router: Router,
      private fb: FormBuilder,
      private location: Location
      ) {  
    this.formulario = this.fb.group({
      // celular_r: new FormControl(),
      cliente_comentario_r: new FormControl(),
      cliente_r: ['', [Validators.required]],
      // description: new FormControl(),
      // image: new FormControl()
      celular_r: ['', [Validators.required, Validators.pattern('^[0-9]*$'),Validators.minLength(7), Validators.maxLength(12)]],
      // password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])]

  })
  this.foto_shop='';
  this.token='';
 }
//  convertirATextoFecha(timestamp: Timestamp): string {
//   const date = timestamp.toDate();
//   return date.toLocaleDateString(); // Ajusta el formato según tus necesidades
// }
// datePipe: DatePipe 
// convertirAFechaFormateada(fechaString: string): string {
   

//   const date = new Date(fechaString);
//   const formato = 'dd/MM/yyyy'; // Define el formato deseado para la fecha
//   return this.datePipe.transform(date, formato)?.toString() || '';
// }
 convertirAFechaFormateada(fechaOriginal : string ): string {
  const fecha = new Date(fechaOriginal);
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const anio = fecha.getFullYear();
  // const hora = fecha.getHours();
  // const minutos = fecha.getMinutes();
  // const segundos = fecha.getSeconds();
  // const formato = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
  const formato = `${dia}/${mes}/${anio}`;
  return formato;
}


  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id !== null ? id : '';
    const servicio = this.route.snapshot.paramMap.get('servicio');
    this.servicio = servicio !== null ? servicio : '';
    const especialista = this.route.snapshot.paramMap.get('especialista');
    this.especialista = especialista !== null ? especialista : '';
    const fecha = this.route.snapshot.paramMap.get('fecha');
    this.fecha = fecha !== null ? fecha : '';
    const hora = this.route.snapshot.paramMap.get('hora');
    this.hora = hora !== null ? hora : '';
    // Convertir el string a un objeto Date
    const fechaDate = new Date(this.fecha);
    const year = fechaDate.getFullYear();
    const month = fechaDate.getMonth() + 1; // Los meses comienzan desde 0, por lo que sumamos 1
    const day = fechaDate.getDate();
    
    // Formatear los componentes de la fecha en el formato deseado
    const fechaFormateada = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    // Obtener el timestamp en milisegundos
    // const timestamp = fechaHora.getTime();

    // Crear un objeto Timestamp de Firestore
    // this.firestore.FieldValue.serverTimestamp()
    // const fechaString = this.fecha;
    const fechaString = fechaFormateada;
    this.fecha_string=fechaString;
    const horaString = this.hora;
    const fechaHoraString = `${fechaString}T${horaString}`;
    
    const fechaHoraDate = new Date(fechaHoraString);
    console.log(fechaFormateada); // Resultado: "2023/05/11"

    console.log("fechaHoraDate:: "+fechaHoraDate); // Resultado: Mon May 22 2023 10:30:00 GMT+0000 (Coordinated Universal Time)
    this.fechahora = fechaHoraDate;

    console.log("fechaa:" +this.fechahora+" fechaHora: "+fechaDate);
    console.log(this.fecha+" y "+this.hora+" y "+this.especialista);

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
      } else {
        // User is signed out
        // ...
      }
    });
  

    const queryRef = query(collection(this.firestore, 'shop'),  where('name', '==', this.id));
    try {
      
     const querySnapshot = await getDocs(queryRef);
     querySnapshot.forEach((doc) => {   
        const foto =  doc.data()['photo'];   
        this.foto_shop=foto;
        console.log("this.foto_shop :"+this.foto_shop)

      });
   }
    catch (error) {
     console.error('Error al obtener los documentos:', error);
   }

   //token de negocio
   const queryRef2 = query(collection(this.firestore, 'users'),  where('shop_user', '==', this.id));
   try {
    const querySnapshot = await getDocs(queryRef2);
    querySnapshot.forEach((doc) => {   
      const token =  doc.data()['token'];   
      this.token=token;
      console.log("token de "+this.id+": "+this.token)

     });
    }
    catch (error) {
      console.error('Error al obtener los tokens:', error);
    }
  

  // this.funcion();
  // this.searchByField();
  // this.searchByField2(this.especialista);
  // this.searchByField3(this.especialista,this.fechahora);

  this.buscarCitasDuplicadas(this.especialista,this.fechahora);
  }   

  async onSubmit() {
    console.log(this.formulario.value)
    // const response = await this.addCat(this.formulario.value);
    const queryRef = query(collection(this.firestore, 'shop'),  where('name', '==', this.id));
    try {
      const querySnapshot = await getDocs(queryRef);
      /*this.resultados = []; // Limpiar el array antes de llenarlo con los nuevos resultados*/
      querySnapshot.forEach((doc) => {
        // const id = doc.id;
        // const nombre = doc.data()['name'];
        // const ciudad =  doc.data()['city'];
        const foto =  doc.data()['photo'];
        // console.error('foto:', foto);
        const data = {
          // Define los campos y valores del documento que deseas agregar         
          celular_r:this.formulario.get('celular_r')!.value,
          cliente_comentario_r:this.formulario.get('cliente_comentario_r')!.value,
          cliente_id_r:this.uid2,
          cliente_r:this.formulario.get('cliente_r')!.value,
          correo_r:this.mail,
          especialista_r:this.especialista,
          fechahora_r:this.fechahora,
          photo_r:foto,
          salon_r:this.id,
          servicio_r:this.servicio
          // timestamp:Date;
          // ...
        };
    
    
    // const placeRef=collection(this.firestore,'Bookings');
    // addDoc(placeRef,data);
    const placeRef = collection(this.firestore, 'Bookings');
    addDoc(placeRef, data)
      .then(() => {
        window.alert('Reserva realizada correctamente!');
        this.router.navigate(['/reservas']);

        //notificacion
        this.mandarnotificacion();
      })
      .catch((error) => {
        window.alert('Error al agregar la reserva');
      });
        // const descripcion =  doc.data()['description'];
        // const attention_days =  doc.data()['attention_days'];
        // const adress =  doc.data()['adress'];
        // const promo =  doc.data()['promo'];
        /*this.resultados.push({ id, nombre, ciudad,foto,descripcion,attention_days,adress,promo }); // Agregar el resultado al array*/
      });
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }
    // .then((docRef) => {
    //   console.log('Documento agregado con ID: ', docRef.id);
    // })
    // .catch((error) => {
    //   console.error('Error al agregar el documento: ', error);
    // });
  }
  // addCat(reservaInterface:ReservaInterface){
  //   const placeRef = collection(this.firestore,'category');
  //   return addDoc(placeRef,reservaInterface);
  // }


  mandarnotificacion( ){
    const a = "hey";
    const boldItalicStyle = (text: string) => `\x1b[1m\x1b[3m${text}\x1b[0m`;
    
    console.log(boldItalicStyle("negrilla: "+a));
    //+  boldItalicStyle(`negrilla: ${a}`) 
    const mensaje=
    "Un cliente acaba de agendar una cita en: "+this.id
            +"\nServicio: "+this.servicio
            +"\nEspecialista: "+this.especialista
            +"\nFecha: "+this.fecha_string
            +"\nHora: "+this.hora;


    var key = 'AAAAS8osnZ4:APA91bHFJWnaSly_HcHKeWgtpT-6OI5haSeo8PuyiJ4IW9VVB2n7iDTTTl0bpVZTQNUec8Sk2SvqPxVtyA-XO4bvmdN0vvpL-VDCvQzrh_A9oZmHndAqgmllivOqJiQeIR8LM7YLNTG6';
    var to = this.token;
    var to2 ='clH5JIv0QEGgFBb7KBBP_t:APA91bFX9em4ICUwQMPtIR0USZuLXedndHZq1JVYGQbFzXrixqaO_hzhL5xSRjdRiU9r7QRTJ_idZmO7e5HFOuPxD-o4RqPOAXv-5Pp5WHca0eQIadjmEz4OwvxWP15JguIfXV9UkYAN';
    var notification = {
      'title': 'NUEVA RESERVA!',
      'body': mensaje,
      'icon': 'url_del_icono', // Reemplaza 'url_del_icono' con la URL de la imagen del icono que deseas usar
      'click_action': 'https://bellezaysaludapp.com/', // URL que se abrirá al hacer clic en la notificación
      'data': {
        'image': 'https://firebasestorage.googleapis.com/v0/b/bellezaysalud1-71563.appspot.com/o/Shops%2FALOE%20LOGO.jpg?alt=media&token=71215bbc-c594-4816-8d4b-799b181f98d5', // Reemplaza 'url_de_la_imagen' con la URL de la imagen que deseas mostrar en la notificación
      },
    };
    
    

    
    fetch('https://fcm.googleapis.com/fcm/send', {
      'method': 'POST',
      'headers': {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'notification': notification,
        'to': to
      })
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.error(error);
    })
  }



  async funcion(){
    // import { doc, getDoc } from "firebase/firestore";

    const docRef = doc(this.firestore, "category", "Manos y pies");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async funcion2(){
    // const docRef = doc(this.firestore, "category", "Manos y pies");
    // const colRef = collection(this.firestore, 'category');

    // const q = query(colRef, where('nombre', '==', 'Manos y pies'));

    // // const docSnap = await getDoc(q);
    
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  }

  async searchByField() {
    try {
      const colRef = collection(this.firestore, 'category');

      // Realizar la consulta para obtener los documentos con el campo "nombre" igual a "Manos y pies"
      const q = query(colRef, where('description', '==', 'w'));
      const querySnapshot = await getDocs(q);

      // Verificar si hay resultados
      if (!querySnapshot.empty) {
        // Iterar a través de los documentos encontrados (en caso de que haya más de uno que cumpla el filtro)
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Document data 2:", data);
        });
      } else {
        // console.log("No se encontraron documentos con el campo 'nombre' igual a 'Manos y pies'");
      }
    } catch (error) {
      console.log("Error al realizar la consulta:", error);
    }
  }

  async searchByField2(especialista_r:string) {
    try {
      const colRef = collection(this.firestore, 'Bookings');

      // Realizar la consulta para obtener los documentos con el campo "nombre" igual a "Manos y pies"
      const q = query(colRef, where('especialista_r', '==', especialista_r));
      const querySnapshot = await getDocs(q);

      // Verificar si hay resultados
      if (!querySnapshot.empty) {
        // Iterar a través de los documentos encontrados (en caso de que haya más de uno que cumpla el filtro)
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Document data 3:", data);
        });
      } else {
        // console.log("No se encontraron documentos con el campo 'nombre' igual a 'Manos y pies'");
      }
    } catch (error) {
      console.log("Error al realizar la consulta:", error);
    }
  }

  async searchByField3(especialista_r:string, fechahora_r:Date) {
    try {
      const colRef = collection(this.firestore, 'Bookings');

      // Realizar la consulta para obtener los documentos con el campo "nombre" igual a "Manos y pies"
      // const q = query(colRef, where('especialista_r', '==', especialista_r));
      const q = query(colRef, 
        where('especialista_r', '==', especialista_r),
        where('fechahora_r', '==',fechahora_r )
      );
      const querySnapshot = await getDocs(q);

      // Verificar si hay resultados
      if (!querySnapshot.empty) {
        // Iterar a través de los documentos encontrados (en caso de que haya más de uno que cumpla el filtro)
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Document data 4:", data);
          alert("Alguien ya reservo al mismo especialista en el mismo horario, por favor intente de nuevo.");
        });
      } else {
        console.log("No se encontraron documentos con el especialista: "+especialista_r+" fecha: "+fechahora_r);
        this.onSubmit();
      }
    } catch (error) {
      console.log("Error al realizar la consulta:", error);
    }
  }

  //si es el mismo especialista en la misma fecha y hora...
  async buscarCitasDuplicadas(especialista_r:string, fechahora_r:Date) {
    try {
      const colRef = collection(this.firestore, 'Bookings');

      // Realizar la consulta para obtener los documentos con el campo "nombre" igual a "Manos y pies"
      // const q = query(colRef, where('especialista_r', '==', especialista_r));
      const q = query(colRef, 
        where('especialista_r', '==', especialista_r),
        where('fechahora_r', '==',fechahora_r )
      );
      const querySnapshot = await getDocs(q);

      // Verificar si hay resultados
      if (!querySnapshot.empty) {
        // Iterar a través de los documentos encontrados (en caso de que haya más de uno que cumpla el filtro)
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Document data 4:", data);
          this.location.back();
          alert("Alguien ya reservo al mismo especialista en la misma fecha y horario, por favor intente de nuevo.");
          //  this.router.navigate(['/especialistas/'+this.id+'/'+this.servicio]);          
        });
      } else {
        console.log("No se encontraron documentos con el especialista: "+especialista_r+" fecha: "+fechahora_r);
        // this.onSubmit();
      }
    } catch (error) {
      console.log("Error al realizar la consulta:", error);
    }
  }
}

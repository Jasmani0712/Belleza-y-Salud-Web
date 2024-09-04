import { Component, NgModule, inject } from '@angular/core';                 
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, mergeMap, mergeMapTo, take } from 'rxjs';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { AngularFireMessaging, AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { Messaging, getMessaging } from 'firebase/messaging';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
// import * as tf from '@tensorflow/tfjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  
  title = 'Belleza y Salud';
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;
  images: string[];
  message:any;
  mail:string="";

  constructor( 
    private messagingService:AngularFireMessaging,
    private router: Router,
    ) {
    const aCollection = collection(this.firestore, 'category')
    this.items$ = collectionData(aCollection);
    this.images = [];
    this.requestPermission();
    //this.getToken();
  }  

  /*requestPermission() {
    this.messagingService.requestPermission
      .subscribe(
        () => { console.log('Permission granted!'); },
        (error) => { console.error("error notifca"+error); },  
      );
  }*/  

  //Permiso de notificacion y segun crea o no TOKEN
  requestPermission() {
    this.messagingService.requestPermission
      .pipe(
        mergeMap(() => this.messagingService.tokenChanges.pipe(take(1)))
      )
      .subscribe(
        (token) => {          
          if(token==null){
            console.log('Permiso de notificaciones cancelado: ', token);
            //pero puede haber usuario
            // this.verficar_login(token);

          }
          else{// Guardar el token en el servidor o en el lugar necesario.
            console.log('Permiso verificado y token guardado.');
          }
            
          },
        (error) => {
          console.log('Error al solicitar permiso o permiso ya definido anteriormente: '+error);
          // this.verficar_login_sin_token();
          // this.router.navigate(['/admin-socio/'+this.id]);
          // this.router.navigate(['/']);
          // Proporcionar un mensaje descriptivo al usuario en caso de error.
          // Por ejemplo, mostrar una notificación o un mensaje en la interfaz de usuario.
        }
      );
  }
  verficar_login(token:any){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {           
        this.mail=user.uid!;
        console.log('User:', user.uid);
        this.add_token(token,user.uid)
      } else {
        console.log('No se encuentra el usuario.',user );
        this.router.navigate(['/']);
        alert("No se encuentra el usuario."+this.mail)

      }
    });
  }
  verficar_login_sin_token(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {           
        this.mail=user.uid!;
        console.log('User:', user.uid);
        // this.add_token(token,user.uid)
      } else {
        console.log('No se encuentra el usuario',user );
        this.router.navigate(['/']);
        alert("No se encuentra el usuario"+this.mail)

      }
    });
  }

  add_token(token:string, id_usuario:string){
    //Añade token a firestore
    const placeRef = doc(this.firestore, 'users',  this.mail);
    const addTokenToUsers = {
      token: token, // Agregamos el token obtenido al objeto de datos        
    };
    console.log('Data: '+id_usuario+" "+addTokenToUsers,{token,} );
    updateDoc(placeRef, addTokenToUsers)
    .then(() => {
      console.log('Token añadido correctamente');
    })
    .catch((error) => {
      console.error('Error al añadir el token: ', error);
    });
  }

  listen() {
    this.messagingService.messages
      .subscribe((message) => { console.log(message); });
  }

  getToken(){  
      const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
   
        this.mail=user.uid!;
      } else {
        // User is signed out
        // ...
      }
    });
    /*this.messagingService.messages
    .subscribe((message) => { console.log("suscribe: "+message); })*/
    // Obtener el token de registro del servicio de mensajería
    this.messagingService.getToken.subscribe((token) => {
      console.log('Token: ', token);

      // Crear una referencia a la colección "users" en Firestore
      //const placeRef = collection(this.firestore, 'users');
      const placeRef = doc(this.firestore, 'users',  this.mail);

      // Datos que deseas guardar en Firestore, como parte de la reserva
      const reservaData = {
        token1: token, // Agregamos el token obtenido al objeto de datos
        // Agregar otros datos de la reserva aquí si los tienes
        // Ejemplo: servicio, especialista, fecha, hora, etc.
      };
      updateDoc(placeRef, reservaData)
      .then(() => {
        console.log('Documento modificado correctamente');
      })
      .catch((error) => {
        console.error('Error al modificar el documento: ', error);
      }); 
      // Agregar el documento a Firestore
      /*addDoc(placeRef, reservaData)
        .then(() => {
          // La reserva se agregó correctamente a Firestore
          console.log('Reserva agregada correctamente');
        })
        .catch((error) => {
          // Ocurrió un error al agregar la reserva a Firestore
          console.error('Error al agregar la reserva: ', error);
          window.alert('Error al agregar la reserva');
        });*/
    });

  }
  mandarnotificacion(){
    var key = 'AAAAS8osnZ4:APA91bHFJWnaSly_HcHKeWgtpT-6OI5haSeo8PuyiJ4IW9VVB2n7iDTTTl0bpVZTQNUec8Sk2SvqPxVtyA-XO4bvmdN0vvpL-VDCvQzrh_A9oZmHndAqgmllivOqJiQeIR8LM7YLNTG6';
    var to = 'csV4gTPbZ3Ok9WtZUNizAe:APA91bH-EaM1esf5R8RGkDBWL6ZHiztgsNColj5GrFV7G-89aPO-BHfjJ9Z5XQgSJ4CahfvR1TpM_Vf3jCpe3SbLUmbqq9qnVt_xSKBXw0ajy-_7tzuU3dqL0htY8hAToU4EUyQlgBae';
    var to2 ='clH5JIv0QEGgFBb7KBBP_t:APA91bFX9em4ICUwQMPtIR0USZuLXedndHZq1JVYGQbFzXrixqaO_hzhL5xSRjdRiU9r7QRTJ_idZmO7e5HFOuPxD-o4RqPOAXv-5Pp5WHca0eQIadjmEz4OwvxWP15JguIfXV9UkYAN';
    var notification = {
      'title': 'Portugal vs. Denmark',
      'body': '5 to 1',
      //'icon': 'firebase-logo.png',
      //'click_action': 'http://localhost:8081'
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
 
 /* enviarNotificacion(token: string, titulo: string, contenido: string) {
    const mensaje: any = {
      token: token,
      notification: {
        title: titulo,
        body: contenido
      }
    };

    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: '<YOUR_PUBLIC_VAPID_KEY_HERE>' }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  }*/

  ngOnInit() {
    // this.getImages();
    //this.messagingService.requestPermission();
    /*Notification.requestPermission().then((result)=>{
      console.log(result);
    });
    let text="Cuerpo de la noti";
    let img="/assets/logo3.png";
    setTimeout(()=>{
      new Notification('Nueva notificacion',{
      body:text,
      icon:img,
    });
    },2000);*/
  }

  // uploadImage($event: any) {
  //   const file = $event.target.files[0];
  //   console.log(file);

  //   const imgRef = ref(this.storage, `images/${file.name}`);

  //   uploadBytes(imgRef, file)
  //     .then(response => {
  //       console.log(response)
  //       this.getImages();
  //     })
  //     .catch(error => console.log(error));

  // }

  // getImages() {
  //   const imagesRef = ref(this.storage, 'images');

  //   listAll(imagesRef)
  //     .then(async response => {
  //       console.log(response);
  //       this.images = [];
  //       for (let item of response.items) {
  //         const url = await getDownloadURL(item);
  //         this.images.push(url);
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }

}

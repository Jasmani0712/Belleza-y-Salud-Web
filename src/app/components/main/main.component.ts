import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Auth, User, authState, user,onAuthStateChanged, getAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  uid2:string="";
  name2:string="";
  mail:string="";
  resultadosShop: any[] ; // Array para almacenar los resultados

  
  constructor(
    private userService: UserService,
    private router: Router,
    private afAuth: Auth,
    private firestore:Firestore,

  ) { 
    
    this.resultadosShop=[];
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

        this.getShop(uid);
      } else {
        // User is signed out
        // ...
      }
    });
    // console.log("uid de usuario:>>2 "+this.uid2+" name: "+this.name2+" mail: "+this.mail);

   
  }
  onClickLogout() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
  async getShop(uid:string) {
    const queryRef = collection(this.firestore, 'users');    
    const filteredQuery = query(queryRef, where('id', '==', uid));
    console.log("getShops2 estoy: " +uid)
    try {
      const querySnapshot = await getDocs(filteredQuery);
      this.resultadosShop = []; // Limpiar el array antes de llenarlo con los nuevos resultados
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const nombre = doc.data()['name'];
        const ciudad =  doc.data()['city'];
        const foto_shop =  doc.data()['photo'];
        const descripcion =  doc.data()['description'];
        const qr =  doc.data()['qr'];
        const ubicacion =  doc.data()['map'];
        const ubicacion_link =  doc.data()['map_link'];
        const cel =  doc.data()['cel'];
        const face =  doc.data()['face'];
        let insta =  doc.data()['insta'];
        let tiktok =  doc.data()['tiktok'];
        const shop_user =  doc.data()['shop_user'];      
        // this.validariconos(tiktok);
        this.resultadosShop.push({ id, nombre, ciudad,foto_shop,descripcion,qr,ubicacion,ubicacion_link,cel,face,insta,tiktok,shop_user }); // Agregar el resultado al array
      });

    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }    
  }


}

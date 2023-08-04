import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Auth, User, authState, user,onAuthStateChanged, getAuth } from '@angular/fire/auth';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-menu-socio',
  templateUrl: './menu-socio.component.html',
  styleUrls: ['./menu-socio.component.css']
})
export class MenuSocioComponent implements OnInit {
  uid2:string="";
  name2:string="";
  mail:string="";
  id = '';
  resultadosShop: any[] ; // Array para almacenar los resultados

  
  constructor(
    private userService: UserService,
    private router: Router,
    private afAuth: Auth,
    private route:ActivatedRoute,
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


      } else {
        // User is signed out
        // ...
      }
    });
    const id = this.route.snapshot.paramMap.get('id_socio');
    this.id = id !== null ? id : '';
    this.getShop(this.id);

  }
  onClickLogout() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
  async getShop(id_name_shop: string) {
    const queryRef = collection(this.firestore, 'shop');    
    const filteredQuery = query(queryRef, where('name', '==', id_name_shop));
    console.log("getShops2 estoys8: " +id_name_shop)
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
        const visible =  doc.data()['visible'];      
        // this.validariconos(tiktok);
        this.resultadosShop.push({ id, nombre, ciudad,foto_shop,descripcion,qr,ubicacion,ubicacion_link,cel,face,insta,tiktok,visible }); // Agregar el resultado al array
      });

    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }    
  }

}


import { ChangeDetectorRef, Component, Input, OnInit, Renderer2  } from '@angular/core';
import { Firestore, Timestamp, collection, doc, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { Storage,getDownloadURL,listAll,ref, uploadBytes } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { NegocioInterface } from 'src/app/interfaces/negocio.interface';
import { ShopInterface } from 'src/app/interfaces/shop.interface';
// import { Cat } from 'src/app/interfaces/cat.interface';
// import { Cate } from 'src/app/interfaces/cate';
// import { CatService } from 'src/app/services/cat.services';
import { NegocioService } from 'src/app/services/negocio.service';
import { ShopService } from 'src/app/services/shop.service';
import { ComunicacionesService } from 'src/app/servicios/comunicaciones.service';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { InfoComponent } from '../info/info.component';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-negocio-list',
  templateUrl: './negocio-list.component.html',
//   template: `
//     <!-- <button (click)="toggleSection(1)">Sección 1</button> -->
//     <div class="acordeon-section">
//   <button (click)="toggleSection(1)">Sección 1</button>
//   <div *ngIf="showSection1">
//     Contenido de la sección 1
//   </div>
// </div>

//     <!-- <button (click)="toggleSection(2)">Sección 2</button> -->
//     <div class="acordeon-section">
//   <button (click)="toggleSection(2)">Sección 2</button>
//   <div *ngIf="showSection2">
//     Contenido de la sección 2
//   </div>
// </div>

//     <!-- <button (click)="toggleSection(3)">Sección 3</button> -->
//     <div class="acordeon-section">
//   <button (click)="toggleSection(3)">Sección 3</button>
//   <div *ngIf="showSection3">
//     Contenido de la sección 3
//   </div>
// </div>
//   `,
  styleUrls: ['./negocio-list.component.css']
})
export class NegocioListComponent implements OnInit{
  showSection1 = false;
  showSection2 = false;
  showSection3 = false;
  selectedSection: number = 1;
  showIcon: boolean = true;

  // toggleSection(section: number) {
  //   switch (section) {
  //     case 1:
  //       this.showSection1 = !this.showSection1;
  //       break;
  //     case 2:
  //       this.showSection2 = !this.showSection2;
  //       break;
  //     case 3:
  //       this.showSection3 = !this.showSection3;
  //       break;
  //   }
  // }
  // activeSection: number = 1; // Por defecto, se muestra la primera sección
  // toggleSection(section: number) {
  //   this.activeSection = section;
  // }
  // maxHeight: number = 1000; // Altura máxima suficientemente grande para mostrar todo el contenido
  toggleSection(section: number): void {
    if (this.selectedSection === section) {
      //this.selectedSection = 1; // Si la sección ya está seleccionada, la deseleccionamos para ocultar su contenido
    } else {
      this.selectedSection = section; // Seleccionamos la sección para mostrar su contenido

    }
  }
  selectedButton: number=1; // Variable para almacenar el botón seleccionado
  selectButton(buttonNumber: number) {
    this.selectedButton = buttonNumber;
  }

  negocioInterface: NegocioInterface[];
  photo: string[];
  contador:number =0;
  id = '';
  shops: ShopInterface[]; 
  idshop: string;
  nombreshop: string;
  ciudadshop: string;
  resultados: any[] ; // Array para almacenar los resultados
  resultadosShop: any[] ; // Array para almacenar los resultados
  resultadosStore:any[];
  resultadosImages:any[];
  resultadosResena:any[];
  foto_shop:string;
  info:string;
  nombreservicio:string;

  // mail:any="ers"
  mail: string | null = null;

  constructor(
    public negocioService: NegocioService,
    private comunicaionesService:ComunicacionesService,
    private router2:Router,
    private route:ActivatedRoute,
    private shopsService: ShopService,
    private firestore:Firestore,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dataSharingService: DataSharingService,
    private location: Location,
    private renderer: Renderer2
  ) {
    this.negocioInterface = [{
      name: 'Prueba de dssitio',
      info: 'Esto es una prueba2',
      precio: '40',
      promo: '-3',
      shop: 'assets/bys.jpg',
      hora_intervalo:'12'
    }];
    this.shops = [{
      name: 'Prueba de dssitido',
      description: 'descripcion',
      adress: "direccion",
      attention_days: "Lunes a viernes",
      photo: 'assets/bys.jpg',
      cel:"123",
      category:["as"],
      city:"La Paz",
      face:"",
      hora_fin:"", 
      hora_inicio:"",
      insta:"",
      qr:"",
      map:"",
      map_link:"",
      tiktok:"",
      visible:true


    }];
    this.photo = [];
    this.idshop= "string2";
    this.nombreshop= "string2";
    this.ciudadshop= "string2";
    this.resultados=[];
    this.resultadosShop=[];
    this.resultadosStore=[];
    this.resultadosImages=[];
    this.resultadosResena=[];


    this.foto_shop='';
    this.info='1';
    this.nombreservicio='2d';
  }
  changeColor(newColor: string) {
    this.renderer.setStyle(document.documentElement, '--color1', newColor);
  }

  // elementos: any[] = ['Elemento 1', 'Elemento 2', 'Elemento 3'];

  async ngOnInit(): Promise<void> {
    this.changeColor('#1e90ff');    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {           
        this.mail=user.uid!;
        console.log('User init:', user.uid);
        // this.add_token(token,user.uid)
        // this.router.navigate(['/especialistas/'+this.id+'/'+this.nombreservicio]);
        // this.dataSharingService.setString(this.id);
        // this.location.onUrlChange((url: string) => {
          
          // Aquí verificamos si el usuario intenta navegar hacia atrás
          // Si es así, redireccionamos al enlace específico que deseas
          // if (url.includes('/especialistas/')) {
            // this.router.navigateByUrl('/category');
            // alert("si")
          // }
        // });
        // routerLink="/especialistas/{{id}}/{{resultados.nombre}}/"
      } else {
        console.log('No se encuentra el usuario :(',user );
        // this.router.navigate(['/']);
        // alert("No se encuentra el usuario :(")
        // this.dataSharingService.setString(this.id);
        // this.location.onUrlChange((url: string) => {
        //   // Aquí verificamos si el usuario intenta navegar hacia atrás
        //   // Si es así, redireccionamos al enlace específico que deseas
        //   if (url.includes('/especialistas/'+this.id+'/'+this.nombreservicio)) {
        //     this.router.navigateByUrl('/');
        //   }
        // });
      }
    });









    //obtengo el id pero llega con id_shop pero lo quito, aqui solamente se hace para que sea compatible con la url de la app
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id !== null ? id : '';
    const url = this.id;
    const queryString = url.split("?id_shop=").pop();
    // console.log("queryString: "+queryString+" id "+id);
    this.id=queryString!;

    // Funciones que necesitan el id del negocio
    this.getShop(this.id);
    this.getServices(this.id);
    this.getStore(this.id);
    this.getImages(this.id);
    this.getReseñas(this.id);

    // FOTO SHOP
    const queryRef = query(collection(this.firestore, 'shop'),  where('name', '==', this.id));
    try {
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((doc) => {   
        const foto =  doc.data()['photo'];   
        this.foto_shop=foto;
      });
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }
  }

  openDialog(shop: any,servicio:any) {
    const dialogRef = this.dialog.open(InfoComponent, {
      //data: parametro // Pasar el parámetro usando la opción 'data'
      data: { param1: shop, param2: servicio }

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // async onClickDelete(negocioInterface: NegocioInterface) {
  //   const response = await this.negocioService.deleteCat(negocioInterface);
  //   console.log(response);
  // }
  // async onClickUpdate(negocioInterface: NegocioInterface) {
  //   const response = await this.negocioService.updateCat(negocioInterface);
  //   console.log(response);
  // }

  // goToRuta2(id:number){
  //   this.router2.navigate(['/app-place-list',id])
  // }
  async getShop(id_name_shop: string) {
    const queryRef = collection(this.firestore, 'shop');    
    const filteredQuery = query(queryRef, where('name', '==', id_name_shop));
    console.log("Negocio: " +id_name_shop)
    try {
      const querySnapshot = await getDocs(filteredQuery);
      this.resultadosShop = []; // Limpiar el array antes de llenarlo con los nuevos resultados
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const nombre = doc.data()['name'];
        const ciudad =  doc.data()['city'];
        const foto =  doc.data()['photo'];
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
        this.resultadosShop.push({ id, nombre, ciudad,foto,descripcion,qr,ubicacion,ubicacion_link,cel,face,insta,tiktok,visible }); // Agregar el resultado al array
      });

    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }    
  }
  showIconArray: boolean[] = [];

  //hace algo?
  async getservicesinfo(shop:string){
    console.log("getservicesinfo :"+this.id + " " +shop)
    const placeRef = collection(this.firestore, 'servicios');
    const filteredQuery = query(placeRef, where('name', '==', shop), where('info', '==', null));
    try {
      const querySnapshot = await getDocs(filteredQuery);
      if (querySnapshot.size > 0) {
        // Si hay resultados en la consulta
        // Ejecutar la acción que deseas realizar si la consulta tiene resultados
        console.log('La consulta tiene resultados');
      } else {
        // Si no hay resultados en la consulta
        console.log('La consulta no tiene resultados');
      }
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }      
  }


  async getServices( id_name_shop: string) {

    // Llama a la tabla servicios
    const queryRef = collection(this.firestore, 'servicios');
    // const filteredQuery = query(queryRef, where('name', '==', servicio), where('shop', '==', id_name_shop));

    // Filtra de todos los servicios solo los que tengan el campo 'shop' en el id del negocio (que creo solo es su nombre)
    const filteredQuery = query(queryRef, where('shop', '==', id_name_shop));
    console.log("Servicios de: " +id_name_shop)

    //Intenta poner los servicios
    try {
      //Obtiene los documentos o registros
      const querySnapshot = await getDocs(filteredQuery);

      this.resultados = []; // Limpiar el array antes de llenarlo con los nuevos resultados

      //Llama a los campos a necesitar de cada servicio
      querySnapshot.forEach((doc) => {
        const id = doc.id; //id del servicio
        const nombre = doc.data()['name'];
        this.nombreservicio=nombre
        // const ciudad =  doc.data()['city'];
        const infos =  doc.data()['info'];  
        // this.info=infos;
        const shop =  doc.data()['shop'];  
        const promo =  doc.data()['promo'];  
        const precio =  doc.data()['precio']; 
        const extra =  doc.data()['extra']; 

        let neutro="neutro" ;
        let mostrar_info=true
        if (infos==null){
                    this.showIcon = !this.showIcon;
                    this.info="no hay"
                    neutro="no hay"
                    mostrar_info=false
        }else{
          neutro="si hay"
          mostrar_info=true
        }

        this.resultados.push({ id,infos,nombre,shop, promo,precio,neutro,mostrar_info, extra }); // Agregar el resultado al array
      });
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }
    
  }

  validariconos(icono:string,redsocial:string){
    if (icono == null) {
      // Ejecutar la acción correspondiente si tiktok es nulo
      // console.log('El campo tiktok es nulo');
      window.alert('Sin '+redsocial +" registrado");
      // icono =doc.data()['face'];

    }
  }

  mostrarDiv: boolean = false; // Variable que controla la visibilidad del div
  qrletra:string='MOSTRAR CODIGO QR'
  validarqr(icono:string,redsocial:string){
    // if (icono == null) {
      // Ejecutar la acción correspondiente si tiktok es nulo
      // icono =doc.data()['face'];
      // const valido = validarCodigoQR(qr); // Función que realiza la validación real del código QR
      // this.mostrarDiv = !this.mostrarDiv; // Invierte el valor actual de la variable de control

      if (this.mostrarDiv==true) {
        if(!icono){
          this.qrletra='SIN CODIGO QR'
          console.log('El campo: '+icono);

        }else{
          this.qrletra='MOSTRAR CODIGO QR'
          this.mostrarDiv = false; // Mostrar el div si el código QR es válido

        }

      } else {
        if(icono == null){
          this.qrletra='SIN CODIGO QR'

        }
        else{
          this.qrletra='OCULTAR CODIGO QR'

          this.mostrarDiv = true; // Ocultar el div si el código QR no es válido
         
        }
         // window.alert('Sin '+redsocial +" registrado");
      }
      // this.mostrarDiv = !this.mostrarDiv; // Invierte el valor actual de la variable de control
      
        // this.mostrarDiv = false; // Ocultar el div si el código QR no es válido
        // window.alert('Sin '+redsocial +" registrado");
      // }
    // }
  }
  toggleDiv() {
    // this.qrletra='MOSTRAR CODIGO QR'

    this.mostrarDiv = !this.mostrarDiv; // Invierte el valor actual de la variable de control
  }

  async getStore( id_name_shop: string) {
    const queryRef = collection(this.firestore, 'store');
    // const filteredQuery = query(queryRef, where('name', '==', servicio), where('shop', '==', id_name_shop));

      const filteredQuery = query(queryRef, where('name', '==', id_name_shop));
      console.log("Tienda de: " +id_name_shop)

      const filteredQuery2 = query(filteredQuery, orderBy("timestamp","desc")); 
      try {
        const querySnapshot = await getDocs(filteredQuery2);
        this.resultadosStore = []; // Limpiar el array antes de llenarlo con los nuevos resultados
  
        querySnapshot.forEach((doc) => {
          // const id = doc.id;
          const title = doc.data()['title'];
          const foto =  doc.data()['photo'];
          const descripcion =  doc.data()['description'];
          const precio =  doc.data()['price']; 
          // let va="neutro" ;
          // let vas=true
          // if (infos==null){
          //             this.showIcon = !this.showIcon;
          //             this.info="no hay"
          //              va="no hay"
          //              vas=false
          // }else{
          //    va="si hay"
          //    vas=true
          // }
  
          this.resultadosStore.push({ title,descripcion,precio,foto }); // Agregar el resultado al array
        });
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }
    
  }
  async getImages( id_name_shop: string) {
    const queryRef = collection(this.firestore, 'images');
    const queryRef2 = doc(queryRef, 'galery');
    const queryRef3 = collection(queryRef2, id_name_shop);
    const filteredQuery = query(queryRef3);
    const filteredQuery2 = query(filteredQuery, orderBy("timestamp","desc"));    
    console.log("Galeria de: " +id_name_shop)
    try {
      const querySnapshot = await getDocs(filteredQuery2);
      this.resultadosImages = []; // Limpiar el array antes de llenarlo con los nuevos resultados
      querySnapshot.forEach((doc) => {
        // const id = doc.id;
        const title = doc.data()['title'];
        const foto =  doc.data()['photo'];
        const descripcion =  doc.data()['description'];
        this.resultadosImages.push({ title,descripcion,foto }); // Agregar el resultado al array
      });
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }    
  }
  async getReseñas( id_name_shop: string) {
    console.log("Reseña de: " +id_name_shop)
    const queryRef = collection(this.firestore, 'Bookings');
    const filteredQuery = query(queryRef, where('salon_r', '==', id_name_shop));
    const filteredQuery2 = query(filteredQuery, orderBy('fechahora_r', "desc"));
      try {
        const querySnapshot = await getDocs(filteredQuery2);
        this.resultadosResena = []; // Limpiar el array antes de llenarlo con los nuevos resultados
        querySnapshot.forEach((doc) => {
          // const id = doc.id;
          const opinion_r = doc.data()['opinion_r'];
          const fecha =  doc.data()['fechahora_r'];
          const calificacion_r =  doc.data()['calificacion_r'];
          this.resultadosResena.push({ opinion_r,calificacion_r,fecha }); // Agregar el resultado al array
        });
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }    
  }
  convertirATextoFecha(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return date.toLocaleDateString(); // Ajusta el formato según tus necesidades
  }

  verficar_login_sin_token_ir_specialist1(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {           
        this.mail=user.uid!;
        console.log('User:', user.uid);
        // this.add_token(token,user.uid)
        this.router.navigate(['/especialistas/'+this.id+'/'+this.nombreservicio]);

        // routerLink="/especialistas/{{id}}/{{resultados.nombre}}/"
      } else {
        console.log('No se encuentra el usuario :(',user );
        this.router.navigate(['/']);
        alert("No se encuentra el usuario :(")
        this.dataSharingService.setString(this.id);
        // this.location.onUrlChange((url: string) => {
        //   // Aquí verificamos si el usuario intenta navegar hacia atrás
        //   // Si es así, redireccionamos al enlace específico que deseas
        //   if (url.includes('/especialistas/'+this.id+'/'+this.nombreservicio)) {
        //     this.router.navigateByUrl('/');
        //   }
        // });
      }
    });
  }
}
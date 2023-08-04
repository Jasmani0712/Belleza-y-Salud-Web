import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, getFirestore, query, where } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopInterface } from 'src/app/interfaces/shop.interface';
// import { Shops } from 'src/app/interfaces/shops.interface';
import { ShopService } from 'src/app/services/shop.service';
// import { shopsService } from 'src/app/services/shops.service';
import { ComunicacionesService } from 'src/app/servicios/comunicaciones.service';


interface City {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})

export class ShopsListComponent  implements OnInit {
  contador:number =0;
  id = '';
  shops: ShopInterface[]; 
  photo: string[];
  
  selectedValue: string;
  
  isDeshabilitado = true;
  ciudades: City[] = [

    {value: 'Seleccionar ciudad', viewValue: 'Seleccionar ciudad'},    
    // { value: 'valorInicial', viewValue: 'Valor Inicial' },
    {value: 'La Paz', viewValue: 'La Paz'},
    {value: 'El Alto', viewValue: 'El Alto'},
    {value: 'Cochabamba', viewValue: 'Cochabamba'},
    {value: 'Santa Cruz', viewValue: 'Santa Cruz'},
    {value: 'Chuquisaca', viewValue: 'Chuquisaca'},
    {value: 'Oruro', viewValue: 'Oruro'},
    {value: 'Beni', viewValue: 'Beni'},
    {value: 'Pando', viewValue: 'Pando'},
    {value: 'Tarija', viewValue: 'Tarija'},
    {value: 'Potosí', viewValue: 'Potosí'}];
  textoPlano: any;
  idshop: string;
  nombreshop: string;
  ciudadshop: string;
  resultados: any[] ; // Array para almacenar los resultados
  attention_days:string;
  adress:string;
  promo:string;

  constructor(
    private comunicaionesService:ComunicacionesService,
    private route:ActivatedRoute,
    private shopsService: ShopService,    
    private router2:Router,
    private changeDetectorRef: ChangeDetectorRef,
    private firestore:Firestore
    ) { 
    this.shops = [{
      name: 'Prueba de dssitio',
      description: 'Esto es una prueba',
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
      qr: "",
      map:"",
      map_link:"",
      tiktok:"",
      visible:true

    }];
    this.photo = [];
    this.selectedValue="Seleccionar ciudad";
   this.idshop= "string";
   this.nombreshop= "string";
    this.ciudadshop= "string";
    this.resultados=[];
    this.attention_days="";
    this.adress="";
    this.promo="";
  }

  ngOnInit(): void {     
       // this.id=this.route.snapshot.paramMap.get('id');
       const id = this.route.snapshot.paramMap.get('id');
       this.id = id !== null ? id : '';
      //  console.log("place siisisi f"+this.id);   
      this.shopsService.getShops(this.id, this.selectedValue).subscribe(shops => {
        this.shops = shops;
        console.log("cat init :>"+this.selectedValue+" id: "+this.id)
  
      })
      // setInterval(() => {
      //   this.id = 'Texto actualizado'; // Actualizar el texto cada segundo (puedes ajustar la lógica según tus necesidades)
      //   this.changeDetectorRef.detectChanges(); // Forzar la detección de cambios
      // }, 1000);
      this.obtenerDocumentos(); //se instancia aqui para que al principio salgan todos sin haber seleccionado la ciudad
  }

  actualizarFiltro() {
    // Llamar a la función getShops() con los nuevos valores de filtro
    this.shopsService.getShops(this.id, this.selectedValue).subscribe(shops => {
      // Hacer algo con los datos obtenidos
      console.log("cat siisisi :>"+this.selectedValue+" id: "+this.id)

    });
    
  }
  actualizarRuta() {
    if (this.selectedValue) {
      this.router2.navigate(['/shops/'+this.id, this.selectedValue]);
      console.log("cat siisisi :>"+this.selectedValue)
      this.actualizarFiltro();
      this.shopsService.getShops(this.id, this.selectedValue).subscribe(shops => {
        // Hacer algo con los datos obtenidos
        console.log("actualizarRuta    siisisi :>"+this.selectedValue+"id: "+this.id)
  
      });
    }
  }
  async actualizarTexto() {
    const firestore = getFirestore();

    const docRef = doc(firestore, 'shop', this.selectedValue);
    const docSnap = await getDoc(docRef);
    console.log("spioner: "+this.selectedValue)

  
    if (docSnap.exists()) {
      // const texto = docSnap.data().texto;
      const texto = docSnap.data()["city"];

      // Asignar el valor del texto a una variable en tu componente
      this.textoPlano = texto;
    } else {
      this.textoPlano = 'Texto no encontrado';
    }
  }
   // async obtenerDocumentos() {
  //   const queryRef = query(collection(this.firestore, 'shop'), where('city', '==', this.selectedValue));

  //   try {
  //     const querySnapshot = await getDocs(queryRef);
  //     querySnapshot.forEach((doc) => {
  //       // console.log(doc.data()); // Muestra los datos del documento en la consola
  //       const id = doc.id;
  //       const nombre = doc.data()['name'];
  //       const ciudad = doc.data()['city'];

  //       console.log('ID:', id);
  //       console.log('Nombre:', nombre);
  //       console.log('Ciudad:', ciudad);

  //       this.idshop = doc.id;
  //       this.nombreshop = doc.data()['name'];
  //       this.ciudadshop = doc.data()['city'];
  //       this.resultados.push({ id, nombre, ciudad }); // Agregar el resultado al array

  //     });
  //   } catch (error) {
  //     console.error('Error al obtener los documentos:', error);
  //   }
  // }

  async obtenerDocumentos() {
    console.log("valor inicial. "+this.selectedValue+" id: "+this.id)

    if (this.selectedValue=="Seleccionar ciudad"){
      const queryRef = query(collection(this.firestore, 'shop'),  where('category', 'array-contains', this.id));
      try {
        const querySnapshot = await getDocs(queryRef);
        this.resultados = []; // Limpiar el array antes de llenarlo con los nuevos resultados
  
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const nombre = doc.data()['name'];
          const ciudad =  doc.data()['city'];
          const foto =  doc.data()['photo'];
          const descripcion =  doc.data()['description'];
          const attention_days =  doc.data()['attention_days'];
          const adress =  doc.data()['adress'];
          const promo =  doc.data()['promo'];
          const deshabilitado =  doc.data()['deshabilitado'];


  
  
  
          this.resultados.push({ id, nombre, ciudad,foto,descripcion,attention_days,adress,promo,deshabilitado }); // Agregar el resultado al array
        });
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }
    }
    else{

      const queryRef = query(collection(this.firestore, 'shop'), where('city', '==', this.selectedValue), where('category', 'array-contains', this.id),);
    
      try {
        const querySnapshot = await getDocs(queryRef);
        this.resultados = []; // Limpiar el array antes de llenarlo con los nuevos resultados
  
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const nombre = doc.data()['name'];
          const ciudad =  doc.data()['city'];
          const foto =  doc.data()['photo'];
          const descripcion =  doc.data()['description'];
  
  
  
          this.resultados.push({ id, nombre, ciudad,foto,descripcion }); // Agregar el resultado al array
        });
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }
    }
 
  }


}

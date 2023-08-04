import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {  Inject } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  // negocioInterface: NegocioInterface[];
  photo: string[];
  contador:number =0;
  id = '';
  // shops: ShopInterface[]; 

  idshop: string;
  nombreshop: string;
  ciudadshop: string;
  resultados: any[] ; // Array para almacenar los resultados
  foto_shop:string;
  showText: boolean = true;

  // toggleText() {
  //   // if (precio=1){}
  //   this.showText = !this.showText;
  // }
  constructor(

    private route:ActivatedRoute,
    // private shopsService: ShopService,
    private firestore:Firestore,
    // public dialog: MatDialog
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
 
    this.photo = [];
    this.idshop= "string2";
    this.nombreshop= "string2";
   this.ciudadshop= "string2";
   this.resultados=[];
  this.foto_shop='';
  }
   ngOnInit(): void {
      // this.id=this.route.snapshot.paramMap.get('id');
      const id = this.route.snapshot.paramMap.get('id');
      this.id = id !== null ? id : '';
      // console.log(this.id);

      // const url = "https://www.google.com/?id_shop=AMK+fitness";
      const url = this.id;
      const queryString = url.split("?id_shop=").pop();
      console.log("queryString: "+queryString); // "AMK+fitness"
      this.id=queryString!;

   this.getShops2(this.data.param1, this.data.param2); 
  
  }



  async getShops2( id_name_shop: string,servicio:string,) {
    const queryRef = collection(this.firestore, 'servicios');
    
      const filteredQuery = query(queryRef, where('name', '==', servicio), where('shop', '==', id_name_shop));
      console.log("getShops2 estoy: si" +id_name_shop)
      try {
        const querySnapshot = await getDocs(filteredQuery);
        this.resultados = []; // Limpiar el array antes de llenarlo con los nuevos resultados
  
        querySnapshot.forEach((doc) => {
          // const id = doc.id;
          const nombre = doc.data()['name'];
          // const ciudad =  doc.data()['city'];
          // const foto =  doc.data()['photo'];
          // const descripcion =  doc.data()['description'];
          // const qr =  doc.data()['qr'];
          // const ubicacion =  doc.data()['map'];
          // const ubicacion_link =  doc.data()['map_link'];
          // const cel =  doc.data()['cel'];
          // const face =  doc.data()['face'];
          // const insta =  doc.data()['insta'];
          // const tiktok =  doc.data()['tiktok'];
          // const visible =  doc.data()['visible'];  
          const info =  doc.data()['info'];  
          const shop =  doc.data()['shop'];  
          const promo =  doc.data()['promo'];  
          const precio =  doc.data()['precio'];  
          if (precio==null){
                      this.showText = !this.showText;
          }
  
          this.resultados.push({ info,nombre,shop, promo,precio }); // Agregar el resultado al array
        });
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }
    
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Firestore, collection, getDocs, query, where } from 'firebase/firestore';
import { Firestore, Timestamp, collection, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-socio',
  templateUrl: './admin-socio.component.html',
  styleUrls: ['./admin-socio.component.css']
})
export class AdminSocioComponent implements OnInit {
  id:string='';
  // resultadosShop:any
  constructor(
    private route:ActivatedRoute,  
    private firestore:Firestore
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_socio');
    this.id = id !== null ? id : '';

    this.getShop( this.id)
    }
  resultadosShop: any[] = []; ; // Array para almacenar los resultados




  async getShop(id_name_shop: string) {
    const queryRef = collection(this.firestore, 'shop');    
    const filteredQuery = query(queryRef, where('name', '==', id_name_shop));
    console.log("getShops2 estoy: " +id_name_shop)
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
}

import { Component, OnInit } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-galery-delete',
  templateUrl: './galery-delete.component.html',
  styleUrls: ['./galery-delete.component.css']
})
export class GaleryDeleteComponent implements OnInit{
  resultadosImages:any[];
  id = '';
  foto_shop:string;


  constructor(private firestore:Firestore,
    private route:ActivatedRoute,
    ){  
  this.resultadosImages=[];
  this.foto_shop='';
  }
  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id_socio');
    this.id = id !== null ? id : ''; 
    this.getImages(this.id);
    this.img_shop()  

    
  }
  async getImages( id_name_shop: string) {

    const queryRef = collection(this.firestore, 'images');
    const queryRef2 = doc(queryRef, 'galery');
    const queryRef3 = collection(queryRef2, id_name_shop);
      const filteredQuery = query(queryRef3);
      const filteredQuery2 = query(filteredQuery, orderBy("timestamp","desc"));    

      console.log("getShops2 estoy: si" +id_name_shop)
      try {
        const querySnapshot = await getDocs(filteredQuery2);
        this.resultadosImages = []; // Limpiar el array antes de llenarlo con los nuevos resultados
  
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const title = doc.data()['title'];
          const foto =  doc.data()['photo'];
          const descripcion =  doc.data()['description'];
          const name =  doc.data()['name'];

          this.resultadosImages.push({id, title,descripcion,foto,name }); // Agregar el resultado al array
        });
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }
    
  }
  async img_shop(){
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
  }

  async eliminar_image(id_image_galery: string,id_name_shop:string)
  {
    // alert(id_name_shop+"::::"+id_product_store)
    const queryRef = collection(this.firestore, 'images');
    const queryRef2 = doc(queryRef, 'galery');
    const queryRef3 = collection(queryRef2, id_name_shop);
    const docRef =doc(queryRef3, id_image_galery);
    // Elimina el documento
    await deleteDoc(docRef)
      .then(() => {
        console.log('Imagen eliminada correctamente.');
        alert('Imagen eliminada correctamente.')
        const currentURL = window.location.href;
        window.location.href = currentURL;
      })
      .catch((error) => {
        console.error('Error al eliminar la imagen:', error);
        alert('Error al eliminar la imagen')
      });
  }
}

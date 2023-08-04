import { Component, OnInit } from '@angular/core';
import { Firestore, collection,deleteDoc,doc, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-delete',
  templateUrl: './store-delete.component.html',
  styleUrls: ['./store-delete.component.css']
})
export class StoreDeleteComponent implements OnInit{
  resultadosStore:any[];
  resultadosImages:any[];
  id = '';
  foto_shop:string;

  constructor(private firestore:Firestore,
    private route:ActivatedRoute,
    ){  
  this.resultadosImages=[];
  this.resultadosStore=[];

  this.foto_shop='';
  }
  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id_socio');
    this.id = id !== null ? id : ''; 
    this.getStore(this.id);
    this.img_shop()  
    // this.getImages(this.id);

    
  }

  async getStore( id_name_shop: string) {
      const queryRef = collection(this.firestore, 'store');
      const filteredQuery = query(queryRef, where('name', '==', id_name_shop));
      const filteredQuery2 = query(filteredQuery, orderBy("timestamp","desc"));       

    //   const queryRef = collection(this.firestore, 'images');
    // const queryRef2 = doc(queryRef, 'galery');
    // const queryRef3 = collection(queryRef2, id_name_shop);
    //   const filteredQuery = query(queryRef3);
    //   const filteredQuery2 = query(filteredQuery, orderBy("timestamp","desc"));
      try {
        const querySnapshot = await getDocs(filteredQuery2);
        this.resultadosStore = []; // Limpiar el array antes de llenarlo con los nuevos resultados
  
        querySnapshot.forEach((doc) => {
          const id = doc.id; // Obtiene el ID del documento directamente
          const title = doc.data()['title'];
          const foto =  doc.data()['photo'];
          const descripcion =  doc.data()['description'];
          const precio =  doc.data()['price'];   
          this.resultadosStore.push({ id,title,descripcion,precio,foto }); // Agregar el resultado al array
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

  async eliminar_store(id_product_store: string)
  {
    alert(id_product_store)
    const queryRef = collection(this.firestore, 'store');
    const docRef =doc(queryRef, id_product_store);
    // Elimina el documento
    await deleteDoc(docRef)
      .then(() => {
        console.log('Producto eliminado correctamente.');
        alert('Producto eliminado correctamente.'+id_product_store)
        const currentURL = window.location.href;

        window.location.href = currentURL;

      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto:'+id_product_store)
      });
  }
}

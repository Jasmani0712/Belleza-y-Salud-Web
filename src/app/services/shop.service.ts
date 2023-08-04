import { Injectable } from '@angular/core';
import { DocumentData, Firestore, Query, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
// import { Shops } from '../interfaces/shops.interface';
import { ShopInterface } from '../interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  resultados: any[] ; // Array para almacenar los resultados

  constructor(private firestore:Firestore) {    this.resultados=[];
  }
  // getShops(): Observable<ShopInterface[]> {
  //   const placeRef = collection(this.firestore, 'shop');
  //   return collectionData(placeRef, { idField: 'id' }) as Observable<ShopInterface[]>;

  // }

  // getShops(): Observable<ShopInterface[]> {
  //   const placeRef = collection(this.firestore, 'shop');
  //   const filteredQuery = query(placeRef, where('city', '==', 'El Alto'));
  //   return collectionData(filteredQuery, { idField: 'id' }) as Observable<ShopInterface[]>;
  // }

  getShops(categoria: string,ciudad: string): Observable<ShopInterface[]> {
    const placeRef = collection(this.firestore, 'shop');
    if (ciudad==""){
      const filteredQuery = query(placeRef, where('category', 'array-contains', categoria));
      console.log("en if")

      // return collectionData(filteredQuery, { idField: 'id' }) as Observable<ShopInterface[]>;
      return new Observable<ShopInterface[]>((observer) => {
        getDocs(filteredQuery)
          .then((snapshot) => {
            const data = snapshot.docs.map((doc) => {
              const id = doc.id;
              const shop = doc.data() as ShopInterface;
              return { id, ...shop };
            });
            observer.next(data);
          })
          .catch((error) => {
            observer.error(error);
          })
          .finally(() => {
            observer.complete();
          });
      });
    
    }else{
      const filteredQuery = query(placeRef, 
            where('category', 'array-contains', categoria),
            where('city', '==', ciudad)
          );
          console.log("en else:"+ciudad)

      // return collectionData(filteredQuery, { idField: 'id' }) as Observable<ShopInterface[]>;
      return new Observable<ShopInterface[]>((observer) => {
        getDocs(filteredQuery)
          .then((snapshot) => {
            const data = snapshot.docs.map((doc) => {
              const id = doc.id;
              const shop = doc.data() as ShopInterface;
              return { id, ...shop };
            });
            observer.next(data);
          })
          .catch((error) => {
            observer.error(error);
          })
          .finally(() => {
            observer.complete();
          });
      });
    }
    
  }

  async getShops3(id_name_shop: string) {


    const queryRef = collection(this.firestore, 'shop');
    
      const filteredQuery = query(queryRef, where('name', '==', id_name_shop));
      console.log("en if")
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



import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
// import {Cate} from '../interfaces/cate';
import { Observable } from 'rxjs';
import { NegocioInterface } from '../interfaces/negocio.interface';

@Injectable({
  providedIn: 'root'
})
export class NegocioService{
  resultados: any[] = []; // Array para almacenar los resultados
  // showIcon: boolean = true;

    constructor(private firestore:Firestore) { }
  
    addCat(negocio:NegocioInterface){
      const placeRef = collection(this.firestore,'category');
      return addDoc(placeRef,negocio);
    }
  
    async getCats(shop:string): Promise<Observable<NegocioInterface[]>> {
      
      const placeRef = collection(this.firestore, 'servicios');
      const filteredQuery = query(placeRef, where('shop', '==', shop));

      

      return collectionData(filteredQuery, { idField: 'id' }) as Observable<NegocioInterface[]>;
  
    }
  
    deleteCat(negocio: NegocioInterface) {
      const placeDocRef = doc(this.firestore, `category/${negocio.id}`);
      return deleteDoc(placeDocRef);
    }
    updateCat(negocio: NegocioInterface) {
      const placeRef = doc(this.firestore, `category/${negocio.id}`);
      return updateDoc(placeRef, { ...negocio });
    }
  }
  
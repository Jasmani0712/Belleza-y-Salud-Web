import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { EspecialistaInterface} from '../interfaces/especialista.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  constructor(private firestore:Firestore) { }

  // addCat(cat:Cate){
  //   const placeRef = collection(this.firestore,'category');
  //   return addDoc(placeRef,cat);
  // }

  getEspecialistas(shop:string): Observable<EspecialistaInterface[]> {
    const placeRef = collection(this.firestore, 'Especialistas');
    const filteredQuery = query(placeRef, where('shop', '==', shop));
    return collectionData(filteredQuery, { idField: 'id' }) as Observable<EspecialistaInterface[]>;

  }

  // deleteCat(cat: Cate) {
  //   const placeDocRef = doc(this.firestore, `category/${cat.id}`);
  //   return deleteDoc(placeDocRef);
  // }
  // updateCat(cat: Cate) {
  //   const placeRef = doc(this.firestore, `category/${cat.id}`);
  //   return updateDoc(placeRef, { ...cat });
  // }
}

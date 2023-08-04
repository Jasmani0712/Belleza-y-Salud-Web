import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import {Cate} from '../interfaces/cate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private firestore:Firestore) { }

  addCat(cat:Cate){
    const placeRef = collection(this.firestore,'category');
    return addDoc(placeRef,cat);
  }

  getCats(): Observable<Cate[]> {
    const placeRef = collection(this.firestore, 'category');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Cate[]>;

  }

  deleteCat(cat: Cate) {
    const placeDocRef = doc(this.firestore, `category/${cat.id}`);
    return deleteDoc(placeDocRef);
  }
  updateCat(cat: Cate) {
    const placeRef = doc(this.firestore, `category/${cat.id}`);
    return updateDoc(placeRef, { ...cat });
  }
}

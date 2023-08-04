import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, updateDoc, where,getDocs, Timestamp, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReservaInterface } from '../interfaces/reserva.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private firestore:Firestore) { }
  // addCat(cat:ReservaInterface){
  //   const placeRef = collection(this.firestore,'category');
  //   return addDoc(placeRef,cat);
  // }

  getReservas(cliente_id:string): Observable<ReservaInterface[]> {
    const placeRef = collection(this.firestore, 'Bookings');
    const filteredQuery = query(placeRef, where('cliente_id_r', '==', cliente_id));
    const filteredQuery2 = query(filteredQuery, orderBy('fechahora_r', "asc"));

    return collectionData(filteredQuery2, { idField: 'id' }) as Observable<ReservaInterface[]>;

  }
  getReservasSocio(cliente_id:string): Observable<ReservaInterface[]> {
    const placeRef = collection(this.firestore, 'Bookings');
    const filteredQuery = query(placeRef, where('salon_r', '==', cliente_id));
    const filteredQuery2 = query(filteredQuery, orderBy('fechahora_r', "asc"));

    return collectionData(filteredQuery2, { idField: 'id' }) as Observable<ReservaInterface[]>;

  }

 

  


  // deleteCat(cat: ReservaInterface) {
  //   const placeDocRef = doc(this.firestore, `category/${cat.id}`);
  //   return deleteDoc(placeDocRef);
  // }
  // updateCat(cat: ReservaInterface) {
  //   const placeRef = doc(this.firestore, `category/${cat.id}`);
  //   return updateDoc(placeRef, { ...cat });
  // }
}

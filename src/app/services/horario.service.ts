import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { EspecialistaInterface} from '../interfaces/especialista.interface';
import { Observable } from 'rxjs';
import { NegocioInterface } from '../interfaces/negocio.interface';
@Injectable({
  providedIn: 'root'
})
export class HorarioService{
constructor(private firestore:Firestore) { }

// addCat(cat:Cate){
//   const placeRef = collection(this.firestore,'category');
//   return addDoc(placeRef,cat);
// }

getHorarios(shop:string): Observable<NegocioInterface[]> {
  const placeRef = collection(this.firestore, 'shop');
  const filteredQuery = query(placeRef, where('shop', '==', shop));

  return collectionData(filteredQuery, { idField: 'id' }) as Observable<NegocioInterface[]>;

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

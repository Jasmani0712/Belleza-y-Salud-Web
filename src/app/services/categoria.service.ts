import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, collectionSnapshots, onSnapshot, doc, deleteDoc, snapToData, collectionData } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private firestore: Firestore = inject(Firestore);
  empleadosCollection: CollectionReference;
  // constructor(private firestore: Firestore) {
  //   this.empleadosCollection = collection(this.firestore, "empleados");
  //  }

  constructor() {
    this.empleadosCollection = collection(this.firestore, "category");
  }

  //  agregarImagen(imagen: any) {
  //   if (!imagen) return;

  //   addDoc(this.empleadosCollection, { imagen });
  // }

  agregarImagen(imagen: any): Promise<any>{    
    return addDoc(this.empleadosCollection, { imagen });
  }

  // getCategorias(): Observable<any>{
  //   // return this.firestore.collection('empleados').collectionSnapshots(); 
  //   // return this.agregarImagen.;
  //   const a= doc(this.firestore,'empleados');
  //   return deleteDoc(a);
  // }
  getCategorias() {
    return collectionData(this.empleadosCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }
  getPlaces(): Observable<any> {
    const placeRef = collection(this.firestore, 'users');
    return collectionData(placeRef, { idField: 'id' }) as Observable<any>;
  }
  // eliminarCategoria(id: String):Promise<any>{
  //   // return collection(this.firestore,'empleados').doc(id).delete();
  //   return this.store.collection(list).doc(task.id).delete();
  // }
  eliminarCategoria(id: string):Promise<any> {
    const pokemonDocumentReference = doc(this.firestore, `pokemon/${id}`);
    return deleteDoc(pokemonDocumentReference);
  }
  // deletePlace(place: Place) {
  //   const placeDocRef = doc(this.firestore, `places/${place.id}`);
  //   return deleteDoc(placeDocRef);
  // }
}

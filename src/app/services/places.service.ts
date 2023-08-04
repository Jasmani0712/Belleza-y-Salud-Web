import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import Place from '../interfaces/place.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private firestore:Firestore) { }

  addPlace(place:Place){
    const placeRef = collection(this.firestore,'places');
    return addDoc(placeRef,place);
  }

  getPlaces(): Observable<Place[]> {
    const placeRef = collection(this.firestore, 'places');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Place[]>;
  }

  deletePlace(place: Place) {
    const placeDocRef = doc(this.firestore, `places/${place.id}`);
    return deleteDoc(placeDocRef);
  }
  updatePlace(place: Place) {
    const placeRef = doc(this.firestore, `places/${place.id}`);
    return updateDoc(placeRef, { ...place });
  }
}

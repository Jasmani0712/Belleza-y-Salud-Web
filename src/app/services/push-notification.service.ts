//esto no uso creo
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import { AngularFireMessaging } from '@angular/fire/messaging';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  currentMessage=new BehaviorSubject<any>(null);
  //messagingFirebase: AngularFireMessaging;
  constructor(private angularFireMessaging: AngularFireMessaging) { }
  requestPermission(){
    this.angularFireMessaging.requestToken.subscribe((token)=>{
      console.log(token);
    },(err)=>{
      console.log("Unable to get permission to notify..",err)
    })
  }

  receiveMessaging(){
    this.angularFireMessaging.messages.subscribe((payload)=>{
    this.currentMessage.next(payload)
  })
  }
}

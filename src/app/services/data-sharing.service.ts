import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private myString: string='';

  constructor() { }

  setString(value: string) {
    this.myString = value;
  }

  getString(): string {
    return this.myString;
  }
}

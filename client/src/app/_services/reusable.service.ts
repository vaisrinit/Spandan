import { Injectable } from '@angular/core';
// import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { Subject } from 'rxjs/internal/Subject';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReusableService {
  private sessionStorage = new Subject<boolean>();
  constructor() { }

  public randomString(length:any) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  encrypt(val:any){
    var key = CryptoJS.enc.Utf8.parse(environment.keyEncryptDecrypt);
    var iv = CryptoJS.enc.Hex.parse(this.randomString(32));
    var encrypted = CryptoJS.AES.encrypt(val, key, { 
      iv: iv, 
      mode: CryptoJS.mode.CBC
    });   
    var output = encrypted.ciphertext.toString();
    return iv+":"+output;
  }
   
  decrypt(val: string): string {
    const key = CryptoJS.enc.Utf8.parse(environment.keyEncryptDecrypt);
    const iv = CryptoJS.enc.Hex.parse(val.split(':')[0]);
    const ciphertext = CryptoJS.enc.Hex.parse(val.split(':')[1]);
    const options = {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    };
    const decrypted = CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({ ciphertext }), key, options);
    const output = decrypted.toString(CryptoJS.enc.Utf8);
    return output;
  }
  setItem(key: string, data: any) {
    sessionStorage.setItem(key, data);
    this.sessionStorage.next(true);
}
  storeSessionData(token:any){
    this.setItem('token',token);}
}

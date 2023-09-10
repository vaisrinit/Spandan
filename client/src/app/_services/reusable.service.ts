import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ReusableService {
  private sessionStorage = new Subject<boolean>();
  constructor() { }
  // algorithm = 'aes-256-cbc';
  // key = "7efcfc483b004fabadd3d951f44decf7";//crypto.randomBytes(16);
  // iv = randomBytes(16); //inicialization vector

  // encrypt(text: any) {
  //   let cipher = createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);
  //   let encrypted = cipher.update(text);
  //   encrypted = Buffer.concat([encrypted, cipher.final()]);
  //   return { iv: this.iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  // }
  // decrypt(text: any) {
  //   let iv = Buffer.from(text.iv, 'hex');
  //   let encryptedText = Buffer.from(text.encryptedData, 'hex');
  //   let decipher = createDecipheriv('aes-256-cbc', Buffer.from(this.key), iv);
  //   let decrypted = decipher.update(encryptedText);
  //   decrypted = Buffer.concat([decrypted, decipher.final()]);
  //   return decrypted;
  // }
  setItem(key: string, data: any) {
    sessionStorage.setItem(key, data);
    this.sessionStorage.next(true);
}
  storeSessionData(token:any){
    this.setItem('token',token);}
}

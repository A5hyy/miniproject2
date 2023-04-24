import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey = 'Eo8(]<Z%`+';

  constructor() {
  }

  encrypt(field: any): string {
    return CryptoJS.AES.encrypt(field, this.secretKey).toString();
  }

  decrypt(cypherStr: string): string {
    let bytes = CryptoJS.AES.decrypt(cypherStr.toString(), this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

import {Injectable} from '@angular/core';
import {LocalStorage} from "ngx-webstorage";
import {SETTINGS} from "../../settings/commons.settings";
import {DataService} from "../data/data.service";
import {EncryptionService} from "./encryption.service";
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  @LocalStorage(SETTINGS.LOGGED_USER_ENC)
  private loggedInUserEncrypted!: string;

  private loggedInUserDecrypted: any;

  @LocalStorage(SETTINGS.PUBLIC_KEY)
  private publicKey: any;

  constructor(private dataService: DataService,
              private encryptionService: EncryptionService) {
    if (!_.isEmpty(this.loggedInUserEncrypted)) {
      this.loggedInUserDecrypted = this.getDecryptedUser(this.loggedInUserEncrypted);
    } else {
      this.loggedInUserDecrypted = {};
    }
  }

  loadPublicKey() {
    let loadPublicKeyObserving = this.dataService.get(SETTINGS.ENDPOINTS.loadPublicKey);
    loadPublicKeyObserving.subscribe((response: any) => {
      this.publicKey = response.publicKey;
    });
    return loadPublicKeyObserving;
  }

  setLoggedInUser(user: any) {
    if (user != null) {
      this.loggedInUserEncrypted = this.getEncryptedUser(user);
      this.loggedInUserDecrypted = this.getDecryptedUser(this.loggedInUserEncrypted);
    } else {
      this.loggedInUserEncrypted = '';
      this.loggedInUserDecrypted = {};
    }
  }

  private getDecryptedUser(user: any) {
    return JSON.parse(this.encryptionService.decrypt(user));
  }

  private getEncryptedUser(user: any): string {
    return this.encryptionService.encrypt(JSON.stringify(user));
  }

  getLoggedInUser() {
    return this.loggedInUserDecrypted;
  }
}

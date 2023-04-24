import {Injectable} from '@angular/core';
import {SETTINGS} from "../../../../main/settings/commons.settings";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserRegisterService {

  onRegisterUser: Subject<any> = new Subject();

  constructor(private httpClient: HttpClient) {
  }

  registerUser(userRQ) {
    let response = this.httpClient.post(SETTINGS.ENDPOINTS.registerUser.url, userRQ);
    response.subscribe((data: any) => {
      this.onRegisterUser.next(data);
    });
  }
}

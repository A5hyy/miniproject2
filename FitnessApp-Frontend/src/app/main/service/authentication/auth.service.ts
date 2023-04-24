import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {SETTINGS} from "../../settings/commons.settings";
import {LocalStorage} from "ngx-webstorage";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";
import {DataService} from "../data/data.service";
import {ApplicationService} from "../application/application.service";
import {PrivilegeService} from "./privilege.service";
import * as CryptoJS from 'crypto-js';

// export class LoginRQ {
//   username: string;
//   password: string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus = new Subject();

  @LocalStorage(SETTINGS.PUBLIC_KEY)
  private publicKey: any;

  constructor(
    private tokenService: TokenService,
    private dataService: DataService,
    private privilegeService: PrivilegeService,
    private applicationService: ApplicationService,
    private router: Router) {

  }

  userLogin(logInRequest: any) {
    this.dataService.post(SETTINGS.ENDPOINTS.login, logInRequest)
      .subscribe(
        (res: any) => {

          this.tokenService.setAccessToken(res.accessToken);
          this.tokenService.setRefreshToken(res.refreshToken);

          const user = res.user;
          this.applicationService.setLoggedInUser(user);
          this.privilegeService.setUserPrivileges(user.privileges);

          Promise.all([
            // this.masterDataService.getSystemParameters(),
            // this.masterDataService.getConstants(),
            // this.masterDataService.getApplicationProperties(),
          ]).then(
            () => {
              this.loginStatus.next({status: true});
            }, (error) => {
              console.log('error loading meta data , ', error);
            }
          );

          // this.searchDataCacheService.resetSearchDataCache();
        }, error => {
          this.loginStatus.next({status: false});
          this.applicationService.setLoggedInUser(null);
        });
  }

  isLoggedIn(): boolean {
    return !this.tokenService.isAccessTokenExpired() || !this.tokenService.isRefreshTokenExpired();
  }

  setLoggedOut() {
    this.dataService.post(SETTINGS.ENDPOINTS.expireUserCache)
      .subscribe(data => {
      }, error => {
      });
    this.applicationService.setLoggedInUser(null);
    this.privilegeService.setUserPrivileges([]);
    this.loginStatus.next({status: false});

    this.router.navigate(['/auth/login/']);

    // this.dataResetService.resetData();
    localStorage.clear();
    // this.cacheService.expireCache();
    this.tokenService.clearTokens();
  }

  getLoggedInStatus(): Observable<any> {
    return this.loginStatus.asObservable();
  }

  getResetPassword(password) {
    password = CryptoJS.SHA1(password);
    return CryptoJS.enc.Base64.stringify(password);
  }
}

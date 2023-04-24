// Angular
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
// RxJS
import {Observable} from 'rxjs';
// NGRX
import {AuthService} from "../service/authentication/auth.service";
import {SETTINGS} from "../settings/commons.settings";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {

      if (localStorage.getItem(SETTINGS.ACCESS_TOKEN) != null) {
        // this.alertService.showToaster('Your session is expired', SETTINGS.TOASTER_MESSAGES.warning);
      }
      this.authService.setLoggedOut();

      return false;
    }
    return true;
  }
}

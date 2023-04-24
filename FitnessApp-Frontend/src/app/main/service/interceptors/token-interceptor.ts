import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {TokenService} from "../authentication/token.service";
import {DataService} from "../data/data.service";
import {SETTINGS} from "../../settings/commons.settings";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,
              private dataService: DataService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request;
    if (req.withCredentials) {

      if (req.url.indexOf(SETTINGS.ENDPOINTS.refreshToken.url) > -1) {
        request = req.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + this.tokenService.getRefreshToken()
          }
        });
        return next.handle(request);
      } else {
        if (!this.tokenService.isAccessTokenExpired()) {
          request = req.clone({
            setHeaders: {
              'Authorization': 'Bearer ' + this.tokenService.getAccessToken()
            }
          });
          return next.handle(request);
        } else {
          console.log(req.url);
          if (!this.tokenService.isRefreshTokenExpired()) {
            return this.dataService.post(SETTINGS.ENDPOINTS.refreshToken).pipe(switchMap((response: any) => {

              this.tokenService.setAccessToken(response.token);
              request = req.clone({
                setHeaders: {
                  'Authorization': 'Bearer ' + this.tokenService.getAccessToken()
                }
              });
              return next.handle(request);
            }));
          }
          return next.handle(request);
        }
      }
    } else {
      request = req;
      return next.handle(request);
    }
  }
}

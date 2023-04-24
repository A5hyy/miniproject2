import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TokenInterceptor} from "./service/interceptors/token-interceptor";
import {DataService} from "./service/data/data.service";
import {CommonService} from "./service/common/common.service";
import {ApplicationService} from "./service/application/application.service";
import {EncryptionService} from "./service/application/encryption.service";
import {TokenService} from "./service/authentication/token.service";
import {PrivilegeService} from "./service/authentication/privilege.service";
import {DateService} from "./service/application/date.service";
import {AuthService} from "./service/authentication/auth.service";
import {AuthGuard} from "./guard/auth-guard";
import {UrlEncodeService} from "./service/application/url-encode.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    BrowserAnimationsModule
  ],
  providers: [
    DataService,
    CommonService,
    ApplicationService,
    EncryptionService,
    AuthService,
    UrlEncodeService,
    TokenService,
    AuthGuard,
    DateService,
    PrivilegeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
})
export class MainModule {
}

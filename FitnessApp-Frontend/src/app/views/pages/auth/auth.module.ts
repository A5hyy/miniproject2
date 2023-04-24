import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../../../shared/shared.module";
import {UserRegisterService} from "./service/user-register.service";
import {UserService} from "../home/service/user.service";
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {returnUrl: window.location.pathname}
      }
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [AuthComponent],
  providers: [
    UserRegisterService,
    UserService
  ]
})
export class AuthModule {
  // @ts-ignore
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule
    };
  }
}

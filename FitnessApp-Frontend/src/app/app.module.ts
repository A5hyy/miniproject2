import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BaseComponent} from './core/fitness-app/base/base.component';
import {MainModule} from "./main/main.module";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./views/pages/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    SharedModule,
    AppRoutingModule,
    AuthModule.forRoot(),
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

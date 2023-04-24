import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialImports} from "./material.imports";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MaterialImports,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialImports,
    RouterModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class SharedModule {
}

import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {BaseComponent} from './core/fitness-app/base/base.component';
import {AuthGuard} from './main/guard/auth-guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('src/app/views/pages/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('src/app/views/pages/home/home.module').then(m => m.HomeModule)
      },

      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ],
    resolve: {
      // data: CalenderService

    },
  },

  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

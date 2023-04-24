import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainViewComponent} from './main-view/main-view.component';
import {HomeRoutingModule} from './home-routing.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {HomeComponent} from './home/home.component';
import {ViewUsersComponent} from './users/view-users/view-users.component';
import {UserService} from './service/user.service';
import {AddUserComponent} from './users/add-user/add-user.component';
import {ResetUserPasswordComponent} from './users/reset-user-password/reset-user-password.component';
import {SharedModule} from '../../../shared/shared.module';
import {CopyPasswordComponent} from './users/copy-password/copy-password.component';
import {ChangePasswordComponent} from './settings/change-password/change-password.component';
import {HomeService} from './service/home.service';
import { ViewCaloriesCalculatorComponent } from './calories-calculator/view-calories-calculator/view-calories-calculator.component';
import { ViewMyWorkoutsComponent } from './my-workouts/view-my-workouts/view-my-workouts.component';
import { ViewExerciseComponent } from './exercise/view-exercise/view-exercise.component';
import { AddWorkoutComponent } from './my-workouts/add-workout/add-workout.component';

@NgModule({
  declarations: [
    MainViewComponent,
    HomeComponent,
    ViewUsersComponent,
    AddUserComponent,
    ResetUserPasswordComponent,
    CopyPasswordComponent,
    ChangePasswordComponent,
    ViewCaloriesCalculatorComponent,
    ViewMyWorkoutsComponent,
    ViewExerciseComponent,
    AddWorkoutComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ClipboardModule
  ],
  providers: [
    UserService,
    HomeService
  ]
})
export class HomeModule {
}

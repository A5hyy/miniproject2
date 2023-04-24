import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainViewComponent} from './main-view/main-view.component';
import {UserService} from './service/user.service';
import {ViewUsersComponent} from './users/view-users/view-users.component';
import {ViewCaloriesCalculatorComponent} from './calories-calculator/view-calories-calculator/view-calories-calculator.component';
import {ViewMyWorkoutsComponent} from './my-workouts/view-my-workouts/view-my-workouts.component';
import {ViewExerciseComponent} from './exercise/view-exercise/view-exercise.component';
import {WorkoutService} from './service/workout.service';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent
  },
  {
    path: 'users',
    resolve: {
      data: UserService

    },
    component: ViewUsersComponent
  },
  {
    path: 'calories-calculator',
    component: ViewCaloriesCalculatorComponent
  },
  {
    path: 'my-workouts',
    component: ViewMyWorkoutsComponent,
    resolve: {
      data: WorkoutService
    },
  },
  {
    path: 'exercises',
    component: ViewExerciseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

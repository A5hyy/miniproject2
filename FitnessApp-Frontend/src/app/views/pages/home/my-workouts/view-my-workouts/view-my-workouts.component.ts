import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrivilegeService} from '../../../../../main/service/authentication/privilege.service';
import {MatDialog} from '@angular/material/dialog';
import {AddWorkoutComponent} from '../add-workout/add-workout.component';
import {WorkoutService} from '../../service/workout.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-view-my-workouts',
  templateUrl: './view-my-workouts.component.html',
  styleUrls: ['./view-my-workouts.component.scss']
})
export class ViewMyWorkoutsComponent implements OnInit, OnDestroy {

  title = 'Workouts';
  onSearchedWorkoutsSubs = new Subscription();
  dataSource: any = [];
  displayedColumns: string[] = ['workoutID', 'description', 'steps', 'count', 'actions'];

  constructor(private privilegeService: PrivilegeService,
              private workoutService: WorkoutService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.isUser()) {
      this.title = 'My Workouts';
    }

    this.onSearchedWorkoutsSubs = this.workoutService.onSearchedWorkouts
      .subscribe((data: any) => {
        if (data) {
          this.dataSource = [];
          data.forEach((val: any) => {
            // @ts-ignore
            this.dataSource.push(val);
          });
        }
      });
  }

  isAdmin() {
    return this.privilegeService.isAdmin();
  }

  isUser() {
    return this.privilegeService.isUser();
  }

  onAddNewWorkout(param) {
    const dialogRef = this.dialog.open(AddWorkoutComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          type: 'ADD',
          workout: param
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.workoutService.searchWorkouts({});
        }
        dialogSubs.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    this.onSearchedWorkoutsSubs.unsubscribe();
  }

  view($event: MouseEvent, row) {
    const dialogRef = this.dialog.open(AddWorkoutComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          type: 'VIEW',
          workout: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.workoutService.searchWorkouts({});
        }
        dialogSubs.unsubscribe();
      });
  }

  edit($event: MouseEvent, row) {
    const dialogRef = this.dialog.open(AddWorkoutComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          type: 'EDIT',
          workout: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.workoutService.searchWorkouts({});
        }
        dialogSubs.unsubscribe();
      });
  }
}

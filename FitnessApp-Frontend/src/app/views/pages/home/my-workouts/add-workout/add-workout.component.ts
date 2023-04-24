import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../../main/service/common/alert.service';
import {WorkoutDTO} from '../../model/workout-dto';
import {WorkoutService} from '../../service/workout.service';
import {SETTINGS} from '../../../../../main/settings/commons.settings';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent implements OnInit, OnDestroy {

  title: any;
  workoutAddEditForm!: FormGroup;
  workoutDto = new WorkoutDTO();
  type: string;

  onSaveOrUpdateWorkoutSubs = new Subscription();

  constructor(public dialogRef: MatDialogRef<AddWorkoutComponent>,
              private alertService: AlertService,
              private workoutService: WorkoutService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.workoutDto = new WorkoutDTO(this.data.workout);
    this.type = this.data.type;

    if (this.type === 'ADD') {
      this.title = 'Add Workout';
    } else if (this.type === 'EDIT') {
      this.title = 'Edit Workout';
    } else {
      this.title = 'View Workout';
    }

    this.onSaveOrUpdateWorkoutSubs = this.workoutService.onSaveOrUpdateWorkout
      .subscribe((data: any) => {
        if (data) {
          if (this.type === 'ADD') {
            this.alertService.showToaster(
              'Saved successfully',
              SETTINGS.TOASTER_MESSAGES.success);
          } else {
            this.alertService.showToaster(
              'Updated successfully',
              SETTINGS.TOASTER_MESSAGES.success);
          }

          this.dialogRef.close(true);
        }
      });

    this.initWorkoutForm();
  }

  initWorkoutForm() {
    this.workoutAddEditForm = this.formBuilder.group({
      description: [this.workoutDto.description, Validators.compose([
        Validators.required
      ])],
      steps: [this.workoutDto.steps, Validators.compose([
        Validators.required
      ])],
      count: [this.workoutDto.count, Validators.compose([
        Validators.required
      ])]
    });
  }

  onCancelClick($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.dialogRef.close(false);
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.workoutAddEditForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  onSave($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    const submitData = Object.assign({}, this.workoutAddEditForm.getRawValue());

    submitData.workoutID = this.workoutDto.workoutID;

    this.workoutService.saveOrUpdateWorkout(submitData);
  }

  isFormValid() {
    return this.workoutAddEditForm.valid;
  }

  ngOnDestroy(): void {
    this.onSaveOrUpdateWorkoutSubs.unsubscribe();
  }
}

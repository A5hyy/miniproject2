import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SETTINGS} from "../../../../../main/settings/commons.settings";
import * as moment from 'moment';
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";
import {UserDTO} from "../../model/user-dto";
import {DateService} from "../../../../../main/service/application/date.service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {AlertService} from "../../../../../main/service/common/alert.service";

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS}
  ]
})
export class AddUserComponent implements OnInit, OnDestroy {
  title: any;
  type: any;
  userAddEditForm!: FormGroup;
  userDto = new UserDTO();

  onSaveOrUpdateUserSubs = new Subscription();

  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private dateService: DateService,
              private alertService: AlertService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.userDto = new UserDTO(this.data.user);
    this.title = this.data.title;
    this.type = this.data.type;

    this.initUserForm();

    if (this.type !== 'ADD') {
      this.userAddEditForm.get('password').clearValidators();
      this.userAddEditForm.get('password').setErrors(null);
      this.userAddEditForm.get('confirmPassword').clearValidators();
      this.userAddEditForm.get('confirmPassword').setErrors(null);

      this.userAddEditForm.updateValueAndValidity({onlySelf: true});
    }

    this.onSaveOrUpdateUserSubs = this.userService.onSaveOrUpdateUser
      .subscribe((data: any) => {
        if (data) {
          if (this.type == 'ADD') {
            this.alertService.showToaster(
              "Saved successfully",
              SETTINGS.TOASTER_MESSAGES.success);
          } else {
            this.alertService.showToaster(
              "Updated successfully",
              SETTINGS.TOASTER_MESSAGES.success);
          }

          this.dialogRef.close(true);
        }
      });
  }

  initUserForm() {
    this.userAddEditForm = this.formBuilder.group({
      userName: [this.userDto.userName, Validators.compose([
        Validators.required
      ])],
      firstName: [this.userDto.firstName, Validators.compose([
        Validators.required
      ])],
      lastName: [this.userDto.lastName, Validators.compose([
        Validators.required
      ])],
      email: [this.userDto.email, Validators.compose([
        Validators.required
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])],
      confirmPassword: [null, Validators.compose([
        Validators.required
      ])],
      dateOfBirthStr: [this.dateService.getMomentDateFromDateStr(this.userDto.dateOfBirthStr), Validators.compose([
        Validators.required
      ])],
      userType: [this.userDto.userType, Validators.compose([
        Validators.required
      ])],
      status: [this.userDto.status, Validators.compose([
        Validators.required
      ])]
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.userAddEditForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  onCancelClick($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.dialogRef.close(false);
  }

  onSave($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    let submitData = Object.assign({}, this.userAddEditForm.getRawValue());
    let password = submitData.password;
    let confirmPassword = submitData.confirmPassword;

    if (password !== confirmPassword) {
      this.alertService.showToaster(
        "Password mismatch",
        SETTINGS.TOASTER_MESSAGES.error);
      return;
    }

    if (this.validateEmail(submitData.email) == null) {
      this.alertService.showToaster(
        "Invalid email",
        SETTINGS.TOASTER_MESSAGES.error);
      return;
    }

    submitData.dateOfBirthStr = moment(submitData.dateOfBirthStr).format(SETTINGS.DATE_TIME.DEFAULT_DATE_FORMAT);
    submitData.userID = this.userDto.userID;

    this.userService.saveOrUpdateUser(submitData);
  }

  validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  isFormValid() {
    return this.userAddEditForm.valid;
  }

  ngOnDestroy(): void {
    this.onSaveOrUpdateUserSubs.unsubscribe();
  }
}

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserRegisterService} from '../service/user-register.service';
import {SETTINGS} from '../../../../main/settings/commons.settings';
import * as moment from 'moment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;

  onRegisterUserSubs = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<RegisterComponent>,
              private formBuilder: FormBuilder,
              private userRegisterService: UserRegisterService) {
  }

  ngOnInit(): void {
    this.initRegisterForm();

    this.onRegisterUserSubs = this.userRegisterService.onRegisterUser
      .subscribe((data: any) => {
        if (data) {
          if (data.status === 'SUCCESS') {
            alert('User successfully registered to the system');
            this.dialogRef.close(false);
          } else {
            if (data.appsErrorMessages[0].errorCode) {
              alert(data.appsErrorMessages[0].errorCode);
            } else {
              alert('Internal server error');
            }
          }
        }
      });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerForm.controls[controlName];
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

  onRegister($event: MouseEvent) {
    const submitData = Object.assign({}, this.registerForm.getRawValue());
    const password = submitData.password;
    const confirmPassword = submitData.confirmPassword;

    if (password !== confirmPassword) {
      alert('Password mismatch');
      return;
    }

    if (this.validateEmail(submitData.email) == null) {
      alert('Invalid email');
      return;
    }

    submitData.dateOfBirthStr = moment(submitData.dateOfBirthStr).format(SETTINGS.DATE_TIME.DEFAULT_DATE_FORMAT);
    this.userRegisterService.registerUser(submitData);
  }

  validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  isValidUpload() {
    return this.registerForm.valid;
  }

  initRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: [null, Validators.compose([
        Validators.required
      ])],
      firstName: [null, Validators.compose([
        Validators.required
      ])],
      lastName: [null, Validators.compose([
        Validators.required
      ])],
      email: [null, Validators.compose([
        Validators.required
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])],
      confirmPassword: [null, Validators.compose([
        Validators.required
      ])],
      dateOfBirthStr: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnDestroy(): void {
    this.onRegisterUserSubs.unsubscribe();
  }
}

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../../../main/service/authentication/auth.service";
import {SETTINGS} from "../../../../../main/settings/commons.settings";
import {AlertService} from "../../../../../main/service/common/alert.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  passwordChangeForm!: FormGroup;
  userID: any;
  onChangeUserPasswordSubs = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ChangePasswordComponent>,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userID = this.data.userID;
    this.initForm();

    this.onChangeUserPasswordSubs = this.userService.onChangeUserPassword
      .subscribe(data => {
        if (data) {
          this.alertService.showToaster(
            "Password changed successfully",
            SETTINGS.TOASTER_MESSAGES.success);
          this.dialogRef.close(false);
        }
      });
  }

  initForm() {
    this.passwordChangeForm = this.formBuilder.group({
      oldPassword: [null, Validators.compose([
        Validators.required
      ])],
      newPassword: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.passwordChangeForm.controls[controlName];
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

  onChangePassword($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    let submitData = Object.assign({}, this.passwordChangeForm.getRawValue());
    submitData.userID = this.userID;
    submitData.oldPassword = this.authService.getResetPassword(submitData.oldPassword);

    this.userService.changeUserPassword(submitData);
  }

  ngOnDestroy(): void {
    this.onChangeUserPasswordSubs.unsubscribe();
  }

  isFormValid() {
    return this.passwordChangeForm.valid;
  }
}

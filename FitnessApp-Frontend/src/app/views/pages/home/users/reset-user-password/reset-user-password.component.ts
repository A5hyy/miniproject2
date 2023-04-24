import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserDTO} from '../../model/user-dto';
import {UserService} from '../../service/user.service';
import {Subscription} from 'rxjs';
import {CopyPasswordComponent} from '../copy-password/copy-password.component';
import {AlertService} from '../../../../../main/service/common/alert.service';
import {SETTINGS} from '../../../../../main/settings/commons.settings';

@Component({
  selector: 'app-reset-user-password',
  templateUrl: './reset-user-password.component.html',
  styleUrls: ['./reset-user-password.component.scss']
})
export class ResetUserPasswordComponent implements OnInit, OnDestroy {
  userDto = new UserDTO();
  onResetUserPasswordSubs = new Subscription();

  constructor(public dialogRef: MatDialogRef<ResetUserPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              private alertService: AlertService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userDto = new UserDTO(this.data.user);

    this.onResetUserPasswordSubs = this.userService.onResetUserPassword
      .subscribe((data: any) => {
        if (data) {
          this.alertService.showToaster(
            'Password reset successfully',
            SETTINGS.TOASTER_MESSAGES.success);
          this.dialogRef.close(true);

          // const dialogRef = this.dialog.open(CopyPasswordComponent, {
          //     panelClass: 'custom-dialog-panel',
          //     width: '40%',
          //     data: {
          //       password: data,
          //     }
          //   }
          // );
        }
      });
  }

  onCancelClick($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.dialogRef.close(false);
  }

  onPasswordReset($event: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.userService.resetUserPassword(this.userDto.userID);
  }

  ngOnDestroy(): void {
    this.onResetUserPasswordSubs.unsubscribe();
  }
}

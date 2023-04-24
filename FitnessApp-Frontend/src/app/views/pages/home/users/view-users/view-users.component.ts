import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrivilegeService} from '../../../../../main/service/authentication/privilege.service';
import {UserService} from '../../service/user.service';
import {Subscription} from 'rxjs';
import {Constants} from '../../../../../main/settings/constants';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddUserComponent} from '../add-user/add-user.component';
import {ResetUserPasswordComponent} from '../reset-user-password/reset-user-password.component';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit, OnDestroy {

  dataSource: any = [];
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'userType', 'status', 'actions'];
  userType = Constants.userType;
  status = Constants.status;
  onSearchedUsersSubs = new Subscription();
  searchForm!: FormGroup;

  constructor(private privilegeService: PrivilegeService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      userName: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      userType: ['ALL'],
      status: ['ACT']
    });

    this.onSearchedUsersSubs = this.userService.onSearchedUsers
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

  onAddUser(user: any) {
    const dialogRef = this.dialog.open(AddUserComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          title: `Add User`,
          type: 'ADD',
          user
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.onUserSearch();
        }
        dialogSubs.unsubscribe();
      });
  }

  view($event: MouseEvent, row: any) {
    const dialogRef = this.dialog.open(AddUserComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          title: `View User`,
          type: 'VIEW',
          user: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.onUserSearch();
        }
        dialogSubs.unsubscribe();
      });
  }

  edit($event: MouseEvent, row: any) {
    const dialogRef = this.dialog.open(AddUserComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          title: `Edit User`,
          type: 'EDIT',
          user: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.onUserSearch();
        }
        dialogSubs.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    this.onSearchedUsersSubs.unsubscribe();
  }

  onUserSearch() {
    const submitData = Object.assign({}, this.searchForm.getRawValue());

    if (submitData.userType === 'ALL') {
      submitData.userType = null;
    }
    if (submitData.status === 'ALL') {
      submitData.status = null;
    }

    this.userService.searchUsers(submitData);
  }

  onUserSearchClear() {
    this.searchForm.reset({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      userType: 'ALL',
      status: 'ACT'
    }, {onlySelf: false, emitEvent: true});

    this.onUserSearch();
  }

  resetPassword($event: MouseEvent, row: any) {
    const dialogRef = this.dialog.open(ResetUserPasswordComponent, {
        panelClass: 'custom-dialog-panel',
        width: '40%',
        data: {
          user: row
        }
      }
    );

    const dialogSubs = dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.onUserSearch();
        }
        dialogSubs.unsubscribe();
      });
  }
}

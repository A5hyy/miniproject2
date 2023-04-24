import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../main/service/authentication/auth.service';
import {PrivilegeService} from '../../../main/service/authentication/privilege.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ApplicationService} from '../../../main/service/application/application.service';
import {Subscription} from 'rxjs';
import {ChangePasswordComponent} from '../../../views/pages/home/settings/change-password/change-password.component';
import {AddUserComponent} from '../../../views/pages/home/users/add-user/add-user.component';
import {UserService} from '../../../views/pages/home/service/user.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  user: any;
  userType: any;
  currentUser: any;

  workoutsTitle = 'My Workouts';

  onGetUserByIDSubs = new Subscription();

  constructor(private authService: AuthService,
              private applicationService: ApplicationService,
              private privilegeService: PrivilegeService,
              private dialog: MatDialog,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.applicationService.getLoggedInUser();

    if (this.isAdmin()) {
      this.userType = 'Admin';
      this.workoutsTitle = 'Workouts';
    } else if (this.isUser()) {
      this.userType = 'User';
      this.workoutsTitle = 'My Workouts';
    }

    this.onGetUserByIDSubs = this.userService.onGetUserByID
      .subscribe(data => {
        if (data) {
          this.currentUser = data;
          if (this.currentUser !== null && this.currentUser !== undefined) {
            this.showUserData();
          }
        }
      });
  }

  logout() {
    console.log('Logout');
    this.authService.setLoggedOut();
  }

  onClickHome() {
    this.router.navigate(['/home']);
  }

  isAdmin() {
    return this.privilegeService.isAdmin();
  }

  isUser() {
    return this.privilegeService.isUser();
  }

  onClickChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
        panelClass: 'custom-dialog-panel',
        width: '40%',
        data: {
          userID: this.user.userID
        }
      }
    );
  }

  onClickProfile() {
    if (!this.currentUser) {
      this.userService.getUserByID(this.user.userID);
    } else {
      this.showUserData();
    }
  }

  showUserData() {
    const dialogRef = this.dialog.open(AddUserComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%',
        data: {
          title: `My Profile`,
          type: 'VIEW',
          user: this.currentUser
        }
      }
    );
  }
}

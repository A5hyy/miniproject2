import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SETTINGS} from '../../../../main/settings/commons.settings';
import * as JSEncryptModule from 'jsencrypt';
import * as CryptoJS from 'crypto-js';
import {LocalStorage} from 'ngx-webstorage';
import {AuthService} from '../../../../main/service/authentication/auth.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../../../main/service/common/alert.service';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: any;
  password: any;
  loginForm!: FormGroup;
  loginSubscription = new Subscription();
  @LocalStorage(SETTINGS.PUBLIC_KEY)
  private publicKey: any;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private route: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initLoginForm();

    this.loginSubscription = this.authService.getLoggedInStatus().subscribe(results => {
      if (results.status) {
        this.route.navigate([SETTINGS.PAGES.home]);
      } else {
        this.alertService.showToaster(
          'Login error : Incorrect username or password entered. Please try again',
          SETTINGS.TOASTER_MESSAGES.error);
      }
    });
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.compose([
        Validators.required
      ])
      ],
      password: [null, Validators.compose([
        Validators.required
      ])
      ]
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  submit() {
    const controls = this.loginForm.controls;
    /** check form */
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    const userName = controls.userName.value.trim();
    const password = this.getEncryptedPassword(controls.password.value);

    this.authService.userLogin({username: userName, password});
  }

  private getEncryptedPassword(password: any) {

    password = CryptoJS.SHA1(password);
    password = CryptoJS.enc.Base64.stringify(password);

    const crypt = new JSEncryptModule.JSEncrypt();
    crypt.setPublicKey(this.publicKey || SETTINGS.KEYS.PUBLIC_KEY);
    password = crypt.encrypt(password);

    return password;
  }

  register() {
    const dialogRef = this.dialog.open(RegisterComponent, {
        panelClass: 'custom-dialog-panel',
        width: '70%'
      }
    );
  }

  goToClient() {
    this.route.navigate(['/auth/client-page/']);
  }
}

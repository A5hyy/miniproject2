import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {MatSnackBar, MatSnackBarDismiss} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public snackBar: MatSnackBar) {
  }

  showToaster(message: string, type: string, customConfigs?: { duration?: number, panelClass?: string }): Observable<MatSnackBarDismiss> {

    let customClass = '';

    if (type.toUpperCase() === 'SUCCESS') {
      customClass = 'snack-bar-success';
    }
    if (type.toUpperCase() === 'ERROR') {
      customClass = 'snack-bar-error';
    }
    if (type.toUpperCase() === 'WARNING') {
      customClass = 'snack-bar-warning';
    }
    if (type.toUpperCase() === 'INFO') {
      customClass = 'snack-bar-info';
    }
    if (type.toUpperCase() === 'CUSTOM') {
      customClass = 'snack-bar-custom';
    }

    const config: any = Object.assign({}, {
        duration: 5000,
        panelClass: customClass,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      },
      customConfigs);

    return this.snackBar.open(message, 'close', config).afterDismissed();
  }
}

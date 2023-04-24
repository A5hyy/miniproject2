import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as _ from 'underscore';
import {AppUtils} from "../../main/util/app.utils";

export class NumberValidator {
  public static positiveNumber(control: AbstractControl): ValidationErrors | null {
    if (control.value < 0) {
      return {
        positiveNumberError: true
      };
    }
    return null;
  }

  public static greaterThanZero(control: AbstractControl): ValidationErrors | null {
    if (control.value != null) {
      if (control.value <= 0) {
        return {
          greaterThanZeroError: true
        };
      }
    }

    return null;
  }

  public static greaterThanOrEqualToZero(control: AbstractControl): ValidationErrors | null {
    if (control.value != null) {
      if (control.value < 0) {
        return {
          greaterThanOrEqualZeroError: true
        };
      }
    }

    return null;
  }

  public static maxLength(params: any = {}): ValidationErrors | null {

    return (control: FormControl): { [key: string]: string } => {

      let val: number = control.value;

      console.log('length', control.value.length);
      console.log(params);
      return null;
    };
  }

  public static maxLengthOfNumber(params: any = {}): ValidatorFn | null {

    return (control: FormControl): ValidationErrors | null => {

      let val: number = control.value;

      if (control.value != null && control.value != '') {
        let lengthOfVal = (control.value + "").length;
        if (lengthOfVal > params) {
          return {
            hasLengthError: true
          };
        }
      }

      return null;
    };
  }

  public static mobileNumber(control: AbstractControl): ValidationErrors | null {
    let value = control.value;
    if (_.isEmpty(value)) {
      return null;
    }
    let filter = /^\d*(?:\.\d{1,2})?$/;
    if (!filter.test(value) || value.length != 10) {
      return {
        notAValidMobileNumber: true
      }
    }

    return null;
  }

  public static noDecimalPlacesValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value != null && control.value != '') {
      let decimalPlaces = AppUtils.getDecimalPlaces(control.value);
      if (decimalPlaces > 0) {
        return {
          hasDecimalPlacesError: true
        };
      }
    }

    return null;
  }

  public static decimalPlacesValidator(params: any = {}): ValidationErrors | null {

    return (control: FormControl): ValidationErrors | null => {
      if (control.value != null && control.value != '') {
        let decimalPlaces = AppUtils.getDecimalPlaces(control.value);
        if (decimalPlaces > params) {
          return {
            decimalPlacesError: {
              noOfDecimalPlaces: params
            }
          }
        }
      }
      return null;
    };
  }

  public static noOfDecimalPlacesValidator(params: any = {}): ValidatorFn | null {

    return (control: FormControl): ValidationErrors | null => {
      if (control.value != null && control.value != '') {
        let decimalPlaces = AppUtils.getDecimalPlaces(control.value);
        if (decimalPlaces > params) {
          return {
            decimalPlacesError: {
              noOfDecimalPlaces: params
            }
          }
        }
      }
      return null;
    };
  }
}

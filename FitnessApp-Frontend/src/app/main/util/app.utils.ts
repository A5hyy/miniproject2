import {FormGroup} from '@angular/forms';
import * as _ from 'underscore';
import * as moment from "moment";
import {SETTINGS} from "../settings/commons.settings";

export class SelectOptionValue {
  key: string | number;
  value: string | number;

  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

export class AppUtils {
  /*
     * @field theForm : input form
     * @field formErrors : error object
     * */
  public static getFormErrors(theForm: FormGroup, formErrors: any): any {
    for (const field in formErrors) {
      if (!formErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      formErrors[field] = {};

      // Get the control
      const control = theForm.get(field);

      if (control && control.dirty && !control.valid) {
        formErrors[field] = control.errors;
      }
    }

    return formErrors;
  }

  public static generateArray(size: number, zeroIncluded: boolean) {
    const arr = [];

    if (zeroIncluded) {
      arr.push(0);
    }

    for (let i = 1; i <= size; i++) {
      arr.push(i);
    }

    return arr;
  }

  public static getArrayItem(itemArray: Array<any>, field: string, matchingValue: any): any {
    return _.find(itemArray, (item) => {
      return item[field] == matchingValue;
    });
  }

  /**
   * constantStrObject - > {'ACT' : 'Actice'}
   * */

  public static generateSelectOptions(constantStrObject: any, isSort?: boolean, isFirstValueEmpty?: boolean): Array<SelectOptionValue> {
    let items: Array<SelectOptionValue> = [];
    let keys = _.keys(constantStrObject);

    keys.forEach(key => {
      items.push(new SelectOptionValue(key, constantStrObject[key]));
    });

    if (isSort) {
      items.sort((a, b) => {
        return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);
      });
    }

    if (isFirstValueEmpty) {
      items.unshift(new SelectOptionValue('', 'All'));
    }

    return items;
  }

  public static getActiveItems(itemList: Array<any>): Array<any> {
    let onlyActiveItems = [];

    itemList.forEach(item => {
      if (item.status == 'ACT') {
        onlyActiveItems.push(item);
      }
    });

    return onlyActiveItems;
  }

  public static getActiveItemsWithSelectedItem(itemList: Array<any>, itemKey: any, selectedItemId: any): Array<any> {
    let onlyActiveItems = [];

    itemList.forEach(item => {
      if (item[itemKey] == selectedItemId) {
        onlyActiveItems.push(item);
      } else {
        if (item.status == 'ACT') {
          onlyActiveItems.push(item);
        }
      }

    });

    return onlyActiveItems;
  }

  public static getActiveItemsWithSelectedItems(itemList: Array<any>, itemKey: any, selectedItemIds: any): Array<any> {
    let onlyActiveItems = [];

    itemList.forEach(item => {
      if (_.contains(selectedItemIds, item[itemKey])) {
        onlyActiveItems.push(item);
      } else {
        if (item.status == 'ACT') {
          onlyActiveItems.push(item);
        }
      }

    });

    return onlyActiveItems;
  }

  public static trim(formValues: any): any {
    _.keys(formValues).forEach(key => {
      if (_.isString(formValues[key])) {
        formValues[key] = formValues[key].trim();
      }
    });

    return formValues;
  }

  public static generateNumberArray(length: number) {
    const numberArray = [];

    for (let i = 0; i < length; i++) {
      if (i < 10) {
        numberArray.push('0' + i);
      } else {
        numberArray.push('' + i);
      }
    }

    return numberArray;
  }

  public static getDateHour(dateTimeStr) {
    if (dateTimeStr != null) {
      return (dateTimeStr.split(' ')[1]).split(':')[0];
    }

    return '';
  }

  public static getDateMinutes(dateTimeStr) {
    if (dateTimeStr != null) {
      return (dateTimeStr.split(' ')[1]).split(':')[1];
    }

    return '';
  }

  public static getTodayCombinedTime(hour: string, mins: string): string {
    return moment().format(SETTINGS.DATE_FORMAT) + ' ' + hour + ':' + mins;
  }

  public static isAfter(startDateTime: string, endDateTime: string): boolean {
    return moment(startDateTime, SETTINGS.DATE_TIME_FORMAT).isAfter(moment(endDateTime, SETTINGS.DATE_TIME_FORMAT));
  }

  public static isSameOrAfter(startDateTime: string, endDateTime: string): boolean {
    return moment(startDateTime, SETTINGS.DATE_TIME_FORMAT).isSameOrAfter(moment(endDateTime, SETTINGS.DATE_TIME_FORMAT));
  }

  public static isBefore(startDateTime: string, endDateTime: string): boolean {
    return moment(startDateTime, SETTINGS.DATE_TIME_FORMAT).isBefore(moment(endDateTime, SETTINGS.DATE_TIME_FORMAT));
  }

  public static isSameOrBefore(startDateTime: string, endDateTime: string): boolean {
    return moment(startDateTime, SETTINGS.DATE_TIME_FORMAT).isSameOrBefore(moment(endDateTime, SETTINGS.DATE_TIME_FORMAT));
  }

  public static getDecimalPlaces(a) {
    if (!isFinite(a)) return 0;
    let e = 1, p = 0;
    while (Math.round(a * e) / e !== a) {
      e *= 10;
      p++;
    }
    return p;
  }

  public static getUserEligibleDivisions(divisions, userEligibleDivisionIDs) {
    return _.filter(divisions, (division: any) => {
      return _.contains(userEligibleDivisionIDs, division.divisionID);
    });
  }

  public static generateZeroArray(length: number) {
    let array = [];
    for (let i = 0; i < length; i++) {
      array[i] = 0;
    }
    return array;
  }
}

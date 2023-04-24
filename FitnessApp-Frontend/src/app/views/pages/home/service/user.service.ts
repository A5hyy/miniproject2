import {Injectable} from '@angular/core';
import {DataService} from '../../../../main/service/data/data.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {SETTINGS} from '../../../../main/settings/commons.settings';
import {BehaviorSubject, Subject} from 'rxjs';
import {Pagination} from '../../../../main/dto/pagination';

@Injectable()
export class UserService {

  selectedUser: any;
  onChangeUserPassword: Subject<any> = new Subject();
  searchedUsers: any;
  onSearchedUsers: Subject<any> = new Subject();
  onSaveOrUpdateUser: Subject<any> = new Subject();
  onResetUserPassword: Subject<any> = new Subject();
  onGetUserByID: Subject<any> = new Subject();

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise<void>((resolve, reject) => {

      Promise.all([
        this.searchUsers({}),
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  searchUsers(searchRQ) {
    this.dataService.post(SETTINGS.ENDPOINTS.searchUsers, searchRQ)
      .subscribe(response => {
        this.searchedUsers = response;
        this.onSearchedUsers.next(this.searchedUsers);
      });
  }

  saveOrUpdateUser(userRQ: any) {
    const response = this.dataService.post(SETTINGS.ENDPOINTS.saveOrUpdateUser, userRQ);
    response.subscribe((data: any) => {
      this.onSaveOrUpdateUser.next(data);
    });
  }

  resetUserPassword(userID) {
    const data = Object.assign({}, SETTINGS.ENDPOINTS.resetUserPassword);
    data.url = data.url + '/' + userID;

    this.dataService.get(data)
      .subscribe((response: any) => {
        this.onResetUserPassword.next(response);
      });
  }

  changeUserPassword(saveRQ) {
    this.dataService.post(SETTINGS.ENDPOINTS.changeUserPassword, saveRQ)
      .subscribe(response => {
        this.selectedUser = response;
        this.onChangeUserPassword.next(this.selectedUser);
      });
  }

  getUserByID(userID) {
    const data = Object.assign({}, SETTINGS.ENDPOINTS.getUserByID);
    data.url = data.url + '/' + userID;

    this.dataService.get(data)
      .subscribe((response: any) => {
        this.onGetUserByID.next(response);
      });
  }
}

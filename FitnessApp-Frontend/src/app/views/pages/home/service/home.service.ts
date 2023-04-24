import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DataService} from '../../../../main/service/data/data.service';

@Injectable()
export class HomeService {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise<void>((resolve, reject) => {

      Promise.all([
        this.getAllCountryCodes(),
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }
  getAllCountryCodes() {
    // const data = Object.assign({}, SETTINGS.ENDPOINTS.getAllCountryCodes);
    //
    // this.dataService.get(data)
    //   .subscribe((response: any) => {
    //     this.onGetAllCountryCodes.next(response);
    //   });
  }
}

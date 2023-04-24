import {Injectable} from '@angular/core';
import {SETTINGS} from '../../../../main/settings/commons.settings';
import {DataService} from '../../../../main/service/data/data.service';
import {Observable, Subject} from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  searchedWorkouts: any;
  onSearchedWorkouts: Subject<any> = new Subject();
  onSaveOrUpdateWorkout: Subject<any> = new Subject();

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    return new Promise<void>((resolve, reject) => {

      Promise.all([
        this.searchWorkouts({}),
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  searchWorkouts(searchRQ) {
    this.dataService.post(SETTINGS.ENDPOINTS.searchWorkouts, searchRQ)
      .subscribe(response => {
        this.searchedWorkouts = response;
        this.onSearchedWorkouts.next(this.searchedWorkouts);
      });
  }

  saveOrUpdateWorkout(dataRQ: any) {
    const response = this.dataService.post(SETTINGS.ENDPOINTS.saveOrUpdateWorkout, dataRQ);
    response.subscribe((data: any) => {
      this.onSaveOrUpdateWorkout.next(data);
    });
  }
}

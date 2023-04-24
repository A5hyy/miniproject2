import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  onClickCaloriesCalculator() {
    this.router.navigate(['/home/calories-calculator']);
  }

  onClickMyWorkouts() {
    this.router.navigate(['/home/my-workouts']);
  }

  onClickExercises() {
    this.router.navigate(['/home/exercises']);
  }
}

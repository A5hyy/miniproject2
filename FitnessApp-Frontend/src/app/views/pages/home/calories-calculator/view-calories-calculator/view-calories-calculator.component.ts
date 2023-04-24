import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../../main/service/common/alert.service';
import {SETTINGS} from '../../../../../main/settings/commons.settings';

@Component({
  selector: 'app-view-calories-calculator',
  templateUrl: './view-calories-calculator.component.html',
  styleUrls: ['./view-calories-calculator.component.scss']
})
export class ViewCaloriesCalculatorComponent implements OnInit {

  isCalculated: boolean = false;

  caloriesCalculatorForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.caloriesCalculatorForm = this.formBuilder.group({
      unit: ['IMPERIAL', Validators.compose([
        Validators.required
      ])],
      gender: ['MALE', Validators.compose([
        Validators.required
      ])],
      weight: ['', Validators.compose([
        Validators.required
      ])],
      height: ['', Validators.compose([
        Validators.required
      ])],
      age: ['', Validators.compose([
        Validators.required
      ])],
      activity: ['', Validators.compose([
        Validators.required
      ])],
      bmr: ['mifflin-st-jeor', Validators.compose([
        Validators.required
      ])]
    });
  }

  onCalculate() {
    if (!this.isFormValid()) {
      this.alertService.showToaster(
        'Data is not valid',
        SETTINGS.TOASTER_MESSAGES.warning);
    }

    this.isCalculated = true;
  }

  isFormValid() {
    return this.caloriesCalculatorForm.valid;
  }
}

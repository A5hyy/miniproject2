export class WorkoutDTO {
  workoutID: any;
  description: any;
  steps: any;
  count: any;

  constructor(workoutDTO?) {
    workoutDTO = workoutDTO || {};

    this.workoutID = workoutDTO.workoutID || '';
    this.description = workoutDTO.description || '';
    this.steps = workoutDTO.steps || '';
    this.count = workoutDTO.count || '';
  }
}

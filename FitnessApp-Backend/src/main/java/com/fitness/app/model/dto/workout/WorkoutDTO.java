package com.fitness.app.model.dto.workout;

import com.fitness.app.model.domain.workout.Workout;

public class WorkoutDTO {

    private Integer workoutID;

    private String description;

    private String steps;

    private Integer count;

    public WorkoutDTO() {
    }

    public WorkoutDTO(Workout workout) {
        this.workoutID = workout.getWorkoutID();
        this.description = workout.getDescription();
        this.steps = workout.getSteps();
        this.count = workout.getCount();
    }

    public Integer getWorkoutID() {
        return workoutID;
    }

    public void setWorkoutID(Integer workoutID) {
        this.workoutID = workoutID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}

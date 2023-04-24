package com.fitness.app.dao.workout;

import com.fitness.app.model.domain.workout.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutDao extends JpaRepository<Workout, Integer> {
}

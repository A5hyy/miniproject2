package com.fitness.app.service.workout;

import com.fitness.app.dao.workout.WorkoutDao;
import com.fitness.app.dao.workout.jdbc.WorkoutJDBCDao;
import com.fitness.app.exception.AppsException;
import com.fitness.app.model.domain.workout.Workout;
import com.fitness.app.model.dto.workout.WorkoutDTO;
import com.fitness.app.model.dto.workout.WorkoutSearchRQ;
import com.fitness.app.model.security.CredentialsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutDao workoutDao;

    @Autowired
    private WorkoutJDBCDao workoutJDBCDao;

    @Transactional(propagation = Propagation.SUPPORTS)
    public WorkoutDTO getWorkoutByID(Integer workoutID) throws AppsException {
        Workout workout = this.workoutDao.getReferenceById(workoutID);
        return new WorkoutDTO(workout);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = AppsException.class)
    public WorkoutDTO saveOrUpdateWorkout(WorkoutDTO workoutDTO, CredentialsDTO credentialsDTO) throws AppsException {
        Date now = new Date();
        boolean isNew = (workoutDTO.getWorkoutID() == null);
        Workout workout;

        if (isNew) {
            workout = new Workout();

            workout.setCreatedDate(now);
            workout.setCreatedBy(credentialsDTO.getUserID());
        } else {
            workout = this.workoutDao.getReferenceById(workoutDTO.getWorkoutID());

            workout.setModifiedDate(now);
            workout.setModifiedBy(credentialsDTO.getUserID());
        }

        workout.setDescription(workoutDTO.getDescription());
        workout.setSteps(workoutDTO.getSteps());
        workout.setCount(workoutDTO.getCount());

        workout = this.workoutDao.saveAndFlush(workout);

        return new WorkoutDTO(workout);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public List<WorkoutDTO> searchWorkouts(WorkoutSearchRQ searchRQ) throws AppsException {
        List<Workout> workoutList = this.workoutDao.findAll();
        List<WorkoutDTO> workoutDTOList = new ArrayList<>();

        for (Workout workout : workoutList) {
            workoutDTOList.add(new WorkoutDTO(workout));
        }

        return workoutDTOList;
    }
}

package com.fitness.app.controller.workout;

import com.fitness.app.constants.AppsConstants;
import com.fitness.app.controller.BaseController;
import com.fitness.app.exception.AppsException;
import com.fitness.app.model.common.ResponseDTO;
import com.fitness.app.model.dto.workout.WorkoutDTO;
import com.fitness.app.model.dto.workout.WorkoutSearchRQ;
import com.fitness.app.model.security.CredentialsDTO;
import com.fitness.app.service.workout.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "${api.prefix}/workout")
public class WorkoutController extends BaseController {

    @Autowired
    private WorkoutService workoutService;

    @GetMapping(value = "/getWorkoutByID/{workoutID}", headers = "Accept=application/json")
    public ResponseEntity<ResponseDTO<WorkoutDTO>> getWorkoutByID(@PathVariable Integer workoutID) {
        ResponseDTO<WorkoutDTO> response = new ResponseDTO<>();

        try {
            WorkoutDTO workoutDTO = this.workoutService.getWorkoutByID(workoutID);
            response.setResult(workoutDTO);
            response.setStatus(AppsConstants.ResponseStatus.SUCCESS);
        } catch (AppsException e) {
            response.setStatus(AppsConstants.ResponseStatus.FAILED);
            response.setAppsErrorMessages(e.getAppsErrorMessages());
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/saveOrUpdateWorkout", headers = "Accept=application/json")
    public ResponseEntity<ResponseDTO<WorkoutDTO>> saveOrUpdateWorkout(@RequestBody WorkoutDTO WorkoutDTO) {
        ResponseDTO<WorkoutDTO> response = new ResponseDTO<>();

        CredentialsDTO credentialsDTO = getCredentialsDTO();

        try {
            WorkoutDTO workout = this.workoutService.saveOrUpdateWorkout(WorkoutDTO, credentialsDTO);
            response.setResult(workout);
            response.setStatus(AppsConstants.ResponseStatus.SUCCESS);
        } catch (AppsException e) {
            response.setStatus(AppsConstants.ResponseStatus.FAILED);
            response.setAppsErrorMessages(e.getAppsErrorMessages());
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/searchWorkouts", headers = "Accept=application/json")
    public ResponseEntity<ResponseDTO<List<WorkoutDTO>>> searchWorkouts(@RequestBody WorkoutSearchRQ searchRQ) {
        ResponseDTO<List<WorkoutDTO>> response = new ResponseDTO<>();

        try {
            List<WorkoutDTO> workoutDTOS = this.workoutService.searchWorkouts(searchRQ);
            response.setResult(workoutDTOS);
            response.setStatus(AppsConstants.ResponseStatus.SUCCESS);
        } catch (AppsException e) {
            response.setStatus(AppsConstants.ResponseStatus.FAILED);
            response.setAppsErrorMessages(e.getAppsErrorMessages());
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

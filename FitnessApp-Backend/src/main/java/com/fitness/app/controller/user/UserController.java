package com.fitness.app.controller.user;

import com.fitness.app.constants.AppsConstants;
import com.fitness.app.controller.BaseController;
import com.fitness.app.exception.AppsException;
import com.fitness.app.model.common.ResponseDTO;
import com.fitness.app.model.dto.user.ChangePasswordDTO;
import com.fitness.app.model.dto.user.UserDTO;
import com.fitness.app.model.dto.user.UserSearchRQ;
import com.fitness.app.model.dto.user.UserSearchRS;
import com.fitness.app.model.security.CredentialsDTO;
import com.fitness.app.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "${api.prefix}/user")
public class UserController extends BaseController {

    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping(value = "/getUserByID/{userID}", headers = "Accept=application/json")
    public ResponseEntity<ResponseDTO<UserDTO>> getUserByID(@PathVariable Integer userID) {
        ResponseDTO<UserDTO> response = new ResponseDTO<>();

        CredentialsDTO credentialsDTO = getCredentialsDTO();

        LOG.info("START : Get User : {} by user user {}", userID, credentialsDTO.getUserID());

        try {
            UserDTO userDTO = this.userService.getUserByID(userID);
            response.setResult(userDTO);
            response.setStatus(AppsConstants.ResponseStatus.SUCCESS);
        } catch (AppsException e) {
            response.setStatus(AppsConstants.ResponseStatus.FAILED);
            response.setAppsErrorMessages(e.getAppsErrorMessages());
        }

        LOG.info("END : get User : {} by user user {}", userID, credentialsDTO.getUserID());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/registerUser", headers = "Accept=application/json")
    public ResponseEntity<ResponseDTO<UserDTO>> registerUser(@RequestBody UserDTO registerUserDTO) {
        ResponseDTO<UserDTO> response = new ResponseDTO<>();

        LOG.info("START : Register user : {} ", registerUserDTO);

        try {
            UserDTO userDTO = this.userService.registerUser(registerUserDTO);
            response.setResult(userDTO);
            response.setStatus(AppsConstants.ResponseStatus.SUCCESS);
        } catch (AppsException e) {
            response.setStatus(AppsConstants.ResponseStatus.FAILED);
            response.setAppsErrorMessages(e.getAppsErrorMessages());
        }

        LOG.info("END : Register user : {} ", registerUserDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/changeUserPassword", headers = "Accept=application/json")
    public ResponseEntity<ResponseDTO<UserDTO>> changeUserPassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        ResponseDTO<UserDTO> response = new ResponseDTO<>();

        LOG.info("START : Change password by user : {} ", changePasswordDTO);

        CredentialsDTO credentialsDTO = getCredentialsDTO();

        try {
            UserDTO userDTO = this.userService.changeUserPassword(changePasswordDTO, credentialsDTO);
            response.setResult(userDTO);
            response.setStatus(AppsConstants.ResponseStatus.SUCCESS);
        } catch (AppsException e) {
            response.setStatus(AppsConstants.ResponseStatus.FAILED);
            response.setAppsErrorMessages(e.getAppsErrorMessages());
        }

        LOG.info("END : Change password by user : {} ", changePasswordDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/saveOrUpdateUser", headers = "Accept=application/json")
    public ResponseEntity<ResponseDTO<UserDTO>> saveOrUpdateUser(@RequestBody UserDTO userDTO) {
        ResponseDTO<UserDTO> response = new ResponseDTO<>();

        LOG.info("START : Update user : {} ", userDTO);
        CredentialsDTO credentialsDTO = getCredentialsDTO();

        try {
            UserDTO user = this.userService.saveOrUpdateUser(userDTO, credentialsDTO);
            response.setResult(user);
            response.setStatus(AppsConstants.ResponseStatus.SUCCESS);
        } catch (AppsException e) {
            response.setStatus(AppsConstants.ResponseStatus.FAILED);
            response.setAppsErrorMessages(e.getAppsErrorMessages());
        }

        LOG.info("END : Update user : {} ", userDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/searchUsers", headers = "Accept=application/json")
    public ResponseEntity<ResponseDTO<List<UserSearchRS>>> searchUsers(@RequestBody UserSearchRQ searchRQ) {
        ResponseDTO<List<UserSearchRS>> response = new ResponseDTO<>();
        CredentialsDTO credentialsDTO = getCredentialsDTO();

        LOG.info("START : Search users by : {}", credentialsDTO.getUserName());

        try {
            List<UserSearchRS> userSearchRSList = this.userService.searchUsers(searchRQ);
            response.setResult(userSearchRSList);
            response.setStatus(AppsConstants.ResponseStatus.SUCCESS);
        } catch (AppsException e) {
            response.setStatus(AppsConstants.ResponseStatus.FAILED);
            response.setAppsErrorMessages(e.getAppsErrorMessages());
        }

        LOG.info("END : Search users by : {}", credentialsDTO.getUserName());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/resetUserPassword/{userID}", headers = "Accept=application/json")
    public ResponseEntity<ResponseDTO<String>> resetUserPassword(@PathVariable Integer userID) {
        ResponseDTO<String> response = new ResponseDTO<>();
        CredentialsDTO credentialsDTO = getCredentialsDTO();

        LOG.info("START : Reset User password : {} by user user {}", userID, credentialsDTO.getUserID());

        try {
            String newPassword = this.userService.resetUserPassword(userID);
            response.setResult(newPassword);
            response.setStatus(AppsConstants.ResponseStatus.SUCCESS);
        } catch (AppsException e) {
            response.setStatus(AppsConstants.ResponseStatus.FAILED);
            response.setAppsErrorMessages(e.getAppsErrorMessages());
        }

        LOG.info("END : Reset User password : {} by user user {}", userID, credentialsDTO.getUserID());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

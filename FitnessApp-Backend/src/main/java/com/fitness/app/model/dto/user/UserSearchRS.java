package com.fitness.app.model.dto.user;

import com.fitness.app.constants.AppsConstants;

import java.io.Serializable;

public class UserSearchRS implements Serializable {

    private static final long serialVersionUID = 8717760371659003721L;

    private Integer userID;

    private String userName;

    private String firstName;

    private String lastName;

    private String password;

    private String email;

    private String dateOfBirthStr;

    private AppsConstants.Status status;

    private AppsConstants.UserType userType;

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDateOfBirthStr() {
        return dateOfBirthStr;
    }

    public void setDateOfBirthStr(String dateOfBirthStr) {
        this.dateOfBirthStr = dateOfBirthStr;
    }

    public AppsConstants.Status getStatus() {
        return status;
    }

    public void setStatus(AppsConstants.Status status) {
        this.status = status;
    }

    public AppsConstants.UserType getUserType() {
        return userType;
    }

    public void setUserType(AppsConstants.UserType userType) {
        this.userType = userType;
    }
}

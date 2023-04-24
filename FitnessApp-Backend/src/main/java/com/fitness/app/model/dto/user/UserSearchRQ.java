package com.fitness.app.model.dto.user;

import com.fitness.app.constants.AppsConstants;

import java.io.Serializable;

public class UserSearchRQ implements Serializable {

    private static final long serialVersionUID = -8024326541420577100L;

    private String userName;

    private String firstName;

    private String lastName;

    private String email;

    private AppsConstants.UserType userType;

    private AppsConstants.Status status;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AppsConstants.UserType getUserType() {
        return userType;
    }

    public void setUserType(AppsConstants.UserType userType) {
        this.userType = userType;
    }

    public AppsConstants.Status getStatus() {
        return status;
    }

    public void setStatus(AppsConstants.Status status) {
        this.status = status;
    }
}

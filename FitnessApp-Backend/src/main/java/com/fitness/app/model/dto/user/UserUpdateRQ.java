package com.fitness.app.model.dto.user;

public class UserUpdateRQ {

    private Integer userID;

    private String userName;

    private String firstName;

    private String lastName;

    private String email;

    private String dateOfBirthStr;

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
}

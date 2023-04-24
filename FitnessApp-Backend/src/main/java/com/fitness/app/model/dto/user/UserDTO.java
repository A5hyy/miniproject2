package com.fitness.app.model.dto.user;

import com.fitness.app.constants.AppsConstants;
import com.fitness.app.model.domain.user.User;
import com.fitness.app.util.CalendarUtil;

import java.io.Serializable;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

public class UserDTO implements Serializable {

    private static final long serialVersionUID = 7596882416211699561L;

    private Integer userID;

    private String userName;

    private String firstName;

    private String lastName;

    private String password;

    private String email;

    private String dateOfBirthStr;

    private AppsConstants.Status status;

    private AppsConstants.UserType userType;

    private List<Integer> roles;

    private List<Integer> addedRoles;

    private List<Integer> removedRoles;

    private SortedSet<String> privileges;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this.userID = user.getUserID();
        this.userName = user.getUserName();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.dateOfBirthStr = CalendarUtil.getDefaultFormattedDateOnly(user.getDateOfBirth());
        this.userType = user.getUserType();
        this.status = user.getStatus();
    }

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

    public SortedSet<String> getPrivileges() {
        if (privileges == null) {
            privileges = new TreeSet<>();
        }
        return privileges;
    }

    public void setPrivileges(SortedSet<String> privileges) {
        this.privileges = privileges;
    }

    public void addPrivilege(String privilegeCode) {
        if (privileges == null) {
            privileges = new TreeSet<>();
        }
        privileges.add(privilegeCode);
    }
}

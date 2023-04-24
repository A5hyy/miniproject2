package com.fitness.app.model.dto.user;

import java.io.Serializable;

public class ChangePasswordDTO implements Serializable {

    private static final long serialVersionUID = -3516267407291965967L;

    private Integer userID;

    private String oldPassword;

    private String newPassword;

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}

package com.fitness.app.model.security;

import com.fitness.app.model.dto.user.UserDTO;

import java.io.Serializable;

public class UserLoginRS implements Serializable {

    private static final long serialVersionUID = 8579297341796243363L;

    private String accessToken;

    private String refreshToken;

    private UserDTO user;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}

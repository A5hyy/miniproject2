package com.fitness.app.model.security;

import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.Collection;

public class CredentialsDTO implements Serializable {

    private static final long serialVersionUID = -2776586142220579152L;

    private Integer userID;

    private String userName;

    private String requestIpAddress;

    private Collection<? extends GrantedAuthority> authorities;

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

    public String getRequestIpAddress() {
        return requestIpAddress;
    }

    public void setRequestIpAddress(String requestIpAddress) {
        this.requestIpAddress = requestIpAddress;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public boolean checkPrivilegePresent(String privilegeCode) {
        if (this.getAuthorities() == null) {
            return false;
        }
        return this.getAuthorities().stream()
                .anyMatch(privilege -> privilege.getAuthority().contains(privilegeCode));
    }

    @Override
    public String toString() {
        return "CredentialsDTO{" +
                "userID=" + userID +
                ", userName='" + userName + '\'' +
                ", requestIpAddress='" + requestIpAddress + '\'' +
                ", authorities=" + authorities +
                '}';
    }
}

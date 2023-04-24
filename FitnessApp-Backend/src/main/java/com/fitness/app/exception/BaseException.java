package com.fitness.app.exception;

import com.fitness.app.constants.AppsConstants;

import java.util.List;

public interface BaseException {

    List<AppsErrorMessage> getAppsErrorMessages();

    int getHttpStatus();

    AppsConstants.ResponseStatus getResponseStatus();

    Boolean containsErrorCode(String errorCode);
}

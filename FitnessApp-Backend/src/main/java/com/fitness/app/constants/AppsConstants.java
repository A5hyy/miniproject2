package com.fitness.app.constants;

import org.apache.commons.lang3.StringUtils;

public class AppsConstants {

    public enum Status {
        ACT("Active"),
        INA("Inactive");

        private final String description;

        Status(String description) {
            this.description = description;
        }

        public static Status resolveStatus(String str) {
            Status matchingStr = null;
            if (!StringUtils.isEmpty(str)) {
                matchingStr = Status.valueOf(str.trim());
            }
            return matchingStr;
        }

        public String getDescription() {
            return description;
        }
    }

    public enum ResponseStatus {
        SUCCESS, FAILED;

        public static ResponseStatus resolveStatus(String statusStr) {
            ResponseStatus matchingStatus = null;
            if (!StringUtils.isEmpty(statusStr)) {
                matchingStatus = ResponseStatus.valueOf(statusStr.trim());
            }
            return matchingStatus;
        }
    }

    public enum AuthorizationError {
        USER_UNAUTHORIZED("User is unauthorized for action");

        private String description;

        AuthorizationError(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }

    public enum YesNo {
        Y("Yes"),
        N("No");

        private final String description;

        YesNo(String description) {
            this.description = description;
        }

        public static YesNo resolveYesNo(String str) {
            YesNo matchingStr = null;
            if (!StringUtils.isEmpty(str)) {
                matchingStr = YesNo.valueOf(str.trim());
            }
            return matchingStr;
        }

        public String getDescription() {
            return description;
        }
    }

    public enum Gender {
        M("Male"),
        F("Female");

        private final String description;

        Gender(String description) {
            this.description = description;
        }

        public String getDescription() {
            return description;
        }
    }

    public enum UserType {
        ADMIN("Admin"),
        USER("User");

        private final String description;

        UserType(String description) {
            this.description = description;
        }

        public static UserType resolveUserType(String str) {
            UserType matchingStr = null;
            if (!StringUtils.isEmpty(str)) {
                matchingStr = UserType.valueOf(str.trim());
            }
            return matchingStr;
        }

        public String getDescription() {
            return description;
        }
    }
}

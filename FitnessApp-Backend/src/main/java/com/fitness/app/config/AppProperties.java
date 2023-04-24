package com.fitness.app.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppProperties {

    @Value("${private.key.der.absolute.path}")
    private String privateKeyDerAbsolutePath;

    @Value("${public.key.der.absolute.path}")
    private String publicKeyDerAbsolutePath;

    @Value("${public.key.pem.absolute.path}")
    private String publicKeyPemAbsolutePath;

    @Value("${api.prefix}")
    private String apiPrefix;

    @Value("${spring.mvc.static-path-pattern}")
    private String staticResourcesPath;

    @Value("${security.enabled}")
    private Boolean isSecurityEnabled;

    public String getPrivateKeyDerAbsolutePath() {
        return privateKeyDerAbsolutePath;
    }

    public void setPrivateKeyDerAbsolutePath(String privateKeyDerAbsolutePath) {
        this.privateKeyDerAbsolutePath = privateKeyDerAbsolutePath;
    }

    public String getPublicKeyDerAbsolutePath() {
        return publicKeyDerAbsolutePath;
    }

    public void setPublicKeyDerAbsolutePath(String publicKeyDerAbsolutePath) {
        this.publicKeyDerAbsolutePath = publicKeyDerAbsolutePath;
    }

    public String getPublicKeyPemAbsolutePath() {
        return publicKeyPemAbsolutePath;
    }

    public void setPublicKeyPemAbsolutePath(String publicKeyPemAbsolutePath) {
        this.publicKeyPemAbsolutePath = publicKeyPemAbsolutePath;
    }

    public String getApiPrefix() {
        return apiPrefix;
    }

    public void setApiPrefix(String apiPrefix) {
        this.apiPrefix = apiPrefix;
    }

    public String getStaticResourcesPath() {
        return staticResourcesPath;
    }

    public void setStaticResourcesPath(String staticResourcesPath) {
        this.staticResourcesPath = staticResourcesPath;
    }

    public Boolean getSecurityEnabled() {
        if (isSecurityEnabled == null) {
            isSecurityEnabled = true;
        }
        return isSecurityEnabled;
    }

    public void setSecurityEnabled(Boolean securityEnabled) {
        isSecurityEnabled = securityEnabled;
    }
}

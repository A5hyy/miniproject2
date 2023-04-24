package com.fitness.app.security;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.app.exception.AppsException;
import com.fitness.app.model.dto.user.UserDTO;
import com.fitness.app.model.security.CredentialsDTO;
import com.fitness.app.model.security.LoginCredentials;
import com.fitness.app.service.security.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.crypto.Cipher;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.PrivateKey;
import java.util.Base64;
import java.util.Collections;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

    private static final Logger LOG = LoggerFactory.getLogger(JWTLoginFilter.class);

    private SecurityService securityService;

    private PrivateKey privateKey;

    public JWTLoginFilter(String url, AuthenticationManager authenticationManager, SecurityService securityService, PrivateKey privateKey) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authenticationManager);
        this.securityService = securityService;
        this.privateKey = privateKey;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws
            AuthenticationException, IOException, ServletException {
        Authentication auth = null;
        LoginCredentials credentials = null;
        try {

            credentials = new ObjectMapper().readValue(req.getInputStream(),
                    LoginCredentials.class);
            String decodedPassword = rsaDecodePassword(credentials.getPassword(), privateKey);
//            String decodedPassword = "W6ph5Mm5Pz8GgiULbPgzG37mj9g";
            String userIdentifiableToken = credentials.getUsername();
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userIdentifiableToken,
                    decodedPassword,
                    Collections.emptyList());
            auth = getAuthenticationManager().authenticate(token);
        } catch (Exception e) {
            String message = null;
            AuthenticationException ae = new AuthenticationException(message, e) {
                @Override
                public synchronized Throwable initCause(Throwable cause) {
                    return super.initCause(e);
                }
            };

            LOG.info("Login Request :: {}", credentials);

            if (e instanceof JsonMappingException) {
                logger.warn("Invalid login request JSON format", e);
                unsuccessfulAuthentication(req, res, ae);
            } else if (e instanceof BadCredentialsException) {
                logger.warn("Invalid login credentials", e);
                unsuccessfulAuthentication(req, res, ae);
            } else {
                message = "Unknown login error";
                logger.warn(message);
                unsuccessfulAuthentication(req, res, ae);
            }
        }
        return auth;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
                                            Authentication authentication) throws IOException, ServletException {

        UserDTO user = null;
        CredentialsDTO credentialsDTO = new CredentialsDTO();

        try {
            user = securityService.getUserByUsername(authentication.getName());

            credentialsDTO.setUserName(user.getUserName());
            credentialsDTO.setUserID(user.getUserID());
        } catch (AppsException e) {
            LOG.warn("Error in post authentication user extraction for request : {} : ", req);
        }

        TokenAuthenticationService.addAuthentication(res, user);
    }

    private String rsaDecodePassword(String password, PrivateKey privateKey) throws GeneralSecurityException {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        return new String(cipher.doFinal(Base64.getDecoder().decode(password)));
    }
}

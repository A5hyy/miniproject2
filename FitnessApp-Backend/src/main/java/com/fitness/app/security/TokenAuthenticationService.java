package com.fitness.app.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.app.model.dto.user.UserDTO;
import com.fitness.app.model.security.LoginCredentials;
import com.fitness.app.model.security.UserLoginRS;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
public class TokenAuthenticationService {

    private static final Logger LOG = LoggerFactory.getLogger(TokenAuthenticationService.class);

    private static final String SECRET = "pBL$<(2Y^7P^534";
    private static final String TOKEN_PREFIX = "Bearer";
    private static final String HEADER_STRING = "Authorization";

    private static final String HEADER_STRING_REFRESH = "Refresh";
    private static long ACCESS_TOKEN_EXPIRATION_TIME;
    private static long REFRESH_TOKEN_EXPIRATION_TIME;
    private static String JWT_TOKEN_ISSUER;
    private static ObjectMapper objectMapper = new ObjectMapper();

    public TokenAuthenticationService(@Value("${token.expiration.duration.in.minutes}") String tokenExpirationDuration,
                                      @Value("${refresh.token.expiration.duration.in.minutes}") String refreshTokenExpirationDuration,
                                      @Value("${jwt.token.issuer}") String tokenIssuer) {
        try {
            ACCESS_TOKEN_EXPIRATION_TIME = TimeUnit.MINUTES.toMillis(Long.parseLong(tokenExpirationDuration));
            REFRESH_TOKEN_EXPIRATION_TIME = TimeUnit.MINUTES.toMillis(Long.parseLong(refreshTokenExpirationDuration));
            JWT_TOKEN_ISSUER = tokenIssuer;
        } catch (NumberFormatException e) {
            ACCESS_TOKEN_EXPIRATION_TIME = TimeUnit.MINUTES.toMillis(15);
            REFRESH_TOKEN_EXPIRATION_TIME = TimeUnit.MINUTES.toMillis(120);
            JWT_TOKEN_ISSUER = "http://fitness-app.com";
        }
    }

    public static void addAuthentication(HttpServletResponse res, UserDTO userDTO) throws IOException {

        String accessToken = generateAccessToken(userDTO);
        String refreshToken = generateRefreshToken(userDTO);

        res.setContentType(MediaType.APPLICATION_JSON.toString());
        userDTO.setPassword(null);

        UserLoginRS loginRS = new UserLoginRS();

        loginRS.setAccessToken(accessToken);
        loginRS.setRefreshToken(refreshToken);
        loginRS.setUser(userDTO);

        res.getWriter().write(objectMapper.writeValueAsString(loginRS));
    }

    public static String generateAccessToken(UserDTO userDTO) {
        return generateJwtToken(userDTO, ACCESS_TOKEN_EXPIRATION_TIME);
    }

    public static String generateRefreshToken(UserDTO userDTO) {
        return generateJwtToken(userDTO, REFRESH_TOKEN_EXPIRATION_TIME);
    }

    private static String generateJwtToken(UserDTO userDTO, long expirationTimeMs) {
        Map<String, Object> claims = new HashMap();
        claims.put(Claims.SUBJECT, userDTO.getUserName());

        return Jwts.builder()
                .setClaims(claims)
                .setId(UUID.randomUUID().toString())
                .setIssuer(JWT_TOKEN_ISSUER)
                .setExpiration(new Date(System.currentTimeMillis() + expirationTimeMs))
                .signWith(SignatureAlgorithm.HS512, SECRET).compact();
    }

    public static LoginCredentials authenticateAndGetUsername(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);

        if (token == null) {
            return null;
        }

        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody();

        LoginCredentials loginCredentials = new LoginCredentials();
        loginCredentials.setUsername(claims.getSubject());

        return loginCredentials;
    }
}

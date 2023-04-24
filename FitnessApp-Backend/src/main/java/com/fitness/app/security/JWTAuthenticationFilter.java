package com.fitness.app.security;

import com.fitness.app.exception.AppsErrorMessage;
import com.fitness.app.exception.AppsException;
import com.fitness.app.exception.AppsRuntimeException;
import com.fitness.app.model.dto.user.UserDTO;
import com.fitness.app.model.security.FitnessAppUserDetails;
import com.fitness.app.model.security.LoginCredentials;
import com.fitness.app.service.security.SecurityService;
import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.SortedSet;
import java.util.stream.Collectors;

public class JWTAuthenticationFilter extends GenericFilterBean {

    private static final Logger LOG = LoggerFactory.getLogger(JWTAuthenticationFilter.class);

    private String[] ignoredAntPatterns;

    private SecurityService securityService;

    public JWTAuthenticationFilter(SecurityService securityService, String[] ignoredAntPatterns) {
        this.ignoredAntPatterns = ignoredAntPatterns;
        this.securityService = securityService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException,
            ServletException {
        Authentication authentication = null;

        try {
            if (request instanceof HttpServletRequest) {
                LoginCredentials username = TokenAuthenticationService.authenticateAndGetUsername(
                        (HttpServletRequest) request);
                if (username != null) {
                    authentication = this.getAuthenticationFromUsername(username);
                }
            }
        } catch (ExpiredJwtException e) {
            LOG.info(e.getMessage());
        } catch (Exception e) {
            LOG.warn(e.getMessage());
        } finally {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        }
    }

    private boolean isAuthenticatedRoute(ServletRequest request) {
        HttpServletRequest httpReq = (HttpServletRequest) request;
        for (String ignoredPattern : this.ignoredAntPatterns) {
            if ((new AntPathRequestMatcher(ignoredPattern)).matches(httpReq)) {
                return false;
            }
        }
        return true;
    }

    private Authentication getAuthenticationFromUsername(LoginCredentials account) {
        UserDTO user;

        try {
            user = securityService.getUserByUsername(account.getUsername());
        } catch (AppsException e) {
            if (e.getAppsErrorMessages().contains(new AppsErrorMessage("Empty results"))) {
                LOG.warn("User with name {} does not exist", account);
            } else {
                LOG.warn("Getting user for {} failed", account);
                throw new AppsRuntimeException();
            }
            return null;
        }

        SortedSet<String> privileges = user.getPrivileges();
        List<GrantedAuthority> authorityList = privileges.stream().map((privilege) -> new SimpleGrantedAuthority
                (privilege)).collect(Collectors.toList());
        FitnessAppUserDetails userDetails = new FitnessAppUserDetails(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorityList);
        return authentication;
    }
}

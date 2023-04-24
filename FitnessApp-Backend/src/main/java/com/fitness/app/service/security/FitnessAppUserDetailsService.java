package com.fitness.app.service.security;

import com.fitness.app.exception.AppsException;
import com.fitness.app.exception.AppsRuntimeException;
import com.fitness.app.model.dto.user.UserDTO;
import com.fitness.app.model.security.FitnessAppUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class FitnessAppUserDetailsService implements UserDetailsService {

    private static final Logger LOG = LoggerFactory.getLogger(FitnessAppUserDetailsService.class);

    @Autowired
    private SecurityService securityService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDTO user;

        try {
            user = securityService.getUserByUsername(username);
        } catch (AppsException e) {
            if (e.getAppsErrorMessages().contains("")) {
                LOG.warn("User with name {} does not exist", username);
                throw new UsernameNotFoundException("Invalid userIdentifiableToken");
            } else {
                LOG.warn("Getting user for {} failed with error {}", username, e.getAppsErrorMessages());
                throw new AppsRuntimeException();
            }
        } catch (Exception e) {
            LOG.warn("Getting user for {} failed with unknown error ", e);
            throw new AppsRuntimeException();
        }

        return new FitnessAppUserDetails(user);
    }
}

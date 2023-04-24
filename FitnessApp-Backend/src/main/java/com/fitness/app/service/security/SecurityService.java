package com.fitness.app.service.security;

import com.fitness.app.dao.user.jdbc.UserJDBCDao;
import com.fitness.app.exception.AppsException;
import com.fitness.app.model.dto.user.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SecurityService {

    private static final Logger LOG = LoggerFactory.getLogger(SecurityService.class);

    @Autowired
    private UserJDBCDao userJDBCDao;

    @Transactional(propagation = Propagation.SUPPORTS)
    public UserDTO getUserByUsername(String userName) throws AppsException {
        return this.userJDBCDao.getUser(userName);
    }
}

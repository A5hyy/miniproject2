package com.fitness.app.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

public class BaseJDBCDao {

    @Autowired
    protected NamedParameterJdbcTemplate namedParameterJdbcTemplate;
}

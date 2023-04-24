package com.fitness.app.dao.user.jdbc;

import com.fitness.app.constants.AppsConstants;
import com.fitness.app.dao.BaseJDBCDao;
import com.fitness.app.exception.AppsException;
import com.fitness.app.model.dto.user.UserDTO;
import com.fitness.app.model.dto.user.UserSearchRQ;
import com.fitness.app.model.dto.user.UserSearchRS;
import com.fitness.app.util.CalendarUtil;
import com.fitness.app.util.QueryBuilder;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Repository
public class UserJDBCDao extends BaseJDBCDao {

    private static final Logger LOG = LoggerFactory.getLogger(UserJDBCDao.class);

    private QueryBuilder getUserQuery(String userName) {

        QueryBuilder userSQL = new QueryBuilder();

        userSQL.append("SELECT \n");
        userSQL.append("  USR.USER_NAME, \n");
        userSQL.append("  USR.PASSWORD, \n");
        userSQL.append("  USR.USER_TYPE, \n");
        userSQL.append("  PR.PRIVILEGE_CODE, \n");
        userSQL.append("  USR.USER_ID AS USER_ID \n");
        userSQL.append("FROM t_user USR \n");
        userSQL.append("  LEFT JOIN t_user_role UR ON USR.USER_ID = UR.USER_ID \n");
        userSQL.append("  LEFT JOIN t_role_privilege RP ON RP.ROLE_ID = UR.ROLE_ID \n");
        userSQL.append("  LEFT JOIN t_privilege PR ON PR.PRIVILEGE_ID = RP.PRIVILEGE_ID \n");
        userSQL.append("WHERE \n");
        userSQL.appendNotNullMandatory("USR.STATUS = :status ", AppsConstants.Status.ACT.toString());
        userSQL.appendNotNullMandatory("AND USR.USER_NAME = BINARY :username ", userName);

        return userSQL;
    }

    public UserDTO getUser(String userName) throws AppsException {
        LOG.info("START: User retrieval for user {} ", userName);

        final UserDTO user = new UserDTO();
        QueryBuilder userSQL = this.getUserQuery(userName);

        try {
            namedParameterJdbcTemplate.query(userSQL.toString(), userSQL.getParameterMap(), rs -> {
                if (user.getUserID() == null) {
                    user.setUserID(rs.getInt("USER_ID"));
                    user.setUserName(rs.getString("USER_NAME"));
                    user.setPassword(rs.getString("PASSWORD"));
                    user.setUserType(AppsConstants.UserType.resolveUserType(rs.getString("USER_TYPE")));
                }

                Optional<String> privilege = Optional.ofNullable(rs.getString("PRIVILEGE_CODE"));
                if (privilege.isPresent()) {
                    user.addPrivilege(privilege.get());
                }
            });

        } catch (EmptyResultDataAccessException e) {
            LOG.warn("User with user details `{}` does not exist", userName);
            throw new AppsException("Empty results");
        }

        LOG.info("END: User retrieval for {} completed as {}", userName, user);

        return user;
    }

    public List<UserSearchRS> searchUsers(UserSearchRQ searchRQ) {
        final List<UserSearchRS> results = new ArrayList<>();
        Map<String, Object> params = new HashMap<>();

        StringBuilder SQL = new StringBuilder();

        SQL.append("SELECT u.USER_ID, \n");
        SQL.append("       u.USER_NAME, \n");
        SQL.append("       u.FIRST_NAME, \n");
        SQL.append("       u.LAST_NAME, \n");
        SQL.append("       u.EMAIL, \n");
        SQL.append("       u.DOB, \n");
        SQL.append("       u.USER_TYPE, \n");
        SQL.append("       u.STATUS \n");
        SQL.append("FROM t_user u \n");
        SQL.append("WHERE u.USER_ID IS NOT NULL \n");

        if (StringUtils.isNotEmpty(searchRQ.getUserName())) {
            SQL.append("  AND UPPER(u.USER_NAME) LIKE '%" + searchRQ.getUserName().toUpperCase() + "%' \n");
        }
        if (StringUtils.isNotEmpty(searchRQ.getFirstName())) {
            SQL.append("  AND UPPER(u.FIRST_NAME) LIKE '%" + searchRQ.getFirstName().toUpperCase() + "%' \n");
        }
        if (StringUtils.isNotEmpty(searchRQ.getLastName())) {
            SQL.append("  AND UPPER(u.LAST_NAME) LIKE '%" + searchRQ.getLastName().toUpperCase() + "%' \n");
        }
        if (StringUtils.isNotEmpty(searchRQ.getEmail())) {
            SQL.append("  AND UPPER(u.EMAIL) LIKE '%" + searchRQ.getEmail().toUpperCase() + "%' \n");
        }
        if (searchRQ.getStatus() != null) {
            SQL.append("  AND u.STATUS = :status \n");
            params.put("status", searchRQ.getStatus().toString());
        }
        if (searchRQ.getUserType() != null) {
            SQL.append("  AND u.USER_TYPE = :userType \n");
            params.put("userType", searchRQ.getUserType().toString());
        }

        SQL.append("ORDER BY u.USER_NAME ");

        return namedParameterJdbcTemplate.query(SQL.toString(), params, new ResultSetExtractor<List<UserSearchRS>>() {
            @Override
            public List<UserSearchRS> extractData(ResultSet rs) throws SQLException, DataAccessException {
                while (rs.next()) {
                    UserSearchRS searchRS = new UserSearchRS();

                    searchRS.setUserID(rs.getInt("USER_ID"));
                    searchRS.setUserName(rs.getString("USER_NAME"));
                    searchRS.setFirstName(rs.getString("FIRST_NAME"));
                    searchRS.setLastName(rs.getString("LAST_NAME"));
                    searchRS.setEmail(rs.getString("EMAIL"));
                    searchRS.setDateOfBirthStr(CalendarUtil.getDefaultFormattedDateMaskNull(rs.getTimestamp("DOB")));
                    searchRS.setStatus(AppsConstants.Status.resolveStatus(rs.getString("STATUS")));
                    searchRS.setUserType(AppsConstants.UserType.resolveUserType(rs.getString("USER_TYPE")));

                    results.add(searchRS);
                }
                return results;
            }
        });
    }
}

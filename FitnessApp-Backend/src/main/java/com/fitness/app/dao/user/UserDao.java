package com.fitness.app.dao.user;

import com.fitness.app.model.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {

    User getByUserName(String userName);

    User getByEmail(String email);
}

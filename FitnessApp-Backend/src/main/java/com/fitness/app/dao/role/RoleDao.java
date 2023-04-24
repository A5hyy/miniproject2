package com.fitness.app.dao.role;

import com.fitness.app.model.domain.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends JpaRepository<Role, Integer> {

    Role getByRoleName(String roleName);
}

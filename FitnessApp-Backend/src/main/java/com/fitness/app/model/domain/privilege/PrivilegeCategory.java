package com.fitness.app.model.domain.privilege;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "t_privilege_category")
public class PrivilegeCategory implements Serializable {

    private static final long serialVersionUID = 2661840961039432042L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    @Column(name = "PRIVILEGE_CATEGORY_ID")
    private Integer privilegeID;

    @Column(name = "CATEGORY")
    private String category;

    public Integer getPrivilegeID() {
        return privilegeID;
    }

    public void setPrivilegeID(Integer privilegeID) {
        this.privilegeID = privilegeID;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}

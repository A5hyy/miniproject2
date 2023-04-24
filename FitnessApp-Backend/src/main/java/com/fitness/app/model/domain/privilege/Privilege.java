package com.fitness.app.model.domain.privilege;

import com.fitness.app.constants.AppsConstants;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "t_privilege")
public class Privilege {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    @Column(name = "PRIVILEGE_ID")
    private Integer privilegeID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRIVILEGE_CATEGORY_ID")
    private PrivilegeCategory privilegeCategory;

    @Column(name = "PRIVILEGE_NAME")
    private String privilegeName;

    @Column(name = "PRIVILEGE_CODE")
    private String code;

    @Column(name = "BEHAVIOUR_DESCRIPTION")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private AppsConstants.Status status;

    public Integer getPrivilegeID() {
        return privilegeID;
    }

    public void setPrivilegeID(Integer privilegeID) {
        this.privilegeID = privilegeID;
    }

    public PrivilegeCategory getPrivilegeCategory() {
        return privilegeCategory;
    }

    public void setPrivilegeCategory(PrivilegeCategory privilegeCategory) {
        this.privilegeCategory = privilegeCategory;
    }

    public String getPrivilegeName() {
        return privilegeName;
    }

    public void setPrivilegeName(String privilegeName) {
        this.privilegeName = privilegeName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AppsConstants.Status getStatus() {
        return status;
    }

    public void setStatus(AppsConstants.Status status) {
        this.status = status;
    }
}

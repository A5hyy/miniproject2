# FitnessApp-Backend
Faintness App backend using Spring Boot and MySQL

# Query Document
CREATE DATABASE IF NOT EXISTS fitness_app;

############################################################################

-- auto-generated definition
create table t_privilege_category
(
   PRIVILEGE_CATEGORY_ID int auto_increment
       primary key,
   CATEGORY              varchar(255) not null
);

############################################################################

-- auto-generated definition
create table t_privilege
(
   PRIVILEGE_ID          int auto_increment
       primary key,
   PRIVILEGE_CATEGORY_ID int          not null,
   PRIVILEGE_CODE        varchar(255) not null,
   PRIVILEGE_NAME        varchar(255) not null,
   BEHAVIOUR_DESCRIPTION varchar(512) not null,
   STATUS                char(3)      not null,
   constraint t_privilege_PRIVILEGE_CODE_uindex
       unique (PRIVILEGE_CODE),
   constraint t_privilege_fk_1
       foreign key (PRIVILEGE_CATEGORY_ID) references t_privilege_category (PRIVILEGE_CATEGORY_ID)
);

############################################################################

-- auto-generated definition
create table t_user
(
   USER_ID       int auto_increment
       primary key,
   USER_NAME     varchar(50)  not null,
   FIRST_NAME    varchar(100) not null,
   LAST_NAME     varchar(100) null,
   PASSWORD      varchar(255) null,
   EMAIL         varchar(255) null,
   DOB           datetime     null,
   STATUS        char(3)      not null,
   CREATED_DATE  datetime     null,
   CREATED_BY    int          null,
   MODIFIED_DATE datetime     null,
   MODIFIED_BY   int          null,
   VERSION       int          not null,
   constraint t_user_USER_NAME_uindex
       unique (USER_NAME)
);

############################################################################

-- auto-generated definition
create table t_role
(
   ROLE_ID       int auto_increment
       primary key,
   ROLE_NAME     varchar(255) not null,
   STATUS        char(3)      not null,
   CREATED_DATE  datetime     not null,
   CREATED_BY    int          not null,
   MODIFIED_DATE datetime     null,
   MODIFIED_BY   int          null,
   VERSION       int          not null,
   constraint t_role_ROLE_NAME_uindex
       unique (ROLE_NAME),
   constraint t_role_fk_1
       foreign key (CREATED_BY) references t_user (USER_ID),
   constraint t_role_fk_2
       foreign key (MODIFIED_BY) references t_user (USER_ID)
);

############################################################################
-- auto-generated definition
create table t_role_privilege
(
   ROLE_ID      int not null,
   PRIVILEGE_ID int not null,
   primary key (ROLE_ID, PRIVILEGE_ID),
   constraint t_role_privilege_fk_1
       foreign key (ROLE_ID) references t_role (ROLE_ID),
   constraint t_role_privilege_fk_2
       foreign key (PRIVILEGE_ID) references t_privilege (PRIVILEGE_ID)
);

############################################################################

-- auto-generated definition
create table t_user_role
(
   USER_ID int not null,
   ROLE_ID int not null,
   primary key (USER_ID, ROLE_ID),
   constraint t_user_role_fk_1
       foreign key (USER_ID) references t_user (USER_ID),
   constraint t_user_role_fk_2
       foreign key (ROLE_ID) references t_role (ROLE_ID)
);

############################################################################

INSERT INTO t_user (USER_NAME, FIRST_NAME, LAST_NAME, PASSWORD, EMAIL, DOB, STATUS, CREATED_DATE, CREATED_BY,
                   MODIFIED_DATE, MODIFIED_BY, VERSION)
VALUES ('system', 'System', 'Admin', '$2a$10$pyIAjUOABitzHn.CUyBiUel/yC5ezZAdIzrVtQPVQXFPeYqNiqhPi',
       'gayanviraj21@gmail.com', now(), 'ACT', now(), null, null, null, 1);

############################################################################

INSERT INTO t_privilege_category (CATEGORY)
VALUES ('Settings');

############################################################################



INSERT INTO t_privilege(PRIVILEGE_CATEGORY_ID,
                       PRIVILEGE_CODE,
                       PRIVILEGE_NAME,
                       BEHAVIOUR_DESCRIPTION,
                       STATUS)
VALUES ((SELECT t_privilege_category.PRIVILEGE_CATEGORY_ID FROM t_privilege_category WHERE CATEGORY = 'Settings'),
       'ADMIN.DEFAULT.PRIVILEGE',
       'Default Admin Privilege',
       'Default Admin Privilege',
       'ACT');

############################################################################

INSERT INTO t_role(ROLE_NAME, STATUS, CREATED_DATE, CREATED_BY, MODIFIED_DATE, MODIFIED_BY, VERSION)
VALUES ('Admin', 'ACT', now(), (SELECT USER_ID FROM t_user WHERE USER_NAME = 'system'), null, null, 0);

############################################################################

INSERT INTO t_role_privilege (ROLE_ID, PRIVILEGE_ID)
VALUES ((SELECT r.ROLE_ID FROM t_role r WHERE r.ROLE_NAME = 'Admin'),
       (SELECT p.PRIVILEGE_ID FROM t_privilege p WHERE p.PRIVILEGE_CODE = 'ADMIN.DEFAULT.PRIVILEGE'));

############################################################################

INSERT INTO t_user_role(USER_ID, ROLE_ID)
VALUES ((SELECT USER_ID FROM t_user WHERE USER_NAME = 'system'),
       (SELECT r.ROLE_ID FROM t_role r WHERE r.ROLE_NAME = 'Admin'));

############################################################################

alter table t_user
   add USER_TYPE VARCHAR(20) not null after DOB;

############################################################################

UPDATE t_user
SET t_user.USER_TYPE = 'ADMIN'
WHERE USER_NAME = 'system';

############################################################################

INSERT INTO t_privilege(PRIVILEGE_CATEGORY_ID,
                      PRIVILEGE_CODE,
                      PRIVILEGE_NAME,
                      BEHAVIOUR_DESCRIPTION,
                      STATUS)
VALUES ((SELECT t_privilege_category.PRIVILEGE_CATEGORY_ID FROM t_privilege_category WHERE CATEGORY = 'Settings'),
      'USER.DEFAULT.PRIVILEGE',
      'Default User Privilege',
      'Default User Privilege',
      'ACT');
############################################################################

INSERT INTO t_role(ROLE_NAME, STATUS, CREATED_DATE, CREATED_BY, MODIFIED_DATE, MODIFIED_BY, VERSION)
VALUES ('User', 'ACT', now(), (SELECT USER_ID FROM t_user WHERE USER_NAME = 'system'), null, null, 0);

############################################################################

INSERT INTO t_role_privilege (ROLE_ID, PRIVILEGE_ID)
VALUES ((SELECT r.ROLE_ID FROM t_role r WHERE r.ROLE_NAME = 'User'),
      (SELECT p.PRIVILEGE_ID FROM t_privilege p WHERE p.PRIVILEGE_CODE = 'USER.DEFAULT.PRIVILEGE'));

############################################################################

create table t_workout
(
   WORKOUT_ID    INT auto_increment
       primary key,
   DESCRIPTION   VARCHAR(1024) not null,
   STEPS         VARCHAR(1024) not null,
   COUNT         INT           not null,
   CREATED_DATE  DATETIME      not null,
   CREATED_BY    INT           not null,
   MODIFIED_DATE DATETIME      null,
   MODIFIED_BY   INT           null,
   VERSION       INT           not null
);

############################################################################

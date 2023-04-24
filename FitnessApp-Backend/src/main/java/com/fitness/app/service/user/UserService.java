package com.fitness.app.service.user;

import com.fitness.app.constants.AppsConstants;
import com.fitness.app.dao.role.RoleDao;
import com.fitness.app.dao.user.UserDao;
import com.fitness.app.dao.user.jdbc.UserJDBCDao;
import com.fitness.app.exception.AppsException;
import com.fitness.app.model.domain.role.Role;
import com.fitness.app.model.domain.user.User;
import com.fitness.app.model.dto.email.EmailSendRQ;
import com.fitness.app.model.dto.user.ChangePasswordDTO;
import com.fitness.app.model.dto.user.UserDTO;
import com.fitness.app.model.dto.user.UserSearchRQ;
import com.fitness.app.model.dto.user.UserSearchRS;
import com.fitness.app.model.security.CredentialsDTO;
import com.fitness.app.service.email.EmailService;
import com.fitness.app.util.CalendarUtil;
import com.fitness.app.util.PasswordUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private UserJDBCDao userJDBCDao;

    @Autowired
    private EmailService emailService;

    @Transactional(propagation = Propagation.SUPPORTS)
    public UserDTO getUserByID(Integer userID) throws AppsException {
        User user = this.userDao.getById(userID);
        return new UserDTO(user);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = AppsException.class)
    public UserDTO saveOrUpdateUser(UserDTO userDTO, CredentialsDTO credentialsDTO) throws AppsException {
        Date date = new Date();
        boolean isNew = (userDTO.getUserID() == null);
        User user;

        if (isNew) {
            if (this.userDao.getByEmail(userDTO.getEmail()) != null) {
                throw new AppsException("User email is already exists");
            }
            if (this.userDao.getByUserName(userDTO.getUserName()) != null) {
                throw new AppsException("User name is already exists");
            }

            user = new User();

            user.setPassword(this.generateEncodedPassword(userDTO.getPassword()));
            user.setCreatedBy(credentialsDTO.getUserID());
            user.setCreatedDate(date);
        } else {
            if (this.userDao.existsById(userDTO.getUserID())) {
                user = this.userDao.getById(userDTO.getUserID());

                if (!user.getEmail().equalsIgnoreCase(userDTO.getEmail())
                        && this.userDao.getByEmail(userDTO.getEmail()) != null) {
                    throw new AppsException("User email is already exists");
                }
                if (!user.getUserName().equalsIgnoreCase(userDTO.getUserName())
                        && this.userDao.getByUserName(userDTO.getUserName()) != null) {
                    throw new AppsException("User name is already exists");
                }

                user.setModifiedDate(new Date());
                user.setModifiedBy(credentialsDTO.getUserID());
            } else {
                throw new AppsException("User can't find in the system");
            }
        }

        String roleName = null;

        switch (userDTO.getUserType()) {
            case ADMIN:
                roleName = "Admin";
                break;
            case USER:
                roleName = "User";
                break;
        }

        if (!StringUtils.isEmpty(roleName)) {
            if (!isNew) {
                Set<Role> roleSet = user.getRoles();
                List<Role> roleList = new ArrayList<>(roleSet);

                user.removeRoles(roleList);
            }

            Role role = this.roleDao.getByRoleName(roleName);
            user.getRoles().add(role);
        } else {
            throw new AppsException("User role can't find in the system");
        }

        user.setUserName(userDTO.getUserName());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setDateOfBirth(CalendarUtil.getDefaultParsedDateOnly(userDTO.getDateOfBirthStr()));
        user.setStatus(userDTO.getStatus());
        user.setUserType(userDTO.getUserType());

        user = userDao.saveAndFlush(user);

        return new UserDTO(user);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = AppsException.class)
    public UserDTO updateUserPassword(UserDTO userDTO) throws AppsException {
        User user = this.userDao.getById(userDTO.getUserID());

        user.setPassword(this.generateEncodedPassword(userDTO.getPassword()));
        user.setModifiedDate(new Date());

        user = userDao.saveAndFlush(user);

        return new UserDTO(user);
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public String generateEncodedPassword(String plainPassword) throws AppsException {
        return PasswordUtil.generateEncodedPassword(new BCryptPasswordEncoder(), plainPassword);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = AppsException.class)
    public UserDTO registerUser(UserDTO registerUserDTO) throws AppsException {

        if (this.userDao.getByEmail(registerUserDTO.getEmail()) != null) {
            throw new AppsException("User email already exists in the system ");
        }

        if (this.userDao.getByUserName(registerUserDTO.getUserName()) != null) {
            throw new AppsException("User name already exists in the system ");
        }

        User user = new User();

        user.setUserName(registerUserDTO.getUserName());
        user.setFirstName(registerUserDTO.getFirstName());
        user.setLastName(registerUserDTO.getLastName());
        user.setPassword(this.generateEncodedPassword(registerUserDTO.getPassword()));
        user.setEmail(registerUserDTO.getEmail());
        user.setCreatedDate(new Date());
        user.setDateOfBirth(CalendarUtil.getDefaultParsedDateOnly(registerUserDTO.getDateOfBirthStr()));
        user.setStatus(AppsConstants.Status.ACT);
        user.setUserType(AppsConstants.UserType.USER);

        Role role = this.roleDao.getByRoleName("User");
        user.getRoles().add(role);

        user = userDao.saveAndFlush(user);

        return new UserDTO(user);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = AppsException.class)
    public UserDTO changeUserPassword(ChangePasswordDTO changePasswordDTO, CredentialsDTO credentialsDTO) throws AppsException {
        User user = this.userDao.getById(changePasswordDTO.getUserID());

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String oldPassword = changePasswordDTO.getOldPassword();
        String existingPassword = user.getPassword();

        if (passwordEncoder.matches(oldPassword, existingPassword)) {
            String encodedPassword = this.generateEncodedPassword(changePasswordDTO.getNewPassword());

            user.setPassword(encodedPassword);
            user.setModifiedBy(credentialsDTO.getUserID());
            user.setModifiedDate(new Date());

            user = this.userDao.saveAndFlush(user);

            return new UserDTO(user);
        } else {
            throw new AppsException("Password mismatch");
        }
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    public List<UserSearchRS> searchUsers(UserSearchRQ searchRQ) throws AppsException {
        return this.userJDBCDao.searchUsers(searchRQ);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = AppsException.class)
    public String resetUserPassword(Integer userID) throws AppsException {

        if (!this.userDao.existsById(userID)) {
            throw new AppsException("User can't find in the system");
        } else {
            User user = this.userDao.getReferenceById(userID);
            String plainPassword = PasswordUtil.generateRandomPlainPassword(5);
            user.setPassword(this.generateEncodedPassword(plainPassword));

            this.userDao.saveAndFlush(user);

            String emailBody = "Hey, \n\nYour email has been reset successfully for FitnessApp. \n\nYour new password is : "
                    .concat(plainPassword).concat("\n\nThank you!");

            EmailSendRQ emailSendRQ = new EmailSendRQ();
            emailSendRQ.setEmailSubject("Reset user password");
            emailSendRQ.setToEmailAddress(user.getEmail());
            emailSendRQ.setEmailBody(emailBody);

            //Send email to user
            this.emailService.sendMail(emailSendRQ);

            return plainPassword;
        }
    }
}

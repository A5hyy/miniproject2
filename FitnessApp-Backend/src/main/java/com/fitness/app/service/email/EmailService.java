package com.fitness.app.service.email;

import com.fitness.app.model.dto.email.EmailSendRQ;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger LOG = LoggerFactory.getLogger(EmailService.class);

    @Value("${spring.mail.username}")
    private String emailFrom;

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendMail(EmailSendRQ emailSendRQ) {
        LOG.warn("START : Send email");

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(emailFrom);
        message.setTo(emailSendRQ.getToEmailAddress());
        message.setSubject(emailSendRQ.getEmailSubject());
        message.setText(emailSendRQ.getEmailBody());

        //Send email
        // FIXME: 2023-04-22 add valid user name password in application.properties to send emails
        // this.mailSender.send(message);

        LOG.warn("END : Send email");
    }
}

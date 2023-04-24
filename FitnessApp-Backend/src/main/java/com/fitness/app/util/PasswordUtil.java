package com.fitness.app.util;

import com.fitness.app.exception.AppsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.MessageDigest;
import java.util.Base64;

public class PasswordUtil {

    public static String generateEncodedPassword(PasswordEncoder passwordEncoder, String plainPassword) throws AppsException {

        String encodedPassword = null;

        try {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-1");
            messageDigest.reset();
            messageDigest.update(plainPassword.getBytes());
            byte[] digest = messageDigest.digest();
            encodedPassword = passwordEncoder.encode(new String(Base64.getEncoder().encode(digest)));
        } catch (Exception e) {
            throw new AppsException("Unauthorized");
        }

        return encodedPassword;
    }

    public static String generateRandomPlainPassword(Integer length) {

        final String ALPHA_NUM = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        StringBuffer sb = new StringBuffer(length);
        for (int i = 0; i < length; i++) {
            int ndx = (int) (Math.random() * ALPHA_NUM.length());
            sb.append(ALPHA_NUM.charAt(ndx));
        }

        return sb.toString();
    }
}

package com.fitness.app.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

@Configuration
public class SecurityKeys {

    private static final Logger LOG = LoggerFactory.getLogger(SecurityKeys.class);

    @Autowired
    private AppProperties appProperties;

    @Bean
    public PrivateKey privateKey() throws Exception {
        String absolutePathToKey = appProperties.getPrivateKeyDerAbsolutePath();
        byte[] privateKeyByteArray = null;
        try {
            privateKeyByteArray = Files.readAllBytes(Paths.get(absolutePathToKey));
        } catch (NoSuchFileException e) {
            LOG.error("Defined private key file path :{} does not exist", absolutePathToKey);
            throw e;
        }
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(privateKeyByteArray);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePrivate(keySpec);
    }

    @Bean
    public String publicKeyString() throws IOException {
        StringBuffer keyString = new StringBuffer();
        String keyPath = this.appProperties.getPublicKeyPemAbsolutePath();
        String line;
        try (InputStream fis = new FileInputStream(keyPath); InputStreamReader isr = new InputStreamReader(fis,
                Charset.forName("UTF-8")); BufferedReader br = new BufferedReader(isr)) {
            while ((line = br.readLine()) != null) {
                keyString.append(line).append(System.lineSeparator());
            }
        } catch (NoSuchFileException e) {
            LOG.error("Defined private key file path :{} does not exist", keyPath);
        }
        return keyString.toString();
    }

    @Bean
    public PublicKey publicKey() throws Exception {
        String keyPath = this.appProperties.getPublicKeyDerAbsolutePath();

        byte[] keyBytes = Files.readAllBytes(Paths.get(keyPath));
        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        return kf.generatePublic(spec);
    }
}

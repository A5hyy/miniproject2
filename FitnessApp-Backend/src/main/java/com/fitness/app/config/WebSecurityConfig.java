package com.fitness.app.config;

import com.fitness.app.security.JWTAuthenticationFilter;
import com.fitness.app.security.JWTLoginFilter;
import com.fitness.app.service.security.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.security.PrivateKey;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final String PUBLIC_KEY_ENDPOINT = "public_key";

    @Autowired
    private AppProperties appProperties;

    @Autowired
    private PrivateKey privateKey;

    @Autowired
    private SecurityService securityService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        String publicKeyUrlPattern = "/" + appProperties.getApiPrefix() + "/" + PUBLIC_KEY_ENDPOINT + "/**";
        String[] ignoredAntPatterns = {appProperties.getStaticResourcesPath()};
        ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry securityConfig = http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/**").permitAll()
                .antMatchers(HttpMethod.GET, "/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                .antMatchers(HttpMethod.POST, "/api/security/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/security/**").permitAll()
                .antMatchers(HttpMethod.GET, "/dashboard").permitAll()
                .antMatchers(HttpMethod.GET, "/api/external/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/home/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/external/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/user/registerUser").permitAll()
                .antMatchers(appProperties.getStaticResourcesPath()).permitAll()
                .antMatchers(publicKeyUrlPattern).permitAll();

        if (appProperties.getSecurityEnabled()) {
            securityConfig.anyRequest().authenticated();
        } else {
            securityConfig.anyRequest().permitAll();
        }

        securityConfig
                .and()
                .addFilterBefore(new JWTAuthenticationFilter(securityService, ignoredAntPatterns),
                        UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JWTLoginFilter("/api/auth/login", authenticationManager(), securityService, privateKey),
                        UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth, UserDetailsService userDetailsService) throws
            Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }
}

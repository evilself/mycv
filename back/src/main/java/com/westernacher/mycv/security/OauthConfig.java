package com.westernacher.mycv.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;

@Profile("security")
@Configuration
@PropertySource("classpath:application-security.properties")
@ConfigurationProperties(prefix = "oauth")
@Getter
@Setter
public class OauthConfig {

    private Client client;

    @ConfigurationProperties(prefix = "client")
    @Getter
    @Setter
    public static class Client {
        private String resourceId;
        private String id;
        private String secret;
        private String[] scope;
        private String[] authorizeGrantTypes;
        private String[] authorities;
        private int accessTokenValidity;
        private int refreshTokenValidity;
   }
}

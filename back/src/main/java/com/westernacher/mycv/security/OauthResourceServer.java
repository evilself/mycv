package com.westernacher.mycv.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.web.savedrequest.NullRequestCache;

@Configuration
@EnableResourceServer
@Profile("security")
public class OauthResourceServer extends ResourceServerConfigurerAdapter {
    private static final String RESOURCE_ID = "mycv-resource";
    private static final String SECURED_READ_SCOPE = "#oauth2.hasScope('read')";
    private static final String SECURED_WRITE_SCOPE = "#oauth2.hasScope('write')";
    private static final String SECURED_PATTERN = "/**";
    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources.resourceId(RESOURCE_ID);
    }
    @Override
    public void configure(HttpSecurity http) throws Exception {
//        http.requestMatchers()
//            .antMatchers(SECURED_PATTERN).and().authorizeRequests()
//            //.antMatchers(HttpMethod.POST, SECURED_PATTERN).access(SECURED_WRITE_SCOPE)
//            .anyRequest().access(SECURED_READ_SCOPE).and().logout().logoutUrl("/oauth/logout");

        http.csrf().disable()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .requestCache().requestCache(new NullRequestCache()).and()
            .requestMatchers()
            .antMatchers(SECURED_PATTERN).and().authorizeRequests()
            .anyRequest().access(SECURED_READ_SCOPE);

    }
}
package com.westernacher.mycv.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.common.OAuth2RefreshToken;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@Profile("security")
@RequestMapping(path = "/oauth/logout")
public class LogoutController {
    private DefaultTokenServices tokenServices;

    @Autowired
    public LogoutController(DefaultTokenServices tokenServices) {
        this.tokenServices = tokenServices;
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    public void revokeToken(HttpServletRequest request, HttpServletResponse response) {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorization != null && authorization.contains("Bearer")){
            String tokenId = authorization.substring("Bearer".length()+1);
            OAuth2RefreshToken rToken =   tokenServices.getAccessToken(tokenServices.loadAuthentication(tokenId)).getRefreshToken();
            tokenServices.revokeToken(rToken.getValue());
            tokenServices.revokeToken(tokenId);
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
    }
}
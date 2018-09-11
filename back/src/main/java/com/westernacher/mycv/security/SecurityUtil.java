package com.westernacher.mycv.security;

import com.westernacher.mycv.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class SecurityUtil {

    @Autowired
    private UserRepository userRepository;

    public boolean isItMe(String id) {
        User user = (User) getAuth().getPrincipal();
        com.westernacher.mycv.model.User attemptedUser = this.userRepository.findById(id).orElse(null);
        return user.getUsername().equalsIgnoreCase(attemptedUser.getUserName());
    }

    public static Authentication getAuth() {
        return Optional.ofNullable(SecurityContextHolder.getContext()
                                                        .getAuthentication())
                       .orElseThrow(() -> new RuntimeException("Authentication is null"));
    }

    public static boolean hasAdminAuthority() {
        return hasAuthority(RealmAuthorityEnum.ADMIN.name());
    }

    public static boolean hasAuthority(String authority) {
        return getMyGrantedAuthorities().stream()
                                        .filter(auth -> auth.getAuthority()
                                                            .equalsIgnoreCase(authority))
                                        .findFirst()
                                        .isPresent();
    }

    public static Collection<? extends GrantedAuthority> getMyGrantedAuthorities() {
        return getAuth().getAuthorities();
    }

    public static boolean isAuthenticatedRq() {
        return Optional.ofNullable(SecurityContextHolder.getContext()
                                                        .getAuthentication())
                       .isPresent();
    }

    public com.westernacher.mycv.model.User getMycvUser() {
        org.springframework.security.core.userdetails.User loggedInUser = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication()
                                                                                                                                                    .getPrincipal();
        return this.userRepository.findByUserName(loggedInUser.getUsername());
    }

    public enum RealmAuthorityEnum {
        ADMIN, USER
    }
}
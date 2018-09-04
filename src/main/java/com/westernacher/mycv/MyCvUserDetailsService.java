package com.westernacher.mycv;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MyCvUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(final String s) throws UsernameNotFoundException {
        //Implement Me
        return null;
    }
}

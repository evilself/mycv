package com.westernacher.mycv.service;

import com.westernacher.mycv.model.User;
import com.westernacher.mycv.model.UserRole;
import com.westernacher.mycv.repository.UserRepository;
import org.elasticsearch.common.util.set.Sets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DefaultUserService implements UserService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Qualifier("customPasswordEncoder")
    private PasswordEncoder encoder;

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public void createTestData() {
        this.userRepository.save(new User("pavel", "kostadinov", Sets.newHashSet(UserRole.ADMIN), "pavel", encoder.encode("pavel")));
        this.userRepository.save(new User("borka", "mechkov", Sets.newHashSet(UserRole.USER), "borka", encoder.encode("borka")));
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteUsers() {
        this.userRepository.deleteAll();
    }
}

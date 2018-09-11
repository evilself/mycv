package com.westernacher.mycv.service;

import com.westernacher.mycv.model.User;
import com.westernacher.mycv.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DefaultUserService implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteUsers() {
        this.userRepository.deleteAll();
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN') || @securityUtil.isItMe(#id)")
    public User getUserById(String id) {
        return this.userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(id));
    }
}

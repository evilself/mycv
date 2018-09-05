package com.westernacher.mycv.service;

import com.westernacher.mycv.model.User;

import java.util.List;

public interface UserService {

    void createTestData();
    void deleteUsers();
    List<User> getAllUsers();
    User getUserById(String id);
}

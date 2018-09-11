package com.westernacher.mycv.service;

import com.westernacher.mycv.model.User;

import java.util.List;

public interface UserService {

    User getUserById(String id);

    List<User> getAllUsers();

    void deleteUsers();
}

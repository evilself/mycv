package com.westernacher.mycv.repository;

import com.westernacher.mycv.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

    User findByUserName(String username);
}
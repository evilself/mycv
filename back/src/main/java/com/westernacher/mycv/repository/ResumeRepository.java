package com.westernacher.mycv.repository;

import com.westernacher.mycv.model.Resume;
import com.westernacher.mycv.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResumeRepository extends MongoRepository<Resume, String> {

    Resume findByCreatedBy(User user);

}

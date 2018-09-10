package com.westernacher.mycv.repository;

import com.westernacher.mycv.model.Cv;
import com.westernacher.mycv.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CvRepository extends MongoRepository<Cv, String> {

    Cv findByCreatedBy(User user);

}
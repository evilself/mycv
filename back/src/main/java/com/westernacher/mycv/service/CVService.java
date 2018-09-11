package com.westernacher.mycv.service;

import com.westernacher.mycv.model.Cv;
import com.westernacher.mycv.model.User;
import org.springframework.core.io.Resource;

import java.util.List;

public interface CVService {
    List<Cv> getAll();

    //TODO delete these methods only for testing
    Cv getCvForUser(String userId);

    void createTestData();

    void deleteAllCv();

    Cv getById(String id);

    Resource generateCvById(String id) throws Exception;

    Resource generateCvList(List<String> ids) throws Exception;

    Cv createCv(Cv cv);

    Cv getMyCv();
}

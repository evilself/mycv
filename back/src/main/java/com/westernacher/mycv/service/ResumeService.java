package com.westernacher.mycv.service;

import com.westernacher.mycv.generation.DocumentType;
import com.westernacher.mycv.model.Resume;
import org.springframework.core.io.Resource;

import java.util.List;

public interface ResumeService {

    List<Resume> getAll();

    //TODO delete these methods only for testing
    Resume getByUser(String userId);

    void createTestData();

    void deleteAll();

    Resume getById(String id);

    Resume create(Resume resume);

    Resume getMyResume();

    Resource getResumeDocument(Resume resume, DocumentType documentType);

    Resource getResumeDocuments(List<Resume> resumes, DocumentType documentType);

}

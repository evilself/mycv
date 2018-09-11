package com.westernacher.mycv.generation;

import com.westernacher.mycv.model.Resume;
import org.springframework.core.io.Resource;

import java.util.concurrent.CompletableFuture;

public interface GenerationService {

    CompletableFuture<Resource> generateResumeDocument(Resume resume, DocumentType documentType);

}

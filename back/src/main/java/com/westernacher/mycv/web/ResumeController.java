package com.westernacher.mycv.web;

import com.westernacher.mycv.generation.DocumentType;
import com.westernacher.mycv.model.Resume;
import com.westernacher.mycv.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping(path = "/resume", produces = MediaType.APPLICATION_JSON_VALUE)
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @GetMapping
    public List<Resume> getAll() {
        return this.resumeService.getAll();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Resume> getResume(@PathVariable String id) {
        return ResponseEntity.ok(this.resumeService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Resume> createResume(@RequestBody Resume resume) {
        return ResponseEntity.ok(this.resumeService.create(resume));
    }

    @GetMapping(value = "/{id}/document")
    public ResponseEntity<Resource> getDocument(
            @PathVariable String id,
            @RequestParam(required = false, defaultValue = "WORD") DocumentType documentType) {
        return buildResourceResponse(this.resumeService.getResumeDocument(this.resumeService.getById(id), documentType), "resume.docx");
    }


    @GetMapping(value = "/documents")
    public ResponseEntity<Resource> getDocuments(
            @RequestParam List<String> ids,
            @RequestParam(required = false, defaultValue = "WORD") DocumentType documentType) {
        return buildResourceResponse(this.resumeService.getResumeDocuments(
                ids.stream().map(id -> this.resumeService.getById(id)).collect(toList()),
                documentType
        ), "resumes.zip");
    }

    //TODO delete me
    @GetMapping(value = "/create")
    @ResponseStatus(value = HttpStatus.OK)
    public String createResumesForTest() {
        this.resumeService.createTestData();
        return "ok";
    }

    //TODO delete me
    @GetMapping(value = "/deleteall")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public String deleteAll() {
        this.resumeService.deleteAll();
        return "ok";
    }

    private static ResponseEntity<Resource> buildResourceResponse(Resource file, String fileName) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Disposition", "filename=\"" + fileName + "\"");
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(file);
    }
}

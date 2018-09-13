package com.westernacher.mycv.service;

import com.google.common.collect.Lists;
import com.westernacher.mycv.generation.DocumentType;
import com.westernacher.mycv.generation.GenerationService;
import com.westernacher.mycv.model.*;
import com.westernacher.mycv.repository.ResumeRepository;
import com.westernacher.mycv.repository.UserRepository;
import com.westernacher.mycv.security.SecurityUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import static java.util.concurrent.CompletableFuture.allOf;
import static java.util.concurrent.CompletableFuture.completedFuture;
import static java.util.stream.Collectors.toList;

@Service
@Slf4j
public class DefaultResumeService implements ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private GenerationService generationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityUtil securityUtil;

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Resume> getAll() {
        return this.resumeRepository.findAll();
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN') || @securityUtil.isItMe(#userId)")
    public Resume getByUser(String userId) {
        User user = this.userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
        return this.resumeRepository.findByCreatedBy(user);
    }

    @Override
    public Resume getById(String id) {
        return this.resumeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    //TODO delete me
    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public void createTestData() {
        this.resumeRepository.deleteAll();
        List<User> users = this.userRepository.findAll();
        users.forEach(u -> {

            Experience experience = new Experience();
            experience.setCompany("West");
            experience.setDescription("I did these things : ");
            experience.setStartDate(LocalDate.of(2014, 11, 11));
            experience.setStillEmployed(true);
            experience.setSkills(Arrays.asList(new Skill("Java")));
            experience.setTitle("Coder");

            List<Experience> experiences = Lists.newArrayList(experience);

            List<Skill> skills = Lists.newArrayList(new Skill("Java"), new Skill("Angular"));

            Education education = new Education();
            education.setDetails("BS of Computer Science");
            education.setStartDate(LocalDate.of(2003, 5, 8));
            education.setEndDate(LocalDate.of(2008, 5, 8));

            Resume cv = new Resume();
            cv.setCreatedBy(u);
            cv.setExperience(experiences);
            cv.setSkills(skills);
            cv.setFirstName(u.getFirstName());
            cv.setLastName(u.getLastName());
            cv.setSummary("To GET A JOB");
            cv.setEducation(education);
            cv.setLanguages(Arrays.asList(new Language("English", "C1")));
            cv.setCertificates(Arrays.asList(new Certificate("OCJP-Java8", "java certification")));


            this.resumeRepository.save(cv);


        });
    }

    public void deleteAll() {
        this.resumeRepository.deleteAll();
    }

    @Override
    public Resume create(Resume resume) {
        Resume existingCv = this.resumeRepository.findByCreatedBy(securityUtil.getMycvUser());
        if (existingCv != null) {
            resume.setId(existingCv.getId());
        }
        resume.setCreatedBy(securityUtil.getMycvUser());
        return this.resumeRepository.save(resume);
    }

    @Override
    public Resume getMyResume() {
        return this.resumeRepository.findByCreatedBy(securityUtil.getMycvUser());
    }

    @Override
    public Resource getResumeDocument(Resume resume, DocumentType documentType) {
        try {
            return this.generationService.generateResumeDocument(resume, documentType).get();
        } catch (Exception e) {
            throw new RuntimeException("Error generating Document", e);
        }
    }

    @Override
    public Resource getResumeDocuments(List<Resume> resumes, DocumentType documentType) {

        CompletableFuture[] documentGenerationTasks = resumes.stream()
                .map(resume -> completedFuture(getResumeDocument(resume, documentType)))
                .toArray(CompletableFuture[]::new);

        CompletableFuture<List> generatedDocuments = allOf(documentGenerationTasks).thenApply(v ->
                Arrays.stream(documentGenerationTasks).map(CompletableFuture::join).collect(toList())
        );

        try {
            return (Resource) generatedDocuments.thenApply(this::generateZipFromResourceList).get();
        } catch (Exception e) {
            throw new RuntimeException("Error generating Documents", e);
        }
    }


    private Resource generateZipFromResourceList(List<Resource> resourceList) {
        try {
            ByteArrayOutputStream fos = new ByteArrayOutputStream();
            ZipOutputStream zos = new ZipOutputStream(fos);
            for (Resource resource : resourceList) {
                // TODO how to name the file with i.e first-last name of the owners
                zos.putNextEntry(new ZipEntry("resume" + Math.random() + ".docx"));
                zos.write(IOUtils.toByteArray(resource.getInputStream()));
                zos.closeEntry();
            }
            zos.close();
            return new InputStreamResource(new ByteArrayInputStream(fos.toByteArray()));
        } catch (IOException ioe) {
            System.out.println("Error creating zip file: " + ioe);
        }
        return null;
    }

}

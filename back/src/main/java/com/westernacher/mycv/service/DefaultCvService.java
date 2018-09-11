package com.westernacher.mycv.service;

import com.google.common.collect.Lists;
import com.westernacher.mycv.generation.GenerationService;
import com.westernacher.mycv.model.*;
import com.westernacher.mycv.repository.CvRepository;
import com.westernacher.mycv.repository.UserRepository;
import com.westernacher.mycv.security.SecurityUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class DefaultCvService implements CVService {

    @Autowired
    private CvRepository cvRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GenerationService generationService;

    @Autowired
    private SecurityUtil securityUtil;

    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Cv> getAll() {
        return this.cvRepository.findAll();
    }

    @Override
    @PreAuthorize("hasAuthority('ADMIN') || @securityUtil.isItMe(#userId)")
    public Cv getCvForUser(String userId) {
        User user = this.userRepository.findById(userId).orElseThrow(()-> new EntityNotFoundException());
        return this.cvRepository.findByCreatedBy(user);
    }

    //TODO delete me
    @Override
    @PreAuthorize("hasAuthority('ADMIN')")
    public void createTestData() {
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

            List<Skill> skills = Lists.newArrayList(new Skill("Java"),new Skill("Angular"));

            Education education = new Education();
            education.setDetails("BS of Computer Science");
            education.setStartDate(LocalDate.of(2003,5,8));
            education.setEndDate(LocalDate.of(2008,5,8));

            Cv cv = new Cv();
            cv.setCreatedBy(u);
            cv.setExperienceList(experiences);
            cv.setSkillList(skills);
            cv.setFirstName(u.getFirstName());
            cv.setLastName(u.getLastName());
            cv.setSummary("To GET A JOB");
            cv.setEducation(education);
            cv.setLanguageList(Arrays.asList(new Language("English","C1")));
            cv.setCertificateList(Arrays.asList(new Certificate("OCJP-Java8", "java certification")));


            this.cvRepository.save(cv);


        });
    }

    public void deleteAllCv() {
        this.cvRepository.deleteAll();
    }

    @Override
    public Cv getById(String id) {
        return this.cvRepository.findById(id).orElseThrow(()->new EntityNotFoundException());
    }

    //TODO add authZ only generate your CV or ADMIN
    @Override
    public Resource generateCvById(String id) throws Exception {
        return this.generationService.generateWordCV(this.getById(id));
    }

    @Override
    public Resource generateCvList(List<String> ids) throws Exception {
        List<Cv> cvs = this.cvRepository.findAllByIdIn(ids);
        return this.generationService.generateZipFromCvList(cvs);

    }

    @Override
    public Cv createCv(Cv cv) {
        Cv existingCv = this.cvRepository.findByCreatedBy(securityUtil.getMycvUser());
        if(existingCv != null) {
            cv.setId(existingCv.getId());
        }
        cv.setCreatedBy(securityUtil.getMycvUser());
        return this.cvRepository.save(cv);
    }

    @Override
    public Cv getMyCv() { ;
        return this.cvRepository.findByCreatedBy(securityUtil.getMycvUser());
    }
}

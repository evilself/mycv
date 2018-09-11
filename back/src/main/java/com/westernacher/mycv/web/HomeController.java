package com.westernacher.mycv.web;

import com.westernacher.mycv.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/my", produces = MediaType.APPLICATION_JSON_VALUE)
public class HomeController {

    @Autowired
    private ResumeService resumeService;

    @GetMapping
    public ResponseEntity getMyCV() {
        return new ResponseEntity(this.resumeService.getMyResume(), HttpStatus.OK);
    }
}

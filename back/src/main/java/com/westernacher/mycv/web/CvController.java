package com.westernacher.mycv.web;

import com.westernacher.mycv.service.CVService;
import com.westernacher.mycv.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/cv", produces = MediaType.APPLICATION_JSON_VALUE)
public class CvController {

    @Autowired
    private CVService cvService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity getCvForAllUsers() {
        return new ResponseEntity(this.cvService.getAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getCV(@PathVariable String id) {
        return new ResponseEntity(this.cvService.getById(id), HttpStatus.OK);
    }

    //TODO delete me
    @GetMapping(value = "/create")
    @ResponseStatus(value = HttpStatus.OK)
    public String createCvTest() {
        this.cvService.createTestData();
        return "ok";
    }

    //TODO delete me
    @GetMapping(value = "/deleteall")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public String deleteall() {
        this.cvService.deleteAllCv();
        return "ok";
    }
}

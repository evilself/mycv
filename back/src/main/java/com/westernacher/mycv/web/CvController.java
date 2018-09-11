package com.westernacher.mycv.web;

import com.westernacher.mycv.model.Cv;
import com.westernacher.mycv.service.CVService;
import com.westernacher.mycv.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(path = "/cv")
public class CvController {

    @Autowired
    private CVService cvService;

    @Autowired
    private UserService userService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getCvForAllUsers() {
        return new ResponseEntity(this.cvService.getAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getCV(@PathVariable String id) {
        return new ResponseEntity(this.cvService.getById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}/generate")
    //TODO ExceptionHandler
    public ResponseEntity<Resource> generateCv(@PathVariable String id, HttpServletResponse response) throws Exception {
        response.setContentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        response.setHeader("Content-Disposition", "attachment; filename=CV.docx");
        return new ResponseEntity<Resource>(this.cvService.generateCvById(id), null, HttpStatus.OK);
    }

    @GetMapping(value = "/generate/{ids}")
    //TODO ExceptionHandler
    public ResponseEntity<Resource> generateCvList(@PathVariable List<String> ids, HttpServletResponse response) throws Exception {
        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment; filename=CvList.zip");
        return new ResponseEntity<Resource>(this.cvService.generateCvList(ids), null, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity createCV(@RequestBody Cv cv) {
        return new ResponseEntity(this.cvService.createCv(cv), HttpStatus.OK);
    }

    //TODO delete me
    @GetMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public String createCvTest() {
        this.cvService.createTestData();
        return "ok";
    }

    //TODO delete me
    @GetMapping(value = "/deleteall", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public String deleteall() {
        this.cvService.deleteAllCv();
        return "ok";
    }
}

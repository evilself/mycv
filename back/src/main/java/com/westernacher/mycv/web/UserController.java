package com.westernacher.mycv.web;

import com.westernacher.mycv.model.User;
import com.westernacher.mycv.model.UserRole;
import com.westernacher.mycv.repository.UserRepository;
import com.westernacher.mycv.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity getUsers() {
        return new ResponseEntity(this.userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity getUser(@PathVariable String id) {
        return new ResponseEntity(this.userRepository.findById(id), HttpStatus.OK);
    }

    //TODO delete me
    @GetMapping(value = "/create")
    @ResponseStatus(value = HttpStatus.OK)
    public String createTestUser() {
        this.userService.createTestData();
        return "redirect:/users";
    }

    //TODO delete me
    @GetMapping(value = "/deleteall")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public String deleteall() {
        this.userService.deleteUsers();
        return "redirect:/users";
    }
}

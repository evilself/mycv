package com.westernacher.mycv.web;

import com.westernacher.mycv.model.User;
import com.westernacher.mycv.model.UserRole;
import com.westernacher.mycv.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping
    public ResponseEntity getUsers() {
        return new ResponseEntity(this.userRepository.findAll(), HttpStatus.OK);
    }

    //TODO delete me
    @GetMapping(value = "/create")
    public String createTestUser() {
        this.userRepository.save(new User("pavel", "kostadinov", UserRole.ADMIN, "pavel", encoder.encode("pavel")));
        this.userRepository.save(new User("borka", "mechkov", UserRole.USER, "borka", encoder.encode("borka")));
        return "redirect:/users";
    }

    //TODO delete me
    @GetMapping(value = "/deleteall")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public String deleteall() {
        this.userRepository.deleteAll();
        return "redirect:/users";
    }
}

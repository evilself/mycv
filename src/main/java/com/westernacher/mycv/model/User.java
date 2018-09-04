package com.westernacher.mycv.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document
@Data
@EqualsAndHashCode
@JsonIgnoreProperties(ignoreUnknown = true)
public class User{

    @Id
    private String id;

    private String firstName;

    private String lastName;

    private String userName;

    private String password;

    private UserRole role;

    public User(String firstName, String lastName, UserRole role, String userName, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.userName = userName;
        this.password = password;
    }
}

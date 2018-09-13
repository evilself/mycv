package com.westernacher.mycv.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Document
@Data
@EqualsAndHashCode
@JsonIgnoreProperties(ignoreUnknown = true)
public class User{
    @Id
    private String id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String userName;

    @NotNull
    @JsonIgnore
    private String password;

    @NotNull
    private Set<UserRole> roles;

    public User(String firstName, String lastName, Set<UserRole> roles, String userName, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
        this.userName = userName;
        this.password = password;
    }
}

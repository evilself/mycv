package com.westernacher.mycv.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.List;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    @Id
    private String id;

    private User createdBy;

    private String firstName;

    private String lastName;

    private String summary;

    private List<Experience> experience;

    private List<Skill> skills;

    private Education education;

    private List<Language> languages;

    private List<Certificate> certificates;

    @JsonProperty
    public String getFullname() {
        return firstName + " " + lastName;
    }

}

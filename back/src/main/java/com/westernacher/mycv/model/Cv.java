package com.westernacher.mycv.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class Cv {

    private User createdBy;

    @Id
    private String id;

    private String firstName;

    private String lastName;

    private String objective;

    private List<Experience> experienceList;

    private List<Skill> skillList;

}

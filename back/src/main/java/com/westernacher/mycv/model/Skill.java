package com.westernacher.mycv.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class Skill {

    @Id
    private String id;

    private String skill;

    public Skill(String skill) {
        this.skill = skill;
    }
}

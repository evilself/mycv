package com.westernacher.mycv.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class Experience {

    @Id
    private String id;

    private String company;
    private String companyAddress;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean stillEmployed;

}

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
public class Certificate {
    @Id
    private String id;

    private String certificate;

    private String details;

    public Certificate(String certificate, String details) {
        this.certificate = certificate;
        this.details = details;
    }
}

package com.westernacher.mycv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class MycvApplication {

    public static void main(String[] args) {
        SpringApplication.run(MycvApplication.class, args);
    }
}

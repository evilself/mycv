package com.westernacher.mycv.migration;

import com.github.mongobee.Mongobee;
import com.github.mongobee.exception.MongobeeException;
import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class MongobeeConfig {

    @Autowired
    private MongoClient mongoClient;

    @Value("${spring.data.mongodb.database}")
    private String dbName;

    @PostConstruct
    public void executeMigrations() throws MongobeeException {
        Mongobee runner = new Mongobee(mongoClient);
        runner.setChangeLogsScanPackage("com.westernacher.mycv.migration");
        runner.setDbName(dbName);
        runner.execute();
    }
}

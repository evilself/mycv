package com.westernacher.mycv.migration;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import com.google.common.collect.ImmutableList;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.westernacher.mycv.security.NoSecurityConfig;
import com.westernacher.mycv.security.PasswordEncoderConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;

@ChangeLog
@Slf4j
public class DatabaseChangelog {
    private PasswordEncoder passwordEncoder = new PasswordEncoderConfig().customPasswordEncoder();

    @ChangeSet(id = "create_users", author = "pavel", order = "0001")
    public void createUsers(DB db) {
        log.debug("Creating a list of users");
        DBCollection usersCollection = db.getCollection("user");
        usersCollection.drop();
        createUser(usersCollection, "Pavel", "Kostadinov", "pavel", "ADMIN");
        createUser(usersCollection, "Boris", "Mechkov", "boris", "ADMIN");
        createUser(usersCollection, "Lazar", "Yanchev", "lazar", "ADMIN");
        createUser(usersCollection, "Zdravko", "Tatarski", "zdravko", "ADMIN");
        createUser(usersCollection, "Jordan", "Schlansky", "jordan", "USER");
    }

    private void createUser(DBCollection usersCollection, String firstName,
                            String lastName, String userName, String role) {
        usersCollection.save(new BasicDBObject()
                .append("_class", "com.westernacher.mycv.model.User")
                .append("firstName", firstName)
                .append("lastName", lastName)
                .append("userName", userName)
                .append("password", passwordEncoder.encode(userName))
                .append("roles", ImmutableList.of(role)));
    }

}

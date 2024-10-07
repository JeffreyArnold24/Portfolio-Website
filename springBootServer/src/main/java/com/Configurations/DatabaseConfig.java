package com.Configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.DAOs.AuthTokenDAOInterface;
import com.DAOs.AuthTokenDAOSQLite;
import com.DAOs.UsersDAOInterface;
import com.DAOs.UsersDAOSQLite;

@Configuration
public class DatabaseConfig {

    @Value("${db.type}")
    private String type;

    @Value("${db.location}")
    private String databaseURL;

    @Bean
    public String getDatabaseURL(){
        return databaseURL;
    }

    public UsersDAOInterface getUsersDAO(){
        if (type.equals("sqlite")){
            return new UsersDAOSQLite(getDatabaseURL());
        }
        return null;
    }

    public AuthTokenDAOInterface getAuthTokenDAO(){
        if (type.equals("sqlite")){
            return new AuthTokenDAOSQLite(getDatabaseURL());
        }
        return null;
    }
    
}

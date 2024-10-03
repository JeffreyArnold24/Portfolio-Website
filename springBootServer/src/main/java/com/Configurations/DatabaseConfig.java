package com.Configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.DAOs.UsersDAOInterface;
import com.DAOs.UsersDAOSQLite;

@Configuration
public class DatabaseConfig {

    @Value("${db.type}")
    private String type;

    public UsersDAOInterface getUsersDAO(){
        if (type.equals("sqlite")){
            return new UsersDAOSQLite();
        }
        return null;
    }
    
}

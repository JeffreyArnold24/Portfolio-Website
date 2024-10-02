package com.Services;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.DTOs.responses.LoginResponse;
import com.Factory.DatabaseFactory.DatabaseFactoryInterface;
import com.Factory.DatabaseFactory.DatabaseFactoryProducer;
import com.DTOs.requests.LoginRequest;
import com.DAOs.UsersDAOInterface;

public class LoginService {

    // Method used to create the factory of classes used
    // The type of factory can be changed in application.properties
    // as the value db.factory.type
    private DatabaseFactoryInterface getDatabaseFactory(){
        DatabaseFactoryProducer factoryProducer = new DatabaseFactoryProducer();
        DatabaseFactoryInterface factory = factoryProducer.getFactory();
        return factory;
    }

    private void verifyLoginCredentials(LoginRequest request){
        if (request.getUsername() == ""){
            throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED, "Please include a Username.");
        }
        if (request.getPassword() == null){
            throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED, "Please include a Password.");
        }
    }

    private void verifyDatabaseFactory(DatabaseFactoryInterface databaseFactory){
        if (databaseFactory == null){
            System.out.print("Incorrect Database");
            throw new ResponseStatusException(HttpStatus.EXPECTATION_FAILED, "Please include a Username.");
        }
    }

    public LoginResponse login(LoginRequest request){
        DatabaseFactoryInterface factory = getDatabaseFactory();
        verifyDatabaseFactory(factory);
        UsersDAOInterface usersDAO = factory.getUserDAOInterface();
        verifyLoginCredentials(request);
        LoginResponse response = usersDAO.response();
        return response;
    }
    
}

package com.Services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.DTOs.responses.LoginResponse;
import com.DTOs.requests.LoginRequest;
import com.Configurations.DatabaseConfig;
import com.DAOs.UsersDAOInterface;

@Service
public class LoginService{


    // Constructor Setup for Dependency Injection
    private DatabaseConfig databaseConfig;
    public LoginService(DatabaseConfig databaseConfig){
        this.databaseConfig = databaseConfig;
    }

    // Used to verify a valid request
    private void verifyLoginCredentials(LoginRequest request){
        if (request.getUsername() == ""){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please include a Username.");
        }
        if (request.getPassword() == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please include a Password.");
        }
    }




    public LoginResponse login(LoginRequest request){
        verifyLoginCredentials(request);
        UsersDAOInterface usersDAO = databaseConfig.getUsersDAO();
        if (usersDAO.checkUserExists(request.getUsername())){

        }
        else{

        }
        return new LoginResponse(null, null);
    }
    
}

package com.Services;

import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException.BadRequest;
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
        LoginResponse response = usersDAO.response();
        return response;
    }
    
}

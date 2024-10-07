package com.Services;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.DTOs.responses.LoginResponse;
import com.Utils.AuthTokenUtil;
import com.Utils.PasswordUtil;
import com.DTOs.requests.LoginRequest;
import com.Configurations.DatabaseConfig;
import com.DAOs.AuthTokenDAOInterface;
import com.DAOs.UsersDAOInterface;

@Service
public class LoginService{

    UsersDAOInterface usersDAO;
    AuthTokenDAOInterface authTokenDAO;

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

    private String hashPassword(String Password){
        return PasswordUtil.hashPassword(Password);
    }

    private Boolean verifyPasswordCredetials(String password, String hashedPassword){
        return PasswordUtil.verifyPassword(password, hashedPassword);
    }

    private String createAuthToken(String username){
        authTokenDAO = databaseConfig.getAuthTokenDAO();
        String authToken = AuthTokenUtil.generateAuthToken();
        if(authTokenDAO.createAuthToken(username, authToken, LocalDateTime.now())){
            return authToken;
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Please try again later.");
        }
        
    }

    // Used to create a user in the database and assign them
    // and Authtoken.
    public LoginResponse createUser(LoginRequest request){
        String hashedPassword = hashPassword(request.getPassword());
        if (usersDAO.createUser(request.getUsername(), hashedPassword)){
            String authToken = createAuthToken(request.getUsername());
            return new LoginResponse(request.getUsername(), authToken);
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not create user.");
        }
    }

    // Used to verify an existing username and password.
    // Assigns an Authtoken on successful sign-in
    public LoginResponse signInUser(LoginRequest request){
        String retreivedPassword = usersDAO.getPassword(request.getUsername());
        if(verifyPasswordCredetials(request.getPassword(), retreivedPassword)){
            String authToken = createAuthToken(request.getUsername());
            return new LoginResponse(request.getUsername(), authToken);
        }
        else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect Password.");
        }
    }


    public LoginResponse login(LoginRequest request){
        verifyLoginCredentials(request);
        usersDAO = databaseConfig.getUsersDAO();
        LoginResponse response = null;
        if (usersDAO.checkUserExists(request.getUsername())){
            response = signInUser(request);
        }
        else{
            response = createUser(request);
        }
        return response;
    }
    
}

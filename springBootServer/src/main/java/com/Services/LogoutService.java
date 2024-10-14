package com.Services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.Configurations.DatabaseConfig;
import com.DAOs.AuthTokenDAOInterface;
import com.DTOs.requests.LogoutRequest;
import com.DTOs.responses.LogoutResponse;

@Service
public class LogoutService {

    AuthTokenDAOInterface authTokenDAO;

    // Constructor Setup for Dependency Injection
    private DatabaseConfig databaseConfig;
    public LogoutService(DatabaseConfig databaseConfig){
        this.databaseConfig = databaseConfig;
        authTokenDAO = databaseConfig.getAuthTokenDAO();
    }

    public LogoutResponse logout(LogoutRequest request){
        System.out.print(request.getAuthToken());
        if(authTokenDAO.verifyAuthToken(request.getAuthToken())){
            if (authTokenDAO.deleteAuthToken(request.getAuthToken())){
                return new LogoutResponse("Logout Successful");
            }
            else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "There was an error signing you out.\nTry again later.");
            }
            
        }
        else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not known to system.");
        }
    }

}

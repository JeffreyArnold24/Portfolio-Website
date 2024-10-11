package com.Services;

import com.Configurations.DatabaseConfig;
import com.DAOs.AuthTokenDAOInterface;
import com.DTOs.requests.LogoutRequest;
import com.DTOs.responses.LogoutResponse;

public class LogoutService {

    AuthTokenDAOInterface authTokenDAO;

    // Constructor Setup for Dependency Injection
    private DatabaseConfig databaseConfig;
    public LogoutService(DatabaseConfig databaseConfig){
        this.databaseConfig = databaseConfig;
        authTokenDAO = databaseConfig.getAuthTokenDAO();
    }

    public LogoutResponse logout(LogoutRequest request){
        return new LogoutResponse("Logout successful");
    }

}

package com.DTOs.responses;

// This class is used to store data relating to a user's profile
public class LoginResponse {
    private String username;
    private String authToken;

    // Constructor
    public LoginResponse(String username, String authToken){
        this.username = username;
        this.authToken = authToken;
    }

    // Getters and Setters
    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getAuthToken(){
        return authToken;
    }

    public void setAuthToken(String authToken){
        this.authToken = authToken;
    }
    
}

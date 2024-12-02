package com.DTOs.requests;

public class LogoutRequest {
    private String username;
    private String authToken;

    public LogoutRequest (String username, String authToken){
        this.username = username;
        this.authToken = authToken;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
    
}

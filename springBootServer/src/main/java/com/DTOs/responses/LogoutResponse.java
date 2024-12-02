package com.DTOs.responses;

public class LogoutResponse {

    public String message;

    public LogoutResponse(String message){
        this.message = message;
    }

    public String getMessage(){
        return message;
    }

    public void setMessage(String message){
        this.message = message;
    }
    
}

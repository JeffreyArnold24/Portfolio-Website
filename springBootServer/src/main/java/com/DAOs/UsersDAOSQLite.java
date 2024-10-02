package com.DAOs;

import com.DTOs.responses.LoginResponse;

public class UsersDAOSQLite implements UsersDAOInterface {

    @Override
    public LoginResponse response() {
        // TODO Auto-generated method stub
        return new LoginResponse("username", "password");
    }
    
}

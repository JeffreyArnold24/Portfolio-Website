package com.DAOs;

import com.DTOs.responses.LoginResponse;

public interface UsersDAOInterface {

    public Boolean checkUserExists(String username);
    public Boolean createUser(String username, String password);
    public String getPassword(String username);
    
}

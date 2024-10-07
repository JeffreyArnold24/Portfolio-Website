package com.DAOs;

import com.DTOs.responses.LoginResponse;

public interface UsersDAOInterface {

    public Boolean checkUserExists(String username);
    
}

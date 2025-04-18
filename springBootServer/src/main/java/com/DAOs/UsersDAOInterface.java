package com.DAOs;

import java.time.LocalDateTime;

public interface UsersDAOInterface {

    public Boolean checkUserExists(String username);
    public Boolean createUser(String username, String password, LocalDateTime creationDateTime);
    public String getPassword(String username);
    
}

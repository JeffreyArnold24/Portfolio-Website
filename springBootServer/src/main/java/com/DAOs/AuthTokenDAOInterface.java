package com.DAOs;

import java.time.LocalDateTime;

public interface AuthTokenDAOInterface {
    
    public Boolean verifyAuthToken(String authToken);
    public Boolean deleteAuthToken(String authToken);
    public Boolean deleteExpiredTokens();
    public String createAuthToken(String username, String authToken, LocalDateTime creationDateTime);

}

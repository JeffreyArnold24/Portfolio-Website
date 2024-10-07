package com.DAOs;

import java.time.LocalDateTime;

public class AuthTokenDAOSQLite implements AuthTokenDAOInterface {

    @Override
    public Boolean verifyAuthToken(String authToken) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'verifyAuthToken'");
    }

    @Override
    public Boolean deleteAuthToken(String authToken) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteAuthToken'");
    }

    @Override
    public Boolean deleteExpiredTokens() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteExpiredTokens'");
    }

    @Override
    public String createAuthToken(String username, String authToken, LocalDateTime creationDateTime) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createAuthToken'");
    }
    
}

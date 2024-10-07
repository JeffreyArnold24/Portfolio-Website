package com.DAOs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class AuthTokenDAOSQLite implements AuthTokenDAOInterface {

    private static String url;
    private Connection conn;
    public AuthTokenDAOSQLite(String url){
        AuthTokenDAOSQLite.url = url;
        conn = connectToDatabase();
    }

    private static Connection connectToDatabase(){
        Connection conn = null;
        try{
            conn = DriverManager.getConnection(url);
        }
        catch (SQLException e){ 
            System.out.print(e);
        }
        return conn;
    }

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
    public Boolean createAuthToken(String username, String authToken, LocalDateTime creationDateTime) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createAuthToken'");
    }
    
}

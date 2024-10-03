package com.DAOs;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.stereotype.Repository;

import com.DTOs.responses.LoginResponse;

@Repository
public class UsersDAOSQLite implements UsersDAOInterface {

    private static String url;
    public UsersDAOSQLite(String url){
        UsersDAOSQLite.url = url;
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
    public LoginResponse checkUser() {
        connectToDatabase();
        return new LoginResponse("username", "password");
    }
    
}

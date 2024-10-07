package com.DAOs;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Repository;

import com.DTOs.responses.LoginResponse;

@Repository
public class UsersDAOSQLite implements UsersDAOInterface {

    private static String url;
    private Connection conn;
    public UsersDAOSQLite(String url){
        UsersDAOSQLite.url = url;
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
    public Boolean checkUserExists(String username) {
        String query = "SELECT COUNT (*) "
                     + "FROM users "
                     + "WHERE username = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(query)){
            stmt.setString(1, username);

            ResultSet resultSet = stmt.executeQuery();

            if(resultSet.next()){
                int count = resultSet.getInt(1);
                if (count > 0){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        catch(SQLException e){
            e.printStackTrace();
        }

        return false;
    }

    @Override
    public Boolean createUser(String username, String password) {
        String query = "INSERT INTO users "
                     + "(username, password) "
                     + "VALUES (?, ?)";
        
        try (PreparedStatement stmt = conn.prepareStatement(query)){
            stmt.setString(1, username);
            stmt.setString(2, password);
            int rowsInserted = stmt.executeUpdate();
            if (rowsInserted > 0){
                return true;
            }
        }
        catch (SQLException e){
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public String getPassword(String username){
        String query = "SELECT password "
                     + "FROM users "
                     + "WHERE username = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(query)){
            stmt.setString(1, username);

            ResultSet resultSet = stmt.executeQuery();

            if(resultSet.next()){
                String password = resultSet.getString(1);
                return password;
            }
        }
        catch(SQLException e){
            e.printStackTrace();
        }

        return null;
    }
    
}

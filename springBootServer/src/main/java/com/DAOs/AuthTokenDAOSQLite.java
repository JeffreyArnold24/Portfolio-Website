package com.DAOs;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
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
        String query = "SELECT COUNT (*) "
                     + "FROM authToken "
                     + "WHERE authToken = ?";
        
        try (PreparedStatement stmt = conn.prepareStatement(query)){
            stmt.setString(1, authToken);

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
    public Boolean deleteAuthToken(String authToken) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteAuthToken'");
    }

    @Override
    public Boolean deleteExpiredTokens() {
        String deleteSQL = "DELETE FROM authToken WHERE creationDateTime <= (strftime('%s','now') * 1000 - 600000)";
        try (PreparedStatement pstmt = conn.prepareStatement(deleteSQL)) {

            // Execute the delete statement
            int rowsDeleted = pstmt.executeUpdate();

            System.out.println("Deleted " + rowsDeleted + " expired tokens.");
            return true;

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    @Override
    public Boolean createAuthToken(String username, String authToken, LocalDateTime creationDateTime) {
        String query = "INSERT INTO authToken "
                     + "(username, authToken, creationDateTime) "
                     + "VALUES (?, ?, ?)";
        
        try (PreparedStatement stmt = conn.prepareStatement(query)){
            stmt.setString(1, username);
            stmt.setString(2, authToken);
            stmt.setTimestamp(3, Timestamp.valueOf(creationDateTime));
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
    
}

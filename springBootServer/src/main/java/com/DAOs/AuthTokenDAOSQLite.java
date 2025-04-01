package com.DAOs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

public class AuthTokenDAOSQLite implements AuthTokenDAOInterface {

    private long timeIntervalMilliseconds = 600000;

    private static String url;
    private Connection conn;
    public AuthTokenDAOSQLite(String url){
        AuthTokenDAOSQLite.url = url;
        conn = connectToDatabase();
    }

    /** Uses the url given in the constuctor to establish a connection to an
     * SQLite Database.
     * 
     * @return  The connection to the database.
     */
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

    /** Checks if the given authToken exists in the database.
     * 
     * @param authToken The authToken to check for.
     * @return          Returns true if the authToken exists in the database and false otherwise.
     */
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

    /** Deletes the provided authToken from the database.
     * 
     * @param authToken The authToken to be deleted.
     * @return          A boolean that indicates if it was successful.
     */
    @Override
    public Boolean deleteAuthToken(String authToken) {
        String deleteSQL = "DELETE FROM authToken WHERE authToken = ?";
        try (PreparedStatement stmt = conn.prepareStatement(deleteSQL)) {

            stmt.setString(1, authToken);
            int rowsDeleted = stmt.executeUpdate();

            if (rowsDeleted > 0){
                return true;
            }
            else
            {
                return false;
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    /** Deletes all authTokens that are older than the value "timeIntervalMilliseconds"
     * 
     * @return  Returns true if the process is successful and false otherwise.
     */
    @Override
    public Boolean deleteExpiredTokens() {
        String deleteSQL = "DELETE FROM authToken WHERE creationDateTime <= (strftime('%s','now') * 1000 - ?)";
        try (PreparedStatement stmt = conn.prepareStatement(deleteSQL)) {

            stmt.setLong(1, timeIntervalMilliseconds);

            // Execute the delete statement
            int rowsDeleted = stmt.executeUpdate();

            System.out.println("Deleted " + rowsDeleted + " expired tokens.");
            return true;

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    /** Adds an authToken into the database.
     * 
     * @param username          The username that the authToken belongs to.
     * @param authToken         The authToken to be stored.
     * @param creationDateTime  When the authToken was created to allow for expiration.
     * @return                  Returns true if successful and false otherwise.
     */
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

    /**
     * Checks if an authToken exists under the given username.
     */
    @Override
    public Boolean tokenExistsForUsername(String username) {
        String query = "SELECT COUNT(*) " 
                     + "FROM authToken " 
                     + "WHERE username = ?";
    
        try (PreparedStatement stmt = conn.prepareStatement(query)) {
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
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return false; // Default to false if an error occurs

    }

    @Override
    public String retreiveAuthToken(String username) {
        String query = "SELECT authToken "
                     + "FROM authToken "
                     + "WHERE username = ?";
    
        try (PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setString(1, username);
            ResultSet resultSet = stmt.executeQuery();
            
            if (resultSet.next()) {
                return resultSet.getString("authToken"); // Return the auth token if found
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null; // Return null if no token is found or an error occurs

    }
    
}

package com.DAOs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Repository;

@Repository
public class UsersDAOSQLite implements UsersDAOInterface {

    private static String url;
    private Connection conn;
    public UsersDAOSQLite(String url){
        UsersDAOSQLite.url = url;
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

    /** Checks if the user exists in the users table
     * 
     * @param username  The username to check for
     * @return          Returns true if the username exists and false otherwise.
     */
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

    /** Adds the username and password to the database.
     * 
     * @param username  The username to add to the database.
     * @param password  The hashed password to add to the database.
     * @return          Returns true if the insert was successful and false otherwise.
     */
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

    /** Retreives the password of the given username.
     * 
     * @param username  The username of the user whos password we are retreiving.
     * @return          The password of the username.
     */
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

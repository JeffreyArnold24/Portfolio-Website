package com.Services;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.DTOs.responses.LoginResponse;
import com.Utils.AuthTokenUtil;
import com.Utils.PasswordUtil;
import com.DTOs.requests.LoginRequest;
import com.Configurations.DatabaseConfig;
import com.DAOs.AuthTokenDAOInterface;
import com.DAOs.UsersDAOInterface;

@Service
public class LoginService{

    UsersDAOInterface usersDAO;
    AuthTokenDAOInterface authTokenDAO;

    // Constructor Setup for Dependency Injection
    private DatabaseConfig databaseConfig;
    public LoginService(DatabaseConfig databaseConfig){
        this.databaseConfig = databaseConfig;
        usersDAO = databaseConfig.getUsersDAO();
        authTokenDAO = databaseConfig.getAuthTokenDAO();
    }

    /** Throws an error if either the username or password entered
     *  by the user is empty.
     * 
     * @param request   The username and password entered by the user.
     * @throws          Throws a bad_request error if their is either no username or password.
     */
    private void verifyLoginCredentials(LoginRequest request){
        if (request.getUsername() == ""){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please include a Username.");
        }
        if (request.getPassword() == ""){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Please include a Password.");
        }
    }

    /** Used to take a password and hash it.
     * 
     * @param password      The password entered by the user.
     * @return              The hashed version of the given password.
     */
    private String hashPassword(String password){
        return PasswordUtil.hashPassword(password);
    }

    /** Used to verify if the password is the same as
     *  the hashed password
     * 
     * @param password          The password entered by the user.
     * @param hashedPassword    The hashed password that corresponds to the user provided username.
     * @return                  If the password and hashed password are the same.
     */
    private Boolean verifyPasswordCredetials(String password, String hashedPassword){
        return PasswordUtil.verifyPassword(password, hashedPassword);
    }


    /** Creates and assigns an authToken to the given user.
     * 
     * @param username  The user to create the authToken for.
     * @return          The authToken created.
     * @throws          Throws an internal server error if an authToken could not be created.
     */
    private String createAuthToken(String username){
        
        String authToken = AuthTokenUtil.generateAuthToken();
        if(authTokenDAO.createAuthToken(username, authToken, LocalDateTime.now())){
            return authToken;
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Please try again later.");
        }
        
    }

    /** Used to create a user in the database and assign them
     *  an authToken.
     * 
     * @param request   A class with the username and password of the user.
     * @return          A class that contains the username and authToken of the user.
     * @throws          Throws an internal server error if the user could not be created.
     */
    public LoginResponse createUser(LoginRequest request){
        String hashedPassword = hashPassword(request.getPassword());
        if (usersDAO.createUser(request.getUsername(), hashedPassword)){
            String authToken = createAuthToken(request.getUsername());
            return new LoginResponse(request.getUsername(), authToken);
        }
        else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not create user.");
        }
    }

    /** Used to sign in a user if they exist in the database and
     *  assign them an authToken.
     * 
     * @param request   A class with the username and password of the user.
     * @return          A class that contains the username and authToken of the user.
     * @throws          Throws an bad request error if the given password is incorrect.
     */
    public LoginResponse signInUser(LoginRequest request){
        String retreivedPassword = usersDAO.getPassword(request.getUsername());
        if(verifyPasswordCredetials(request.getPassword(), retreivedPassword)){
            String authToken = createAuthToken(request.getUsername());
            return new LoginResponse(request.getUsername(), authToken);
        }
        else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect Password.");
        }
    }

    /** Used to either sign in or create a user depending
     *  on whether they exist in the database or not.
     * 
     * @param request   A class with the username and password of the user.
     * @return          A class that contains the username and authToken of the user.
     */
    public LoginResponse login(LoginRequest request){
        verifyLoginCredentials(request);
        LoginResponse response = null;
        if (usersDAO.checkUserExists(request.getUsername())){
            response = signInUser(request);
        }
        else{
            response = createUser(request);
        }
        return response;
    }
    
}

package com.Controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DTOs.requests.LoginRequest;
import com.DTOs.responses.LoginResponse;
import com.Services.LoginService;

@RestController
public class LoginController {

    // Constructor for dependency injection.
    private LoginService loginService;
    public LoginController (LoginService loginService) {
        this.loginService = loginService;
    }
    
    /** Takes a username and password from the user and either
     *  creates them in the database or logs them in if the
     *  credentials are correct.
     * 
     * @param request A class that contains a username and password
     * @return        The username and authToken of the user if the sign in is successful.
     */
    @PostMapping("/login")
    public LoginResponse sayHello(@RequestBody LoginRequest request) {
        LoginResponse response = loginService.login(request);
        return response;
    }
}
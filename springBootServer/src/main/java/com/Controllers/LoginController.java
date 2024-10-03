package com.Controllers;

import javax.xml.crypto.Data;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DTOs.requests.LoginRequest;
import com.DTOs.responses.LoginResponse;
import com.Services.LoginService;

@RestController
public class LoginController {

    private LoginService loginService;

    public LoginController (LoginService loginService) {
        this.loginService = loginService;
    }
    
    @PostMapping("/login")
    public LoginResponse sayHello(@RequestBody LoginRequest request) {
        LoginResponse response = loginService.login(request);
        return response;
    }
}
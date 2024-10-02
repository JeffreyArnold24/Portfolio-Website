package com.Controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DTOs.requests.LoginRequest;
import com.DTOs.responses.LoginResponse;
import com.Services.LoginService;

@RestController
public class LoginController {
    
    @PostMapping("/login")
    public LoginResponse sayHello(@RequestBody LoginRequest request) {
        LoginService loginService = new LoginService();
        return loginService.login(request);
    }
}
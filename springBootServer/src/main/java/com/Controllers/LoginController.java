package com.Controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DTOs.requests.LoginRequest;
import com.DTOs.responses.LoginResponse;

@RestController
public class LoginController {
    
    @PostMapping("/login")
    public LoginResponse sayHello(@RequestBody LoginRequest request) {
        System.out.print(request.getUsername());
        System.out.print(request.getPassword());
        return new LoginResponse("username", "authToken");
    }
}
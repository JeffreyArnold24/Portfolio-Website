package com.Controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DTOs.requests.LogoutRequest;
import com.DTOs.responses.LogoutResponse;
import com.Services.LogoutService;

@RestController
public class LogoutController {

    // Constructor for dependency injection.
    private LogoutService logoutService;
    public LogoutController (LogoutService logoutService) {
        this.logoutService = logoutService;
    }

    @PostMapping("/logout")
    public LogoutResponse sayHello(@RequestBody LogoutRequest request) {
        LogoutResponse response = logoutService.logout(request);
        return response;
    }
    
}

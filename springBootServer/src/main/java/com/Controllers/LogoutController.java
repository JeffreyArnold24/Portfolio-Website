package com.Controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.DTOs.requests.LogoutRequest;
import com.DTOs.responses.LogoutResponse;
import com.Services.LogoutService;

public class LogoutController {

    // Constructor for dependency injection.
    private LogoutService logoutService;
    public LogoutController (LogoutService loginService) {
        this.logoutService = logoutService;
    }

    @PostMapping("/logout")
    public LogoutResponse sayHello(@RequestBody LogoutRequest request) {
        LogoutResponse response = logoutService.logout(request);
        return response;
    }
    
}

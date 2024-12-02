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

    /** Used to logout a user which includes deleting their authToken.
     * 
     * @param request   The request from the front-end
     * @return          A class that contains a message whether the logout was successful or not.
     */
    @PostMapping("/logout")
    public LogoutResponse logoutController(@RequestBody LogoutRequest request) {
        LogoutResponse response = logoutService.logout(request);
        return response;
    }
    
}

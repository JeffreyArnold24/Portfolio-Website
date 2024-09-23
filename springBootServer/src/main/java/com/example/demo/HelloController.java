package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @GetMapping("/login")
    public String sayHello() {
        System.out.print("Request Received");
        return "Hello, World!";
    }
}
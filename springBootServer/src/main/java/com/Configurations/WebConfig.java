package com.Configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all paths
                .allowedOrigins("http://localhost:3000", "http://localhost:3001", "https://jeffreyarnoldportfolio.com", "https://jeffreyarnoldportfolio.com:8000") // Allow frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (optional)
    }
}

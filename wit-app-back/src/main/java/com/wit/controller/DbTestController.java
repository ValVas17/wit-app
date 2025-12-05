package com.wit.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.Connection;
import java.sql.DriverManager;

@RestController
public class DbTestController {
    
    @GetMapping("/api/test-db")
    public String testDb() {
        try {
            String url = "jdbc:postgresql://localhost:5432/wit";
            String user = "wit_admin"; // или postgres
            String password = "1234"; // твой пароль
            
            Connection conn = DriverManager.getConnection(url, user, password);
            return "Database connection successful! ✅";
        } catch (Exception e) {
            return "Database connection failed: " + e.getMessage();
        }
    }
}
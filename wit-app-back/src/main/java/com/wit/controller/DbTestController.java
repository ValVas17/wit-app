package com.wit.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class DbTestController {

    private static final Logger logger = LoggerFactory.getLogger(DbTestController.class);

    @GetMapping("/api/test-db")
    public String testDb() {
        String url = "jdbc:postgresql://localhost:5432/wit";
        String user = "wit_admin";
        String password = "1234";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            if (conn.isValid(1)) { 
                logger.info("Database connection successful to {}", url); 
                return "Database connection successful! ✅";
            } else {
                logger.warn("Database connection established but reported as invalid to {}", url);
                return "Database connection established but reported as invalid.";
            }
        } catch (SQLException e) { 
            logger.error("Database connection failed: {}", e.getMessage(), e);
            return "Database connection failed: " + e.getMessage();
        } catch (Exception e) { 
            logger.error("An unexpected error occurred during database connection test: {}", e.getMessage(), e);
            return "An unexpected error occurred: " + e.getMessage();
        }
    }
}

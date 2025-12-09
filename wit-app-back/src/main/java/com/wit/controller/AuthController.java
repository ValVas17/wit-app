package com.wit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.wit.entity.User;
import com.wit.dto.AuthRequest;
import com.wit.dto.AuthResponse;
import com.wit.dto.RegisterRequest;
import com.wit.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) 
    {
        try {
            User user = userService.registerUser(
                request.getLogin(), 
                request.getEmail(), 
                request.getPassword()
            );

            AuthResponse response = new AuthResponse(
                true,
                "Регистрация успешна",
                new AuthResponse.UserData(
                    user.getId(),
                    user.getLogin(),
                    user.getEmail(),
                    user.getLevelId()
                )
            );
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            AuthResponse response = new AuthResponse(false, e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        try {
            User user = userService.authenticate(
                request.getLoginOrEmail(), 
                request.getPassword()
            );

            AuthResponse response = new AuthResponse(
                true,
                "Вход выполнен успешно",
                new AuthResponse.UserData(
                    user.getId(),
                    user.getLogin(),
                    user.getEmail(),
                    user.getLevelId()
                )
            );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            AuthResponse response = new AuthResponse(false, e.getMessage());
            return ResponseEntity.status(401).body(response); // 401 Unauthorized
        }
    }

    @GetMapping("/check")
    public String check() {
        return "Auth API работает! ✅";
    }
    
}

package com.wit.controller;

import com.wit.dto.*;
import com.wit.entity.User;
import com.wit.service.JwtService;
import com.wit.service.UserService;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) 
    {
        try {
            User user = userService.registerUser(
                request.getLogin(), 
                request.getEmail(), 
                request.getPassword()
            );

            // Генерируем JWT токен
            String token = jwtService.generateToken(user.getLogin());

            AuthResponse response = new AuthResponse(
                true,
                "Регистрация успешна",
                token,
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

            // Генерируем JWT токен
            String token = jwtService.generateToken(user.getLogin());

            AuthResponse response = new AuthResponse(
                true,
                "Вход выполнен успешно",
                token,
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

    // Валидация токена
    @PostMapping("/validate")
    public ResponseEntity<AuthResponse> validateToken(@RequestBody TokenRequest request) {
        try {
            String username = jwtService.extractUsername(request.getToken());
            boolean isValid = jwtService.validateToken(request.getToken(), username);
            
            if (isValid) {
                User user = userService.findByLogin(username);
                return ResponseEntity.ok(new AuthResponse(
                    true,
                    "Токен валиден",
                    request.getToken(),
                    new AuthResponse.UserData(
                        user.getId(),
                        user.getLogin(),
                        user.getEmail(),
                        user.getLevelId()
                    )
                ));
            } else {
                return ResponseEntity.status(401).body(new AuthResponse(false, "Токен недействителен"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new AuthResponse(false, "Ошибка валидации токена"));
        }
    }
    
    @PostMapping("/encrypt-passwords")
    public ResponseEntity<?> encryptPasswords() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        Map<String, String> result = new HashMap<>();
        result.put("password_123", encoder.encode("123"));
        result.put("password_123456", encoder.encode("123456"));
        
        return ResponseEntity.ok(result);
    }
}

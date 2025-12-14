package com.wit.controller;

import com.wit.dto.PasswordResetRequest;
import com.wit.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/password")
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordResetController {
    
    @Autowired
    private PasswordResetService passwordResetService;
    
    @PostMapping("/request-reset")
    public ResponseEntity<?> requestPasswordReset(@RequestBody PasswordResetRequest request) {
        try {
            passwordResetService.requestPasswordReset(request.getEmail());
            return ResponseEntity.ok("Инструкции по восстановлению пароля отправлены на email");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {
        try {
            passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok("Пароль успешно изменен");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
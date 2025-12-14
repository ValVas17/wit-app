package com.wit.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PasswordResetRequest {
    
    @Email(message = "Некорректный email адрес")
    private String email;
    
    private String token;
    
    @Size(min = 6, message = "Пароль должен содержать минимум 6 символов")
    private String newPassword;
    
    // Геттеры и сеттеры
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
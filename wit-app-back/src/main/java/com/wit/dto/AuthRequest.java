package com.wit.dto;

// import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthRequest {
    
    @NotBlank(message = "Логин или email не может быть пустым")
    private String loginOrEmail;
    
    @NotBlank(message = "Пароль не может быть пустым")
    @Size(min = 6, message = "Пароль должен содержать минимум 6 символов")
    private String password;
    
    // Геттеры и сеттеры
    public String getLoginOrEmail() { return loginOrEmail; }
    public void setLoginOrEmail(String loginOrEmail) { this.loginOrEmail = loginOrEmail; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
package com.wit.dto;

public class AuthResponse {
    private boolean success;
    private String message;
    private UserData user;
    
    // Конструкторы
    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    
    public AuthResponse(boolean success, String message, UserData user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }
    
    // Геттеры и сеттеры
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public UserData getUser() { return user; }
    public void setUser(UserData user) { this.user = user; }
    
    // Вложенный класс для данных пользователя
    public static class UserData {
        private Integer id;
        private String login;
        private String email;
        private Integer levelId;
        
        public UserData(Integer id, String login, String email, Integer levelId) {
            this.id = id;
            this.login = login;
            this.email = email;
            this.levelId = levelId;
        }
        
        // Геттеры
        public Integer getId() { return id; }
        public String getLogin() { return login; }
        public String getEmail() { return email; }
        public Integer getLevelId() { return levelId; }
    }
}
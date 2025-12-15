package com.wit.service;

import com.wit.entity.User;
import com.wit.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class PasswordResetService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Value("${jwt.secret}")
    private String secretKey;
    
    // Запрос на восстановление пароля
    public String requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Пользователь с таким email не найден"));
        
        // Генерируем токен сброса (действителен 1 час)
        String resetToken = generateResetToken(user.getLogin());
        
        // В реальном приложении отправляем email
        // Пока выводим в консоль
        System.out.println("=====================================");
        System.out.println("СООБЩЕНИЕ ДЛЯ ВОССТАНОВЛЕНИЯ ПАРОЛЯ:");
        System.out.println("Email: " + user.getEmail());
        System.out.println("Токен для сброса: " + resetToken);
        System.out.println("Ссылка: http://localhost:3000/reset-password?token=" + resetToken);
        System.out.println("=====================================");
        
        return resetToken;
    }
    
    // Сброс пароля
    public void resetPassword(String token, String newPassword) {
        try {
            // Извлекаем логин из токена
            String username = extractUsernameFromResetToken(token);
            
            User user = userRepository.findByLogin(username)
                    .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
            
            // Обновляем пароль
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            
        } catch (Exception e) {
            throw new RuntimeException("Недействительный или просроченный токен");
        }
    }
    
    private String generateResetToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "password_reset");
        
        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 3600000)) // 1 час
                .signWith(getSignKey())
                .compact();
    }
    
    private String extractUsernameFromResetToken(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
    
    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
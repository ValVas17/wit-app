package com.wit.service;

import com.wit.entity.User;
import com.wit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PasswordResetService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private JwtService jwtService;
    
    // Запрос на восстановление пароля
    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Пользователь с таким email не найден"));
        
        // Генерируем токен для сброса пароля с дополнительным claim
        Map<String, Object> claims = new HashMap<>();
        claims.put("reset", true);
        String resetToken = jwtService.generateToken(user.getLogin() + "_reset", claims);


        sendResetEmail(user.getEmail(), resetToken);
    }
    
    public void resetPassword(String token, String newPassword) {
        try {
            String usernameWithSuffix = jwtService.extractUsername(token);
            String username = usernameWithSuffix.replace("_reset", "");
            
            User user = userRepository.findByLogin(username)
                    .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Недействительный или просроченный токен");
        }
    }
    
    private void sendResetEmail(String toEmail, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Восстановление пароля - English With Wit");
        message.setText("Для восстановления пароля перейдите по ссылке:\n" +
                       "http://localhost:3000/reset-password?token=" + resetToken + "\n\n" +
                       "Токен для сброса пароля: " + resetToken + "\n\n" +
                       "Если вы не запрашивали восстановление пароля, проигнорируйте это письмо.");
        
        mailSender.send(message);
    }
}
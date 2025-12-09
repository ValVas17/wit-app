package com.wit.service;

import com.wit.entity.User;
import com.wit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public User registerUser(String login, String email, String password) 
    {
        if (userRepository.existsByLogin(login)) {
            throw new RuntimeException("Пользователь с таким логином уже существует");
        }
        
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Пользователь с таким email уже существует");
        }
        
        User user = new User(login, email, password);
        return userRepository.save(user);
    }
    
    public User authenticate(String loginOrEmail, String password) 
    {
        User user = userRepository.findByLogin(loginOrEmail)
                .orElse(userRepository.findByEmail(loginOrEmail)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден")));
        
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Неверный пароль");
        }
        
        return user;
    }
}

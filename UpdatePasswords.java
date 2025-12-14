package com.wit;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UpdatePasswords implements CommandLineRunner {
    
    @Override
    public void run(String... args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        System.out.println("Зашифрованные пароли для обновления в БД:");
        System.out.println("=========================================");
        System.out.println("Пароль '123': " + encoder.encode("123"));
        System.out.println("Пароль '123456': " + encoder.encode("123456"));
        System.out.println("=========================================");
    }
}

package com.wit.controller;

import com.wit.entity.Lesson;
import com.wit.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController                     // возвращает JSON - @Controller + @ResponseBody
@RequestMapping("/api/lessons")

public class LessonController {
    
    // Внедряем зависимость - Spring сам создаст и передаст LessonRepository
    @Autowired
    private LessonRepository lessonRepository;
    
    // GET /api/lessons - получить все уроки
    
    @GetMapping
    public List<Lesson> getAllLessons() {
        List<Lesson> lessons = lessonRepository.findAll();
        System.out.println("📦 Отправляю уроки: " + lessons.size() + " шт.");
        return lessons;
    }
    
    // Тестовый endpoint для проверки подключения
    @GetMapping("/test")
    public String test() {
        return "✅ Spring Boot API работает! Время: " + new java.util.Date();
    }

    // public List<Lesson> getAllLessons() {
    //     return lessonRepository.findAll();  // метод из JpaRepository
    // }
    
    // Мы позже добавим другие методы (получение по ID, создание и т.д.)
}
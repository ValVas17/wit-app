package com.wit.repository; 

import com.wit.entity.Lesson;           // Импортируем сущность
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Интерфейс, а не класс! Spring создаст реализацию сам.
@Repository             // компонент для работы с БД
public interface LessonRepository extends JpaRepository<Lesson, Integer> {

    // наследуемся от JpaRepository, который уже имеет все базовые методы

}
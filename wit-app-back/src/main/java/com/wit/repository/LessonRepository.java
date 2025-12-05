package com.wit.repository; 

import com.wit.entity.Lesson;           // Импортируем сущность
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// Интерфейс, а не класс! Spring создаст реализацию сам.
@Repository             // компонент для работы с БД
public interface LessonRepository extends JpaRepository<Lesson, Integer> {

    // Получить все уроки с навыками (решает проблему N+1)
    @Query("SELECT DISTINCT l FROM Lesson l LEFT JOIN FETCH l.skills ORDER BY l.sortOrder ASC")
    List<Lesson> findAllWithSkills();
    
    // Получить урок по ID с навыками
    @Query("SELECT l FROM Lesson l LEFT JOIN FETCH l.skills WHERE l.id = :id")
    Optional<Lesson> findByIdWithSkills(Integer id);
    
    List<Lesson> findAllByOrderBySortOrderAsc();
    List<Lesson> findByLevelId(Integer levelId);
    List<Lesson> findByTitleContainingIgnoreCase(String title);

}
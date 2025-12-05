package com.wit.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity                         // "это таблица БД"
@Table(name = "lessons")        // "конкретно таблица lessons"
public class Lesson {
    @Id                         // "это primary key"
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "number")    // "это колонка таблицы"
    private Integer number;

    @Column(name = "level_id")
    private Integer levelId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "img_src")
    private String imgSrc;

    @Column(name = "sort_order")
    private Integer sortOrder;

    // @Column(name = "led")
    // private String led;

    // @Column(name = "created_at")
    // private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Конструкторы (Пустой нужен   Spring)
    public Lesson() {}

    // Геттеры и сеттеры
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getNumber() { return number; }
    public void setNumber(Integer number) { this.number = number; }

    public Integer getLevelId() { return levelId; }
    public void setLevelId(Integer levelId) { this.levelId = levelId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImgSrc() { return imgSrc; }
    public void setImgSrc(String imgSrc) { this.imgSrc = imgSrc; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    // public String getLed() { return led; }
    // public void setLed(String led) { this.led = led; }

    // public LocalDateTime getCreatedAt() { return createdAt; }
    // public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
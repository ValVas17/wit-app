package com.wit.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    // Связь many-to-many с навыками
    // @ManyToMany
    // @JoinTable(
    //     name = "lesson_skills",  // Имя промежуточной таблицы
    //     joinColumns = @JoinColumn(name = "lesson_id"),  // Столбец для урока
    //     inverseJoinColumns = @JoinColumn(name = "skill_id")  // Столбец для навыка
    // )
    // private Set<Skill> skills = new HashSet<>();
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "lesson_skills",
        joinColumns = @JoinColumn(name = "lesson_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    @JsonIgnoreProperties("lessons")  // Игнорируем поле "lessons" в Skill
    private Set<Skill> skills = new HashSet<>();

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

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Set<Skill> getSkills() { return skills; }
    public void setSkills(Set<Skill> skills) { this.skills = skills; }
    
    public void addSkill(Skill skill) {
        this.skills.add(skill);
        skill.getLessons().add(this);
    }
    
    public void removeSkill(Skill skill) {
        this.skills.remove(skill);
        skill.getLessons().remove(this);
    }
}
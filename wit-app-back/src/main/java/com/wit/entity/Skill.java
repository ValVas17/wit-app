package com.wit.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "skills")
public class Skill {
    // поля
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    // Связь many-to-many с уроками
    // @ManyToMany(mappedBy = "skills")
    // private Set<Lesson> lessons = new HashSet<>();
    @ManyToMany(mappedBy = "skills", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("skills")  // Игнорируем поле "skills" в Lesson
    private Set<Lesson> lessons = new HashSet<>();

    // конструкторы
    public Skill() {}

    public Skill (String name)
    {
        this.name = name;
    }

    // геттеры-сеттеры
    public Integer getId () { return id; }
    public void setId (Integer id) { this.id = id; }

    public String getName () { return name; }
    public void setName (String name ) { this.name = name;  }

    public Set<Lesson> getLessons () { return lessons; }
    public void setLessons ( Set<Lesson> lessons ) { this.lessons = lessons; }
}

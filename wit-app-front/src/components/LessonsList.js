import React, { useState, useEffect } from 'react';
import './LessonsList.css';
import Lesson from './Lesson';

const LessonsList = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        console.log('🔄 Загружаю уроки...');

        const response = await fetch('http://localhost:8080/api/lessons');

        if (!response.ok) {
          throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Получены уроки:', data);

        // Проверяем структуру данных
        data.forEach(lesson => {
          console.log(`Урок ${lesson.title}:`, {
            id: lesson.id,
            skillsCount: lesson.skills?.length || 0,
            skills: lesson.skills?.map(s => s.name) || []
          });
        });

        setLessons(data);

      } catch (err) {
        console.error('❌ Ошибка загрузки:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) return <div>Loading lessons...</div>;
  if (error) return <div>Error: {error}</div>;
  if (lessons.length === 0) return <div>No lessons found</div>;

  return (
    <div className="lessons-container">
      {/* <div className="lessons-title">{lessons.length} lessons available</div> */}

      {lessons.map(lesson => {
        const skillNames = lesson.skills
          ? lesson.skills.map(skill => skill.name)
          : [];

        return (
          <Lesson lessonNumber={lesson.number}
            label='Freshman'
            title={lesson.title}
            description={lesson.description}
            skills={skillNames}//{['vocabulary', 'reading', 'listening']}
            imageSrc={lesson.imgSrc}
            score='2'
            level='7'
            state='3' />
        )
      })}


      {/* <div className="lessons-grid">
        {lessons.map(lesson => (
          <div key={lesson.id} className="lesson-card">
            <div className="lesson-header">
              <span className="lesson-number">Урок #{lesson.number}</span>
              <span className="lesson-level">{lesson.level}</span>
            </div>

            <h3 className="lesson-title">{lesson.title}</h3>

            {lesson.description && (
              <p className="lesson-description">{lesson.description}</p>
            )}

            {lesson.imgSrc && (
              <div className="lesson-image">
                <img
                  src={lesson.imgSrc}
                  alt={lesson.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-lesson.jpg';
                  }}
                />
              </div>
            )}

            <div className="lesson-footer">
              <button className="start-button">
                Начать урок
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default LessonsList;
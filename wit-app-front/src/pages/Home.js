import React from 'react';
import Banner from '../components/Banner';
import WeeklyPhrase from '../components/WeeklyPhrase';
import LessonsList from '../components/LessonsList';
import ScoreLine from '../components/ScoreLine';

const Home = () => {
  return (
    <>
      <Banner moduleNum='35' taskNum='143' />
      
      <WeeklyPhrase 
        phrase='When pigs fly'
        meaning='Never.'
        example='He`ll clean his room when pigs fly.'
        src='{Image}'
        alt='Flying Pig Illustration'
        emojis='🐷✨' 
      />

      <div className="lessons-header">
        <div className="lessons-title">Lessons available: </div>
        {/* Можно добавить ScoreLine когда будешь готова */}
        {/* <ScoreLine /> */}
        
        {/* Пример шкалы сложности (если понадобится позже) */}
        {/* 
        <div className="difficulty-label">Difficulty Scale</div>
        <div className="level-markers">
          <span className="level-marker marker-1">
            <div className="marker-tooltip">Freshman</div>
          </span>
          <span className="level-marker marker-2">
            <div className="marker-tooltip">Sophomore</div>
          </span>
          <span className="level-marker marker-3">
            <div className="marker-tooltip">Junior</div>
          </span>
          <span className="level-marker marker-4">
            <div className="marker-tooltip">Senior</div>
          </span>
        </div>
        */}
      </div>

      <div className="lessons-container">
        <LessonsList />
      </div>
    </>
  );
};

export default Home;
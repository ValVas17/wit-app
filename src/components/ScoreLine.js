import React, { useState } from 'react';
import './ScoreLine.css'; // или прямо в Styles.css

const ScoreLine = () => {
  const [selectedLevels, setSelectedLevels] = useState([]);

  const levels = [
    { id: 1, name: '🌱' },
    { id: 2, name: '🌿' },
    { id: 3, name: '🌳' },
    { id: 4, name: '🚀' }
  ];

  const toggleLevel = (levelId) => {
    if (selectedLevels.includes(levelId)) {
      setSelectedLevels(selectedLevels.filter(id => id !== levelId));
    } else {
      setSelectedLevels([...selectedLevels, levelId]);
    }
  };

  return (
    <div className="score-line">
      {levels.map(level => (
        <button
          key={level.id}
          className={`score-line-button ${selectedLevels.includes(level.id) ? 'active' : ''}`}
          onClick={() => toggleLevel(level.id)}
        >
          {level.name}
        </button>
      ))}
    </div>
  );
};

export default ScoreLine;
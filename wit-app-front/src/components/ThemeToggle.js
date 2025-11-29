import React from 'react';
import { useTheme } from './ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <button 
        className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <div className="toggle-track">
          <div className="toggle-thumb">
            <div className="sun-moon-icon">
              {isDark ? '🌙' : '☀️'}
            </div>
          </div>
        </div>
        <div className="theme-icons">
          <span className="sun-icon">☀️</span>
          <span className="moon-icon">🌙</span>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
import React from 'react';

const ThemeToggle = ({ darkMode, toggleTheme }) => (
  <button 
    onClick={toggleTheme} 
    className="p-2 rounded-full hover:bg-gray-700 transition"
  >
    {darkMode ? '🌞' : '🌙'}
  </button>
);

export default ThemeToggle;

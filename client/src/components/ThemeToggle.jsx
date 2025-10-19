import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <span
        className={`inline-flex h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 items-center justify-center ${
          isDarkMode ? 'translate-x-8' : 'translate-x-1'
        }`}
      >
        {/* Center icons within the knob */}
        <Sun
          className={`h-4 w-4 text-yellow-500 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <Moon
          className={`h-4 w-4 text-blue-400 transition-opacity duration-300 absolute ${
            isDarkMode ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </span>
      {/* Keep subtle static icons positions for context */}
      <Sun
        className={`absolute left-1.5 h-4 w-4 text-yellow-500/40 transition-opacity duration-300 ${
          isDarkMode ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <Moon
        className={`absolute right-1.5 h-4 w-4 text-blue-400/40 transition-opacity duration-300 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;

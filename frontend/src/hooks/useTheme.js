import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Custom hook for managing application theme (light/dark mode)
 * @param {string} defaultTheme - Default theme to use ('light' or 'dark')
 * @returns {Object} - Theme state and functions to control it
 */
const useTheme = (defaultTheme = 'light') => {
  // Check if user has a saved preference or if they prefer dark mode
  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return defaultTheme;
  };

  const [theme, setTheme] = useState(getSavedTheme);
  const [isLoading, setIsLoading] = useState(true);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
      return newTheme;
    });
  };

  // Set a specific theme
  const setSpecificTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
      setTheme(newTheme);
    }
  };

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme class
    root.classList.remove('light-theme', 'dark-theme');
    
    // Add current theme class
    root.classList.add(`${theme}-theme`);
    
    // Set data-theme attribute for CSS variables
    root.setAttribute('data-theme', theme);
    
    setIsLoading(false);
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only change theme if user hasn't manually set a preference
      if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return {
    theme,
    isDarkMode: theme === 'dark',
    isLightMode: theme === 'light',
    toggleTheme,
    setTheme: setSpecificTheme,
    isLoading
  };
};

export default useTheme;
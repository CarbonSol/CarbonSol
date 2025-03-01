import { useState, useEffect } from 'react';
import { debounce } from '../utils/helpers';

/**
 * Custom hook for tracking window dimensions
 * @returns {Object} - Window width, height, and breakpoint information
 */
const useWindowSize = () => {
  // Initialize with undefined to detect client-side rendering
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine breakpoints
      // These values should match your CSS media queries
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const isDesktop = width >= 1024 && width < 1280;
      const isLargeDesktop = width >= 1280;
      
      setWindowSize({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop
      });
    }, 150);
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect runs only on mount and unmount

  return windowSize;
};

export default useWindowSize; 
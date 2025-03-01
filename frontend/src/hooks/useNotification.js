import { useState, useCallback } from 'react';
import { generateId } from '../utils/helpers';

/**
 * Custom hook for managing notifications
 * @returns {Object} - Notification state and functions
 */
const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Add a notification
   * @param {Object} notification - Notification object
   * @param {string} notification.type - Notification type ('success', 'error', 'warning', 'info')
   * @param {string} notification.message - Notification message
   * @param {number} notification.duration - Duration in milliseconds (default: 5000)
   * @returns {string} - Notification ID
   */
  const addNotification = useCallback(({ type = 'info', message, duration = 5000 }) => {
    const id = generateId();
    
    const newNotification = {
      id,
      type,
      message,
      duration,
      timestamp: Date.now()
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    
    return id;
  }, []);

  /**
   * Remove a notification by ID
   * @param {string} id - Notification ID
   */
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  /**
   * Clear all notifications
   */
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Add a success notification
   * @param {string} message - Notification message
   * @param {number} duration - Duration in milliseconds (default: 5000)
   * @returns {string} - Notification ID
   */
  const success = useCallback((message, duration = 5000) => {
    return addNotification({ type: 'success', message, duration });
  }, [addNotification]);

  /**
   * Add an error notification
   * @param {string} message - Notification message
   * @param {number} duration - Duration in milliseconds (default: 5000)
   * @returns {string} - Notification ID
   */
  const error = useCallback((message, duration = 5000) => {
    return addNotification({ type: 'error', message, duration });
  }, [addNotification]);

  /**
   * Add a warning notification
   * @param {string} message - Notification message
   * @param {number} duration - Duration in milliseconds (default: 5000)
   * @returns {string} - Notification ID
   */
  const warning = useCallback((message, duration = 5000) => {
    return addNotification({ type: 'warning', message, duration });
  }, [addNotification]);

  /**
   * Add an info notification
   * @param {string} message - Notification message
   * @param {number} duration - Duration in milliseconds (default: 5000)
   * @returns {string} - Notification ID
   */
  const info = useCallback((message, duration = 5000) => {
    return addNotification({ type: 'info', message, duration });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info
  };
};

export default useNotification; 
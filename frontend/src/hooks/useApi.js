import { useState, useCallback } from 'react';
import { retry } from '../utils/helpers';

/**
 * Custom hook for making API requests with loading and error states
 * @param {Function} apiFunction - API function to call
 * @param {Object} options - Options for the API call
 * @returns {Object} - API call state and functions
 */
const useApi = (apiFunction, options = {}) => {
  const {
    initialData = null,
    onSuccess = () => {},
    onError = () => {},
    autoRetry = false,
    maxRetries = 3,
    retryDelay = 1000
  } = options;

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Execute the API call
   * @param {...any} args - Arguments to pass to the API function
   * @returns {Promise<any>} - Promise that resolves with the API response
   */
  const execute = useCallback(async (...args) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      let response;
      
      if (autoRetry) {
        response = await retry(
          () => apiFunction(...args),
          maxRetries,
          retryDelay
        );
      } else {
        response = await apiFunction(...args);
      }
      
      setData(response);
      setIsSuccess(true);
      onSuccess(response);
      return response;
    } catch (err) {
      setError(err);
      onError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction, autoRetry, maxRetries, retryDelay, onSuccess, onError]);

  /**
   * Reset the hook state
   */
  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setIsLoading(false);
    setIsSuccess(false);
  }, [initialData]);

  return {
    data,
    error,
    isLoading,
    isSuccess,
    execute,
    reset
  };
};

export default useApi; 
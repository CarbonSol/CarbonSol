/**
 * Validate an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

/**
 * Validate a password strength
 * @param {string} password - The password to validate
 * @returns {Object} - Validation result with strength score and feedback
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      score: 0,
      feedback: 'Password is required'
    };
  }

  let score = 0;
  const feedback = [];

  // Length check
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long');
  } else {
    score += 1;
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    feedback.push('Password should contain at least one uppercase letter');
  } else {
    score += 1;
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    feedback.push('Password should contain at least one lowercase letter');
  } else {
    score += 1;
  }

  // Number check
  if (!/[0-9]/.test(password)) {
    feedback.push('Password should contain at least one number');
  } else {
    score += 1;
  }

  // Special character check
  if (!/[^A-Za-z0-9]/.test(password)) {
    feedback.push('Password should contain at least one special character');
  } else {
    score += 1;
  }

  return {
    isValid: score >= 4,
    score,
    feedback: feedback.length > 0 ? feedback : ['Password is strong']
  };
};

/**
 * Validate a Solana wallet address
 * @param {string} address - The wallet address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidSolanaAddress = (address) => {
  // Basic check for Solana address format (base58 encoding, 32-44 characters)
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
};

/**
 * Validate a number is within a range
 * @param {number} value - The value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {boolean} - True if valid, false otherwise
 */
export const isInRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validate a URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validate a date is in the future
 * @param {Date|string} date - The date to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isFutureDate = (date) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj > new Date();
};

/**
 * Validate form data against a schema
 * @param {Object} data - The form data to validate
 * @param {Object} schema - Validation schema with field rules
 * @returns {Object} - Validation result with errors
 */
export const validateForm = (data, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(field => {
    const value = data[field];
    const rules = schema[field];
    
    if (rules.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
    } else if (value) {
      if (rules.minLength && value.length < rules.minLength) {
        errors[field] = `${field} should be at least ${rules.minLength} characters`;
      }
      
      if (rules.maxLength && value.length > rules.maxLength) {
        errors[field] = `${field} should not exceed ${rules.maxLength} characters`;
      }
      
      if (rules.pattern && !rules.pattern.test(value)) {
        errors[field] = rules.message || `${field} is invalid`;
      }
      
      if (rules.custom && typeof rules.custom === 'function') {
        const customError = rules.custom(value, data);
        if (customError) {
          errors[field] = customError;
        }
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 
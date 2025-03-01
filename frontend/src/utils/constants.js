/**
 * Application constants
 */

// API endpoints
export const API_BASE_URL = 'http://localhost:5000/api';
export const SOLANA_RPC_ENDPOINT = 'https://api.devnet.solana.com';

// Token constants
export const TOKEN_SYMBOLS = {
  CST: 'CST',
  VCU: 'VCU',
  SOL: 'SOL'
};

export const TOKEN_NAMES = {
  CST: 'Carbon Stable Token',
  VCU: 'Verified Carbon Unit',
  SOL: 'Solana'
};

// Transaction types
export const TRANSACTION_TYPES = {
  BUY: 'Buy',
  SELL: 'Sell',
  OFFSET: 'Offset',
  TRANSFER: 'Transfer'
};

// Transaction statuses
export const TRANSACTION_STATUSES = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled'
};

// Carbon project categories
export const PROJECT_CATEGORIES = [
  { id: 'all', name: 'All Projects' },
  { id: 'forest', name: 'Forest Conservation' },
  { id: 'renewable', name: 'Renewable Energy' },
  { id: 'agriculture', name: 'Sustainable Agriculture' },
  { id: 'waste', name: 'Waste Management' },
  { id: 'ocean', name: 'Ocean Protection' }
];

// Carbon footprint categories
export const FOOTPRINT_CATEGORIES = {
  ENERGY: 'Energy',
  TRANSPORTATION: 'Transportation',
  FOOD: 'Food',
  GOODS: 'Goods & Services',
  HOME: 'Home'
};

// Chart colors
export const CHART_COLORS = {
  primary: 'rgba(75, 192, 192, 0.6)',
  secondary: 'rgba(54, 162, 235, 0.6)',
  tertiary: 'rgba(255, 206, 86, 0.6)',
  quaternary: 'rgba(255, 99, 132, 0.6)',
  quinary: 'rgba(153, 102, 255, 0.6)'
};

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'carbonsol_user_preferences',
  FOOTPRINT_DATA: 'carbonsol_footprint_data',
  RECENT_PROJECTS: 'carbonsol_recent_projects',
  THEME: 'carbonsol_theme'
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Form validation
export const VALIDATION_RULES = {
  EMAIL: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Please enter a valid email address'
  },
  PASSWORD: {
    required: true,
    minLength: 8,
    message: 'Password must be at least 8 characters long'
  },
  NAME: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters'
  }
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  WALLET_CONNECTION_ERROR: 'Failed to connect wallet. Please try again.',
  TRANSACTION_ERROR: 'Transaction failed. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  TRANSACTION_COMPLETED: 'Transaction completed successfully!',
  WALLET_CONNECTED: 'Wallet connected successfully!',
  FORM_SUBMITTED: 'Form submitted successfully!'
};

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  TRADE: '/trade',
  PROJECTS: '/projects',
  FOOTPRINT: '/footprint',
  WALLET: '/wallet',
  ABOUT: '/about'
}; 
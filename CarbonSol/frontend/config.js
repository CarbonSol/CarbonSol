// CarbonSol Frontend Configuration

// Environment
export const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || 'development';

// Solana Network Configuration
export const SOLANA_NETWORK = process.env.REACT_APP_SOLANA_NETWORK || 'devnet';
export const SOLANA_RPC_URL = process.env.REACT_APP_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

// Program IDs
// These would be replaced with actual program IDs after deployment
export const CST_PROGRAM_ID = process.env.REACT_APP_CST_PROGRAM_ID || '11111111111111111111111111111111';
export const VCU_PROGRAM_ID = process.env.REACT_APP_VCU_PROGRAM_ID || '11111111111111111111111111111111';
export const DEX_PROGRAM_ID = process.env.REACT_APP_DEX_PROGRAM_ID || '11111111111111111111111111111111';

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
export const API_TIMEOUT = 10000; // 10 seconds

// Feature Flags
export const FEATURES = {
  PRICE_PREDICTION: true,
  CARBON_FOOTPRINT_CALCULATOR: true,
  PROJECT_ANALYSIS: true,
  TRADING: true,
};

// Token Configuration
export const TOKENS = {
  CST: {
    name: 'CarbonSol Token',
    symbol: 'CST',
    decimals: 9,
    logo: '/assets/cst-logo.svg',
  },
  VCU: {
    name: 'Verified Carbon Unit',
    symbol: 'VCU',
    decimals: 6,
    logo: '/assets/vcu-logo.svg',
  },
};

// Carbon Project Categories
export const PROJECT_CATEGORIES = [
  'Renewable Energy',
  'Forestry & Conservation',
  'Methane Reduction',
  'Energy Efficiency',
  'Waste Management',
  'Agriculture',
  'Transportation',
];

// Carbon Standards
export const CARBON_STANDARDS = [
  'Verified Carbon Standard (VCS)',
  'Gold Standard',
  'Climate Action Reserve (CAR)',
  'American Carbon Registry (ACR)',
  'Clean Development Mechanism (CDM)',
];

// UI Configuration
export const UI_CONFIG = {
  THEME: 'light', // 'light' or 'dark'
  ANIMATION_SPEED: 300, // milliseconds
  CHART_COLORS: {
    primary: '#3ECF8E',
    secondary: '#6C63FF',
    success: '#48BB78',
    warning: '#ECC94B',
    danger: '#F56565',
    info: '#4299E1',
  },
}; 
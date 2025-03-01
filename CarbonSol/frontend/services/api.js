// API Service for CarbonSol
// Handles all API calls to the backend services

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Helper function for making API requests
const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(url, {
    ...options,
    signal: controller.signal
  });
  
  clearTimeout(id);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API request failed with status ${response.status}`);
  }
  
  return response.json();
};

// API service object
const apiService = {
  // Price prediction API
  getPricePrediction: async (tokenSymbol, days = 30) => {
    try {
      return await fetchWithTimeout(`${API_BASE_URL}/price-prediction?token=${tokenSymbol}&days=${days}`);
    } catch (error) {
      console.error('Error fetching price prediction:', error);
      throw error;
    }
  },
  
  // Carbon footprint calculation API
  calculateCarbonFootprint: async (data) => {
    try {
      return await fetchWithTimeout(`${API_BASE_URL}/carbon-footprint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error calculating carbon footprint:', error);
      throw error;
    }
  },
  
  // Carbon project analysis API
  analyzeProject: async (projectId) => {
    try {
      return await fetchWithTimeout(`${API_BASE_URL}/project-analysis/${projectId}`);
    } catch (error) {
      console.error('Error analyzing project:', error);
      throw error;
    }
  },
  
  // Get list of carbon projects
  getProjects: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      return await fetchWithTimeout(`${API_BASE_URL}/projects?${queryParams}`);
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },
  
  // Get market data
  getMarketData: async () => {
    try {
      return await fetchWithTimeout(`${API_BASE_URL}/market-data`);
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  },
  
  // Get user portfolio data
  getUserPortfolio: async (walletAddress) => {
    try {
      return await fetchWithTimeout(`${API_BASE_URL}/portfolio/${walletAddress}`);
    } catch (error) {
      console.error('Error fetching user portfolio:', error);
      throw error;
    }
  },
};

export default apiService; 
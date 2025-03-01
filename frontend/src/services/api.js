import axios from 'axios';

// Base API URL
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service object
const apiService = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('API health check failed:', error);
      return {
        status: 'error',
        message: error.message || 'API health check failed'
      };
    }
  },
  
  // Price prediction
  predictPrice: async (data) => {
    try {
      const response = await apiClient.post('/predict/price', data);
      return response.data;
    } catch (error) {
      console.error('Price prediction failed:', error);
      return {
        status: 'error',
        message: error.message || 'Price prediction failed'
      };
    }
  },
  
  // Project analysis
  analyzeProject: async (data) => {
    try {
      const response = await apiClient.post('/analyze/project', data);
      return response.data;
    } catch (error) {
      console.error('Project analysis failed:', error);
      return {
        status: 'error',
        message: error.message || 'Project analysis failed'
      };
    }
  },
  
  // Carbon footprint calculation
  calculateFootprint: async (data) => {
    try {
      const response = await apiClient.post('/calculate/footprint', data);
      return response.data;
    } catch (error) {
      console.error('Carbon footprint calculation failed:', error);
      return {
        status: 'error',
        message: error.message || 'Carbon footprint calculation failed'
      };
    }
  }
};

export default apiService; 
/**
 * API utility functions for interacting with the backend
 */
import { API_BASE_URL } from './constants';

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
async function fetchWithErrorHandling(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Get carbon projects
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} - List of carbon projects
 */
export async function getCarbonProjects(params = {}) {
  const queryParams = new URLSearchParams(params).toString();
  const endpoint = `/projects${queryParams ? `?${queryParams}` : ''}`;
  return fetchWithErrorHandling(endpoint);
}

/**
 * Get carbon project details by ID
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} - Project details
 */
export async function getProjectById(projectId) {
  return fetchWithErrorHandling(`/projects/${projectId}`);
}

/**
 * Get carbon footprint data
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Carbon footprint data
 */
export async function getCarbonFootprint(userId) {
  return fetchWithErrorHandling(`/footprint/${userId}`);
}

/**
 * Save carbon footprint data
 * @param {string} userId - User ID
 * @param {Object} footprintData - Carbon footprint data
 * @returns {Promise<Object>} - Saved footprint data
 */
export async function saveCarbonFootprint(userId, footprintData) {
  return fetchWithErrorHandling(`/footprint/${userId}`, {
    method: 'POST',
    body: JSON.stringify(footprintData),
  });
}

/**
 * Get token price data
 * @param {string} tokenSymbol - Token symbol
 * @param {string} timeframe - Timeframe (e.g., '1d', '7d', '30d')
 * @returns {Promise<Object>} - Token price data
 */
export async function getTokenPriceData(tokenSymbol, timeframe = '7d') {
  return fetchWithErrorHandling(`/market/price/${tokenSymbol}?timeframe=${timeframe}`);
}

/**
 * Get user transaction history
 * @param {string} walletAddress - User wallet address
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} - Transaction history
 */
export async function getTransactionHistory(walletAddress, params = {}) {
  const queryParams = new URLSearchParams({
    wallet: walletAddress,
    ...params,
  }).toString();
  return fetchWithErrorHandling(`/transactions?${queryParams}`);
}

/**
 * Execute a token transaction
 * @param {Object} transactionData - Transaction data
 * @returns {Promise<Object>} - Transaction result
 */
export async function executeTransaction(transactionData) {
  return fetchWithErrorHandling('/transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData),
  });
}

/**
 * Get carbon offset certificates
 * @param {string} walletAddress - User wallet address
 * @returns {Promise<Array>} - List of carbon offset certificates
 */
export async function getCarbonCertificates(walletAddress) {
  return fetchWithErrorHandling(`/certificates?wallet=${walletAddress}`);
}

/**
 * Get market statistics
 * @returns {Promise<Object>} - Market statistics
 */
export async function getMarketStats() {
  return fetchWithErrorHandling('/market/stats');
}

/**
 * Get price prediction for a token
 * @param {string} tokenSymbol - Token symbol
 * @returns {Promise<Object>} - Price prediction data
 */
export async function getPricePrediction(tokenSymbol) {
  return fetchWithErrorHandling(`/market/prediction/${tokenSymbol}`);
}

export default {
  getCarbonProjects,
  getProjectById,
  getCarbonFootprint,
  saveCarbonFootprint,
  getTokenPriceData,
  getTransactionHistory,
  executeTransaction,
  getCarbonCertificates,
  getMarketStats,
  getPricePrediction,
}; 
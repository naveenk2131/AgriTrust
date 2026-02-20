import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // In production, use relative paths or your production API URL
  : 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add any headers here if authentication is implemented later
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global error responses here
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const batchService = {
  // Create a new batch
  createBatch: async (batchData) => {
    try {
      const response = await api.post('/api/batches', batchData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get batch by ID
  getBatchById: async (batchId) => {
    try {
      const response = await api.get(`/api/batches/${batchId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default api;
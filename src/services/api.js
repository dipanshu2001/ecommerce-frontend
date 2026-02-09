// src/services/api.js
import axios from 'axios';

// ✅ USE RELATIVE PATH when proxy is configured in package.json
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url
    });
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject({ ...error, message });
  }
);

export const itemService = {
  getAll: async () => {
    const response = await api.get('/items');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },
  create: async (itemData) => {
    const response = await api.post('/items', itemData);
    return response.data;
  },
  update: async (id, itemData) => {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  },
};

export default api;
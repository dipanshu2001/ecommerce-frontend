// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://simple-e-commerce-production.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
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
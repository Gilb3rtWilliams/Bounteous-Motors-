import axios from 'axios';

const API_URL = window.env?.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Car-related API calls
export const carAPI = {
  // Get all cars
  getAllCars: async () => {
    const response = await api.get('/cars');
    return response.data;
  },

  // Get car by ID
  getCarById: async (id) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },

  // Create new car listing
  createCar: async (carData) => {
    const response = await api.post('/cars', carData);
    return response.data;
  },

  // Update car listing
  updateCar: async (id, carData) => {
    const response = await api.put(`/cars/${id}`, carData);
    return response.data;
  },

  // Delete car listing
  deleteCar: async (id) => {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  }
};

export default api;

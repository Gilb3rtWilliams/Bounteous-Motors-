import axios from 'axios';

const API_URL = window.env?.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use correct token reference from localStorage
api.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = storedUser?.token;
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
    try {
      const response = await api.get('/cars');
      if (!response.data) {
        throw new Error('No data received from server');
      }
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
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
// Add this new section to your api.js file, alongside the carAPI object

export const orderAPI = {
  // Create a new order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get all orders for a user
  getUserOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Get specific order by ID
  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  }
};


export default api;

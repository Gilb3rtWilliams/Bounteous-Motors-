import axios from 'axios';
import { getToken, removeToken, isTokenValid } from '../utils/auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true // only if using cookies
});

// SINGLE request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (!token || !isTokenValid(token)) {
    console.warn('Token invalid or expired. Logging out.');
    removeToken();
    window.location.href = '/login';
    return Promise.reject('Authentication token expired');
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

// response interceptor (optional — handles backend 401s)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('401 from backend. Logging out.');
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from 'axios';
import { getToken, removeToken, isTokenValid } from '../utils/auth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
});

axiosInstance.interceptors.request.use(
    async (config) => {
        if (!isTokenValid()) {
            removeToken();
            window.location.href = '/login';
            return Promise.reject('Authentication token expired');
        }

        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use((config) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = storedUser?.token;
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export default axiosInstance;
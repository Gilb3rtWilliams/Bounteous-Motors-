import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Configure axios to always send the token if it exists
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Set the default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password
      }, {
        timeout: 5000 // 5 second timeout
      });

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      const userData = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      
      // Use the server-provided redirect path or fallback based on role
      const redirectPath = data.redirectTo || (userData.role === 'admin' ? '/admin-dashboard' : '/customer/dashboard');
      navigate(redirectPath);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      "Login failed";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: "customer" // Regular users are always customers
      });

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      return {
        success: true,
        message: data.message,
        redirectTo: data.redirectTo,
        redirectDelay: data.redirectDelay,
        userData: data.data
      };
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const registerAdmin = async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/admin-register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        adminCode: userData.adminCode
      });

      if (!data.success) {
        throw new Error(data.message || "Admin registration failed");
      }

      return {
        success: true,
        message: data.message,
        redirectTo: data.redirectTo,
        redirectDelay: data.redirectDelay,
        userData: data.data
      };
    } catch (error) {
      setError(error.response?.data?.message || "Admin registration failed");
      throw new Error(error.response?.data?.message || "Admin registration failed");
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const { data } = await axios.put(`${API_URL}/users/profile`, profileData);

      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email,
        token: data.token
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate("/");
  };

  const isAdmin = () => user?.role === "admin";
  const isCustomer = () => user?.role === "customer";

  const value = {
    user,
    loading,
    error,
    login,
    register,
    registerAdmin,
    logout,
    updateProfile,
    isAdmin,
    isCustomer
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

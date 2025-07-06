import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export const API_URL = 'http://localhost:5000/api';

export const useAuth = () => {
  try {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    
    // Add loading state check
    if (context.loading) {
      return { ...context, isLoading: true };
    }

    return context;
  } catch (error) {
    console.error('Auth context error:', error);
    return {
      user: null,
      loading: false,
      error: error.message,
      isLoading: false
    };
  }
};

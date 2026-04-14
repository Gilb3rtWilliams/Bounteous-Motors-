import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (!loading && user && requiredRole && user.role !== requiredRole) {
      navigate('/');
    }
  }, [user, loading, requiredRole, navigate]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

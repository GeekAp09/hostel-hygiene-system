import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../handlers/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;

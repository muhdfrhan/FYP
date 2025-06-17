import React from 'react';
import { Navigate } from 'react-router-dom';

// This component checks if a user is authenticated for a specific role
const PrivateRoute = ({ children, role }) => {
  const authToken = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');

  const isAuthenticated = authToken && userRole === role;

  // If authenticated for the correct role, render the children components.
  // Otherwise, navigate them to the login page for that role.
  return isAuthenticated ? children : <Navigate to={`/${role}/login`} />;
};

export default PrivateRoute;
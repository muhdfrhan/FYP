// src/components/Routing/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');

  // Check for token and if the stored role matches the required role
  const isAuthenticated = token && userRole === role;

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page for that role
    return <Navigate to={`/${role}/login`} replace />;
  }

  // If authenticated, render the nested routes via the <Outlet />
  return <Outlet />;
};

export default PrivateRoute;
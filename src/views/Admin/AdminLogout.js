// src/views/Admin/AdminLogout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('staffName');
    // Navigate to the admin login page after clearing data
    navigate('/admin/login');
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default AdminLogout;
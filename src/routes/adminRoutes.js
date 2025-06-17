// src/routes/adminRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminLayout from 'layouts/AdminLayout';
import AdminDashboard from 'views/Admin/AdminDashboard';
import AdminLogin from 'views/Admin/AdminLogin';
import AdminLogout from 'views/Admin/AdminLogout';
import PrivateRoute from 'routes/PrivateRoute';

const AdminRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="login" element={<AdminLogin />} />
    <Route path="logout" element={<AdminLogout />} />

    {/* Private routes wrapped by the security guard */}
    <Route element={<PrivateRoute role="admin" />}>
      {/* All private routes now render inside the AdminLayout */}
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* Add more private pages here, e.g., <Route path="manage-users" ... /> */}
      </Route>
    </Route>
  </Routes>
);

export default AdminRoutes;
// src/routes/financeRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts and Pages
import FinanceLayout from 'layouts/FinanceLayout';
import FinanceLogin from 'views/Finance/FinanceLogin';
import FinanceDashboard from 'views/Finance/FinanceDashboard';
import DisburseAid from 'views/Finance/DisbursedAid'; // Use the consistent name
import FinanceLogout from 'views/Finance/Logout';

// Import the security wrapper
import PrivateRoute from 'views/Finance/privateRoutes'; // Make sure this path is correct

const FinanceRoutes = () => (
  <Routes>
    {/* Routes that use the FinanceLayout (for authenticated finance staff) */}
    <Route
      path="/"
      element={
        <PrivateRoute role="finance">
          <FinanceLayout />
        </PrivateRoute>
      }
    >
      {/* The Outlet in FinanceLayout will render these */}
      <Route index element={<FinanceDashboard />} />
      <Route path="dashboard" element={<FinanceDashboard />} />
      <Route path="disburse" element={<DisburseAid />} />
    </Route>

    {/* Standalone routes that do NOT use the main layout */}
    <Route path="login" element={<FinanceLogin />} />
    <Route path="logout" element={<FinanceLogout />} />
  </Routes>
);

export default FinanceRoutes;
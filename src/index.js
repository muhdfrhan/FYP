// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

// --- IMPORT YOUR NEW ADMIN ROUTER ---
import AdminRoutes from 'routes/adminRoutes.js';
import FinanceRoutes from 'routes/financeRoutes.js'; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* All requests to /admin/... are now handled by AdminRoutes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Finance routes remain the same */}
      <Route path="/finance/*" element={<FinanceRoutes />} />

      {/* Default redirect for any unknown URL */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  </BrowserRouter>
);
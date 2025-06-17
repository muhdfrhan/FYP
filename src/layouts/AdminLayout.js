// src/layouts/AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom"; // --- KEY IMPORT ---
import AdminNavbar from "components/Navbars/AdminNavbar";
import AdminSidebar from "components/Sidebar/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminSidebar />
      <div className="main-content">
        <AdminNavbar />
        {/* The Outlet will render the correct page component */}
        {/* (e.g., AdminDashboard) based on the URL */}
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
// src/layouts/FinanceLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
// FIX: Import the new Finance components
import FinanceNavbar from "components/Navbars/FinanceNavBar";
import FinanceSidebar from "components/Sidebar/FinanceSideBar";
import { Container } from "reactstrap";

const FinanceLayout = () => {
  return (
    <>
      <FinanceSidebar />
      <div className="main-content">
        <FinanceNavbar />
        {/* The Outlet will render the current route's component (e.g., FinanceDashboard) */}
        <Outlet />
      </div>
    </>
  );
};

export default FinanceLayout;
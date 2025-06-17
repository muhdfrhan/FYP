// src/components/Navbars/FinanceNavBar.js
import React from "react";
import { Navbar, Container } from "reactstrap";

const FinanceNavbar = () => {
  // Use the 'staffName' key which our login logic sets
  const staffName = localStorage.getItem("staffName") || "Finance Staff";

  return (
    // FIX: Changed color to green (success) for visual distinction
    <Navbar className="navbar-top navbar-dark bg-success" expand="md" id="navbar-main">
      <Container fluid>
        <h4 className="mb-0 text-white text-uppercase d-none d-lg-inline-block">Finance Portal</h4>
        <span className="mb-0 font-weight-bold text-white">
            Welcome, {staffName}
        </span>
      </Container>
    </Navbar>
  );
};

export default FinanceNavbar;
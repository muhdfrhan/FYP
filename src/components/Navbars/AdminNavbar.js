// src/components/Navbars/AdminNavbar.js
import React from "react";
import { Navbar, Container } from "reactstrap";

const AdminNavbar = () => {
  const staffName = localStorage.getItem("staffName") || "Administrator";

  return (
   <Navbar style={{ backgroundColor: "#000000" }} className="navbar-top navbar-dark" expand="md" id="navbar-main">
      <Container fluid>
        <h4 className="mb-0 text-white text-uppercase d-none d-lg-inline-block">Zakat Supervisor Portal</h4>
        <span className="mb-0 font-weight-bold text-white">
          Welcome, {staffName}
        </span>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
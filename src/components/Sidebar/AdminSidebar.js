// src/components/Sidebar/AdminSidebar.js
import React from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Nav, NavItem, NavLink, Navbar, Container, Collapse } from "reactstrap";
import zakatLogo from "assets/img/zakat-icon.png";

const AdminSidebar = () => {
  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md">
      <Container fluid>
        <img src={zakatLogo} alt="Zakat Logo" className="navbar-brand-img" style={{ maxHeight: "70px", margin: "auto" }} />
        <Collapse navbar isOpen={true}>
          <Nav navbar className="mt-4">
            <NavItem>
              <NavLink to="/admin/dashboard" tag={RRNavLink}>
                <i className="ni ni-tv-2 text-primary" /> Dashboard
              </NavLink>
            </NavItem>
            {/* Add future links here */}
          </Nav>
          <hr className="my-3" />
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink to="/admin/logout" tag={RRNavLink}>
                <i className="ni ni-user-run text-info" /> Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminSidebar;
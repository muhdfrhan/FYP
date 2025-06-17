// src/components/Sidebar/FinanceSidebar.js
import React from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Nav, NavItem, NavLink, Navbar, Container, Collapse } from "reactstrap";
import zakatLogo from "assets/img/zakat-icon.png";

const FinanceSidebar = () => {
  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md">
      <Container fluid>
        <img
          src={zakatLogo}
          alt="Zakat Logo"
          className="img-fluid d-block mx-auto my-3"
          style={{ maxWidth: "120px", height: "auto" }}
        />
        <Collapse navbar isOpen={true}>
          <Nav navbar>
            <NavItem>
              {/* FIX: Link to the finance dashboard */}
              <NavLink to="/finance/dashboard" tag={RRNavLink}>
                <i className="ni ni-tv-2 text-primary" /> Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              {/* FIX: Link to the page for disbursing aid */}
              <NavLink to="/finance/disburse" tag={RRNavLink}>
                <i className="ni ni-money-coins text-success" /> Manage Disbursements
              </NavLink>
            </NavItem>
            {/* You can add a reports page later */}
            {/* <NavItem>
              <NavLink to="/finance/reports" tag={RRNavLink}>
                <i className="ni ni-chart-bar-32 text-green" /> Reports
              </NavLink>
            </NavItem> */}
            <NavItem>
              {/* FIX: Link to the finance logout page */}
              <NavLink to="/finance/logout" tag={RRNavLink}>
                <i className="ni ni-user-run text-info" /> Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default FinanceSidebar;
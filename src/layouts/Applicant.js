import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar";
import ApplicantNavbar from "components/Navbars/ApplicantNavBar"; // ✅ custom navbar
import routes from "routes.js";

const Applicant = () => {
  return (
    <>
      <Sidebar
        routes={routes.filter(route => route.layout === "/applicant")}
        logo={{
          innerLink: "/applicant/dashboard",
          imgSrc: require("../assets/img/zakat-icon.png"),
          imgAlt: "logo"
        }}
      />
      <div className="main-content">
        <ApplicantNavbar brandText={"Applicant Dashboard"} /> {/* ✅ Here */}
        <Routes>
          {routes.map((route, key) => {
            if (route.layout === "/applicant") {
              return (
                <Route
                  path={route.path}
                  element={<route.component />}
                  key={key}
                />
              );
            }
            return null;
          })}
          <Route path="*" element={<Navigate to="/applicant/dashboard" />} />
        </Routes>
      </div>
    </>
  );
};

export default Applicant;

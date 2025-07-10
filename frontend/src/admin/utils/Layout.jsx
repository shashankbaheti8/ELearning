import React from "react";
import Sidebar from "./Sidebar";
import "./util.css";

const Layout = ({ children }) => {
  return (
    <div className="dashboard-admin">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;

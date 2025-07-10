import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ isAuth }) => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">E-Learning</div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About</Link>
          {isAuth ? (
            <Link to="/account">Account</Link>
          ) : (
            <Link to="/login">Login / Register</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

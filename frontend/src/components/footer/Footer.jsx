import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>
          &copy; 2025 Your E-Learning Platform. All rights reserved. <br />
          Made by{" "}
          <a href="https://www.linkedin.com/in/shashankbaheti8" target="_blank" rel="noreferrer">
            <strong>Shashank Baheti</strong>
          </a>
        </p>
        <div className="social-links">
          <a href="#"><AiFillFacebook /></a>
          <a href="#"><AiFillTwitterSquare /></a>
          <a href="#"><AiFillInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

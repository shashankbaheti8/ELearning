import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaLightbulb,
  FaGlobe,
  FaRocket,
  FaChartLine,
  FaAward,
} from "react-icons/fa";
import "./about.css";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-container">
        {/* Intro */}
        <div className="intro">
          <h2>About Us</h2>
          <p>
            We are dedicated to providing high‑quality online courses to help
            individuals learn and grow in their desired fields. Our experienced
            instructors ensure practical, engaging, and effective learning.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="about-extra">
          <div className="mission">
            <h3>Our Mission</h3>
            <p>
              Empower learners across the globe through accessible, engaging,
              and practical education.
            </p>
          </div>
          <div className="vision">
            <h3>Our Vision</h3>
            <p>
              To build a future where anyone can learn anything, anytime,
              anywhere.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <h3>Why Choose Us</h3>
          <div className="features">
            <div className="feature-card">
              <FaUserGraduate className="icon" />
              <h4>Expert Instructors</h4>
              <p>Learn from top industry professionals with real‑world experience.</p>
            </div>
            <div className="feature-card">
              <FaLightbulb className="icon" />
              <h4>Practical Learning</h4>
              <p>Apply your skills through hands‑on projects and real challenges.</p>
            </div>
            <div className="feature-card">
              <FaGlobe className="icon" />
              <h4>Global Access</h4>
              <p>Study anytime, anywhere on any device.</p>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="journey-section">
          <h3>Our Journey</h3>
          <div className="journey-items">
            <div className="journey-card">
              <FaRocket className="icon" />
              <span className="year">2022</span>
              <p>Founded with 3 flagship courses</p>
            </div>
            <div className="journey-card">
              <FaChartLine className="icon" />
              <span className="year">2023</span>
              <p>Reached 10,000+ learners worldwide</p>
            </div>
            <div className="journey-card">
              <FaAward className="icon" />
              <span className="year">2025</span>
              <p>100+ curated courses across 20 categories</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="cta-section">
          <h3>Ready to start learning?</h3>
          <Link to="/courses" className="btn cta-button">
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

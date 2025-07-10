import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const testimonials = [
  {
    name: "Ayesha Sharma",
    role: "Frontend Developer",
    feedback:
      "This platform completely transformed the way I learn. The content is top-notch and easy to follow.",
    rating: 5,
  },
  {
    name: "Rohan Verma",
    role: "Data Analyst",
    feedback:
      "I landed my dream job thanks to the skills I picked up here. The instructors are amazing!",
    rating: 4,
  },
  {
    name: "Mehak Kapoor",
    role: "Student",
    feedback:
      "The courses are structured so well that even tough topics feel approachable. Highly recommended!",
    rating: 5,
  },
];

const StarRating = ({ count }) => {
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < count ? "filled" : ""}`}>
          ★
        </span>
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <main className="home-wrapper">
      <section className="hero-section">
        <h1>Welcome to E-Learning</h1>
        <p>Your gateway to mastering new skills and advancing your career.</p>
        <div className="home-buttons">
          <Link to="/courses" className="btn primary-btn">
            Explore Courses
          </Link>
          <Link to="/about" className="btn secondary-btn">
            Learn More
          </Link>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Learners Say</h2>
        <div className="testimonials-container">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">“{t.feedback}”</p>
              <StarRating count={t.rating} />
              <h4 className="testimonial-name">{t.name}</h4>
              <p className="testimonial-role">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;

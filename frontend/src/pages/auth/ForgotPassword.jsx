import React, { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { btnLoading, forgotPassword } = UserData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Forgot Password</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Enter Your Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="common-btn" disabled={btnLoading}>
            {btnLoading ? "Please Wait..." : "Send OTP"}
          </button>
        </form>
        <p>
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

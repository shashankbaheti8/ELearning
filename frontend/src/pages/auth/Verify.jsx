import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
// import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Your Account</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="number"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter the OTP"
          />
          {/* Optional CAPTCHA (uncomment when needed)
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={() => setCaptchaVerified(true)}
          /> */}
          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please Wait..." : "Verify"}
          </button>
        </form>
        <p>
          Back to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Verify;

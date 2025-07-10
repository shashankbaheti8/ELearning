import React, { useState } from "react";
import "./auth.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { resetToken } = useParams();
  const { btnLoading, resetPassword } = UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await resetPassword(resetToken, newPassword, navigate);

    if (result?.success) {
      toast.success("Password reset successfully!");
    } else {
      toast.error(result?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Reset Password</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="new-password">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="new-password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirm-password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </span>

          <button type="submit" className="common-btn" disabled={btnLoading}>
            {btnLoading ? "Please Wait..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

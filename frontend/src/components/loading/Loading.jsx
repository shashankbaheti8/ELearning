import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-card">
        <p className="loading-text">Loading</p>
        <div className="bouncing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;

import React from "react";
import "../styles/error.css"; // Create and import a CSS file for styling

const ErrorMessage = ({ props }) => {
  return (
    <div className="error-message-container">
      <div className="error-icon">⚠️</div>
      <div className="error-text">{props.message}</div>
    </div>
  );
};

export default ErrorMessage;

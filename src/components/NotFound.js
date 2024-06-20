import React from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.css"; // Create and import a CSS file for styling

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-description">
          Sorry, the page you're looking for doesn't exist. If you think
          something is broken, report a problem.
        </p>
        <Link to="/dashboard" className="not-found-button">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

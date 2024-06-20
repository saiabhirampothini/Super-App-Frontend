// Loader.js
import React from "react";
import { Oval } from "react-loader-spinner";
import "../styles/loader.css";
const Loader = () => {
  return (
    <div className="loader-container">
      <Oval
        height={80}
        width={80}
        color="#3498db"
        secondaryColor="#f3f3f3"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;

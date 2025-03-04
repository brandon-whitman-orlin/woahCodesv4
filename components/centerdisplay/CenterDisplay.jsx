import React from "react";
import "./CenterDisplay.css";


function CenterDisplay({ children }) {
  return (
    <div className="center-display">
      <div className="hero-text">
        {children}
      </div>
    </div>
  );
}

export default CenterDisplay;

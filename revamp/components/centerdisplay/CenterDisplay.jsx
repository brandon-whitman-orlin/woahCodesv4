import React from "react";
import "./CenterDisplay.css";


function CenterDisplay({ children }) {
  return (
    <div className="center-display">
      <div className="unrotate">
        <h1>Hi There</h1>
        <h2>My name is Brandon</h2>
      </div>
      {children}
    </div>
  );
}

export default CenterDisplay;

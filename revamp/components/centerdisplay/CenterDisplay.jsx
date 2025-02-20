import React from "react";
import "./CenterDisplay.css";


function CenterDisplay({ children }) {
  return (
    <div className="center-display">
      <div className="hero-text">
        <h1>Hi There</h1>
        <h2>My name is Brandon</h2>
        <h4>I'm a Full Stack Developer with a passion for crafting captivating user experiences and solving complex problems through code.</h4>
      </div>
      {children}
    </div>
  );
}

export default CenterDisplay;

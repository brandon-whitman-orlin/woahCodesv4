import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = ({ spacing = "Left", content = [], additional = null }) => {
  // Map spacing options to CSS justify-content values
  const spacingMap = {
    Left: "flex-start",
    Right: "flex-end",
    Center: "center",
    Between: "space-between",
  };

  return (
    <footer className="footer" style={{ justifyContent: spacingMap[spacing] }}>
      {spacing === "Between" ? (
        <>
          <div className="footer-content">{content}</div>
          {additional && <div className="footer-additional">{additional}</div>}
        </>
      ) : (
        content
      )}
    </footer>
  );
};

export default Footer;
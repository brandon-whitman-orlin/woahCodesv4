import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { ReactComponent as OpenIcon } from "../../assets/icons/open.svg";

const Header = ({ spacing = "Left", content = [], additional = null, small = null }) => {
  const [isSmallMenuOpen, setIsSmallMenuOpen] = useState(false);
  const [smallLinksVisible, setSmallLinksVisible] = useState(false);

  // Map spacing options to CSS justify-content values
  const spacingMap = {
    Left: "flex-start",
    Right: "flex-end",
    Center: "center",
    Between: "space-between",
  };

  const toggleMenu = () => {
    setIsSmallMenuOpen(!isSmallMenuOpen);

    if (!isSmallMenuOpen) {
      // Delay showing small links by 1 second when opening
      setTimeout(() => setSmallLinksVisible(true), 0);
    } else {
      // Immediately hide small links when closing
      setTimeout(() => setSmallLinksVisible(false), 1000);
    }
  };

  return (
    <header className="header" style={{ justifyContent: spacingMap[spacing] }}>
      {spacing === "Between" ? (
        <>
          <div className="header-content">{content}</div>
          {additional && <div className="header-additional">{additional}</div>}
        </>
      ) : (
        content
      )}
      {small && (
        <div className="nav-menu-screen" data-open={isSmallMenuOpen ? "true" : "false"}>
          <button
            className="nav-toggle-button"
            onClick={toggleMenu}
            aria-expanded={isSmallMenuOpen} // Accessibility
          >
            {isSmallMenuOpen ? <CloseIcon className="nav-icon" /> : <OpenIcon className="nav-icon" />}
          </button>
          {/* Delay display of small links when menu is expanded */}
          <div
            className="small-links"
            style={{ display: smallLinksVisible ? "flex" : "none", transition: "display 1s" }}
          >
            {small}
          </div>
        </div>
      )}
          <div className="blur"></div>

    </header>
  );
};

export default Header;

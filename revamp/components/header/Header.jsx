import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { ReactComponent as OpenIcon } from "../../assets/icons/open.svg";

const Header = ({ spacing = "Left", content = [], additional = null, small = null }) => {
  const [isSmallMenuOpen, setIsSmallMenuOpen] = useState(false);
  const [smallLinksVisible, setSmallLinksVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const blurRef = useRef(null);
  const additionalRef = useRef(null);

  // Map spacing options to CSS justify-content values
  const spacingMap = {
    Left: "flex-start",
    Right: "flex-end",
    Center: "center",
    Between: "space-between",
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        setIsScrolled(window.scrollY > (window.innerHeight / 2) - headerHeight * 3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsSmallMenuOpen(false);
    setTimeout(() => setSmallLinksVisible(false), 300); // Hide small links after animation
  };

  const toggleMenu = () => {
    setIsSmallMenuOpen(!isSmallMenuOpen);

    if (!isSmallMenuOpen) {
      setTimeout(() => setSmallLinksVisible(true), 0);
    } else {
      setTimeout(() => setSmallLinksVisible(false), 300);
    }
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSmallMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        blurRef.current &&
        !blurRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSmallMenuOpen]);

  // Close menu when focus moves outside OR to an <a> inside .header-additional
  useEffect(() => {
    const handleFocusChange = (event) => {
      if (!isSmallMenuOpen) return;

      setTimeout(() => {
        const activeElement = document.activeElement;

        // Check if focus is outside the menu & blur
        const isOutside =
          activeElement &&
          menuRef.current &&
          !menuRef.current.contains(activeElement) &&
          blurRef.current &&
          !blurRef.current.contains(activeElement);

        // Check if focus is on an <a> inside .header-additional
        const isAdditionalLink =
          activeElement &&
          additionalRef.current &&
          additionalRef.current.contains(activeElement) &&
          activeElement.tagName === "A";

        if (isOutside || isAdditionalLink) {
          closeMenu();
        }
      }, 0); // Delay to allow focus update
    };

    document.addEventListener("focusin", handleFocusChange);
    return () => document.removeEventListener("focusin", handleFocusChange);
  }, [isSmallMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`header ${isScrolled ? "scrolled" : ""}`}
      style={{ justifyContent: spacingMap[spacing] }}
    >
      {spacing === "Between" ? (
        <>
          <div className="header-content">{content}</div>
          {additional && <div ref={additionalRef} className="header-additional">{additional}</div>}
        </>
      ) : (
        content
      )}
      {small && (
        <>
          <div ref={blurRef} className={`blur ${isSmallMenuOpen ? "active" : ""}`} onClick={closeMenu}></div>
          <div ref={menuRef} className="nav-menu-screen" data-open={isSmallMenuOpen ? "true" : "false"}>
            <button
              className="nav-toggle-button"
              onClick={toggleMenu}
              aria-expanded={isSmallMenuOpen}
            >
              {isSmallMenuOpen ? <CloseIcon className="nav-icon" /> : <OpenIcon className="nav-icon" />}
            </button>
            <div
              className="small-links"
              style={{ display: smallLinksVisible ? "flex" : "none", transition: "display 0.3s" }}
            >
              {small}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

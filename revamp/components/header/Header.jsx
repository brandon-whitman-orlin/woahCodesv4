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

  const spacingMap = {
    Left: "flex-start",
    Right: "flex-end",
    Center: "center",
    Between: "space-between",
  };

  useEffect(() => {
    const handleLinkClick = (event) => {
      if (isSmallMenuOpen && event.target.closest(".small-links a")) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [isSmallMenuOpen]);

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
    setTimeout(() => setSmallLinksVisible(false), 300);
  };

  const toggleMenu = () => {
    setIsSmallMenuOpen(!isSmallMenuOpen);

    if (!isSmallMenuOpen) {
      setTimeout(() => setSmallLinksVisible(true), 0);
    } else {
      setTimeout(() => setSmallLinksVisible(false), 300);
    }
  };

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

  useEffect(() => {
    const handleFocusChange = (event) => {
      if (!isSmallMenuOpen) return;

      setTimeout(() => {
        const activeElement = document.activeElement;

        const isOutside =
          activeElement &&
          menuRef.current &&
          !menuRef.current.contains(activeElement) &&
          blurRef.current &&
          !blurRef.current.contains(activeElement);

        const isAdditionalLink =
          activeElement &&
          additionalRef.current &&
          additionalRef.current.contains(activeElement) &&
          activeElement.tagName === "A";

        if (isOutside || isAdditionalLink) {
          closeMenu();
        }
      }, 0);
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
          <div className="header-content">
            {Array.isArray(content)
              ? content.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)
              : content}
          </div>
          {additional && <div ref={additionalRef} className="header-additional">{additional}</div>}
        </>
      ) : (
        Array.isArray(content)
          ? content.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)
          : content
      )}
      {small && (
        <>
          <div ref={blurRef} className={`blur ${isSmallMenuOpen ? "active" : ""}`} onClick={closeMenu}></div>
          <div ref={menuRef} className="nav-menu-screen" data-open={isSmallMenuOpen ? "true" : "false"}>
            <button className="nav-toggle-button" onClick={toggleMenu} aria-expanded={isSmallMenuOpen}>
              {isSmallMenuOpen ? <CloseIcon className="nav-icon" /> : <OpenIcon className="nav-icon" />}
            </button>
            <div
              className="small-links"
              style={{ display: smallLinksVisible ? "flex" : "none", transition: "display 0.3s" }}
            >
              {Array.isArray(small)
                ? small.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)
                : small}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;

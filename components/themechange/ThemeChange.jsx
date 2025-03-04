import React, { useEffect, useState } from "react";
import "./ThemeChange.css";
import { ReactComponent as SunIcon } from "../../assets/icons/sun.svg";
import { ReactComponent as MoonIcon } from "../../assets/icons/moon.svg";

function ThemeChange() {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [rotation, setRotation] = useState(0); // Track rotation in degrees

  const adjustInitialRotation = (initialTheme) => {
    if (initialTheme === "dark") {
        setRotation((prevRotation) => (prevRotation + 180));
    }
  };

  useEffect(() => {
    adjustInitialRotation(theme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
      if (theme === "dark") {
        heroVideo.classList.add("invert-filter");
      } else {
        heroVideo.classList.remove("invert-filter");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    setRotation((prevRotation) => (prevRotation + 180));

    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      <div
        className="theme-icons"
        style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.3s ease-in-out" }}
      >
        <SunIcon className="theme-icon sun" />
        <MoonIcon className="theme-icon moon" />
      </div>
    </button>
  );
}

export default ThemeChange;

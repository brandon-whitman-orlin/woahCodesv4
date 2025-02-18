import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

import Header from "../../components/header/Header";
import CenterDisplay from "../../components/centerdisplay/CenterDisplay";

import Footer from "../../components/footer/Footer";
import Copyright from "../../components/copyright/Copyright";

function Home() {
  // Load theme from localStorage or use system preference
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <Header
        spacing="Between"
        content={[
          <Link key="home-link" to="/">Brandon Whitman-Orlin</Link>,
          <Link key="nav-projects" className="nav-large" to="/">Projects</Link>,
          <Link key="nav-experience" className="nav-large" to="/">Experience</Link>,
        ]}
        additional={[
          <Link key="nav-contact" className="cta-button" to="/">CONTACT ME</Link>,
        ]}
        small={[
          <div className="small-links">
            <Link key="nav-projects" className="nav-small" to="/">Projects</Link>
            <Link key="nav-experience" className="nav-small" to="/">Experience</Link>
          </div>
        ]}
      />
      <main className="main">
        <CenterDisplay>
        </CenterDisplay>
      </main>
      <Footer
        spacing="Center"
        content={[
          <Link key="home-link" to="/">Brandon Whitman-Orlin</Link>,
          <Copyright key="footer-copyright" />
        ]}
      />
    </div>
  );
}

export default Home;

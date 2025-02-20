import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero"; // Import the Hero component
import Footer from "../../components/footer/Footer";
import Copyright from "../../components/copyright/Copyright";
import ThemeChange from "../../components/themechange/ThemeChange"; // Import the ThemeChange component

function Home() {
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
          <Link key="nav-resume" className="nav-large" target="_blank" to="https://drive.google.com/file/d/1TQbA8_gKywt2oy38jprAi8jHpJ2YniDi/view">Resume</Link>,
        ]}
        additional={[
          <Link key="nav-contact" className="cta-button" to="/">CONTACT ME</Link>,
        ]}
        small={[
          <div className="small-links">
            <Link key="nav-projects-small" className="nav-small" to="/">Projects</Link>
            <Link key="nav-experience-small" className="nav-small" to="/">Experience</Link>
            <Link key="nav-resume-small" className="nav-small" target="_blank" to="https://drive.google.com/file/d/1TQbA8_gKywt2oy38jprAi8jHpJ2YniDi/view">Resume</Link>
          </div>,
        ]}
      />
      <ThemeChange />
      <Hero />
      <main className="main"></main>
      <Footer
        spacing="Center"
        content={[
          <Link key="home-link" to="/">Brandon Whitman-Orlin</Link>,
          <Copyright key="footer-copyright" />,
        ]}
      />
    </div>
  );
}

export default Home;

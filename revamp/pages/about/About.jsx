import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Copyright from "../../components/copyright/Copyright";

function About() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  },);

  return (
    <div className="about">
      <Header
        spacing="Between"
        content={[
          <Link to="/">Ellie's Blog</Link>,
        ]}
        additional={[
          <Link to="/">Home</Link>,
          <Link to="/about">About</Link>,
        ]}
      />
      <main className="main">
        <h1>Ellie Blog</h1>
        <h3>Ellie Blog :D</h3>
      </main>
      <Footer
        spacing="Center"
        content={[
          <Link to="/">Ellie's Blog</Link>,
          <Copyright />
        ]}
      />
    </div>
  );
}

export default About;
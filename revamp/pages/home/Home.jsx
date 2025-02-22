import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import PageSection from "../../components/pagesection/PageSection";

import NabelyVideo from "../../assets/videos/Nabely.mp4";
import WoahCodesVideo from "../../assets/videos/WoahCodes.mp4";
import QuadVideo from "../../assets/videos/Quad.mp4";

import pic1 from "../../assets/pictures/pic1.jpg";
import pic2 from "../../assets/pictures/pic2.jpg";
import pic3 from "../../assets/pictures/pic3.jpg";

import Footer from "../../components/footer/Footer";
import Copyright from "../../components/copyright/Copyright";
import ThemeChange from "../../components/themechange/ThemeChange";

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
          <Link key="nav-blog" className="nav-large" to="/">Blog</Link>,
          <Link key="nav-resume" className="nav-large" target="_blank" to="https://drive.google.com/file/d/1TQbA8_gKywt2oy38jprAi8jHpJ2YniDi/view">Resume</Link>,
        ]}
        additional={[
          <Link key="nav-contact" className="cta-button" to="/">CONTACT ME</Link>,
        ]}
        small={[
          <div className="small-links">
            <Link key="nav-projects-small" className="nav-small" to="/">Projects</Link>
            <Link key="nav-experience-small" className="nav-small" to="/">Experience</Link>
            <Link key="nav-blog-small" className="nav-small" to="/">Blog</Link>
            <Link key="nav-resume-small" className="nav-small" target="_blank" to="https://drive.google.com/file/d/1TQbA8_gKywt2oy38jprAi8jHpJ2YniDi/view">Resume</Link>
          </div>,
        ]}
      />
      <ThemeChange />
      <Hero />
      <main className="main">
        <PageSection name="About Me" videos={[QuadVideo, NabelyVideo, WoahCodesVideo]} titles={["Quad Consultation", "Nabely App", "woahCodes v1"]} descriptions={["A Web Consulting Startup I Co-Founded", "An Event-Finding App I Worked On", "The First Version Of This Site"]} links={["https://quadconsultation.com", "https://nabely.com", "https://woahcodes.com"]}>
          <p>As a Full Stack developer with a strong foundation in Front End design, I leverage my technical expertise across both Web and Mobile development. My diverse portfolio spans artificial intelligence, virtual simulation, game development, and language development, demonstrating my versatility and technical adaptability across different domains.</p>
          <p>Driven by an unwavering commitment to excellence, I consistently deliver high-quality solutions that exceed expectations. My perfectionist nature ensures meticulous attention to detail in every line of code I write. To stay at the forefront of technology, I actively explore emerging tools and frameworks, constantly expanding my technical repertoire and bringing fresh perspectives to challenging problems.</p>
          <p>Whether working independently or as part of a team, I maintain the same level of dedication and professionalism. My collaborative nature and strong communication skills make me an effective team player, while my self-motivation and problem-solving abilities allow me to excel in independent roles. This flexibility, combined with my technical expertise and drive for excellence, makes me an invaluable asset to any development project.</p>
        </PageSection>
      </main>
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

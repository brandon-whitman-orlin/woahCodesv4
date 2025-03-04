import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import PageSection from "../../components/pagesection/PageSection";
import Footer from "../../components/footer/Footer";
import Copyright from "../../components/copyright/Copyright";
import ThemeChange from "../../components/themechange/ThemeChange";
import ScrollLink from "../../components/scrolllink/ScrollLink";
import LineSlide from "../../components/lineslide/LineSlide";
import ContactForm from "../../components/contactform/ContactForm";

import NabelyVideo from "../../assets/videos/Nabely.mp4";
import WoahCodesVideo from "../../assets/videos/WoahCodes.mp4";
import QuadVideo from "../../assets/videos/Quad.mp4";


import Timeline from "../../components/timeline/Timeline";
import TimelineEvents from "../../assets/elements/events.json";

function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // 200ms delay
  
    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div className="home">
      <Header
        spacing="Between"
        content={[
          <ScrollLink key="home-link" to="/">
            Brandon Whitman-Orlin
          </ScrollLink>,
          <ScrollLink key="nav-bio" className="nav-large" to="#bio">
            Biography
          </ScrollLink>,
          <ScrollLink key="nav-experience" className="nav-large" to="#experience">
            Experience
          </ScrollLink>,
          <ScrollLink key="nav-blog" className="nav-large" to="/blog">
            Blog
          </ScrollLink>,
          <ScrollLink
            key="nav-resume"
            className="nav-large"
            target="_blank"
            to="https://drive.google.com/file/d/1TQbA8_gKywt2oy38jprAi8jHpJ2YniDi/view"
          >
            Resume
          </ScrollLink>,
        ]}
        additional={[
          <ScrollLink key="nav-contact" className="cta-button" to="#contact">
            CONTACT ME
          </ScrollLink>,
        ]}
        small={[
          <div className="small-links">
            <ScrollLink key="nav-bio-small" className="nav-small" to="#bio">
              Biography
            </ScrollLink>
            <ScrollLink key="nav-experience-small" className="nav-small" to="#experience">
              Experience
            </ScrollLink>
            <ScrollLink key="nav-blog-small" className="nav-small" to="/blog">
              Blog
            </ScrollLink>
            <ScrollLink
              key="nav-resume-small"
              className="nav-small"
              target="_blank"
              to="https://drive.google.com/file/d/1TQbA8_gKywt2oy38jprAi8jHpJ2YniDi/view"
            >
              Resume
            </ScrollLink>
          </div>,
        ]}
      />
      <ThemeChange />
      <Hero />
      <main className="main">
        <PageSection
          id="bio"
          space="true"
          name="About Me"
          videos={[QuadVideo, NabelyVideo, WoahCodesVideo]}
          titles={["Quad Consultation", "Nabely App", "woahCodes v1"]}
          descriptions={[
            "A Web Consulting Startup I Co-Founded",
            "An Event-Finding App I Worked On",
            "The First Version Of This Site",
          ]}
          links={[
            "https://quadconsultation.com",
            "https://nabely.com",
            "https://woahcodes.com",
          ]}
        >
          <LineSlide>
            <p>
              As a Full Stack developer with a strong foundation in Front End
              design, I leverage my technical expertise across both Web and
              Mobile development. My diverse portfolio spans artificial
              intelligence, virtual simulation, game development, and language
              development, demonstrating my versatility and technical
              adaptability across different domains.
            </p>
            <br />
            <p>
              Driven by an unwavering commitment to excellence, I consistently
              deliver high-quality solutions that exceed expectations. My
              perfectionist nature ensures meticulous attention to detail in
              every line of code I write. To stay at the forefront of
              technology, I actively explore emerging tools and frameworks,
              constantly expanding my technical repertoire and bringing fresh
              perspectives to challenging problems.
            </p>
            <br />
            <p>
              Whether working independently or as part of a team, I maintain the
              same level of dedication and professionalism. My collaborative
              nature and strong communication skills make me an effective team
              player, while my self-motivation and problem-solving abilities
              allow me to excel in independent roles. This flexibility, combined
              with my technical expertise and drive for excellence, makes me an
              invaluable asset to any development project.
            </p>
          </LineSlide>
        </PageSection>
        <Timeline id="experience" events={TimelineEvents} />
        {/* <PageSection
          id="blog"
          name="My Blog">
          <p>When I'm not deep in a project or caught up in a TV binge, I'm sharing everything I've learned about web development! From clever CSS tricks to full component breakdowns, my goal is to make building websites easier and more fun. Whether you're just starting out or leveling up your skills, there's something here for you—dive in and explore!</p>
          <ScrollLink className="cta-button" to="/blog">
            VISIT MY BLOG
          </ScrollLink>
        </PageSection> */}
        <PageSection
          id="contact"
          name="Let's Chat!">
          <p>Interested in collaborating on a project? Curious about my work? Here's how you can get in touch:</p>
          <ContactForm/>
        </PageSection>
      </main>
      <Footer
        spacing="Center"
        content={[
          <ScrollLink key="home-link" to="/">
            Brandon Whitman-Orlin
          </ScrollLink>,
          <Copyright key="footer-copyright" />,
        ]}
      />
    </div>
  );
}

export default Home;

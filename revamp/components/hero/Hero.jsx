import React, { useEffect } from "react";
import HeroVideo from "../../assets/videos/Hero.mp4";
import CenterDisplay from "../../components/centerdisplay/CenterDisplay";
import RevealingText from "../../components/revealingtext/RevealingText";

import "./Hero.css";

function Hero({ theme }) {
  useEffect(() => {
    const heroVideo = document.querySelector(".hero-video");
    const homeSection = document.querySelector(".home"); // Select the parent div (.home)
    const heroSection = document.querySelector(".hero"); // Select the hero section

    const handleMouseMove = (event) => {
      const { clientWidth, clientHeight } = document.body;

      const homeRect = homeSection.getBoundingClientRect();
      const heroRect = heroSection.getBoundingClientRect();

      const isInHome =
        event.pageX >= homeRect.left &&
        event.pageX <= homeRect.right &&
        event.pageY >= homeRect.top &&
        event.pageY <= heroRect.bottom + window.scrollY;

      if (isInHome) {
        const x = event.pageX / clientWidth - 0.5;
        const y = event.pageY / clientHeight - 0.5;

        const scaleX = 2;
        const scaleY = 2;

        const translateX = -x * 10;
        const translateY = -y * 10;

        heroVideo.style.transition = "none";

        heroVideo.style.transform = `translate(${translateX}%, ${translateY}%) scale(${scaleX}, ${scaleY})`;
      } else {
        heroVideo.style.transition = "transform 0.5s ease-in-out";
        heroVideo.style.transform = "translate(0, 0) scale(2, 2)";
      }
    };

    const handleMouseEnter = () => {
      heroVideo.style.transition = "none";
      homeSection.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      heroVideo.style.transition = "transform 0.5s ease-in-out";
      heroVideo.style.transform = "translate(0, 0) scale(2, 2)";

      homeSection.removeEventListener("mousemove", handleMouseMove);
    };

    homeSection.addEventListener("mouseenter", handleMouseEnter);
    homeSection.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      homeSection.removeEventListener("mouseenter", handleMouseEnter);
      homeSection.removeEventListener("mouseleave", handleMouseLeave);
      homeSection.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="hero">
      <video
        className={`hero-video ${theme === "light" ? "invert-filter" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={HeroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <CenterDisplay
  children={[
    <RevealingText key="revealing-text">
      <h1>Hi There</h1>
      <h2>My name is Brandon</h2>
      <h4>
        I'm a Full Stack Developer with a passion for crafting captivating user experiences and solving complex problems through code.
      </h4>
    </RevealingText>
  ]}
/>
    </section>
  );
}

export default Hero;

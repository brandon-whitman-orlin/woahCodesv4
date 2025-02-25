import React, { useEffect, useRef } from "react";
import { Canvas } from '@react-three/fiber';
import "./PageSection.css";
import SynchronizedVideo from "../../components/synchronizedvideo/SynchronizedVideo";
import Planet from "../../components/planet/Planet";
import { ReactComponent as RocketIcon } from "../../assets/icons/rocket.svg";

const PageSection = ({
  id,
  name,
  images = [],
  videos = [],
  titles = [],
  descriptions = [],
  links = [],
  children,
}) => {
  const galleryRef = useRef(null);
  const earthRef = useRef(null);
  const lastSpawnTimeRef = useRef(0); // Track last spawn time

  const spawnRocket = () => {
    const now = Date.now();
    if (now - lastSpawnTimeRef.current < 500) return; // 0.5s debounce
    lastSpawnTimeRef.current = now; // Update last spawn time

    const originalRocket = document.getElementById("rocket");
    if (!originalRocket) return;

    const rocketClone = originalRocket.cloneNode(true);
    rocketClone.id = "";
    rocketClone.classList.add("rocket-clone");
    originalRocket.parentNode.appendChild(rocketClone);

    rocketClone.style.animation = "rocketFly 2.5s ease-in-out forwards";
    const svgElement = rocketClone.querySelector("svg");
    if (svgElement) {
      svgElement.style.animation = "rocketShrink 2.5s ease-in-out forwards";
    }

    setTimeout(() => {
      rocketClone.remove();
    }, 2600);
  };

  useEffect(() => {
    if (!earthRef.current) return;

    const checkCanvasLoaded = setInterval(() => {
      const earthContainer = earthRef.current;
      if (!earthContainer) return;

      const canvas = earthContainer.querySelector("canvas");
      if (!canvas) return;

      canvas.addEventListener("click", spawnRocket);
      clearInterval(checkCanvasLoaded);
    }, 100);

    return () => clearInterval(checkCanvasLoaded);
  }, []);

  useEffect(() => {
    if (!galleryRef.current) return;
    const mediaWrappers = galleryRef.current.querySelectorAll(".media-wrapper");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    mediaWrappers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className="page-section">
      <div className="section-title-wrapper">
        <Canvas className="moon" style={{ height: "300px", width: "100%" }}>
          <ambientLight />
          <Planet type="moon" />
        </Canvas>
        <h2 className="section-title">{name}</h2>
        <span id="rocket" className="rocket"><RocketIcon /></span>
        <button className="earth-button">
          <div className="earth" ref={earthRef}>
            <Canvas style={{ height: "300px", width: "100%" }}>
              <ambientLight />
              <Planet type="earth" />
            </Canvas>
          </div>
        </button>
      </div>
      <div className="section-content">
        <div className="text-content">{children}</div>
      </div>
      <div className="media-gallery" ref={galleryRef}>
        {[...videos, ...images].map((media, index) => (
          <div key={index} className="media-wrapper">
            <a href={links[index] || "#"} target="_blank" rel="noopener noreferrer">
              <h3>{titles[index] || "Default Title"}</h3>
              <p>{descriptions[index] || "Default description"}</p>
              <SynchronizedVideo
                src={media}
                isImage={index >= videos.length}
                className="media-item"
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PageSection;

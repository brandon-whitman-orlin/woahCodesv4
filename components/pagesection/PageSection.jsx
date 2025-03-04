import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "./PageSection.css";
import SynchronizedVideo from "../../components/synchronizedvideo/SynchronizedVideo";
import Planet from "../../components/planet/Planet";
import School from "../../components/school/School";
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
  space = false,
  school = false,
}) => {
  const galleryRef = useRef(null);
  const earthRef = useRef(null);
  const pencilRef = useRef(null);
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

  const handlePencilClick = () => {
    console.log("Pencil Clicked");
  
    if (!pencilRef.current) return;
  
    const pencilArc = document.querySelector(".pencil-arc");
    const pencilButton = document.querySelector(".pencil-button");
    if (!pencilArc || !pencilButton) return;
  
    // Create a placeholder to prevent layout shift
    const placeholder = document.createElement("div");
    placeholder.className = "pencil-placeholder";
    placeholder.style.width = `${pencilRef.current.offsetWidth}px`;
    placeholder.style.height = `${pencilRef.current.offsetHeight}px`;
    pencilButton.appendChild(placeholder);
  
    // Add animation class to the pencil
    pencilRef.current.classList.add("pencil-move");
    pencilArc.classList.add("pencil-arc-animate");
  
    // Move the pencil to the arc
    pencilArc.appendChild(pencilRef.current);
  
    setTimeout(() => {
      // Move pencil back to original position
      pencilRef.current.classList.remove("pencil-move");
      pencilButton.appendChild(pencilRef.current);
      placeholder.remove(); // Remove placeholder
  
      // Remove the arc animation
      pencilArc.classList.remove("pencil-arc-animate");
    }, 5000);
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
        {space && (
          <Canvas className="moon" style={{ height: "300px", width: "100%" }}>
            <ambientLight />
            <Planet type="moon" />
          </Canvas>
        )}
        {school && (
          <>
            <span id="pencil-arc" className="pencil-arc"></span>
            <button className="pencil-button" onClick={handlePencilClick}>
              <div className="pencil" ref={pencilRef}>
                <Canvas style={{ height: "300px", width: "100%" }}>
                  <ambientLight />
                  <School type="pencil" />
                </Canvas>
              </div>
            </button>
          </>
        )}
        <h2 className="section-title">{name}</h2>
        {space && (
          <>
            <span id="rocket" className="rocket">
              <RocketIcon />
            </span>
            <button className="earth-button">
              <div className="earth" ref={earthRef}>
                <Canvas style={{ height: "300px", width: "100%" }}>
                  <ambientLight />
                  <Planet type="earth" />
                </Canvas>
              </div>
            </button>
          </>
        )}
        {school && (
          <Canvas className="paper" style={{ height: "300px", width: "100%" }}>
            <ambientLight />
            <School type="paper" />
          </Canvas>
        )}
      </div>
      <div className="section-content">
        <div className="text-content">{children}</div>
      </div>
      <div className="media-gallery" ref={galleryRef}>
        {[...videos, ...images].map((media, index) => (
          <div key={index} className="media-wrapper">
            <a
              href={links[index] || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
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

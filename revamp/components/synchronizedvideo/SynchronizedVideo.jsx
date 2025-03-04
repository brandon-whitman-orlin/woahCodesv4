import React, { useRef, useState, useEffect } from "react";
import "./SynchronizedVideo.css"; // Optional: separate CSS for styles

const SynchronizedVideo = ({ src, className = "", isImage = false }) => {
  const grayscaleRef = useRef(null);
  const colorRef = useRef(null);
  const wrapperRef = useRef(null);
  const [ready, setReady] = useState({ grayscale: false, color: false });
  const [started, setStarted] = useState(false);
  const animationFrame = useRef(null);
  const mousePos = useRef({ x: "50%", y: "50%" });

  // When both media elements are loaded, start playback or show images
  useEffect(() => {
    if (ready.grayscale && ready.color && !started) {
      if (!isImage) {
        grayscaleRef.current.currentTime = 0;
        colorRef.current.currentTime = 0;
        Promise.all([grayscaleRef.current.play(), colorRef.current.play()])
          .then(() => setStarted(true))
          .catch((error) => console.error("Error starting synchronized playback:", error));
      } else {
        setStarted(true); // Images are ready instantly
      }
    }
  }, [ready, started, isImage]);

  useEffect(() => {
    if (!isImage) {
      const syncInterval = setInterval(() => {
        if (grayscaleRef.current && colorRef.current && started) {
          const diff = Math.abs(colorRef.current.currentTime - grayscaleRef.current.currentTime);
          if (diff > 0.05) {
            colorRef.current.currentTime = grayscaleRef.current.currentTime;
          }
        }
      }, 50);
      return () => clearInterval(syncInterval);
    }
  }, [started, isImage]);

  // Handle mouse movement for both images and videos
  useEffect(() => {
    const updateMousePosition = (e) => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      mousePos.current = {
        x: `${e.clientX - rect.left}px`,
        y: `${e.clientY - rect.top}px`,
      };

      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(() => {
          wrapperRef.current.style.setProperty("--mouse-x", mousePos.current.x);
          wrapperRef.current.style.setProperty("--mouse-y", mousePos.current.y);
          animationFrame.current = null;
        });
      }
    };

    const resetMousePosition = () => {
      wrapperRef.current.style.setProperty("--mouse-x", "50%");
      wrapperRef.current.style.setProperty("--mouse-y", "50%");
    };

    wrapperRef.current?.addEventListener("mousemove", updateMousePosition, { passive: true });
    wrapperRef.current?.addEventListener("mouseleave", resetMousePosition, { passive: true });

    return () => {
      wrapperRef.current?.removeEventListener("mousemove", updateMousePosition);
      wrapperRef.current?.removeEventListener("mouseleave", resetMousePosition);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="media-item-wrapper">
      {/* Grayscale Layer */}
      {isImage ? (
        <img
          ref={grayscaleRef}
          src={src}
          className={`media-item grayscale ${className}`}
          alt="grayscale version"
          onLoad={() => setReady((prev) => ({ ...prev, grayscale: true }))}
        />
      ) : (
        <video
          ref={grayscaleRef}
          src={src}
          className={`media-item grayscale ${className}`}
          muted
          loop
          playsInline
          aria-hidden="true"
          onLoadedData={() => setReady((prev) => ({ ...prev, grayscale: true }))}
        />
      )}

      {/* Color Layer with Mouse Mask */}
      {isImage ? (
        <img
          ref={colorRef}
          src={src}
          className={`media-item color ${className}`}
          alt="color version"
          onLoad={() => setReady((prev) => ({ ...prev, color: true }))}
        />
      ) : (
        <video
          ref={colorRef}
          src={src}
          className={`media-item color ${className}`}
          muted
          loop
          playsInline
          aria-hidden="true"
          onLoadedData={() => setReady((prev) => ({ ...prev, color: true }))}
        />
      )}
    </div>
  );
};

export default SynchronizedVideo;

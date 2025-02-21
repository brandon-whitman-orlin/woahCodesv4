import React, { useRef, useState, useEffect } from "react";
import "./SynchronizedVideo.css"; // Optional: separate CSS for video styles

const SynchronizedVideo = ({ src, className = "" }) => {
  const grayscaleRef = useRef(null);
  const colorRef = useRef(null);
  const wrapperRef = useRef(null);
  // Track readiness of each video
  const [ready, setReady] = useState({ grayscale: false, color: false });
  // Track if playback has started
  const [started, setStarted] = useState(false);

  // When both videos are loaded, start playback together
  useEffect(() => {
    if (ready.grayscale && ready.color && !started) {
      // Reset time for both videos
      grayscaleRef.current.currentTime = 0;
      colorRef.current.currentTime = 0;
      Promise.all([grayscaleRef.current.play(), colorRef.current.play()])
        .then(() => {
          setStarted(true);
        })
        .catch((error) => {
          console.error("Error starting synchronized playback:", error);
        });
    }
  }, [ready, started]);

  useEffect(() => {
    const syncInterval = setInterval(() => {
      if (
        grayscaleRef.current &&
        colorRef.current &&
        started
      ) {
        const diff = Math.abs(colorRef.current.currentTime - grayscaleRef.current.currentTime);
        if (diff > 0.05) {
          colorRef.current.currentTime = grayscaleRef.current.currentTime;
        }
      }
    }, 50);
    return () => clearInterval(syncInterval);
  }, [started]);

  return (
    <div
      ref={wrapperRef}
      className="media-item-wrapper"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty("--mouse-x", `50%`);
        e.currentTarget.style.setProperty("--mouse-y", `50%`);
      }}
    >
      {/* Grayscale copy */}
      <video
        ref={grayscaleRef}
        src={src}
        className={`video grayscale ${className}`}
        muted
        loop
        playsInline
        aria-hidden="true"
        onLoadedData={() =>
          setReady((prev) => ({ ...prev, grayscale: true }))
        }
      />
      {/* Color copy on top */}
      <video
        ref={colorRef}
        src={src}
        className={`video color ${className}`}
        muted
        loop
        playsInline
        aria-hidden="true"
        onLoadedData={() =>
          setReady((prev) => ({ ...prev, color: true }))
        }
      />
    </div>
  );
};

export default SynchronizedVideo;

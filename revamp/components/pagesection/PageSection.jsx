import React, { useEffect, useRef } from "react";
import "./PageSection.css";
import SynchronizedVideo from "../../components/synchronizedvideo/SynchronizedVideo";

const PageSection = ({
  name,
  images = [],
  videos = [],
  titles = [],
  descriptions = [],
  links = [],
  children,
}) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!galleryRef.current) return;

    const mediaWrappers = galleryRef.current.querySelectorAll(".media-wrapper");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            obs.unobserve(entry.target); // Only animate once
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    mediaWrappers.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="page-section">
      <h2 className="section-title">{name}</h2>

      {images.length + videos.length <= 2 ? (
        <div
          className={`section-layout ${
            images.length + videos.length === 2 ? "two-media" : "one-media"
          }`}
        >
          {images.length + videos.length === 2 && (
            <SynchronizedVideo
              src={videos[0] || images[0]}
              isImage={!videos[0]}
              className="media-item"
            />
          )}
          <div className="section-content">{children}</div>
          {images.length + videos.length >= 1 && (
            <SynchronizedVideo
              src={videos[videos.length - 1] || images[images.length - 1]}
              isImage={!videos[videos.length - 1]}
              className="media-item"
            />
          )}
        </div>
      ) : (
        <>
          <div className="section-content">{children}</div>
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
        </>
      )}
    </section>
  );
};

export default PageSection;

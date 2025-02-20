import React from "react";
import "./PageSection.css";

const PageSection = ({
  name,
  images = [],
  videos = [],
  titles = [],
  descriptions = [],
  links = [],
  children,
}) => {
  // Helper function to determine if media is a video
  const isVideo = (media) =>
    typeof media === "string" && media.endsWith(".mp4");

  return (
    <section className="page-section">
      <h2 className="section-title">{name}</h2>

      {images.length + videos.length <= 2 ? (
        <div
          className={`section-layout ${
            images.length + videos.length === 2 ? "two-media" : "one-media"
          }`}
        >
          {/* First media (either image or video) */}
          {images.length + videos.length === 2 &&
            (isVideo(videos[0]) ? (
              <video
                src={videos[0]}
                className="section-video media-item"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              />
            ) : (
              <img
                src={images[0]}
                alt={`${name} image 1`}
                className="section-image media-item"
              />
            ))}
          <div className="section-content">{children}</div>
          {/* Last media (either image or video) */}
          {images.length + videos.length >= 1 &&
            (isVideo(videos[videos.length - 1]) ? (
              <video
                src={videos[videos.length - 1]}
                className="section-video media-item"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              />
            ) : (
              <img
                src={images[images.length - 1]}
                alt={`${name} image`}
                className="section-image media-item"
              />
            ))}
        </div>
      ) : (
        <>
          <div className="section-content">{children}</div>
          <div className="media-gallery">
            {/* Map through videos */}
            {videos.map((video, index) => (
              <div key={index} className="media-wrapper">
                <h3>{titles[index] || "Default Title"}</h3>
                <p>{descriptions[index] || "Default description"}</p>
                {links[index] ? (
                  <a href={links[index]} target="_blank" rel="noopener noreferrer">
                    <video
                      src={video}
                      className="section-video media-item"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <video
                    src={video}
                    className="section-video media-item"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
            {/* Map through images */}
            {images.map((image, index) => (
              <div key={index} className="media-wrapper">
                <h3>{titles[index + videos.length] || "Default Title"}</h3>
                <p>{descriptions[index + videos.length] || "Default description"}</p>
                {links[index + videos.length] ? (
                  <a href={links[index + videos.length]} target="_blank" rel="noopener noreferrer">
                    <img
                      src={image}
                      alt={`${name} media ${index + 1}`}
                      className="section-image media-item"
                    />
                  </a>
                ) : (
                  <img
                    src={image}
                    alt={`${name} media ${index + 1}`}
                    className="section-image media-item"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default PageSection;

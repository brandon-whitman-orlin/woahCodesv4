import React from "react";
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
            (videos[0] ? (
              <SynchronizedVideo src={videos[0]} className="media-item" />
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
            (videos[videos.length - 1] ? (
              <SynchronizedVideo src={videos[videos.length - 1]} className="media-item" />
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
                <a href={links[index] || "#"} target="_blank" rel="noopener noreferrer">
                  <h3>{titles[index] || "Default Title"}</h3>
                  <p>{descriptions[index] || "Default description"}</p>
                  <SynchronizedVideo src={video} className="media-item" />
                </a>
              </div>
            ))}
            {/* Map through images */}
            {images.map((image, index) => (
              <div key={index} className="media-wrapper">
                <a
                  href={links[index + videos.length] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{titles[index + videos.length] || "Default Title"}</h3>
                  <p>{descriptions[index + videos.length] || "Default description"}</p>
                  <img
                    src={image}
                    alt={`${name} media ${index + 1}`}
                    className="section-image media-item"
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

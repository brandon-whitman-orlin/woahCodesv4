import React, { useEffect } from "react";
import "./Timeline.css";

const monthAbbreviations = {
  January: "Jan.",
  February: "Feb.",
  March: "Mar.",
  April: "Apr.",
  May: "May",
  June: "Jun.",
  July: "Jul.",
  August: "Aug.",
  September: "Sep.",
  October: "Oct.",
  November: "Nov.",
  December: "Dec.",
};

const abbreviateDate = (dateString) => {
  const [month] = dateString.split(" "); // Extract the month
  return monthAbbreviations[month] || month; // Return the month abbreviation
};

const Timeline = ({ events = {}, ...props }) => {
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector(".header");
      if (header) {
        const height = header.offsetHeight;
        document.documentElement.style.setProperty(
          "--headerHeight",
          `${height}px`
        );
      }
    };

    const updateScrollPercentage = () => {
      const timelineWrapper = document.querySelector(".timeline-wrapper");
      if (timelineWrapper) {
        const rect = timelineWrapper.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Ensure 0% when top enters viewport, and 100% when bottom aligns with viewport bottom
        let scrollPercentage =
          ((viewportHeight - rect.top) / rect.height) * 100;
        scrollPercentage = Math.min(100, Math.max(0, scrollPercentage)); // Clamp between 0% and 100%

        document.documentElement.style.setProperty(
          "--scrollPercentage",
          `${scrollPercentage}%`
        );
      }
    };

    const updateElementStyles = () => {
      const timeline = document.querySelector(".timeline");
      const years = document.querySelectorAll(".timeline-year");
      const dates = document.querySelectorAll(".timeline-date");
    
      // Get the timeline container's position
      const timelineRect = timeline.getBoundingClientRect();
      const timelineTop = timelineRect.top; // Top of the .timeline container
    
      // Get the scroll percentage
      const scrollPercentage = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--scrollPercentage")
      );
    
      // Loop through years and dates and check if scroll percentage matches
      years.forEach((year) => {
        const rect = year.getBoundingClientRect();
        const percentage = ((rect.top - timelineTop) / timelineRect.height) * 100;
    
        if (scrollPercentage >= percentage) {
          year.classList.add("active");
        } else {
          year.classList.remove("active");
        }
      });
    
      dates.forEach((date) => {
        const rect = date.getBoundingClientRect();
        const percentage = ((rect.top - timelineTop) / timelineRect.height) * 100;
    
        if (scrollPercentage >= percentage) {
          date.classList.add("active");
        } else {
          date.classList.remove("active");
        }
      });
    };

    const observer = new ResizeObserver(updateHeaderHeight);
    const headerElement = document.querySelector(".header");
    if (headerElement) {
      observer.observe(headerElement);
    }

    updateHeaderHeight(); // Set initial header height
    updateScrollPercentage(); // Set initial scroll percentage

    window.addEventListener("scroll", updateScrollPercentage); // Keep scroll listener for updating percentage
    window.addEventListener("resize", updateScrollPercentage); // Listen for resize to re-measure percentage
    window.addEventListener("resize", updateElementStyles); // Listen for resize to re-measure styles
    window.addEventListener("scroll", updateElementStyles); // Listen for scroll to update styles

    updateElementStyles(); // Log initial styles

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollPercentage);
      window.removeEventListener("resize", updateScrollPercentage);
      window.removeEventListener("resize", updateElementStyles); // Clean up resize listener
      window.removeEventListener("scroll", updateElementStyles); // Clean up scroll listener
    };
  }, []); // Ensure the effect runs only once (on mount)

  // Group events by year
  const groupByYear = (events) => {
    const grouped = {};
    Object.entries(events).forEach(([date, eventList]) => {
      const year = date.split(" ")[1]; // Extract the year
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push([date, eventList]);
    });
    return grouped;
  };

  const groupedEvents = groupByYear(events);

  return (
    <div className="timeline-wrapper" {...props}>
      <div className="timeline-components">
        <div className="timeline">
          {Object.entries(groupedEvents).map(([year, yearEvents], index) => (
            <>
              <div className="timeline-year">{year}</div>
              <div className="timeline-items">
                {yearEvents.map(([date, eventList], i) =>
                  eventList.map((event, j) => (
                    <div className="timeline-date">{abbreviateDate(date)}</div>
                  ))
                )}
              </div>
            </>
          ))}
          <div className="timeline-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;

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
      const eventName = document.querySelector(".event-name");
      const eventDescription = document.querySelector(".event-description");
      const eventDate = document.querySelector(".event-date");
    
      if (!timeline) return;
    
      const timelineRect = timeline.getBoundingClientRect();
      const timelineTop = timelineRect.top;
    
      const scrollPercentage = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--scrollPercentage"
        )
      );
    
      let firstElementPercentage = Infinity;
      let lastActiveEvent = null;
    
      const updateActiveClass = (elements, isDate = false) => {
        let activeElement = null;
        
        // Get the timeline's bounding rect
        const timelineRect = document.querySelector(".timeline").getBoundingClientRect();
        
        // Check if the screen width is less than 459px for horizontal layout
        const isHorizontal = window.innerWidth <= 459;
        
        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          let percentage;
      
          if (isHorizontal) {
            // Calculate distance relative to the left side for horizontal layout
            percentage = ((rect.left - timelineRect.left) / timelineRect.width) * 100;
          } else {
            // Calculate distance relative to the top for vertical layout
            percentage = ((rect.top - timelineRect.top) / timelineRect.height) * 100;
          }
      
          // Update first element percentage for resetting when no active element
          firstElementPercentage = Math.min(firstElementPercentage, percentage);
      
          if (scrollPercentage >= percentage) {
            element.classList.add("active");
            if (isDate) activeElement = element;
          } else {
            element.classList.remove("active");
          }
        });
      
        return activeElement;
      };
    
      updateActiveClass(years);
      const activeDate = updateActiveClass(dates, true);
    
      // **Update event details when an active date is found**
      if (activeDate) {
        const eventText = activeDate.dataset.eventName || "Unknown Event";
        const eventDesc =
          activeDate.dataset.eventDescription || "No description available.";
        const eventMonth = activeDate.textContent.trim(); // Extracts abbreviated month
    
        // Find the closest previous .timeline-year to get the correct year
        let eventYear = "Year Unknown";
        for (const yearElement of [...years].reverse()) {
          if (yearElement.getBoundingClientRect().top < activeDate.getBoundingClientRect().top) {
            eventYear = yearElement.textContent;
            break;
          }
        }
    
        const eventDateText = `${eventMonth} ${eventYear}`;
    
        eventName.textContent = eventText;
        eventDescription.textContent = eventDesc;
        eventDate.textContent = eventDateText;
    
        lastActiveEvent = { eventText, eventDesc, eventDateText };
      } else if (lastActiveEvent) {
        eventName.textContent = lastActiveEvent.eventText;
        eventDescription.textContent = lastActiveEvent.eventDesc;
        eventDate.textContent = lastActiveEvent.eventDateText;
      }
    
      // **Remove active from all elements if scrollPercentage drops below the first element**
      if (scrollPercentage < firstElementPercentage) {
        years.forEach((year) => year.classList.remove("active"));
        dates.forEach((date) => date.classList.remove("active"));
    
        // Reset event details when no active date is left
        eventName.textContent = "Project Name";
        eventDescription.textContent = "Project Description";
        eventDate.textContent = "Event Date";
        lastActiveEvent = null;
      }
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
          <div className="timeline-line"></div>
          {Object.entries(groupedEvents).map(([year, yearEvents], index) => (
            <>
              <div className="timeline-year">{year}</div>
              <div className="timeline-items">
                {yearEvents.map(([date, eventList], i) =>
                  eventList.map((event, j) => (
                    <div
                      className="timeline-date"
                      data-event-name={event.name}
                      data-event-description={event.description}
                    >
                      {abbreviateDate(date)}
                    </div>
                  ))
                )}
              </div>
            </>
          ))}
          <div className="timeline-fill"></div>
        </div>
        <div className="timeline-information">
          <h2>Stuff I've Done</h2>
          <div className="timeline-information-components">
            <div>
              <h3 className="event-name">Project Name</h3>
              <p className="event-date">Event Date</p>
            </div>
            <p className="event-description">Project Description</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
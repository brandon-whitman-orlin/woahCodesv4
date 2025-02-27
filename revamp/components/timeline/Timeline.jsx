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

const parseDate = (dateString) => {
  const [month, year] = dateString.split(" ");
  return new Date(`${month} 1, ${year}`); // Set day to 1 for sorting purposes
};

const abbreviateDate = (dateString) => {
  const [month] = dateString.split(" "); // Only extract the month
  return monthAbbreviations[month]; // Return the month abbreviation
};

const Timeline = ({ events = {} }) => {
  useEffect(() => {
    const sortedEvents = Object.entries(events).sort(
      ([dateA], [dateB]) => parseDate(dateA) - parseDate(dateB)
    );

    // console.log("Sorted Timeline Events:", sortedEvents);
  }, [events]);

  // Function to group events by year
  const groupByYear = (events) => {
    const grouped = {};

    Object.entries(events).forEach(([date, eventList]) => {
      const year = date.split(" ")[1]; // Get the year from the date
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push([date, eventList]);
    });

    return grouped;
  };

  const groupedEvents = groupByYear(events);

  return (
    <div className="timeline">
      {Object.entries(groupedEvents).map(([year, yearEvents], index) => (
        <div className="timeline-section" key={index}>
          <div className="timeline-year">{year}</div>
          {yearEvents.map(([date, eventList], i) =>
            eventList.map((event, j) => (
              <div className="timeline-item" key={`${index}-${i}-${j}`}>
                <div className="timeline-date">{abbreviateDate(date)}
                    <div className="timeline-event">{event}</div>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;

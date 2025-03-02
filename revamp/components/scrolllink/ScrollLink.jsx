import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ScrollLink = ({ to, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // If "to" is "/", reload the page and scroll to the top
    if (to === "/") {
      e.preventDefault();
      window.scrollTo(0, 0); // Scroll to the top of the page
    } else if (to.startsWith("#")) {
      e.preventDefault();
      const targetId = to.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        console.log(`Scrolling to: ${targetId}`); // Debugging
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Element with ID '${targetId}' not found.`);
      }
    } else {
      // navigate(to);
    }
  };

  return <Link to={to} onClick={handleClick} {...props} />;
};

export default ScrollLink;

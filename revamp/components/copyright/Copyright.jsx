import React from "react";
import "./Copyright.css";


const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return <p className="copyright">© 2023-{currentYear}</p>;
};

export default Copyright;
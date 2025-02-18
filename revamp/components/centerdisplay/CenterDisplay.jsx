import React from "react";
import "./CenterDisplay.css";

import { ReactComponent as PaintbrushIcon } from "../../assets/icons/paintbrush-painted.svg";

function CenterDisplay({ children }) {
  return (
    <div className="center-display">
      <PaintbrushIcon className="paintbrush" />
      {children}
    </div>
  );
}

export default CenterDisplay;

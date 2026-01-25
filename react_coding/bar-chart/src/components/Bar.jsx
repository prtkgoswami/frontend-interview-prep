import React from "react";
import "./Bar.css";

const Bar = ({ title, count, color, height }) => {
  return (
    <div
      className="bar"
      style={{
        height: `${height}%`,
        backgroundColor: color,
      }}
    >
      <div className="tooltip">
        <p>
          {title} - {count}
        </p>
      </div>
    </div>
  );
};

export default Bar;

import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 70rem 1fr" }}>
      <div style={{ gridColumnStart: 2 }}>{children}</div>
    </div>
  );
};

export default PageWrapper;

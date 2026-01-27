import React, { useRef, useEffect, useState } from "react";
import "./VirtualList.css";

const ListItem = ({ data }) => {
  return <div className="list-item">{data}</div>;
};

const BUFFER = 3;

const VirtualList = ({ dataItems, containerHeight, itemHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  const totalItemCount = dataItems.length;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - BUFFER);
  const endIndex = Math.min(
    totalItemCount,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + BUFFER,
  );
  const visibleItems = dataItems.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;
  const totalHeight = totalItemCount * itemHeight;

  useEffect(() => {
    let lastRun = 0;

    const handleScroll = (e) => {
      const now = Date.now();
      if (now - lastRun < 50) return;

      lastRun = now;
      setScrollTop(e.target.scrollTop);
    };

    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="list-wrapper"
      style={{
        height: `${containerHeight}px`,
      }}
      ref={containerRef}
    >
      <div
        className="list-outer-container"
        style={{
          height: `${totalHeight}px`,
        }}
      >
        <ul
          className="list-inner-container"
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleItems.map((data) => (
            <li key={data} style={{ height: `${itemHeight}px` }}>
              <ListItem data={data} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VirtualList;

import React from "react";
import Ring from "./Ring";
import { useDroppable } from "@dnd-kit/core";

const Tower = ({ ringList, id }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  return (
    <div
      className="tower"
      style={{ backgroundColor: isOver ? "beige" : "transparent" }}
    >
      <div className="tower-column-container">
        <div className="column"></div>
        <div ref={setNodeRef} className="rings-container">
          {ringList.map((ring, i) => (
            <Ring
              key={ring.id}
              {...ring}
              disableDragging={i < ringList.length - 1}
            />
          ))}
        </div>
      </div>
      <div className="tower-base"></div>
    </div>
  );
};

export default Tower;

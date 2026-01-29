import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const Ring = ({ id, width, color, disableDragging }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      disabled: disableDragging,
    });

  const setCursor = () => {
    if (disableDragging) {
      return "not-allowed";
    } else if (isDragging) {
      return "grabbing";
    } else {
      return "grab";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="ring"
      style={{
        backgroundColor: color,
        width: `${width}px`,
        transform: CSS.Translate.toString(transform),
        border: isDragging ? "5px solid teal" : "",
        cursor: setCursor(),
      }}
      {...attributes}
      {...listeners}
    ></div>
  );
};

export default Ring;

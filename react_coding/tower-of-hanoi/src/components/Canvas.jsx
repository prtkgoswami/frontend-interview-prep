import React, { useState } from "react";
import Tower from "./Tower";
import { DndContext } from "@dnd-kit/core";

const Canvas = ({ initialState }) => {
  const [towerState, setTowerState] = useState(initialState);

  const handleRingDragEnd = ({ active, over }) => {
    if (!over) return;

    const ringId = active.id;
    const targetTowerId = over.id;

    if (
      towerState[targetTowerId].length > 0 &&
      towerState[targetTowerId][towerState[targetTowerId].length - 1].id ===
        ringId
    )
      return;

    if (targetTowerId === "tower1") {
      setTowerState((prev) => {
        if (
          prev.tower2.length === 0 ||
          prev.tower2[prev.tower2.length - 1].id !== ringId
        ) {
          return prev;
        }

        const ring = prev.tower2.pop();
        prev.tower1.push(ring);
        return {
          tower1: prev.tower1,
          tower2: prev.tower2,
        };
      });
    } else if (targetTowerId === "tower2") {
      setTowerState((prev) => {
        if (
          prev.tower1.length === 0 ||
          prev.tower1[prev.tower1.length - 1].id !== ringId
        ) {
          return prev;
        }

        const ring = prev.tower1.pop();
        prev.tower2.push(ring);
        return {
          tower1: prev.tower1,
          tower2: prev.tower2,
        };
      });
    }
  };

  return (
    <DndContext onDragEnd={handleRingDragEnd}>
      <div className="canvas">
        <Tower ringList={towerState.tower1} id="tower1" />
        <Tower ringList={towerState.tower2} id="tower2" />
      </div>
    </DndContext>
  );
};

export default Canvas;

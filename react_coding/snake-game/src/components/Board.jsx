import React from "react";
import "./Board.css";

const Board = ({ board }) => {
  return (
    <div id="board">
      {board.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          const isCellFood = cell === 2;
          const isCellSnake = cell === 1;
          return (
            <div
              key={`board-cell-${rowIndex}- ${cellIndex}`}
              className={`cell ${isCellFood ? "food" : ""} ${isCellSnake ? "snake" : ""}`}
            >
              {cell}
            </div>
          );
        }),
      )}
    </div>
  );
};

export default Board;

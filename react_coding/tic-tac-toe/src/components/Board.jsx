import React, { useEffect, useState, useRef } from "react";
import "./Board.css";

const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Board = () => {
  const [boardState, setBoardState] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [showGameOverText, setShowGameOverText] = useState("");
  const turnCount = useRef(0);

  const handleCellClick = (index) => {
    setBoardState((prev) => {
      const newState = [...prev];
      newState[index] = turn;
      return newState;
    });
    turnCount.current++;
  };

  const checkWin = (currState) => {
    const isWin = WIN_COMBOS.some((combo) => {
      return combo.every((i) => currState[i] === turn);
    });

    if (isWin) {
      setShowGameOverText(`${turn} wins`);
      return;
    }

    if (turnCount.current >= 9) {
      setShowGameOverText("draw");
      return;
    }

    setTurn((prev) => (prev === "x" ? "o" : "x"));
  };

  const restartGame = () => {
    setBoardState(Array(9).fill(""));
    setTurn("x");
    turnCount.current = 0;
    setShowGameOverText("");
  };

  useEffect(() => {
    checkWin(boardState);
  }, [boardState]);

  return (
    <div id="board" className={`${turn}`}>
      {boardState.map((cellState, index) => (
        <button
          key={`board-cell-${index}`}
          className={`cell ${cellState}`}
          onClick={() => handleCellClick(index)}
        ></button>
      ))}
      {showGameOverText && (
        <div id="overlay">
          <p>{showGameOverText}</p>
          <button id="restart-btn" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;

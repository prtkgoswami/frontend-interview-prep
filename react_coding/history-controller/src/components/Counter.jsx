import React, { useRef, useState } from "react";
import "../App.css";

const Counter = () => {
  const [counterValue, setCounterValue] = useState(0);
  const undoArrayRef = useRef([]);
  const redoArrayRef = useRef([]);

  const handleIncrementClick = () => {
    setCounterValue((prev) => {
      undoArrayRef.current.push(prev);
      redoArrayRef.current = [];
      return prev + 1;
    });
  };

  const handleDecrementClick = () => {
    setCounterValue((prev) => {
      undoArrayRef.current.push(prev);
      redoArrayRef.current = [];
      return prev - 1;
    });
  };

  const handleUndoClick = () => {
    if (undoArrayRef.current.length === 0) return;
    setCounterValue((curr) => {
      const lastValue = undoArrayRef.current.pop();
      redoArrayRef.current.push(curr);
      return lastValue;
    });
  };

  const handleRedoClick = () => {
    if (redoArrayRef.current.length === 0) return;
    setCounterValue((curr) => {
      const lastValue = redoArrayRef.current.pop();
      undoArrayRef.current.push(curr);
      return lastValue;
    });
  };

  const isUndoDisabled = undoArrayRef.current.length === 0;
  const isRedoDisabled = redoArrayRef.current.length === 0;

  return (
    <div id="counter-container">
      <p id="counter-value" data-testid="counter-value">
        {counterValue}
      </p>
      <div id="action-bar">
        <button
          id="undo-btn"
          data-testid="undo-btn"
          onClick={handleUndoClick}
          disabled={isUndoDisabled}
        >
          Undo
        </button>
        <button
          id="decrement-btn"
          data-testid="decrement-btn"
          onClick={handleDecrementClick}
        >
          Decrement
        </button>
        <button
          id="increment-btn"
          data-testid="increment-btn"
          onClick={handleIncrementClick}
        >
          Increment
        </button>
        <button
          id="redo-btn"
          data-testid="redo-btn"
          onClick={handleRedoClick}
          disabled={isRedoDisabled}
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default Counter;

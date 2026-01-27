import React from "react";

const Card = ({ id, title, onBackwardClick, onForwardClick }) => {
  const handleForwardClick = (event) => {
    event.stopPropagation();
    onForwardClick(id);
  };
  const handleBackwardClick = (event) => {
    event.stopPropagation();
    onBackwardClick(id);
  };

  return (
    <div className="task-card" data-testid="task-card">
      <p className="task-card-title" data-testid="task-card-title">
        {title}
      </p>
      <div className="task-card-actions">
        <button
          className="task-card-backward-btn"
          data-testid="task-card-backward-btn"
          onClick={handleBackwardClick}
        >
          Backward
        </button>
        <button
          className="task-card-forward-btn"
          data-testid="task-card-forward-btn"
          onClick={handleForwardClick}
        >
          Forward
        </button>
      </div>
    </div>
  );
};

export default Card;

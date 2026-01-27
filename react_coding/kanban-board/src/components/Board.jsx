import React, { useState } from "react";
import { initialTasks } from "../common/mock";
import Card from "./Card";
import { useMemo } from "react";

const Board = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleMoveTaskForward = (id) => {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === id) {
          if (task.status === "todo") {
            return { ...task, status: "in-progress" };
          } else if (task.status === "in-progress") {
            return { ...task, status: "done" };
          }
        }
        return task;
      }),
    );
  };

  const handleMoveTaskBackward = (id) => {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === id) {
          if (task.status === "in-progress") {
            return { ...task, status: "todo" };
          } else if (task.status === "done") {
            return { ...task, status: "in-progress" };
          }
        }
        return task;
      }),
    );
  };

  const todoTasks = useMemo(
    () => tasks.filter((task) => task.status === "todo"),
    [tasks],
  );
  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.status === "in-progress"),
    [tasks],
  );
  const doneTasks = useMemo(
    () => tasks.filter((task) => task.status === "done"),
    [tasks],
  );

  return (
    <div id="board">
      <div id="column-todo" data-testid="column-todo">
        <div className="column-title">
          <h2>To Do</h2>
        </div>
        <ul className="task-container">
          {todoTasks.map(({ id, title }) => (
            <li key={id}>
              <Card
                id={id}
                title={title}
                onBackwardClick={handleMoveTaskBackward}
                onForwardClick={handleMoveTaskForward}
              />
            </li>
          ))}
        </ul>
      </div>

      <div id="column-inprogress" data-testid="column-inprogress">
        <div className="column-title">
          <h2>In Progress</h2>
        </div>
        <ul className="task-container">
          {inProgressTasks.map(({ id, title }) => (
            <li key={id}>
              <Card
                id={id}
                title={title}
                onBackwardClick={handleMoveTaskBackward}
                onForwardClick={handleMoveTaskForward}
              />
            </li>
          ))}
        </ul>
      </div>

      <div id="column-done" data-testid="column-done">
        <div className="column-title">
          <h2>Done</h2>
        </div>
        <ul className="task-container">
          {doneTasks.map(({ id, title }) => (
            <li key={id}>
              <Card
                id={id}
                title={title}
                onBackwardClick={handleMoveTaskBackward}
                onForwardClick={handleMoveTaskForward}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Board;

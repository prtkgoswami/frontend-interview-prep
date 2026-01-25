import React, { useEffect, useMemo, useRef, useState } from "react";
import Board from "./components/Board";

const GAME_CONFIG = {
  height: 20,
  width: 20,
  snakeStartLength: 3,
  snakeStartPos: [10, 10],
  moveInterval: 200,
};

/*
  Coordinate system:
  [x, y]
  x -> column (0 ... width-1)
  y -> row    (0 ... height-1)
*/

const isSameCell = (a, b) => a[0] === b[0] && a[1] === b[1];

const KEY_TO_DIR = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

const isOpposite = (a, b) => a[0] + b[0] === 0 && a[1] + b[1] === 0;

const GameController = () => {
  const [snakePositions, setSnakePositions] = useState([
    [10, 10],
    [9, 10],
    [8, 10],
  ]);

  const [foodPosition, setFoodPosition] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  // ---- Refs for game-loop correctness ----
  const snakeRef = useRef(snakePositions);
  const foodRef = useRef(null);
  const snakeDirRef = useRef([1, 0]); // moving right initially

  // Keep refs synced with state
  useEffect(() => {
    snakeRef.current = snakePositions;
  }, [snakePositions]);

  useEffect(() => {
    foodRef.current = foodPosition;
  }, [foodPosition]);

  // ---- Derived board for rendering ----
  const gameBoard = useMemo(() => {
    const board = Array.from({ length: GAME_CONFIG.height }, () =>
      Array.from({ length: GAME_CONFIG.width }, () => 0),
    );

    snakePositions.forEach(([x, y]) => {
      board[y][x] = 1;
    });

    if (foodPosition?.length) {
      const [fx, fy] = foodPosition;
      board[fy][fx] = 2;
    }

    return board;
  }, [snakePositions, foodPosition]);

  // ---- Food generation ----
  const addFood = () => {
    const maxAttempts = 100;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const x = Math.floor(Math.random() * GAME_CONFIG.width);
      const y = Math.floor(Math.random() * GAME_CONFIG.height);
      const cell = [x, y];

      const occupiedBySnake = snakeRef.current.some((pos) =>
        isSameCell(pos, cell),
      );

      if (!occupiedBySnake) {
        foodRef.current = cell; // sync for game loop
        setFoodPosition(cell); // trigger render
        return;
      }

      attempts++;
    }

    console.warn("Could not place food — board may be full");
  };

  // ---- Game initialization ----
  useEffect(() => {
    addFood();
  }, []);

  // ---- Snake movement ----
  const moveSnake = () => {
    setSnakePositions((prevSnake) => {
      const head = prevSnake[0];
      const dir = snakeDirRef.current;

      const newHead = [head[0] + dir[0], head[1] + dir[1]];
      const hasAteFood = foodRef.current
        ? isSameCell(newHead, foodRef.current)
        : false;

      // ---- Collision checks ----
      const isWallHit =
        newHead[0] < 0 ||
        newHead[0] >= GAME_CONFIG.width ||
        newHead[1] < 0 ||
        newHead[1] >= GAME_CONFIG.height;

      const bodyToCheck = hasAteFood ? prevSnake : prevSnake.slice(0, -1);

      const isSelfHit = bodyToCheck.some((pos) => isSameCell(pos, newHead));

      if (isWallHit || isSelfHit) {
        console.log("Game Over");
        setIsPlaying(false);
        return prevSnake;
      }

      const nextSnake = hasAteFood
        ? [newHead, ...prevSnake]
        : [newHead, ...prevSnake.slice(0, -1)];

      if (hasAteFood) {
        addFood();
      }

      return nextSnake;
    });
  };

  // ---- Keyboard controls ----
  const changeDirection = (event) => {
    const nextDir = KEY_TO_DIR[event.key];
    if (!nextDir) return;

    const currDir = snakeDirRef.current;
    if (isOpposite(currDir, nextDir)) return;

    snakeDirRef.current = nextDir;
  };

  useEffect(() => {
    window.addEventListener("keydown", changeDirection);
    return () => window.removeEventListener("keydown", changeDirection);
  }, []);

  // ---- Game loop ----
  useEffect(() => {
    if (!isPlaying) return;

    const id = setInterval(moveSnake, GAME_CONFIG.moveInterval);
    return () => clearInterval(id);
  }, [isPlaying]);

  return (
    <div>
      <Board board={gameBoard} />
      {!isPlaying && <div style={{ marginTop: 12 }}>Game Over</div>}
    </div>
  );
};

export default GameController;

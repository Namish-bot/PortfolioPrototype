import React, { useState, useEffect, useRef } from "react";

const BOARD_SIZE = 16;
const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const SPEED = 120;
const COLORS = {
  background: "#161a31", // site palette
  border: "#282b4b", // site palette
  snake: "#00FF00", // retro green
  food: "#FF3131", // retro red
  grid: "#282b4b", // site palette
};

function getRandomFood(snake) {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
    if (!snake.some((s) => s.x === newFood.x && s.y === newFood.y)) break;
  }
  return newFood;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showHowTo, setShowHowTo] = useState(true);
  const moveRef = useRef(direction);
  const runningRef = useRef(true);

  useEffect(() => {
    moveRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (showHowTo || gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const newHead = {
          x: prev[0].x + moveRef.current.x,
          y: prev[0].y + moveRef.current.y,
        };
        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE
        ) {
          setGameOver(true);
          runningRef.current = false;
          return prev;
        }
        // Check self collision
        if (prev.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          runningRef.current = false;
          return prev;
        }
        let newSnake = [newHead, ...prev];
        // Check food
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomFood(newSnake));
          setScore((s) => s + 1);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(interval);
  }, [food, showHowTo, gameOver]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!runningRef.current) return;
      if (e.key === "ArrowUp" && direction.y !== 1) setDirection({ x: 0, y: -1 });
      else if (e.key === "ArrowDown" && direction.y !== -1) setDirection({ x: 0, y: 1 });
      else if (e.key === "ArrowLeft" && direction.x !== 1) setDirection({ x: -1, y: 0 });
      else if (e.key === "ArrowRight" && direction.x !== -1) setDirection({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setShowHowTo(false);
    runningRef.current = true;
  };

  return (
    <div
      className="rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center"
      style={{
        background: COLORS.background,
        width: 480,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        position: "relative",
      }}
    >
      {showHowTo && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-navy/90 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2 text-white">How to Play Snake</h3>
          <ul className="text-neutral-300 text-base mb-4 list-disc list-inside text-left">
            <li>Use <b>Arrow Keys</b> to move the snake</li>
            <li>Eat the red food to grow and score points</li>
            <li>Avoid hitting the walls or yourself</li>
            <li>Try to get the highest score!</li>
          </ul>
          <button
            className="px-4 py-2 rounded bg-royal text-white font-bold hover:bg-indigo mt-2"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
          width: 440,
          height: 440,
          background: COLORS.background,
          border: `2px solid ${COLORS.border}`,
          boxShadow: "0 0 0 4px #282b4b",
          position: "relative",
        }}
      >
        {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, i) => {
          const x = i % BOARD_SIZE;
          const y = Math.floor(i / BOARD_SIZE);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={i}
              style={{
                background: isFood
                  ? COLORS.food
                  : isSnake
                  ? isHead
                    ? "#00e600"
                    : COLORS.snake
                  : COLORS.background,
                border: `1px solid ${COLORS.grid}`,
                width: "100%",
                height: "100%",
              }}
            />
          );
        })}
      </div>
      <div className="flex justify-between w-full mt-2 px-4">
        <span className="text-white font-mono">Score: {score}</span>
        {gameOver && (
          <button
            className="px-3 py-1 rounded bg-royal text-white font-bold hover:bg-indigo ml-2"
            onClick={startGame}
          >
            Restart
          </button>
        )}
      </div>
      {gameOver && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-navy/90 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2 text-white">Game Over</h3>
          <p className="text-neutral-300 mb-4">Your Score: {score}</p>
          <button
            className="px-4 py-2 rounded bg-royal text-white font-bold hover:bg-indigo"
            onClick={startGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
} 
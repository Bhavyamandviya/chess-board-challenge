import React, { useState } from "react";
let history = [];
let future = [];
const App = () => {
  const row = 8;
  const ttcolumns = 8;
  const initialBoardState = new Array(row * ttcolumns).fill("white");

  const [board, setBoard] = useState(initialBoardState);

  const handleChange = (index) => {
    const newBoard = [...board];
    newBoard[index] = newBoard[index] === "#E1674A" ? "white" : "#E1674A";
    history.push(index);
    setBoard(newBoard);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    // console.log(history, "his");
    const hisindex = history.length - 1;
    const previousBoard = [...board];
    console.log(previousBoard, "hiss");
    future.push(history[hisindex]);
    previousBoard[history[hisindex]] =
      previousBoard[history[hisindex]] === "#E1674A" ? "white" : "#E1674A";
    history.pop();
    setBoard(previousBoard);
  };

  const handleRedo = () => {
    if (future.length === 0) return;

    const futindex = future.length - 1;
    const previousBoard = [...board];
    console.log(previousBoard, "hiss");

    previousBoard[future[futindex]] =
      previousBoard[future[futindex]] === "#E1674A" ? "white" : "#E1674A";
    history.push(future.pop());
    setBoard(previousBoard);
  };
  const handleReset = () => {
    setBoard(initialBoardState);
    history = [];
    future = [];
  };

  return (
    <div
      style={{
        background: "#231f1c",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="controls mb-3">
        <button onClick={handleUndo} id="btn" disabled={history.length === 0}>
          Undo
        </button>
        <button id="btn" onClick={handleRedo} disabled={future.length === 0}>
          Redo
        </button>
        <button id="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div
        className="chessboard"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${ttcolumns}, 1fr)`,
        }}
      >
        {board.map((color, index) => {
          const isEvenRow = Math.floor(index / ttcolumns) % 2 === 0;
          const isEvenColumn = (index % ttcolumns) % 2 === 0;
          const defaultColor =
            (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn)
              ? "#c9af7e"
              : "#5b3c1d";

          return (
            <div
              key={index}
              style={{
                backgroundColor: color === "white" ? defaultColor : color,
                // border:
                // color === "white" ? "1px solid #5b3c1d" : "1px solid #c9af7e",
                color:
                  color === "white"
                    ? defaultColor === "white"
                      ? "black"
                      : "white"
                    : "black",
              }}
              className="chessbox"
              onClick={() => handleChange(index)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;

import React from "react";
import "./PlaygroundSection.css";
import PuzzlePiece from "./PuzzlePiece";

const PlaygroundSection: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="playground-section" style={{ paddingTop: `33vh` }}>
      <h1>Puzzle Pieces Playground</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          padding: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <PuzzlePiece type="task-start" color="#FF6B6B" height={150} />
          <p>Task Start</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <PuzzlePiece type="task-middle" color="#4ECDC4" height={150} />
          <p>Task Middle</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <PuzzlePiece type="task-end" color="#FFD166" height={150} />
          <p>Task End</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <PuzzlePiece type="subtask-1" color="#6A4C93" height={150} />
          <p>Subtask 1</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <PuzzlePiece type="subtask-2" color="#FF6F91" height={150} />
          <p>Subtask 2</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <PuzzlePiece type="subtask-3" color="#1982C4" height={150} />
          <p>Subtask 3</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <PuzzlePiece type="subtask-4" color="#8AC926" height={150} />
          <p>Subtask 4</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default PlaygroundSection;

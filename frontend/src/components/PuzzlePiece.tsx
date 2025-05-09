import React from "react";
import PuzzleTaskStart from "../assets/PuzzleTaskStart";
import PuzzleTaskMiddle from "../assets/PuzzleTaskMiddle";
import PuzzleTaskEnd from "../assets/PuzzleTaskEnd";
import PuzzleSubtask1 from "../assets/PuzzleSubtask1";
import PuzzleSubtask2 from "../assets/PuzzleSubtask2";
import PuzzleSubtask3 from "../assets/PuzzleSubtask3";
import PuzzleSubtask4 from "../assets/PuzzleSubtask4";

// Define the types of puzzle pieces
export type PuzzlePieceType =
  | "subtask-1"
  | "subtask-2"
  | "subtask-3"
  | "subtask-4"
  | "task-start"
  | "task-middle"
  | "task-end";

interface PuzzlePieceProps {
  type: PuzzlePieceType;
  color?: string;
  height?: number | string;
  className?: string;
}

const componentMap = {
  "task-start": PuzzleTaskStart,
  "task-middle": PuzzleTaskMiddle,
  "task-end": PuzzleTaskEnd,
  "subtask-1": PuzzleSubtask1,
  "subtask-2": PuzzleSubtask2,
  "subtask-3": PuzzleSubtask3,
  "subtask-4": PuzzleSubtask4,
};

const defaultHeights: Record<PuzzlePieceType, number> = {
  "task-start": 150,
  "task-middle": 150,
  "task-end": 150,
  "subtask-1": 150,
  "subtask-2": 150,
  "subtask-3": 150,
  "subtask-4": 150,
};

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  type,
  color = "#000",
  height,
  className = "",
}) => {
  const Component = componentMap[type];
  return (
    <Component
      fill={color}
      height={height || defaultHeights[type]}
      className={className}
      style={{
        display: "block",
        margin: "0 auto",
        height: height || defaultHeights[type],
      }}
    />
  );
};

export default PuzzlePiece;

import React, { useState, useEffect } from "react";
import "./ProgressSection.css";
import PuzzlePiece from "./PuzzlePiece";
import PuzzleSplittedTask from "./PuzzleSplittedTask";
import LockIcon from "./LockIcon";

interface PuzzlePieceData {
  type: string;
  color: string;
  height: string;
}

interface ProgressSectionProps {
  heightPercent: number;
  onHeightChange: (percent: number) => void;
  onPuzzleClick?: (taskIndex: number) => void;
  selectedTaskIndex: number | null;
  completedSubtasks: boolean[][];
  unlockedIndex: number;
  children?: React.ReactNode;
}

const PUZZLE_HEIGHT_VH = (heightPercent: number) =>
  heightPercent === 50 ? 30 : 18;
const LAST_PIECE_HEIGHT_VH = (heightPercent: number) =>
  heightPercent === 50
    ? PUZZLE_HEIGHT_VH(heightPercent)
    : PUZZLE_HEIGHT_VH(heightPercent) / 1.277;

const puzzleData = (heightPercent: number): PuzzlePieceData[] => [
  {
    type: "task-start",
    color: "#FF6B6B",
    height: `${PUZZLE_HEIGHT_VH(heightPercent)}vh`,
  },
  {
    type: "task-middle",
    color: "#4ECDC4",
    height: `${PUZZLE_HEIGHT_VH(heightPercent)}vh`,
  },
  {
    type: "task-middle",
    color: "#FFD166",
    height: `${PUZZLE_HEIGHT_VH(heightPercent)}vh`,
  },
  {
    type: "task-middle",
    color: "#6A4C93",
    height: `${PUZZLE_HEIGHT_VH(heightPercent)}vh`,
  },
  {
    type: "task-end",
    color: "#FF9F1C",
    height: `${LAST_PIECE_HEIGHT_VH(heightPercent)}vh`,
  },
];

const ProgressSection: React.FC<ProgressSectionProps> = ({
  heightPercent,
  children,
  onPuzzleClick,
  selectedTaskIndex,
  unlockedIndex,
}) => {
  const [showSplittedTask, setShowSplittedTask] = useState(false);

  useEffect(() => {
    if (heightPercent === 50) {
      const timer = setTimeout(() => setShowSplittedTask(true), 250);
      return () => clearTimeout(timer);
    } else {
      setShowSplittedTask(false);
    }
  }, [heightPercent]);

  const isTaskClickable = (index: number) => {
    if (heightPercent === 50) return false;
    if (selectedTaskIndex !== null) return false;
    return index === unlockedIndex;
  };

  const isTaskLocked = (index: number) => {
    if (index < unlockedIndex) return true;
    if (index === selectedTaskIndex) return false;
    return index > unlockedIndex;
  };

  const renderPuzzlePiece = (piece: PuzzlePieceData, idx: number) => {
    if (heightPercent === 50 && idx === unlockedIndex && showSplittedTask) {
      return (
        <div
          style={{
            opacity: 0,
            animation: "fadeIn 0.3s ease-in forwards",
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            left: 0,
          }}
        >
          <PuzzleSplittedTask
            color={piece.color}
            height={piece.height}
            className=""
          />
        </div>
      );
    }

    return (
      <div
        style={{
          opacity:
            showSplittedTask && heightPercent === 50 && idx === unlockedIndex
              ? 0
              : 1,
          transition: "opacity 0.3s ease-out",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PuzzlePiece
          type={piece.type as any}
          color={piece.color}
          height={piece.height}
          className={isTaskClickable(idx) ? "puzzle-piece-hoverable" : ""}
        />
      </div>
    );
  };

  return (
    <div className="progress-section" style={{ height: `${heightPercent}vh` }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div style={{ width: heightPercent === 50 ? "5%" : "15%" }} />
        <div
          style={{
            width: heightPercent === 50 ? "90%" : "70%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Left separator for unlocked piece (if not first) */}
          {unlockedIndex > 0 &&
            unlockedIndex < puzzleData(heightPercent).length && (
              <div
                className="vertical-dashed-separator"
                style={{
                  position: "absolute",
                  left: `calc(${
                    (100 / puzzleData(heightPercent).length) * unlockedIndex
                  }% - 1px)`,
                  top: 0,
                  height: "100%",
                }}
              />
            )}
          {puzzleData(heightPercent).map((piece, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                position: "relative",
                flex: 1,
              }}
            >
              <div
                style={{
                  marginBottom: 8,
                  position: "absolute",
                  top: "1.5vh",
                  left: idx < 4 ? "calc(50% - 1vw)" : "50%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                }}
                className={
                  isTaskClickable(idx) ? "puzzle-lock-hover" : undefined
                }
              >
                <LockIcon
                  locked={isTaskLocked(idx)}
                  color={piece.color}
                  size="3vh"
                />
              </div>
              <div
                onClick={() => {
                  if (isTaskClickable(idx)) {
                    if (typeof onPuzzleClick === "function") {
                      onPuzzleClick(idx);
                    }
                  }
                }}
                style={{
                  cursor: isTaskClickable(idx) ? "pointer" : "default",
                }}
              >
                {renderPuzzlePiece(piece, idx)}
              </div>
            </div>
          ))}
          {/* Right separator for unlocked piece (if not last) */}
          {unlockedIndex < puzzleData(heightPercent).length - 1 && (
            <div
              className="vertical-dashed-separator"
              style={{
                position: "absolute",
                left: `calc(${
                  (100 / puzzleData(heightPercent).length) * (unlockedIndex + 1)
                }% - 1px)`,
                top: 0,
                height: "100%",
              }}
            />
          )}
        </div>
        <div style={{ width: heightPercent === 50 ? "5%" : "15%" }} />
      </div>
      {children}
    </div>
  );
};

export default ProgressSection;

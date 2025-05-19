import React from "react";
import "./ProgressSection.css";
import PuzzlePiece from "./PuzzlePiece";
import LockIcon from "./LockIcon";

interface ProgressSectionProps {
  heightPercent: number;
  onHeightChange: (percent: number) => void;
  onPuzzleClick?: (taskIndex: number) => void;
  selectedTaskIndex: number | null;
  completedSubtasks: boolean[][];
  unlockedIndex: number;
  children?: React.ReactNode;
}

const PUZZLE_HEIGHT_VH = 18;
const LAST_PIECE_HEIGHT_VH = 18 / 1.277; // ≈ 11.75

const puzzleData = [
  { type: "task-start", color: "#FF6B6B", height: `${PUZZLE_HEIGHT_VH}vh` },
  { type: "task-middle", color: "#4ECDC4", height: `${PUZZLE_HEIGHT_VH}vh` },
  { type: "task-middle", color: "#FFD166", height: `${PUZZLE_HEIGHT_VH}vh` },
  { type: "task-middle", color: "#6A4C93", height: `${PUZZLE_HEIGHT_VH}vh` },
  { type: "task-end", color: "#FF9F1C", height: `${LAST_PIECE_HEIGHT_VH}vh` },
];

const ProgressSection: React.FC<ProgressSectionProps> = ({
  heightPercent,
  children,
  onPuzzleClick,
  selectedTaskIndex,
  unlockedIndex,
}) => {
  const isTaskClickable = (index: number) => {
    if (selectedTaskIndex !== null) return false;
    return index === unlockedIndex;
  };

  const isTaskLocked = (index: number) => {
    if (index < unlockedIndex) return true;
    if (index === selectedTaskIndex) return false;
    return index > unlockedIndex;
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
        <div style={{ width: "15%" }} />
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Left separator for unlocked piece (if not first) */}
          {unlockedIndex > 0 && unlockedIndex < puzzleData.length && (
            <div
              className="vertical-dashed-separator"
              style={{
                position: "absolute",
                left: `calc(${
                  (100 / puzzleData.length) * unlockedIndex
                }% - 1px)`,
                top: 0,
                height: "100%",
              }}
            />
          )}
          {puzzleData.map((piece, idx) => (
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
                <PuzzlePiece
                  type={piece.type as any}
                  color={piece.color}
                  height={piece.height}
                  className={
                    isTaskClickable(idx) ? "puzzle-piece-hoverable" : ""
                  }
                />
              </div>
            </div>
          ))}
          {/* Right separator for unlocked piece (if not last) */}
          {unlockedIndex < puzzleData.length - 1 && (
            <div
              className="vertical-dashed-separator"
              style={{
                position: "absolute",
                left: `calc(${
                  (100 / puzzleData.length) * (unlockedIndex + 1)
                }% - 1px)`,
                top: 0,
                height: "100%",
              }}
            />
          )}
        </div>
        <div style={{ width: "15%" }} />
      </div>
      {children}
    </div>
  );
};

export default ProgressSection;

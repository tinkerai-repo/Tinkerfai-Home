import React, { useState } from "react";
import "./ProgressSection.css";
import PuzzlePiece from "./PuzzlePiece";
import LockIcon from "./LockIcon";

interface ProgressSectionProps {
  heightPercent: number;
  onHeightChange: (percent: number) => void;
  children?: React.ReactNode;
}

const PUZZLE_HEIGHT_VH = 18;
const LAST_PIECE_HEIGHT_VH = 18 / 1.277; // ≈ 11.75

const puzzleData = [
  { type: "task-start", color: "#FF6B6B", height: `${PUZZLE_HEIGHT_VH}vh` },
  { type: "task-middle", color: "#4ECDC4", height: `${PUZZLE_HEIGHT_VH}vh` },
  { type: "task-middle", color: "#FFD166", height: `${PUZZLE_HEIGHT_VH}vh` },
  { type: "task-end", color: "#6A4C93", height: `${LAST_PIECE_HEIGHT_VH}vh` },
];

const ProgressSection: React.FC<ProgressSectionProps> = ({
  heightPercent,
  children,
}) => {
  const [unlockedIndex, setUnlockedIndex] = useState(0);

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
                  marginLeft: idx < 3 ? "-2vw" : undefined,
                  pointerEvents: "none",
                }}
                className={
                  unlockedIndex === idx ? "puzzle-lock-hover" : undefined
                }
              >
                <LockIcon
                  locked={unlockedIndex !== idx}
                  color={piece.color}
                  size="3vh"
                />
              </div>
              <div
                onClick={() => {
                  if (unlockedIndex === idx) {
                    setUnlockedIndex(idx + 1);
                  }
                }}
                style={{
                  cursor: unlockedIndex === idx ? "pointer" : "default",
                }}
              >
                <PuzzlePiece
                  type={piece.type as any}
                  color={piece.color}
                  height={piece.height}
                  className={
                    unlockedIndex === idx ? "puzzle-piece-hoverable" : ""
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

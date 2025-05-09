import React from "react";
import "./ProgressSection.css";
import PuzzlePiece from "./PuzzlePiece";

interface ProgressSectionProps {
  heightPercent: number;
  onHeightChange: (percent: number) => void;
  children?: React.ReactNode;
}

const PUZZLE_HEIGHT_VH = 18;

const ProgressSection: React.FC<ProgressSectionProps> = ({
  heightPercent,
  children,
}) => {
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
          }}
        >
          <PuzzlePiece
            type="task-start"
            color="#FF6B6B"
            height={`${PUZZLE_HEIGHT_VH}vh`}
          />
          <PuzzlePiece
            type="task-middle"
            color="#4ECDC4"
            height={`${PUZZLE_HEIGHT_VH}vh`}
          />
          <PuzzlePiece
            type="task-middle"
            color="#FFD166"
            height={`${PUZZLE_HEIGHT_VH}vh`}
          />
          <PuzzlePiece
            type="task-end"
            color="#6A4C93"
            height={`${PUZZLE_HEIGHT_VH / 1.277}vh`}
          />
        </div>
        <div style={{ width: "15%" }} />
      </div>
      {children}
    </div>
  );
};

export default ProgressSection;

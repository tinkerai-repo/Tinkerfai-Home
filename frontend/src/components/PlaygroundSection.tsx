import React from "react";
import "./PlaygroundSection.css";
import PuzzlePiece from "./PuzzlePiece";

export type PuzzlePieceType =
  | "subtask-1"
  | "subtask-2"
  | "subtask-3"
  | "subtask-4";

const TASK_COLORS = [
  // Pink
  ["#FF4B4B", "#FF8B8B", "#FF8B8B", "#FF4B4B"],
  // Blue-Green
  ["#11999E", "#6FE7DD", "#6FE7DD", "#11999E"],
  // Yellow
  ["#FFD166", "#FFE299", "#FFE299", "#FFD166"],
  // Purple
  ["#6A4C93", "#A084CA", "#A084CA", "#6A4C93"],
];

const SUBTASK_TYPES: PuzzlePieceType[] = [
  "subtask-1",
  "subtask-2",
  "subtask-3",
  "subtask-4",
];

interface PlaygroundSectionProps {
  selectedTaskIndex: number | null;
  currentSubtaskIndex: number;
  onSubtaskClick: (subtaskIndex: number) => void;
  completedSubtasks: boolean[][];
  children?: React.ReactNode;
}

const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({
  selectedTaskIndex,
  currentSubtaskIndex,
  onSubtaskClick,
  completedSubtasks,
  children,
}) => {
  if (selectedTaskIndex === null) {
    return (
      <div
        className="playground-section"
        style={{ paddingTop: `33vh`, height: "100%" }}
      >
        {children}
      </div>
    );
  }

  const colors = TASK_COLORS[selectedTaskIndex];

  const isSubtaskClickable = (index: number) => {
    return index === currentSubtaskIndex;
  };

  const getShiftDirection = () => {
    if (currentSubtaskIndex === 0 || currentSubtaskIndex === 2) return "right";
    if (currentSubtaskIndex === 1 || currentSubtaskIndex === 3) return "left";
    return null;
  };

  const shiftDirection = getShiftDirection();
  const shouldShowSeparator = selectedTaskIndex !== null;

  return (
    <div
      className="playground-section"
      style={{ height: "100%", position: "relative" }}
    >
      <div className="puzzle-area-wrapper">
        {shouldShowSeparator && <div className="vertical-separator" />}
        <div
          className={`puzzle-blocks-container${
            shiftDirection ? ` shift-${shiftDirection}` : ""
          }`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            gap: "0",
            width: "38.7vh",
            height: "38.7vh",
            placeItems: "center",
            transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
            transform:
              shiftDirection === "right"
                ? "translateX(128%)"
                : shiftDirection === "left"
                ? "translateX(-128%)"
                : "none",
          }}
        >
          {SUBTASK_TYPES.map((type, i) => {
            // By default, blocks 1 & 4 (i=0,3) have z-index 2, blocks 2 & 3 (i=1,2) have z-index 1
            let zIndex = i === 0 || i === 3 ? 2 : 1;
            // When 2 or 3 is clickable, blocks 1 & 4 get z-index 1, blocks 2 & 3 get z-index 2
            if (currentSubtaskIndex === 1 || currentSubtaskIndex === 2) {
              zIndex = i === 1 || i === 2 ? 2 : 1;
            }
            return (
              <div
                key={`task${selectedTaskIndex + 1}subtask${i + 1}`}
                style={{
                  position: "relative",
                  zIndex,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: isSubtaskClickable(i) ? "auto" : "none",
                  ...(i === 0
                    ? {
                        marginLeft: "22%",
                        transform: "translateY(8.6vh) translateX(10.7%)",
                        marginTop: "4.3vh",
                      }
                    : {}),
                  ...(i === 1
                    ? { transform: "translateX(-11.5%) translateY(8.6vh)" }
                    : {}),
                  ...(i === 2
                    ? { transform: "translateX(10.7%)", marginTop: "4.3vh" }
                    : {}),
                  ...(i === 3
                    ? { marginLeft: "-22%", transform: "translateX(-11.5%)" }
                    : {}),
                }}
                onClick={() => onSubtaskClick(i)}
              >
                <PuzzlePiece
                  type={type}
                  color={colors[i]}
                  height={i === 0 || i === 3 ? "19.35vh" : "15vh"}
                  className={
                    isSubtaskClickable(i) ? "puzzle-piece-hoverable" : ""
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
};

export default PlaygroundSection;

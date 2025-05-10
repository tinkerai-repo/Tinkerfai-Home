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
  children?: React.ReactNode;
}

const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({
  selectedTaskIndex,
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
  return (
    <div className="playground-section" style={{ height: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "0",
          width: "38.7vh",
          height: "38.7vh",
          placeItems: "center",
        }}
      >
        {SUBTASK_TYPES.map((type, i) => (
          <div
            key={`task${selectedTaskIndex + 1}subtask${i + 1}`}
            style={{
              position: "relative",
              zIndex: i + 1,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "auto",
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
          >
            <PuzzlePiece
              type={type}
              color={colors[i]}
              height={i === 0 || i === 3 ? "19.35vh" : "15vh"}
            />
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default PlaygroundSection;

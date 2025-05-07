import React from "react";
import "./ProgressSection.css";

interface ProgressSectionProps {
  heightPercent: number;
  onHeightChange: (percent: number) => void;
  children?: React.ReactNode;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({
  heightPercent,
  children,
}) => {
  return (
    <div className="progress-section" style={{ height: `${heightPercent}vh` }}>
      {children}
    </div>
  );
};

export default ProgressSection;

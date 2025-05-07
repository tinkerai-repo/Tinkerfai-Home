import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ProgressSection from "./components/ProgressSection";
import PlaygroundSection from "./components/PlaygroundSection";
import DragHandleOverlay from "./components/DragHandleOverlay";

function App() {
  const [progressSectionHeight, setProgressSectionHeight] = useState(25);

  return (
    <>
      <Header />
      <div className="main-sections">
        <ProgressSection
          heightPercent={progressSectionHeight}
          onHeightChange={setProgressSectionHeight}
        />
        <PlaygroundSection />
        <DragHandleOverlay
          top={`calc(8vh + ${progressSectionHeight}vh)`}
          onDrag={setProgressSectionHeight}
          isMax={progressSectionHeight === 50}
          onCollapse={() => setProgressSectionHeight(25)}
        />
      </div>
    </>
  );
}

export default App;

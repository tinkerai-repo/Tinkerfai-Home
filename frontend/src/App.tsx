import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ProgressSection from "./components/ProgressSection";
import PlaygroundSection from "./components/PlaygroundSection";
import DragHandleOverlay from "./components/DragHandleOverlay";
import ChatBotSection from "./components/ChatBotSection";
import ChatBotHandleOverlay from "./components/ChatBotHandleOverlay";

function App() {
  const [progressSectionHeight, setProgressSectionHeight] = useState(25);
  const [chatbotSectionHeight, setChatbotSectionHeight] = useState(5);

  // Ensure only one section can be at max height at a time
  const handleProgressSectionHeight = (percent: number) => {
    if (percent === 50 && chatbotSectionHeight === 50) {
      setChatbotSectionHeight(5);
    }
    setProgressSectionHeight(percent);
  };

  const handleChatbotSectionHeight = (percent: number) => {
    if (percent === 50 && progressSectionHeight === 50) {
      setProgressSectionHeight(25);
    }
    setChatbotSectionHeight(percent);
  };

  return (
    <>
      <Header />
      <div className="main-sections">
        <ProgressSection
          heightPercent={progressSectionHeight}
          onHeightChange={handleProgressSectionHeight}
        />
        <PlaygroundSection />
        <DragHandleOverlay
          top={`calc(8vh + ${progressSectionHeight}vh)`}
          onDrag={handleProgressSectionHeight}
          isMax={progressSectionHeight === 50}
          onCollapse={() => handleProgressSectionHeight(25)}
        />
        <ChatBotSection
          heightPercent={chatbotSectionHeight}
          onHeightChange={handleChatbotSectionHeight}
        />
        <ChatBotHandleOverlay
          bottom={`calc(${chatbotSectionHeight}vh)`}
          onDrag={handleChatbotSectionHeight}
          isMax={chatbotSectionHeight === 50}
          onCollapse={() => handleChatbotSectionHeight(5)}
        />
      </div>
    </>
  );
}

export default App;

import React from "react";
import "./PlaygroundSection.css";

const PlaygroundSection: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="playground-section" style={{ paddingTop: `33vh` }}>
      <h1>Playground Section</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi,
        euismod euismod nisi nisi euismod.
      </p>
      <p>
        Aliquam erat volutpat. Etiam euismod, nisi eu consectetur consectetur,
        nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.
      </p>
      <p>
        Morbi facilisis, justo eu facilisis facilisis, nisi nisi facilisis nisi,
        facilisis facilisis nisi nisi facilisis.
      </p>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium.
      </p>
      <p>
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam.
      </p>
      <p>
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur.
      </p>
      {children}
    </div>
  );
};

export default PlaygroundSection;

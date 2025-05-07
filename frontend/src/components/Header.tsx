import React from "react";
import "./Header.css";
import logo from "../assets/tinkerfai-logo.png";

const Header: React.FC = () => {
  return (
    <header className="header-bar">
      <div className="header-logo-container">
        <img src={logo} alt="Tinkerfai Logo" className="header-logo" />
      </div>
      <button className="header-profile-icon" aria-label="Profile">
        <svg height="36" width="36" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="12"
            r="7"
            fill="none"
            stroke="#222"
            strokeWidth="2"
          />
          <path
            d="M6 30c0-5 7-7 12-7s12 2 12 7"
            fill="none"
            stroke="#222"
            strokeWidth="2"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;

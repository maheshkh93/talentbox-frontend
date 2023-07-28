import React from "react";
import "./components.css";

export default function Header({ navAction, action }) {
  return (
    <div className="header-main">
      <div className="header header-left">Search 8000+ tutorials</div>
      <div className="header">freeCodeCamp</div>
      <div className="header header-right">
        <span className="menu">Menu</span>
        <span className="signin-button" onClick={navAction}>
          {action}
        </span>
      </div>
    </div>
  );
}

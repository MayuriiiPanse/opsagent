import React from "react";
import "../styles/Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search for assets, work orders, tickets..." />
        <span className="search-kbd">⌘K</span>
      </div>

      <div className="topbar-actions">
        <button className="icon-btn" aria-label="Alerts">
          🔔<span className="badge">4</span>
        </button>
        <button className="icon-btn" aria-label="Help">
          ❓
        </button>
        <div className="facility-select">
          🏢 Head Office <span>▾</span>
        </div>
      </div>
    </header>
  );
}

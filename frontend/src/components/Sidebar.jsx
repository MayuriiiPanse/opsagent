import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const navItems = [
  { label: "Overview", icon: "▦", to: "/dashboard", end: true },
  { label: "Modules", icon: "▣", to: "/dashboard", end: true, isModules: true },
  { label: "Work Orders", icon: "▭", disabled: true },
  { label: "Assets", icon: "▤", disabled: true },
  { label: "Monitoring", icon: "∿", disabled: true },
  { label: "Analytics", icon: "▉", disabled: true },
  { label: "Reports", icon: "▤", disabled: true },
  { label: "Alerts", icon: "🔔", disabled: true },
  { label: "Schedules", icon: "▦", disabled: true },
  { label: "Integrations", icon: "⇄", disabled: true },
  { label: "Settings", icon: "⚙", disabled: true }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">⬡</span>
        <div>
          <div className="sidebar-brand-title">Agentic</div>
          <div className="sidebar-brand-title">Facility Ops AI</div>
          <div className="sidebar-brand-tag">PLATFORM</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              {item.disabled ? (
                <span className="sidebar-link disabled">
                  <span className="sidebar-icon">{item.icon}</span>
                  {item.label}
                </span>
              ) : (
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    "sidebar-link" +
                    (isActive && !item.isModules ? " active" : "") +
                    (item.isModules ? " active" : "")
                  }
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-assistant">
        <span className="assistant-dot" />
        <div>
          <div className="assistant-title">AI Assistant</div>
          <div className="assistant-status">Online</div>
        </div>
      </div>
    </aside>
  );
}

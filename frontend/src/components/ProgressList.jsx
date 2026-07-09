import React from "react";
import "../styles/ProgressList.css";

/**
 * items: array of { label, percentage, color }
 */
export default function ProgressList({ items = [] }) {
  return (
    <div className="progress-list">
      {items.map((item) => (
        <div className="progress-row" key={item.label}>
          <div className="progress-row-top">
            <span>{item.label}</span>
            <span>{item.percentage}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${item.percentage}%`,
                background: item.color || "var(--color-primary)"
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

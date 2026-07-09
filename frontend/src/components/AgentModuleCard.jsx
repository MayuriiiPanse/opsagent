import React from "react";
import { useNavigate } from "react-router-dom";
import Sparkline from "./Sparkline.jsx";
import MiniBarChart from "./MiniBarChart.jsx";
import "../styles/AgentModuleCard.css";

export default function AgentModuleCard({
  index,
  icon,
  iconTone,
  title,
  description,
  capabilities = [],
  stats = [],
  chartType = "line",
  chartData = [],
  chartColor,
  detailPath
}) {
  const navigate = useNavigate();

  return (
    <div className="module-card card">
      <div className="module-card-header">
        <div className="module-card-left">
          <div className={`module-icon tone-${iconTone}`}>{icon}</div>
          <div>
            <h3>
              {index}. {title}
            </h3>
            <p className="module-description">{description}</p>
            <ul className="module-capabilities">
              {capabilities.map((c) => (
                <li key={c}>
                  <span className="check">✓</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="module-stats">
          <span className="module-period">THIS MONTH</span>
          {stats.map((s) => (
            <div key={s.label}>
              <div className={`module-stat-value tone-${s.tone || "default"}`}>
                {s.value}
              </div>
              <div className="module-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="module-chart-col">
          <span className="module-status">
            <span className="status-dot" /> Running
          </span>
          <div className="module-chart">
            {chartType === "line" ? (
              <Sparkline data={chartData} color={chartColor} />
            ) : (
              <MiniBarChart
                data={chartData.map((v, i) => ({ label: i, value: v }))}
                color={chartColor}
              />
            )}
          </div>
          <button
            className="btn btn-secondary module-view-btn"
            onClick={() => navigate(detailPath)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

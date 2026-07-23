import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api.js";
import KpiCard from "../components/KpiCard.jsx";
import "../styles/AgentDetail.css";

export default function MaintenanceAgentPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getMaintenanceAgent()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="page-error">
        Couldn't load Maintenance Agent data. {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="page-loading">
        Loading Maintenance Agent...
      </div>
    );
  }

  return (
    <div className="agent-detail">
      <button
        className="back-link"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Modules
      </button>

      <div className="agent-detail-header">
        <div className="agent-detail-icon tone-maintenance">🛠️</div>

        <div>
          <h1>Maintenance Agent</h1>
          <p>{data.agent.description}</p>
        </div>

        <span className="tag tag-active">
          <span className="tag-dot" /> Active
        </span>
      </div>

      <div className="dashboard-kpis">
        <KpiCard
          icon="🛠️"
          value={`${data.summary.equipmentHealth}%`}
          label="Equipment Health"
        />

        <KpiCard
          icon="🌡️"
          value={`${data.summary.averageTemperature}°C`}
          label="Average Temperature"
        />

        <KpiCard
          icon="⚠️"
          value={data.summary.maintenanceStatus}
          label="Maintenance Status"
        />

        <KpiCard
          icon="🤖"
          value={`${data.summary.aiAccuracy}%`}
          label="AI Accuracy"
          tone="success"
        />
      </div>

      <div className="card panel">
        <h3>Equipment Overview</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Health</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.equipment.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.health}%</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card panel">
        <h3>Temperature Trend</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Average Temperature (°C)</th>
            </tr>
          </thead>

          <tbody>
            {data.weeklyTrend.map((day, index) => (
              <tr key={index}>
                <td>{day.day}</td>
                <td>{day.temperature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card panel">
        <h3>AI Recommendations</h3>

        <ul className="recommendation-list">
          {data.recommendations.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <br />
              {item.description}
              <br />
              <small>
                <b>Priority:</b> {item.priority}
              </small>
            </li>
          ))}
        </ul>
      </div>

      <div className="card panel">
        <h3>Alerts</h3>

        <ul className="recommendation-list">
          {data.alerts.map((alert) => (
            <li key={alert.id}>
              <strong>{alert.severity}</strong>
              <br />
              {alert.message}
              <br />
              <small>{alert.timestamp}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
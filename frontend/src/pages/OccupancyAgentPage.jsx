import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api.js";
import KpiCard from "../components/KpiCard.jsx";
import "../styles/AgentDetail.css";

export default function OccupancyAgentPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getOccupancyAgent()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="page-error">
        Couldn't load Occupancy Agent data. {error}
      </div>
    );
  }

  if (!data) {
    return <div className="page-loading">Loading Occupancy Agent...</div>;
  }

  return (
    <div className="agent-detail">
      <button className="back-link" onClick={() => navigate("/dashboard")}>
        ← Back to Modules
      </button>

      <div className="agent-detail-header">
        <div className="agent-detail-icon tone-energy">👥</div>

        <div>
          <h1>Occupancy Agent</h1>
          <p>AI-powered occupancy monitoring and space optimization.</p>
        </div>

        <span className="tag tag-active">
          <span className="tag-dot" /> Active
        </span>
      </div>

      <div className="dashboard-kpis">
        <KpiCard
  icon="👥"
  value={data.summary.currentOccupancy}
  label="Current Occupancy"
/>

<KpiCard
  icon="📊"
  value={`${data.summary.occupancyRate}%`}
  label="Occupancy Rate"
/>

<KpiCard
  icon="🤖"
  value={`${data.summary.aiConfidence}%`}
  label="AI Confidence"
  tone="success"
/>
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
      <small>Impact: {item.impact}</small>
    </li>
  ))}
</ul>
      </div>
    </div>
  );
}
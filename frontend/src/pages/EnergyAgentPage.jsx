import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api.js";
import KpiCard from "../components/KpiCard.jsx";
import Sparkline from "../components/Sparkline.jsx";
import ProgressList from "../components/ProgressList.jsx";
import "../styles/AgentDetail.css";

export default function EnergyAgentPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getEnergyAgent()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="page-error">Couldn't load Energy Agent data. {error}</div>;
  }
  if (!data) {
    return <div className="page-loading">Loading Energy Agent…</div>;
  }

  const { summary, weeklyTrend, energyDistribution, facilities, recommendations, alerts } = data;

  return (
    <div className="agent-detail">
      <button className="back-link" onClick={() => navigate("/dashboard")}>
        ← Back to Modules
      </button>

      <div className="agent-detail-header">
        <div className="agent-detail-icon tone-energy">⚡</div>
        <div>
          <h1>Energy Agent</h1>
          <p>{data.agent.description}</p>
        </div>
        <span className="tag tag-active">
          <span className="tag-dot" /> Active
        </span>
      </div>

      <div className="dashboard-kpis">
        <KpiCard icon="⚡" value={`${summary.energySavingsPct}%`} label="Energy Savings" tone="success" />
        <KpiCard icon="₹" value={`₹${(summary.costSavings / 100000).toFixed(2)}L`} label="Cost Savings" />
        <KpiCard icon="🎯" value={`${summary.forecastAccuracyPct}%`} label="Forecast Accuracy" />
        <KpiCard icon="🌱" value={`${summary.carbonReductionPct}%`} label="Carbon Reduction" tone="success" />
        <KpiCard icon="🔌" value={`${summary.totalEnergyConsumedMWh} MWh`} label="Total Energy" />
        <KpiCard icon="📈" value={`${summary.efficiencyScorePct}%`} label="Efficiency Score" />
      </div>

      <div className="agent-detail-grid">
        <div className="card panel">
          <h3>Weekly Energy Consumption (kWh)</h3>
          <Sparkline
            data={weeklyTrend.map((d) => d.consumptionKWh)}
            width={520}
            height={140}
            color="#17b26a"
          />
          <div className="trend-labels">
            {weeklyTrend.map((d) => (
              <span key={d.day}>{d.day}</span>
            ))}
          </div>
        </div>

        <div className="card panel">
          <h3>Energy Distribution</h3>
          <ProgressList
            items={energyDistribution.map((d) => ({
              label: d.system,
              percentage: d.percentage
            }))}
          />
        </div>
      </div>

      <div className="card panel">
        <h3>Facility Breakdown</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Facility</th>
              <th>Current Load</th>
              <th>Daily Energy</th>
              <th>Cost Savings (Month)</th>
              <th>Efficiency Score</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((f) => (
              <tr key={f.facilityId}>
                <td>{f.facilityName}</td>
                <td>{f.currentLoadKW} kW</td>
                <td>{f.dailyEnergyKWh} kWh</td>
                <td>₹{f.costSavingsThisMonth.toLocaleString("en-IN")}</td>
                <td>{f.efficiencyScorePct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="agent-detail-grid">
        <div className="card panel">
          <h3>AI Recommendations</h3>
          <ul className="recommendation-list">
            {recommendations.map((r) => (
              <li key={r.id}>
                <div className="rec-top">
                  <strong>{r.title}</strong>
                  <span className={`impact-tag impact-${r.impact.toLowerCase()}`}>
                    {r.impact} Impact
                  </span>
                </div>
                <p>{r.description}</p>
                <span className="rec-savings">Est. savings: {r.estimatedSavings}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card panel">
          <h3>Recent Alerts</h3>
          <ul className="alert-list">
            {alerts.map((a) => (
              <li key={a.id}>
                <span className={`alert-dot severity-${a.severity.toLowerCase()}`} />
                <div>
                  <p>{a.message}</p>
                  <span className="alert-time">
                    {new Date(a.timestamp).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

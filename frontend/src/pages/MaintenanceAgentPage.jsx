import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api.js";
import KpiCard from "../components/KpiCard.jsx";
import MiniBarChart from "../components/MiniBarChart.jsx";
import ProgressList from "../components/ProgressList.jsx";
import "../styles/AgentDetail.css";

const healthClass = {
  Excellent: "health-excellent",
  Good: "health-good",
  Warning: "health-warning",
  Critical: "health-critical"
};

const priorityClass = {
  Critical: "priority-critical",
  High: "priority-high",
  Medium: "priority-medium",
  Low: "priority-low"
};

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
    return <div className="page-error">Couldn't load Maintenance Agent data. {error}</div>;
  }
  if (!data) {
    return <div className="page-loading">Loading Maintenance Agent…</div>;
  }

  const { summary, weeklyTrend, equipmentHealthDistribution, assets, workOrders, alerts } = data;

  return (
    <div className="agent-detail">
      <button className="back-link" onClick={() => navigate("/dashboard")}>
        ← Back to Modules
      </button>

      <div className="agent-detail-header">
        <div className="agent-detail-icon tone-maintenance">🔧</div>
        <div>
          <h1>Maintenance Agent</h1>
          <p>{data.agent.description}</p>
        </div>
        <span className="tag tag-active">
          <span className="tag-dot" /> Active
        </span>
      </div>

      <div className="dashboard-kpis">
        <KpiCard icon="📈" value={`${summary.mtbfImprovementPct}%`} label="MTBF Improvement" tone="success" />
        <KpiCard icon="🧾" value={summary.workOrdersClosed} label="Work Orders Closed" />
        <KpiCard icon="⏱" value={`${summary.downtimeReducedPct}%`} label="Downtime Reduced" tone="success" />
        <KpiCard icon="🏷" value={summary.assetsMonitored} label="Assets Monitored" />
        <KpiCard icon="📋" value={summary.openMaintenanceTickets} label="Maintenance Tickets" />
        <KpiCard icon="⚠" value={summary.predictedFailures} label="Predicted Failures" tone="warning" />
      </div>

      <div className="agent-detail-grid">
        <div className="card panel">
          <h3>Work Orders Closed (Weekly)</h3>
          <MiniBarChart
            data={weeklyTrend.map((d) => ({ label: d.week, value: d.workOrdersClosed }))}
            width={520}
            height={140}
            color="#635bff"
          />
          <div className="trend-labels">
            {weeklyTrend.map((d) => (
              <span key={d.week}>{d.week}</span>
            ))}
          </div>
        </div>

        <div className="card panel">
          <h3>Equipment Health Distribution</h3>
          <ProgressList
            items={equipmentHealthDistribution.map((d) => ({
              label: d.status,
              percentage: d.percentage,
              color:
                d.status === "Excellent"
                  ? "#17b26a"
                  : d.status === "Good"
                  ? "#2e90fa"
                  : d.status === "Warning"
                  ? "#f79009"
                  : "#f04438"
            }))}
          />
        </div>
      </div>

      <div className="card panel">
        <h3>Monitored Assets</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Facility</th>
              <th>Health Score</th>
              <th>Status</th>
              <th>Next Predicted Failure</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a) => (
              <tr key={a.assetId}>
                <td>{a.assetName}</td>
                <td>{a.assetType}</td>
                <td>{a.facility}</td>
                <td>{a.healthScorePct}%</td>
                <td>
                  <span className={`health-badge ${healthClass[a.healthStatus]}`}>
                    {a.healthStatus}
                  </span>
                </td>
                <td>{a.nextPredictedFailure || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="agent-detail-grid">
        <div className="card panel">
          <h3>Auto-Generated Work Orders</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((w) => (
                <tr key={w.workOrderId}>
                  <td>{w.workOrderId}</td>
                  <td>{w.title}</td>
                  <td>
                    <span className={`priority-badge ${priorityClass[w.priority]}`}>
                      {w.priority}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill">{w.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

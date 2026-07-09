import React, { useEffect, useState } from "react";
import KpiCard from "../components/KpiCard.jsx";
import AgentModuleCard from "../components/AgentModuleCard.jsx";
import { api } from "../api/api.js";
import "../styles/Dashboard.css";

const TABS = ["All Modules", "Operations", "Maintenance", "Sustainability", "Security"];

export default function Dashboard() {
  const [energy, setEnergy] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [activeTab, setActiveTab] = useState("All Modules");
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.getEnergyAgent(), api.getMaintenanceAgent()])
      .then(([e, m]) => {
        setEnergy(e);
        setMaintenance(m);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="page-error">
        Couldn't load module data. Is the backend running on port 5000?
        <br />
        {error}
      </div>
    );
  }

  if (!energy || !maintenance) {
    return <div className="page-loading">Loading AI agent modules…</div>;
  }

  const avgEfficiencyGain = (
    (energy.summary.energySavingsPct + maintenance.summary.mtbfImprovementPct / 8) /
    2
  ).toFixed(1);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1>AI Agent Modules</h1>
          <p>Autonomous AI agents working together to optimize your facility operations.</p>
        </div>
        <button className="btn btn-primary">+ Add New Module</button>
      </div>

      <div className="dashboard-kpis">
        <KpiCard icon="⚡" value="2" label="Active Modules" trend="running smoothly ✓" />
        <KpiCard
          icon="✓"
          value={`${avgEfficiencyGain}%`}
          label="Avg. Efficiency Gain"
          trend="this month ↗"
          tone="success"
        />
        <KpiCard
          icon="⚡"
          value={`${energy.summary.energySavingsPct}%`}
          label="Energy Savings"
          trend="this month ↗"
          tone="warning"
        />
        <KpiCard
          icon="⏱"
          value={`₹${(energy.summary.costSavings / 100000).toFixed(2)}L`}
          label="Cost Savings"
          trend="this month ↗"
        />
      </div>

      <div className="dashboard-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`dashboard-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <AgentModuleCard
        index={1}
        icon="⚡"
        iconTone="energy"
        title="Energy Agent"
        description={energy.agent.description}
        capabilities={energy.agent.capabilities}
        chartType="line"
        chartData={energy.weeklyTrend.map((d) => d.consumptionKWh)}
        chartColor="#17b26a"
        detailPath="/dashboard/energy-agent"
        stats={[
          { value: `${energy.summary.energySavingsPct}%`, label: "Energy Savings" },
          {
            value: `₹${(energy.summary.costSavings / 100000).toFixed(2)}L`,
            label: "Cost Savings",
            tone: "default"
          },
          {
            value: `${energy.summary.forecastAccuracyPct}%`,
            label: "Forecast Accuracy",
            tone: "default"
          }
        ]}
      />

      <AgentModuleCard
        index={2}
        icon="🔧"
        iconTone="maintenance"
        title="Maintenance Agent"
        description={maintenance.agent.description}
        capabilities={maintenance.agent.capabilities}
        chartType="bar"
        chartData={maintenance.weeklyTrend.map((d) => d.workOrdersClosed)}
        chartColor="#635bff"
        detailPath="/dashboard/maintenance-agent"
        stats={[
          { value: `${maintenance.summary.mtbfImprovementPct}%`, label: "MTBF Improvement" },
          {
            value: maintenance.summary.workOrdersClosed,
            label: "Work Orders Closed",
            tone: "default"
          },
          {
            value: `${maintenance.summary.downtimeReducedPct}%`,
            label: "Downtime Reduced",
            tone: "default"
          }
        ]}
      />

      <div className="card orchestration-card">
        <div>
          <h3>AI Agents Working Together</h3>
          <p>
            Our agents collaborate autonomously to deliver smarter, safer and more efficient
            facilities. Occupancy and Security agents are planned for a later milestone.
          </p>
        </div>
        <div className="orchestration-flow">
          <span className="flow-node">⚡ Energy Agent</span>
          <span className="flow-arrow">→</span>
          <span className="flow-node">🔧 Maintenance Agent</span>
          <span className="flow-arrow">→</span>
          <span className="flow-node disabled">👥 Occupancy Agent</span>
          <span className="flow-arrow">→</span>
          <span className="flow-node disabled">🛡 Security Agent</span>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api.js";
import KpiCard from "../components/KpiCard.jsx";
import "../styles/AgentDetail.css";

export default function AnalyticsPage() {
  const navigate = useNavigate();

  const [energy, setEnergy] = useState(null);
  const [occupancy, setOccupancy] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.getEnergyAgent(),
      api.getOccupancyAgent(),
      api.getMaintenanceAgent(),
      api.getWeatherAgent(),
    ])
      .then(([energyData, occupancyData, maintenanceData, weatherData]) => {
        setEnergy(energyData);
        setOccupancy(occupancyData);
        setMaintenance(maintenanceData);
        setWeather(weatherData);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load analytics.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-loading">
        Loading Building Analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-error">
        {error}
      </div>
    );
  }

  const overallScore = Math.round(
    (
      energy.summary.efficiencyScorePct +
      occupancy.summary.aiConfidence +
      maintenance.summary.equipmentHealth +
      maintenance.summary.aiAccuracy
    ) / 4
  );

  return (
    <div className="agent-detail">

      {/* Header */}

      <button
        className="back-link"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <div className="agent-detail-header">

        <div className="agent-detail-icon tone-energy">
          📊
        </div>

        <div>
          <h1>Building Analytics Dashboard</h1>

          <p>
            Enterprise AI Dashboard combining Energy,
            Occupancy, Weather and Maintenance agents.
          </p>
        </div>

        <span className="tag tag-active">
          <span className="tag-dot"></span>
          Live
        </span>

      </div>

      {/* KPI Cards */}

      <div className="dashboard-kpis">

        <KpiCard
          icon="🏢"
          value={`${overallScore}%`}
          label="Building Health"
          tone="success"
        />

        <KpiCard
          icon="⚡"
          value={`${energy.summary.efficiencyScorePct}%`}
          label="Energy Efficiency"
        />

        <KpiCard
          icon="👥"
          value={`${occupancy.summary.occupancyRate}%`}
          label="Occupancy Rate"
        />

        <KpiCard
          icon="🛠️"
          value={`${maintenance.summary.equipmentHealth}%`}
          label="Equipment Health"
        />

        <KpiCard
          icon="🌡️"
          value={`${weather.summary.temperature}°C`}
          label="Temperature"
        />

        <KpiCard
          icon="🤖"
          value={`${maintenance.summary.aiAccuracy}%`}
          label="AI Accuracy"
          tone="success"
        />

      </div>

            {/* ================= ENERGY SUMMARY ================= */}

      <div className="card panel">
        <h2>⚡ Energy Summary</h2>

        <table className="data-table">
          <tbody>
            <tr>
              <td>Total Energy Consumed</td>
              <td>{energy.summary.totalEnergyConsumedMWh} MWh</td>
            </tr>

            <tr>
              <td>Energy Savings</td>
              <td>{energy.summary.energySavingsPct}%</td>
            </tr>

            <tr>
              <td>Cost Savings</td>
              <td>${energy.summary.costSavings}</td>
            </tr>

            <tr>
              <td>Carbon Reduction</td>
              <td>{energy.summary.carbonReductionPct}%</td>
            </tr>

            <tr>
              <td>Forecast Accuracy</td>
              <td>{energy.summary.forecastAccuracyPct}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= OCCUPANCY SUMMARY ================= */}

      <div className="card panel">
        <h2>👥 Occupancy Summary</h2>

        <table className="data-table">
          <tbody>
            <tr>
              <td>Current Occupancy</td>
              <td>{occupancy.summary.currentOccupancy}</td>
            </tr>

            <tr>
              <td>Occupancy Rate</td>
              <td>{occupancy.summary.occupancyRate}%</td>
            </tr>

            <tr>
              <td>AI Confidence</td>
              <td>{occupancy.summary.aiConfidence}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= WEATHER SUMMARY ================= */}

      <div className="card panel">
        <h2>🌤 Weather Summary</h2>

        <table className="data-table">
          <tbody>
            <tr>
              <td>Temperature</td>
              <td>{weather.summary.temperature}°C</td>
            </tr>

            <tr>
              <td>Humidity</td>
              <td>{weather.summary.humidity}%</td>
            </tr>

            <tr>
              <td>Dew Point</td>
              <td>{weather.summary.dewPoint}°C</td>
            </tr>

            <tr>
              <td>Solar Radiation</td>
              <td>{weather.summary.solarRadiation} W/m²</td>
            </tr>

            <tr>
              <td>Condition</td>
              <td>{weather.summary.condition}</td>
            </tr>

            <tr>
              <td>Forecast Accuracy</td>
              <td>{weather.summary.forecastAccuracy}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= MAINTENANCE SUMMARY ================= */}

      <div className="card panel">
        <h2>🔧 Maintenance Summary</h2>

        <table className="data-table">
          <tbody>
            <tr>
              <td>Equipment Health</td>
              <td>{maintenance.summary.equipmentHealth}%</td>
            </tr>

            <tr>
              <td>Maintenance Status</td>
              <td>{maintenance.summary.maintenanceStatus}</td>
            </tr>

            <tr>
              <td>Average Temperature</td>
              <td>{maintenance.summary.averageTemperature}°C</td>
            </tr>

            <tr>
              <td>AI Accuracy</td>
              <td>{maintenance.summary.aiAccuracy}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= BUILDING HEALTH ================= */}

      <div className="card panel">
        <h2>🏢 Building Health Score</h2>

        <table className="data-table">
          <tbody>
            <tr>
              <td>Overall Score</td>
              <td>{overallScore}%</td>
            </tr>

            <tr>
              <td>Energy Health</td>
              <td>{energy.summary.efficiencyScorePct}%</td>
            </tr>

            <tr>
              <td>Occupancy Intelligence</td>
              <td>{occupancy.summary.aiConfidence}%</td>
            </tr>

            <tr>
              <td>Equipment Health</td>
              <td>{maintenance.summary.equipmentHealth}%</td>
            </tr>

            <tr>
              <td>Weather Reliability</td>
              <td>{weather.summary.forecastAccuracy}%</td>
            </tr>
          </tbody>
        </table>
      </div> 

            {/* ================= WEEKLY TRENDS ================= */}

      <div className="card panel">
        <h2>📉 Weekly Trends</h2>

        <div className="grid grid-2">

          <div>
            <h4>⚡ Energy</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Consumption</th>
                </tr>
              </thead>
              <tbody>
                {energy.weeklyTrend?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.day}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h4>👥 Occupancy</h4>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {occupancy.weeklyTrend?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.day}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* ================= AI INSIGHTS ================= */}

      <div className="card panel">

        <h2>🤖 AI Insights</h2>

        <ul className="recommendation-list">

          <li>
            Building Health Score is
            <strong> {overallScore}%</strong>.
          </li>

          <li>
            Current occupancy is
            <strong> {occupancy.summary.currentOccupancy}</strong>.
          </li>

          <li>
            Weather condition:
            <strong> {weather.summary.condition}</strong>.
          </li>

          <li>
            Equipment health remains
            <strong> {maintenance.summary.equipmentHealth}%</strong>.
          </li>

          <li>
            Energy efficiency currently stands at
            <strong> {energy.summary.efficiencyScorePct}%</strong>.
          </li>

        </ul>

      </div>

      {/* ================= RECOMMENDATIONS ================= */}

      <div className="card panel">

        <h2>💡 Recommendations</h2>

        <ul className="recommendation-list">

          {energy.recommendations?.map((rec, index) => (
            <li key={`energy-${index}`}>
              <strong>{rec.title}</strong>
              <br />
              {rec.description}
            </li>
          ))}

          {occupancy.recommendations?.map((rec, index) => (
            <li key={`occ-${index}`}>
              <strong>{rec.title}</strong>
              <br />
              {rec.description}
            </li>
          ))}

          {maintenance.recommendations?.map((rec, index) => (
            <li key={`main-${index}`}>
              <strong>{rec.title}</strong>
              <br />
              {rec.description}
            </li>
          ))}

          {weather.recommendations?.map((rec, index) => (
            <li key={`weather-${index}`}>
              <strong>{rec.title}</strong>
              <br />
              {rec.description}
            </li>
          ))}

        </ul>

      </div>

      {/* ================= ALERTS ================= */}

      <div className="card panel">

        <h2>🚨 Alerts</h2>

        <ul className="recommendation-list">

          {energy.alerts?.map((alert, index) => (
            <li key={`e-${index}`}>
              <strong>{alert.severity}</strong> - {alert.message}
            </li>
          ))}

          {maintenance.alerts?.map((alert, index) => (
            <li key={`m-${index}`}>
              <strong>{alert.severity}</strong> - {alert.message}
            </li>
          ))}

          {weather.alerts?.map((alert, index) => (
            <li key={`w-${index}`}>
              <strong>{alert.severity}</strong> - {alert.message}
            </li>
          ))}

        </ul>

      </div>

      {/* ================= SUSTAINABILITY ================= */}

      <div className="card panel">

        <h2>🌱 Sustainability Metrics</h2>

        <table className="data-table">

          <tbody>

            <tr>
              <td>Carbon Reduction</td>
              <td>{energy.summary.carbonReductionPct}%</td>
            </tr>

            <tr>
              <td>Energy Savings</td>
              <td>{energy.summary.energySavingsPct}%</td>
            </tr>

            <tr>
              <td>Cost Savings</td>
              <td>${energy.summary.costSavings}</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* ================= AGENT PERFORMANCE ================= */}

      <div className="card panel">

        <h2>📊 Agent Performance</h2>

        <table className="data-table">

          <thead>

            <tr>
              <th>Agent</th>
              <th>Accuracy</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>Energy</td>
              <td>{energy.summary.forecastAccuracyPct}%</td>
              <td>Running</td>
            </tr>

            <tr>
              <td>Occupancy</td>
              <td>{occupancy.summary.aiConfidence}%</td>
              <td>Running</td>
            </tr>

            <tr>
              <td>Weather</td>
              <td>{weather.summary.forecastAccuracy}%</td>
              <td>Running</td>
            </tr>

            <tr>
              <td>Maintenance</td>
              <td>{maintenance.summary.aiAccuracy}%</td>
              <td>Running</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}
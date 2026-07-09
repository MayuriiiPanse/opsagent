import React from "react";
import "../styles/KpiCard.css";

export default function KpiCard({ icon, value, label, trend, tone = "neutral" }) {
  return (
    <div className="kpi-card card">
      {icon && <div className={`kpi-icon tone-${tone}`}>{icon}</div>}
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      {trend && <div className={`kpi-trend tone-${tone}`}>{trend}</div>}
    </div>
  );
}

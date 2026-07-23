import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EnergyAgentPage from "./pages/EnergyAgentPage.jsx";
import MaintenanceAgentPage from "./pages/MaintenanceAgentPage.jsx";
import OccupancyAgentPage from "./pages/OccupancyAgentPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/energy-agent" element={<EnergyAgentPage />} />
        <Route path="/dashboard/maintenance-agent" element={<MaintenanceAgentPage />} />
        <Route path="/dashboard/occupancy-agent" element={<OccupancyAgentPage />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />}/>
      </Route>
    </Routes>
  );
}

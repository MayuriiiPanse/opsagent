/**
 * Small fetch wrapper for talking to the OpsAgent backend.
 * In dev, Vite proxies /api -> http://localhost:5000 (see vite.config.js).
 */

const BASE_URL = "/api";

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  // =========================
  // Energy Agent APIs
  // =========================
  getEnergyAgent: () => get("/energy-agent"),
  getEnergySummary: () => get("/energy-agent/summary"),
  getEnergyTrend: () => get("/energy-agent/trend"),
  getEnergyDistribution: () => get("/energy-agent/distribution"),
  getEnergyFacilities: () => get("/energy-agent/facilities"),
  getEnergyRecommendations: () => get("/energy-agent/recommendations"),
  getEnergyAlerts: () => get("/energy-agent/alerts"),
  getEnergyForecast: () => get("/energy-agent/forecast"),

  // =========================
  // Maintenance Agent APIs
  // =========================
  getMaintenanceAgent: () => get("/maintenance-agent"),
  getMaintenanceSummary: () => get("/maintenance-agent/summary"),
  getMaintenanceTrend: () => get("/maintenance-agent/trend"),
  getMaintenanceHealthDistribution: () =>
    get("/maintenance-agent/health-distribution"),
  getMaintenanceAssets: () => get("/maintenance-agent/assets"),
  getMaintenanceWorkOrders: () => get("/maintenance-agent/work-orders"),
  getMaintenanceAlerts: () => get("/maintenance-agent/alerts"),

  // =========================
  // Occupancy Agent API
  // =========================
  getOccupancyAgent: () => get("/occupancy-agent"),

  // =========================
  // Weather Agent API
  // =========================
  getWeatherAgent: () => get("/weather-agent"),
}; 
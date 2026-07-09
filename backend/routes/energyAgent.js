const express = require("express");
const router = express.Router();
const { energyAgentData } = require("../db/db");

// GET /api/energy-agent  -> everything the Energy Agent module needs
router.get("/", (req, res) => {
  res.json(energyAgentData);
});

// GET /api/energy-agent/summary -> just the KPI summary cards
router.get("/summary", (req, res) => {
  res.json(energyAgentData.summary);
});

// GET /api/energy-agent/trend -> weekly consumption trend
router.get("/trend", (req, res) => {
  res.json(energyAgentData.weeklyTrend);
});

// GET /api/energy-agent/distribution -> energy distribution by system
router.get("/distribution", (req, res) => {
  res.json(energyAgentData.energyDistribution);
});

// GET /api/energy-agent/facilities -> per-facility breakdown
router.get("/facilities", (req, res) => {
  res.json(energyAgentData.facilities);
});

// GET /api/energy-agent/recommendations -> AI recommendations
router.get("/recommendations", (req, res) => {
  res.json(energyAgentData.recommendations);
});

// GET /api/energy-agent/alerts -> energy alerts feed
router.get("/alerts", (req, res) => {
  res.json(energyAgentData.alerts);
});

// GET /api/energy-agent/forecast -> demand forecast
router.get("/forecast", (req, res) => {
  res.json(energyAgentData.demandForecast);
});

module.exports = router;

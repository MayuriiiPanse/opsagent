const express = require("express");
const router = express.Router();
const { maintenanceAgentData } = require("../db/db");

// GET /api/maintenance-agent -> everything the Maintenance Agent module needs
router.get("/", (req, res) => {
  res.json(maintenanceAgentData);
});

// GET /api/maintenance-agent/summary -> KPI summary cards
router.get("/summary", (req, res) => {
  res.json(maintenanceAgentData.summary);
});

// GET /api/maintenance-agent/trend -> work orders closed per week
router.get("/trend", (req, res) => {
  res.json(maintenanceAgentData.weeklyTrend);
});

// GET /api/maintenance-agent/health-distribution -> equipment health split
router.get("/health-distribution", (req, res) => {
  res.json(maintenanceAgentData.equipmentHealthDistribution);
});

// GET /api/maintenance-agent/assets -> monitored assets list
router.get("/assets", (req, res) => {
  res.json(maintenanceAgentData.assets);
});

// GET /api/maintenance-agent/assets/:assetId -> single asset detail
router.get("/assets/:assetId", (req, res) => {
  const asset = maintenanceAgentData.assets.find(
    (a) => a.assetId === req.params.assetId
  );
  if (!asset) return res.status(404).json({ error: "Asset not found" });
  res.json(asset);
});

// GET /api/maintenance-agent/work-orders -> generated work orders
router.get("/work-orders", (req, res) => {
  res.json(maintenanceAgentData.workOrders);
});

// GET /api/maintenance-agent/alerts -> maintenance alerts feed
router.get("/alerts", (req, res) => {
  res.json(maintenanceAgentData.alerts);
});

module.exports = router;

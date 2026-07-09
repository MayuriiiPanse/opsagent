/**
 * db.js
 * -----------------------------------------------------------------------
 * Static dummy "database" for the Agentic FacilityOps AI Platform.
 * This is NOT a real database — it is a plain JS module exporting mock
 * data so the Energy Agent and Maintenance Agent modules can be built
 * and demoed end-to-end before real IoT / utility data sources are wired
 * up. Each agent only exposes the data relevant to itself.
 * -----------------------------------------------------------------------
 */

// ------------------------- ENERGY AGENT DATA -------------------------
const energyAgentData = {
  agent: {
    id: "energy-agent",
    name: "Energy Agent",
    description:
      "Monitors and optimizes energy and utility consumption across facilities using AI insights.",
    status: "Active",
    state: "Running",
    capabilities: [
      "Energy Monitoring",
      "HVAC Optimization",
      "Lighting Optimization",
      "Demand Forecasting"
    ]
  },

  // Top-level KPI cards shown on the module card / overview
  summary: {
    energySavingsPct: 12.4,
    costSavings: 125000, // ₹1.25L this month
    forecastAccuracyPct: 98,
    totalEnergyConsumedMWh: 1.28,
    carbonReductionPct: 15,
    efficiencyScorePct: 82
  },

  // 7-day energy consumption trend (used for sparkline / line chart)
  weeklyTrend: [
    { day: "Mon", consumptionKWh: 410 },
    { day: "Tue", consumptionKWh: 395 },
    { day: "Wed", consumptionKWh: 430 },
    { day: "Thu", consumptionKWh: 388 },
    { day: "Fri", consumptionKWh: 452 },
    { day: "Sat", consumptionKWh: 300 },
    { day: "Sun", consumptionKWh: 280 }
  ],

  // Where the energy is going, by system
  energyDistribution: [
    { system: "HVAC Systems", percentage: 45 },
    { system: "Lighting", percentage: 28 },
    { system: "Equipment", percentage: 18 },
    { system: "Other Systems", percentage: 9 }
  ],

  // Per-facility / per-zone breakdown
  facilities: [
    {
      facilityId: "FAC-001",
      facilityName: "Head Office - Tower A",
      currentLoadKW: 452,
      dailyEnergyKWh: 1280,
      costSavingsThisMonth: 62000,
      efficiencyScorePct: 84
    },
    {
      facilityId: "FAC-002",
      facilityName: "IT Park - Block B",
      currentLoadKW: 320,
      dailyEnergyKWh: 960,
      costSavingsThisMonth: 41000,
      efficiencyScorePct: 79
    },
    {
      facilityId: "FAC-003",
      facilityName: "R&D Campus",
      currentLoadKW: 210,
      dailyEnergyKWh: 640,
      costSavingsThisMonth: 22000,
      efficiencyScorePct: 81
    }
  ],

  // AI generated energy efficiency recommendations
  recommendations: [
    {
      id: "REC-E-01",
      title: "Shift HVAC pre-cooling to off-peak hours",
      impact: "High",
      estimatedSavings: "₹18,000/month",
      description:
        "Pre-cool Tower A between 5–7 AM when tariff rates are lowest to reduce peak-hour load."
    },
    {
      id: "REC-E-02",
      title: "Enable adaptive lighting in Block B corridors",
      impact: "Medium",
      estimatedSavings: "₹7,500/month",
      description:
        "Occupancy-based dimming can cut corridor lighting consumption without affecting comfort."
    },
    {
      id: "REC-E-03",
      title: "Investigate Chiller-2 efficiency drop",
      impact: "High",
      estimatedSavings: "₹12,000/month",
      description:
        "Chiller-2 COP has dropped 9% over 30 days, indicating possible fouling or refrigerant loss."
    }
  ],

  // Energy anomaly / alert feed
  alerts: [
    {
      id: "ALERT-E-101",
      severity: "Warning",
      message: "Unusual night-time load spike detected in Block B (11 PM–1 AM).",
      timestamp: "2026-07-08T23:14:00+05:30"
    },
    {
      id: "ALERT-E-102",
      severity: "Info",
      message: "Weekly energy report generated for Head Office.",
      timestamp: "2026-07-08T09:00:00+05:30"
    },
    {
      id: "ALERT-E-103",
      severity: "Critical",
      message: "Chiller-2 efficiency degraded beyond threshold (COP < 3.2).",
      timestamp: "2026-07-07T18:42:00+05:30"
    }
  ],

  // Demand forecast for next 7 days (AI predicted)
  demandForecast: [
    { day: "Day 1", predictedKWh: 1265 },
    { day: "Day 2", predictedKWh: 1310 },
    { day: "Day 3", predictedKWh: 1280 },
    { day: "Day 4", predictedKWh: 1225 },
    { day: "Day 5", predictedKWh: 1340 },
    { day: "Day 6", predictedKWh: 980 },
    { day: "Day 7", predictedKWh: 910 }
  ]
};

// ----------------------- MAINTENANCE AGENT DATA -----------------------
const maintenanceAgentData = {
  agent: {
    id: "maintenance-agent",
    name: "Maintenance Agent",
    description:
      "Predicts equipment failures and automates maintenance workflows.",
    status: "Active",
    state: "Running",
    capabilities: [
      "Equipment Health Monitoring",
      "Predictive Maintenance",
      "Work Order Generation",
      "Downtime Reduction"
    ]
  },

  summary: {
    mtbfImprovementPct: 92,
    workOrdersClosed: 156,
    downtimeReducedPct: 23,
    assetsMonitored: 2450,
    openMaintenanceTickets: 89,
    predictedFailures: 12
  },

  // Work orders closed per week (bar chart trend)
  weeklyTrend: [
    { week: "W1", workOrdersClosed: 18 },
    { week: "W2", workOrdersClosed: 22 },
    { week: "W3", workOrdersClosed: 27 },
    { week: "W4", workOrdersClosed: 31 },
    { week: "W5", workOrdersClosed: 24 },
    { week: "W6", workOrdersClosed: 34 }
  ],

  // Equipment health distribution across the whole asset base
  equipmentHealthDistribution: [
    { status: "Excellent", percentage: 68 },
    { status: "Good", percentage: 22 },
    { status: "Warning", percentage: 8 },
    { status: "Critical", percentage: 2 }
  ],

  // Individual monitored assets
  assets: [
    {
      assetId: "AST-1001",
      assetName: "Chiller Unit 2",
      assetType: "HVAC",
      facility: "Head Office - Tower A",
      healthScorePct: 58,
      healthStatus: "Warning",
      lastServiced: "2026-05-12",
      nextPredictedFailure: "2026-07-22"
    },
    {
      assetId: "AST-1002",
      assetName: "Backup Generator 1",
      assetType: "Power",
      facility: "IT Park - Block B",
      healthScorePct: 91,
      healthStatus: "Excellent",
      lastServiced: "2026-06-01",
      nextPredictedFailure: null
    },
    {
      assetId: "AST-1003",
      assetName: "Elevator Bank A",
      assetType: "Vertical Transport",
      facility: "Head Office - Tower A",
      healthScorePct: 74,
      healthStatus: "Good",
      lastServiced: "2026-06-20",
      nextPredictedFailure: "2026-09-15"
    },
    {
      assetId: "AST-1004",
      assetName: "Fire Pump System",
      assetType: "Safety",
      facility: "R&D Campus",
      healthScorePct: 34,
      healthStatus: "Critical",
      lastServiced: "2026-03-30",
      nextPredictedFailure: "2026-07-15"
    },
    {
      assetId: "AST-1005",
      assetName: "Rooftop AHU 3",
      assetType: "HVAC",
      facility: "IT Park - Block B",
      healthScorePct: 88,
      healthStatus: "Excellent",
      lastServiced: "2026-06-28",
      nextPredictedFailure: null
    }
  ],

  // Auto-generated work orders
  workOrders: [
    {
      workOrderId: "WO-2201",
      assetId: "AST-1004",
      title: "Inspect Fire Pump for pressure loss",
      priority: "Critical",
      status: "Open",
      createdAt: "2026-07-08"
    },
    {
      workOrderId: "WO-2198",
      assetId: "AST-1001",
      title: "Service Chiller Unit 2 - refrigerant check",
      priority: "High",
      status: "In Progress",
      createdAt: "2026-07-06"
    },
    {
      workOrderId: "WO-2190",
      assetId: "AST-1003",
      title: "Routine elevator inspection",
      priority: "Medium",
      status: "Closed",
      createdAt: "2026-06-29"
    },
    {
      workOrderId: "WO-2185",
      assetId: "AST-1005",
      title: "Replace AHU-3 air filters",
      priority: "Low",
      status: "Closed",
      createdAt: "2026-06-25"
    }
  ],

  // Maintenance alerts
  alerts: [
    {
      id: "ALERT-M-201",
      severity: "Critical",
      message: "Fire Pump System (AST-1004) health score dropped below 40%.",
      timestamp: "2026-07-08T07:20:00+05:30"
    },
    {
      id: "ALERT-M-202",
      severity: "Warning",
      message: "Chiller Unit 2 predicted to require service within 2 weeks.",
      timestamp: "2026-07-07T16:05:00+05:30"
    },
    {
      id: "ALERT-M-203",
      severity: "Info",
      message: "Monthly preventive maintenance schedule generated.",
      timestamp: "2026-07-01T09:00:00+05:30"
    }
  ]
};

module.exports = {
  energyAgentData,
  maintenanceAgentData
};

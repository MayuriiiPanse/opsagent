const express = require("express");
const cors = require("cors");

const energyAgentRoutes = require("./routes/energyAgent");
const maintenanceAgentRoutes = require("./routes/maintenanceAgent");
const occupancyAgentRoutes = require("./routes/occupancyAgent");
const weatherAgentRoutes = require("./routes/weatherAgent");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Agent Routes
app.use("/api/energy-agent", energyAgentRoutes);
app.use("/api/maintenance-agent", maintenanceAgentRoutes);
app.use("/api/occupancy-agent", occupancyAgentRoutes);
app.use("/api/weather-agent", weatherAgentRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "OpsAgent backend is running"
  });
});

app.listen(PORT, () => {
  console.log(`OpsAgent backend running on http://localhost:${PORT}`);
});
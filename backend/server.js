const express = require("express");
const cors = require("cors");

const energyAgentRoutes = require("./routes/energyAgent");
const maintenanceAgentRoutes = require("./routes/maintenanceAgent");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "OpsAgent backend is running" });
});

// Agent routes — each agent only exposes data relevant to itself
app.use("/api/energy-agent", energyAgentRoutes);
app.use("/api/maintenance-agent", maintenanceAgentRoutes);

app.listen(PORT, () => {
  console.log(`OpsAgent backend running on http://localhost:${PORT}`);
});

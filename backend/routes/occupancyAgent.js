const express = require("express");
console.log("Occupancy Agent route loaded");
const router = express.Router();

// Dummy Occupancy Data
router.get("/", (req, res) => {
  res.json({
    status: "Running",
    totalCapacity: 500,
    currentOccupancy: 372,
    occupancyRate: "74.4%",
    aiConfidence: "96%",
    recommendations: [
      "Redirect visitors to Floor 2",
      "Reduce lighting in empty meeting rooms",
      "Increase HVAC only in occupied zones"
    ]
  });
});

module.exports = router;
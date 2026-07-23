const express = require("express");
const router = express.Router();

const { getMaintenanceData } = require("../services/maintenanceService");

router.get("/", async (req, res) => {
  try {
    const data = await getMaintenanceData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error loading maintenance data"
    });
  }
});

module.exports = router;
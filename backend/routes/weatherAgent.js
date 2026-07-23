const express = require("express");
const router = express.Router();

const { getWeatherData } = require("../services/weatherService");

router.get("/", async (req, res) => {
  try {
    const data = await getWeatherData();
    res.json(data);
  } catch (err) {
    console.error("Weather API Error:", err);
    res.status(500).json({
      error: "Failed to load weather data"
    });
  }
});

module.exports = router;
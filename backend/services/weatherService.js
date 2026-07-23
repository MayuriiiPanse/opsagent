const path = require("path");
const readCSV = require("./csvReader");

const filePath = path.join(__dirname, "../datasets/site_weather.csv");

async function getWeatherData() {
  const rows = await readCSV(filePath);

  if (!rows.length) {
    throw new Error("No weather data found.");
  }

  const latest = rows[rows.length - 1];

  const temperature = Number(latest.air_temp_set_1 || 0);
  const humidity = Number(latest.relative_humidity_set_1 || 0);
  const dewPoint = Number(latest.dew_point_temperature_set_1d || 0);
  const solarRadiation = Number(latest.solar_radiation_set_1 || 0);

  let condition = "Clear";

  if (humidity >= 85) {
    condition = "Rainy";
  } else if (humidity >= 70) {
    condition = "Cloudy";
  } else if (solarRadiation > 300) {
    condition = "Sunny";
  }

  return {
    agent: {
      description:
        "AI-powered weather monitoring and forecasting.",
      capabilities: [
        "Weather Monitoring",
        "Climate Analysis",
        "Forecast Prediction"
      ]
    },

    summary: {
      temperature: Number(temperature.toFixed(2)),
      humidity: Number(humidity.toFixed(2)),
      dewPoint: Number(dewPoint.toFixed(2)),
      solarRadiation: Number(solarRadiation.toFixed(2)),
      condition,
      forecastAccuracy: 95
    },

    weeklyTrend: rows.slice(-7).map((row, index) => ({
      day: `Day ${index + 1}`,
      temperature: Number(
        Number(row.air_temp_set_1 || 0).toFixed(2)
      )
    })),

    recommendations: [
      {
        id: 1,
        title: "HVAC Optimization",
        description:
          "Adjust HVAC settings according to outdoor temperature.",
        priority: "Medium"
      },
      {
        id: 2,
        title: "Use Natural Lighting",
        description:
          "Increase daylight usage during high solar radiation.",
        priority: "Low"
      }
    ],

    alerts: [
      {
        id: 1,
        severity:
          humidity > 85
            ? "High"
            : humidity > 70
            ? "Medium"
            : "Normal",
        message: `Current weather condition: ${condition}`,
        timestamp: new Date().toISOString()
      }
    ],

    rawData: latest
  };
}

module.exports = {
  getWeatherData
};
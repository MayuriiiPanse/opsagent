const express = require("express");
const router = express.Router();

const { getOccupancyData } = require("../services/occupancyService");

router.get("/", async (req, res) => {
    try {
        const data = await getOccupancyData();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error loading occupancy data" });
    }
});

module.exports = router;
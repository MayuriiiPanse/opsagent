const express = require("express");
const router = express.Router();

const { getEnergyData } = require("../services/energyService");

router.get("/", async (req, res) => {
    try {
        const data = await getEnergyData();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error loading energy data" });
    }
});

module.exports = router;
const { getEnergyData } = require("./services/energyService");

async function test() {
    try {
        const data = await getEnergyData();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

test();
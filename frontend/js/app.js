const API_URL = "https://smartchainai-y8zz.onrender.com";

async function loadDashboard() {
    try {
        const response = await fetch(`${API_URL}/dashboard`);

        if (!response.ok) {
            throw new Error("Could not load dashboard data");
        }

        const data = await response.json();

        document.getElementById("resilienceScore").textContent =
            `${data.resilience_score}/100`;

        document.getElementById("activeAlerts").textContent =
            data.active_alerts;

        document.getElementById("shipments").textContent =
            data.shipments;

        document.getElementById("inventoryRisk").textContent =
            data.inventory_risk;

        console.log("SmartChain data:", data);

    } catch (error) {
        console.error("SmartChain API Error:", error);
    }
}

loadDashboard();
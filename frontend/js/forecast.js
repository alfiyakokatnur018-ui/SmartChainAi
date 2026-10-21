const FORECAST_API =
    "https://smartchainai-y8zz.onrender.com/forecast";

async function loadForecast() {

    try {

        const response = await fetch(FORECAST_API);

        if (!response.ok) {
            throw new Error("Unable to load forecast");
        }

        const data = await response.json();

        const days = data.forecast.map(item =>
            `Day ${item.day}`
        );

        const predictions = data.forecast.map(item =>
            item.predicted_demand
        );

        // Product name
        document.getElementById("forecastProduct").textContent =
            data.product;

        // Final prediction
        const finalDemand =
            predictions[predictions.length - 1];

        document.getElementById("finalPrediction").textContent =
            Math.round(finalDemand);

        // Current sample inventory
        const currentStock = 250;

        if (finalDemand > currentStock) {

            document.getElementById("shortageRisk").textContent =
                "HIGH";

            document.getElementById("aiInsight").textContent =
                `High shortage risk detected. Predicted demand reaches ${Math.round(finalDemand)} units while current stock is only ${currentStock}. SmartChain recommends replenishing inventory before Day 37.`;
        }

        else {

            document.getElementById("shortageRisk").textContent =
                "LOW";

            document.getElementById("aiInsight").textContent =
                "Current inventory is sufficient for the predicted demand.";
        }


        // Chart
        const ctx =
            document.getElementById("demandChart");

        new Chart(ctx, {

            type: "line",

            data: {

                labels: days,

                datasets: [{
                    label: "Predicted Demand",
                    data: predictions,
                    borderWidth: 3,
                    tension: 0.3,
                    fill: false
                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: true
                    }
                },

                scales: {

                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: "Demand Units"
                        }
                    },

                    x: {
                        title: {
                            display: true,
                            text: "Forecast Day"
                        }
                    }

                }

            }

        });

    }

    catch (error) {

        console.error(
            "Forecast Error:",
            error
        );

    }

}

loadForecast();
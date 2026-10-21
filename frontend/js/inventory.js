const INVENTORY_API = "http://127.0.0.1:8000/inventory";

async function loadInventory() {

    try {

        const response = await fetch(INVENTORY_API);

        if (!response.ok) {
            throw new Error("Unable to load inventory");
        }

        const inventory = await response.json();

        const table = document.getElementById("inventoryBody");

        table.innerHTML = "";

        inventory.forEach(item => {

            let riskClass = "";
            let recommendation = "";

            if (item.status === "High Risk") {
                riskClass = "risk-high";
                recommendation = "Reorder immediately";
            }

            else if (item.status === "Medium Risk") {
                riskClass = "risk-medium";
                recommendation = "Monitor stock";
            }

            else {
                riskClass = "risk-safe";
                recommendation = "No action required";
            }

            const row = `
                <tr>
                    <td><strong>${item.product}</strong></td>

                    <td>${item.stock}</td>

                    <td>${item.reorder_level}</td>

                    <td>${item.demand}</td>

                    <td class="${riskClass}">
                        ${item.status}
                    </td>

                    <td class="ai-action">
                        ${recommendation}
                    </td>
                </tr>
            `;

            table.innerHTML += row;
        });

    }

    catch (error) {
        console.error("Inventory Error:", error);
    }
}

loadInventory();
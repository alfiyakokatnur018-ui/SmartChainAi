const SUPPLIER_API = "https://smartchainai-y8zz.onrender.com/suppliers";

async function loadSuppliers() {

    try {

        const response = await fetch(SUPPLIER_API);

        if (!response.ok) {
            throw new Error("Unable to load suppliers");
        }

        const suppliers = await response.json();

        const table =
            document.getElementById("supplierBody");

        document.getElementById("supplierCount").textContent =
            suppliers.length;

        if (suppliers.length > 0) {

            document.getElementById("bestSupplier").textContent =
                suppliers[0].name;

        }

        table.innerHTML = "";

        suppliers.forEach((supplier, index) => {

            const recommended =
                index === 0
                ? '<span class="recommended">Recommended</span>'
                : "Alternative";

            const row = `
                <tr>

                    <td>
                        <strong>#${index + 1}</strong>
                    </td>

                    <td>
                        <strong>${supplier.name}</strong>
                    </td>

                    <td>
                        ₹${supplier.price}
                    </td>

                    <td>
                        ${supplier.lead_time} days
                    </td>

                    <td>
                        ${supplier.reliability}%
                    </td>

                    <td>
                        ${supplier.available_stock}
                    </td>

                    <td>
                        <strong>${supplier.score}</strong>
                    </td>

                    <td>
                        ${recommended}
                    </td>

                </tr>
            `;

            table.innerHTML += row;

        });

    }

    catch (error) {

        console.error(
            "Supplier Error:",
            error
        );

    }

}

loadSuppliers();
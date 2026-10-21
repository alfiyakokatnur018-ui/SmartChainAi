console.log("SIMULATOR JS LOADED");

const SIMULATION_API =
    "https://smartchainai-y8zz.onrender.com/simulate-disruption";


async function runSimulation() {

    console.log("Simulation button clicked");

    try {

        const response =
            await fetch(SIMULATION_API);

        if (!response.ok) {
            throw new Error("Simulation API failed");
        }

        const data =
            await response.json();

        console.log("Simulation Data:", data);


        // BEFORE AND AFTER DATA

        const before =
            data.before_action;

        const after =
            data.after_action;


        // RESILIENCE BEFORE

        document.getElementById(
            "beforeScore"
        ).textContent =
            before.resilience_score + "/100";


        // RESILIENCE AFTER

        document.getElementById(
            "afterScore"
        ).textContent =
            after.resilience_score + "/100";


        // DELAY SAVED

        const delaySaved =
            before.expected_delay_hours -
            after.expected_delay_hours;

        document.getElementById(
            "delaySaved"
        ).textContent =
            delaySaved + " hrs";


        // MONEY SAVED

        const moneySaved =
            before.estimated_loss -
            after.estimated_loss;

        document.getElementById(
            "moneySaved"
        ).textContent =
            "₹" +
            moneySaved.toLocaleString("en-IN");


        // DISPLAY DISRUPTIONS

        const disruptionList =
            document.getElementById(
                "disruptionList"
            );

        disruptionList.innerHTML = "";


        data.disruptions.forEach(
            disruption => {

                disruptionList.innerHTML += `
                    <div class="simulation-alert">

                        <h3>
                            ${disruption.type}
                        </h3>

                        <p>
                            ${disruption.message}
                        </p>

                        <span>
                            Severity:
                            ${disruption.severity}
                        </span>

                    </div>
                `;

            }
        );


        // DISPLAY RECOMMENDATIONS

        const recommendationList =
            document.getElementById(
                "recommendationList"
            );

        recommendationList.innerHTML = "";


        data.recommendations.forEach(
            (recommendation, index) => {

                recommendationList.innerHTML += `
                    <div class="recommendation">

                        <div class="number">
                            ${index + 1}
                        </div>

                        <div>

                            <h3>
                                Corrective Action
                            </h3>

                            <p>
                                ${recommendation}
                            </p>

                        </div>

                    </div>
                `;

            }
        );

    }

    catch (error) {

        console.error(
            "Simulation Error:",
            error
        );

        alert(
            "Simulation failed. Make sure FastAPI is running."
        );

    }

}
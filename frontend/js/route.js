const ROUTE_API =
    "http://127.0.0.1:8000/optimize-route";


async function loadRoute(blocked = null) {

    try {

        let url = ROUTE_API;

        if (blocked) {
            url += `?blocked=${encodeURIComponent(blocked)}`;
        }

        const response = await fetch(url);

        const data = await response.json();


        const route =
            data.optimized_route.join(" → ");


        document.getElementById(
            "routeDisplay"
        ).textContent = route;


        document.getElementById(
            "routeDistance"
        ).textContent = data.distance;


        if (blocked) {

            document.getElementById(
                "routeStatus"
            ).textContent = "Rerouted";


            document.getElementById(
                "statusText"
            ).textContent =
                `${blocked} Blocked`;


            document.getElementById(
                "routeRecommendation"
            ).textContent =
                `Disruption detected at ${blocked}. ` +
                `SmartChain calculated an alternative route: ${route}.`;

        }

        else {

            document.getElementById(
                "routeStatus"
            ).textContent = "Normal";


            document.getElementById(
                "statusText"
            ).textContent =
                "No Disruption";


            document.getElementById(
                "routeRecommendation"
            ).textContent =
                "Optimal delivery route calculated successfully.";

        }

    }

    catch (error) {

        console.error(
            "Route optimization error:",
            error
        );

    }

}


function simulateDisruption() {

    loadRoute("Hub C");

}


function resetRoute() {

    loadRoute();

}


loadRoute();
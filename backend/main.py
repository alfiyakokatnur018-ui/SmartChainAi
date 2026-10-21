from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.demand_model import predict_demand
from backend.route_optimizer import find_shortest_route

app = FastAPI(
    title="SmartChain AI",
    description="AI-Powered Supply Chain Resilience System",
    version="1.0"
)

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "SmartChain AI Backend Running Successfully"
    }


@app.get("/dashboard")
def dashboard():
    return {
        "resilience_score": 82,
        "active_alerts": 3,
        "shipments": 12,
        "inventory_risk": 2
    }
inventory = [
    {
        "id": 1,
        "product": "Medicine",
        "stock": 250,
        "reorder_level": 400,
        "demand": 600
    },
    {
        "id": 2,
        "product": "Rice",
        "stock": 1200,
        "reorder_level": 500,
        "demand": 800
    },
    {
        "id": 3,
        "product": "Vegetables",
        "stock": 400,
        "reorder_level": 450,
        "demand": 350
    },
    {
        "id": 4,
        "product": "Milk",
        "stock": 700,
        "reorder_level": 300,
        "demand": 500
    }
]


@app.get("/inventory")
def get_inventory():

    results = []

    for item in inventory:

        if item["stock"] < item["reorder_level"]:
            status = "High Risk"
        elif item["stock"] < item["demand"]:
            status = "Medium Risk"
        else:
            status = "Safe"

        results.append({
            **item,
            "status": status
        })

    return results
@app.get("/forecast")
def demand_forecast():

    forecast = predict_demand()

    return {
        "product": "Medicine",
        "forecast": forecast
    }
suppliers = [
    {
        "id": 1,
        "name": "MediSource Ltd",
        "price": 105,
        "lead_time": 5,
        "reliability": 88,
        "available_stock": 1000
    },
    {
        "id": 2,
        "name": "HealthLink Supply",
        "price": 112,
        "lead_time": 2,
        "reliability": 96,
        "available_stock": 800
    },
    {
        "id": 3,
        "name": "QuickMed Distributors",
        "price": 98,
        "lead_time": 4,
        "reliability": 91,
        "available_stock": 600
    },
    {
        "id": 4,
        "name": "CareChain Pharma",
        "price": 95,
        "lead_time": 7,
        "reliability": 82,
        "available_stock": 1200
    }
]


@app.get("/suppliers")
def get_suppliers():

    # Lower price = better
    # Lower lead time = better
    # Higher reliability = better

    max_price = max(s["price"] for s in suppliers)
    max_lead = max(s["lead_time"] for s in suppliers)

    results = []

    for supplier in suppliers:

        price_score = 1 - (supplier["price"] / max_price)
        lead_score = 1 - (supplier["lead_time"] / max_lead)
        reliability_score = supplier["reliability"] / 100

        # Weighted SmartChain score
        score = (
            reliability_score * 0.50 +
            lead_score * 0.30 +
            price_score * 0.20
        )

        results.append({
            **supplier,
            "score": round(score * 100, 1)
        })

    # Highest score first
    results.sort(
        key=lambda supplier: supplier["score"],
        reverse=True
    )

    return results
@app.get("/optimize-route")
def optimize_route(blocked: str = None):

    result = find_shortest_route(
        "Warehouse",
        "Customer",
        blocked
    )

    return {
        "start": "Warehouse",
        "destination": "Customer",
        "blocked_location": blocked,
        "optimized_route": result["route"],
        "distance": result["distance"]
    }
@app.get("/simulate-disruption")
def simulate_disruption():

    return {
        "scenario": "Major Supply Chain Disruption",

        "disruptions": [
            {
                "type": "Demand Spike",
                "severity": "High",
                "message": "Medicine demand increased by 35%"
            },
            {
                "type": "Inventory Shortage",
                "severity": "Critical",
                "message": "Medicine stock may fall below required demand"
            },
            {
                "type": "Supplier Failure",
                "severity": "High",
                "message": "Primary supplier is temporarily unavailable"
            },
            {
                "type": "Route Blockage",
                "severity": "High",
                "message": "Hub C is inaccessible due to severe weather"
            }
        ],

        "recommendations": [
            "Order 500 additional medicine units",
            "Switch to the highest-ranked alternative supplier",
            "Reroute shipment to avoid Hub C",
            "Increase safety stock until demand stabilizes"
        ],

        "before_action": {
            "expected_delay_hours": 18,
            "estimated_loss": 85000,
            "resilience_score": 46
        },

        "after_action": {
            "expected_delay_hours": 7,
            "estimated_loss": 32000,
            "resilience_score": 84
        }
    }

import pandas as pd
from sklearn.linear_model import LinearRegression
from pathlib import Path


DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "demand.csv"


def predict_demand():

    data = pd.read_csv(DATA_FILE)

    X = data[["day"]]
    y = data["demand"]

    model = LinearRegression()

    model.fit(X, y)

    future_days = pd.DataFrame({
        "day": [31, 32, 33, 34, 35, 36, 37]
    })

    predictions = model.predict(future_days)

    forecast = []

    for day, prediction in zip(
        future_days["day"],
        predictions
    ):
        forecast.append({
            "day": int(day),
            "predicted_demand": round(float(prediction), 2)
        })

    return forecast
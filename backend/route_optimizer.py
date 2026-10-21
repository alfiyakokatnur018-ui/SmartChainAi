import heapq


# Sample delivery network
GRAPH = {
    "Warehouse": {
        "Hub A": 10,
        "Hub B": 15
    },

    "Hub A": {
        "Warehouse": 10,
        "Hub C": 12,
        "Customer": 30
    },

    "Hub B": {
        "Warehouse": 15,
        "Hub C": 10,
        "Customer": 20
    },

    "Hub C": {
        "Hub A": 12,
        "Hub B": 10,
        "Customer": 8
    },

    "Customer": {
        "Hub A": 30,
        "Hub B": 20,
        "Hub C": 8
    }
}


def find_shortest_route(start, destination, blocked_node=None):

    distances = {
        node: float("inf")
        for node in GRAPH
    }

    distances[start] = 0

    queue = [(0, start, [])]

    while queue:

        current_distance, current_node, path = heapq.heappop(queue)

        # Ignore blocked location
        if current_node == blocked_node:
            continue

        path = path + [current_node]

        if current_node == destination:

            return {
                "route": path,
                "distance": current_distance
            }

        for neighbor, distance in GRAPH[current_node].items():

            if neighbor == blocked_node:
                continue

            new_distance = current_distance + distance

            if new_distance < distances[neighbor]:

                distances[neighbor] = new_distance

                heapq.heappush(
                    queue,
                    (
                        new_distance,
                        neighbor,
                        path
                    )
                )

    return {
        "route": [],
        "distance": None
    }
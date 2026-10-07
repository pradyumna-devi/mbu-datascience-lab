"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 2: Data Extraction & Web Data Acquisition
Task B [2B]: RESTful JSON API Data Consumption & Normalization

Aim:
To parse hierarchical JSON records from a simulated REST API endpoint and normalize nested key structures into a flat tabular DataFrame.

Syntax / General Form:
json.loads(text)
pd.json_normalize(data)

"""

import json
import pandas as pd

# Simulated API payload response from RESTful endpoint
api_response_payload = """
[
    {"sensor_id": "SN-101", "location": "Lab-Alpha", "telemetry": {"temperature": 23.4, "humidity": 45.2, "status": "active"}},
    {"sensor_id": "SN-102", "location": "Lab-Beta", "telemetry": {"temperature": 27.8, "humidity": 51.0, "status": "warning"}},
    {"sensor_id": "SN-103", "location": "Lab-Gamma", "telemetry": {"temperature": 22.1, "humidity": 42.8, "status": "active"}},
    {"sensor_id": "SN-104", "location": "Server-Room", "telemetry": {"temperature": 19.5, "humidity": 38.4, "status": "optimal"}}
]
"""

# Parse JSON string
parsed_json = json.loads(api_response_payload)

# Normalize nested JSON structure into Pandas DataFrame
df_sensors = pd.json_normalize(parsed_json)
print("Normalized API Response Data:")
print(df_sensors)

# Query extracted telemetry
high_temp = df_sensors[df_sensors['telemetry.temperature'] > 22.0]
print("\nSensors with Temperature > 22°C:")
print(high_temp[['sensor_id', 'location', 'telemetry.temperature', 'telemetry.status']])

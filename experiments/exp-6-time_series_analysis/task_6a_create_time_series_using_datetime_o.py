"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 6: Time Series Analysis
Task A [6A]: Create time series using datetime object in pandas indexed by timestamps

Aim:
To create a time series in Pandas using datetime objects and use the timestamps as the index of the time series.

Syntax / General Form:
pd.to_datetime(date_values)
pd.Series(data, index=datetime_index)

General syntax:
import pandas as pd

dates = pd.to_datetime([...])
series = pd.Series(data, index=dates)

"""

import pandas as pd

# Create datetime objects
dates = pd.to_datetime([
    '2026-01-01',
    '2026-01-02',
    '2026-01-03',
    '2026-01-04',
    '2026-01-05'
])

# Create data
temperature = [28, 30, 29, 31, 32]

# Create time series with timestamps as index
time_series = pd.Series(
    temperature,
    index=dates
)

# Display the time series
print("Time Series:")
print(time_series)

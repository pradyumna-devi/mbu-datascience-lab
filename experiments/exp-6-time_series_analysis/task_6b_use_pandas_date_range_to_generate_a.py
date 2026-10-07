"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 6: Time Series Analysis
Task B [6B]: Use pandas.date_range to generate a DatetimeIndex with an indicated length

Aim:
To generate a DatetimeIndex of a specified length using the pandas.date_range() function.

Syntax / General Form:
pd.date_range(start=None, end=None, periods=None, freq='D')

Important Parameters:
• start – Starting date/time.
• end – Ending date/time.
• periods – Number of timestamps to generate.
• freq – Frequency of timestamps, such as D (daily), h (hourly), M (monthly).

For a specified length, the commonly used syntax is:
pd.date_range(start='YYYY-MM-DD', periods=n, freq='D')

"""

import pandas as pd

# Generate a DatetimeIndex with 7 dates
date_index = pd.date_range(
    start='2026-01-01',
    periods=7,
    freq='D'
)

# Display the DatetimeIndex
print("Generated DatetimeIndex:")
print(date_index)

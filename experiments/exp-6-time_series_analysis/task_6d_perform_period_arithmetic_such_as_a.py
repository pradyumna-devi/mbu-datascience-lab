"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 6: Time Series Analysis
Task D [6D]: Perform period arithmetic such as adding and subtracting integers from periods and construct range of periods using period_range function

Aim:
To perform period arithmetic by adding and subtracting integers from Pandas Period objects and to construct a range of periods using the period_range() function.

Syntax / General Form:
1. Create a Period:
pd.Period('2026-01', freq='M')

2. Add an integer to a Period:
period + integer

3. Subtract an integer from a Period:
period - integer

4. Construct a range of periods:
pd.period_range(start, periods=n, freq='M')

"""

import pandas as pd

# Create a monthly Period
p = pd.Period('2026-01', freq='M')

print("Original Period:")
print(p)

# Add integers to the period
print("\nAfter adding 2:")
print(p + 2)

print("\nAfter adding 5:")
print(p + 5)

# Subtract integers from the period
print("\nAfter subtracting 1:")
print(p - 1)

print("\nAfter subtracting 3:")
print(p - 3)

# Create a range of monthly periods
periods = pd.period_range(
    start='2026-01',
    periods=6,
    freq='M'
)

print("\nRange of Periods:")
print(periods)

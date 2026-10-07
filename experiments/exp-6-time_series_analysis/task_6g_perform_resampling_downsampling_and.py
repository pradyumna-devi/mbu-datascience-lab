"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 6: Time Series Analysis
Task G [6G]: Perform resampling, downsampling and upsampling for the time series

Aim:
To perform resampling, downsampling, and upsampling operations on a time series using Pandas.

Syntax / General Form:
1. Resampling:
series.resample('frequency').aggregation_function()
Example: series.resample('D').mean()

2. Downsampling:
series.resample('larger_frequency').sum()
Example: series.resample('6h').sum()

3. Upsampling:
series.resample('smaller_frequency').asfreq()
# or with forward fill:
series.resample('smaller_frequency').ffill()

"""

import pandas as pd

# --------------------------------------------------
# 1. Create an hourly time series
# --------------------------------------------------

dates = pd.date_range(
    start='2026-01-01 00:00',
    periods=12,
    freq='h'
)

values = [10, 12, 15, 14, 18, 20,
          22, 21, 25, 28, 30, 32]

time_series = pd.Series(
    values,
    index=dates
)

print("Original Hourly Time Series:")
print(time_series)


# --------------------------------------------------
# 2. Resampling - calculate 3-hourly mean
# --------------------------------------------------

resampled = time_series.resample('3h').mean()

print("\nResampled Time Series - 3 Hour Mean:")
print(resampled)


# --------------------------------------------------
# 3. Downsampling - Hourly to 4-hourly
# --------------------------------------------------

downsampled = time_series.resample('4h').sum()

print("\nDownsampled Time Series - 4 Hour Sum:")
print(downsampled)


# --------------------------------------------------
# 4. Upsampling - Hourly to 30-minute intervals
# --------------------------------------------------

upsampled = time_series.resample('30min').asfreq()

print("\nUpsampled Time Series - 30 Minute:")
print(upsampled)


# --------------------------------------------------
# 5. Upsampling with Forward Fill
# --------------------------------------------------

upsampled_ffill = time_series.resample('30min').ffill()

print("\nUpsampled Time Series using Forward Fill:")
print(upsampled_ffill)

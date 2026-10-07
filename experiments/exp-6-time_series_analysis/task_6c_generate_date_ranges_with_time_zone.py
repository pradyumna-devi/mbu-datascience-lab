"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 6: Time Series Analysis
Task C [6C]: Generate date ranges with time zones, localize, convert using tz_convert(), and combine series

Aim:
To generate date ranges by setting a time zone, localizing a time zone, converting timestamps to another time zone using tz_convert(), and combining time-series data from two different time zones using Pandas.

Syntax / General Form:
1. Generate date range with a time zone:
pd.date_range(start, periods=n, freq='h', tz='Asia/Kolkata')

2. Localize a time zone:
datetime_index.tz_localize('Asia/Kolkata')

3. Convert to another time zone:
datetime_index.tz_convert('America/New_York')

4. Combine time series:
pd.concat([series1, series2])

"""

import pandas as pd

# --------------------------------------------------
# 1. Generate date range by setting a time zone
# --------------------------------------------------

india_dates = pd.date_range(
    start='2026-01-01 09:00',
    periods=3,
    freq='h',
    tz='Asia/Kolkata'
)

print("1. Date Range with Asia/Kolkata Time Zone:")
print(india_dates)


# --------------------------------------------------
# 2. Create a timezone-naive DatetimeIndex
# --------------------------------------------------

dates = pd.date_range(
    start='2026-01-01 09:00',
    periods=3,
    freq='h'
)

print("\n2. Timezone-naive Date Range:")
print(dates)


# --------------------------------------------------
# 3. Localize the timezone
# --------------------------------------------------

localized_dates = dates.tz_localize('Asia/Kolkata')

print("\n3. After Localizing to Asia/Kolkata:")
print(localized_dates)


# --------------------------------------------------
# 4. Convert to another timezone using tz_convert()
# --------------------------------------------------

new_york_dates = localized_dates.tz_convert(
    'America/New_York'
)

print("\n4. Converted to America/New_York:")
print(new_york_dates)


# --------------------------------------------------
# 5. Create another time series in a different timezone
# --------------------------------------------------

india_series = pd.Series(
    [100, 200, 300],
    index=localized_dates
)

new_york_series = pd.Series(
    [400, 500, 600],
    index=new_york_dates
)

print("\n5. India Time Series:")
print(india_series)

print("\nNew York Time Series:")
print(new_york_series)


# --------------------------------------------------
# 6. Combine two different timezone series
# --------------------------------------------------

combined_series = pd.concat([
    india_series,
    new_york_series
])

print("\n6. Combined Time Series:")
print(combined_series)

"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 6: Time Series Analysis
Task E [6E]: Convert Periods and PeriodIndex objects to another frequency with asfreq method

Aim:
To convert Pandas Period and PeriodIndex objects from one frequency to another using the asfreq() method.

Syntax / General Form:
1. Convert a Period to another frequency:
period.asfreq(freq, how='start')

2. Convert a PeriodIndex to another frequency:
period_index.asfreq(freq, how='start')

Parameters:
• freq – The target frequency, such as 'D', 'M', 'Q', or 'Y'.
• how – Specifies whether to use the start or end of the period.
  o 'start' – Beginning of the period.
  o 'end' – End of the period.

"""

import pandas as pd

# --------------------------------------------------
# 1. Create a monthly Period
# --------------------------------------------------

p = pd.Period('2026-01', freq='M')

print("Original Period:")
print(p)


# --------------------------------------------------
# 2. Convert monthly Period to daily frequency
# --------------------------------------------------

daily_start = p.asfreq('D', how='start')

print("\nMonthly Period converted to Daily (Start):")
print(daily_start)


daily_end = p.asfreq('D', how='end')

print("\nMonthly Period converted to Daily (End):")
print(daily_end)


# --------------------------------------------------
# 3. Create a PeriodIndex
# --------------------------------------------------

period_index = pd.period_range(
    start='2026-01',
    periods=3,
    freq='M'
)

print("\nOriginal PeriodIndex:")
print(period_index)


# --------------------------------------------------
# 4. Convert PeriodIndex to daily frequency
# --------------------------------------------------

daily_period_index = period_index.asfreq(
    'D',
    how='start'
)

print("\nPeriodIndex converted to Daily Frequency:")
print(daily_period_index)


# --------------------------------------------------
# 5. Convert PeriodIndex to daily frequency at end
# --------------------------------------------------

daily_period_index_end = period_index.asfreq(
    'D',
    how='end'
)

print("\nPeriodIndex converted to Daily Frequency (End):")
print(daily_period_index_end)

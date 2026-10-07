"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 6: Time Series Analysis
Task F [6F]: Convert Series and DataFrame objects indexed by timestamps to periods with the to_period method

Aim:
To convert Series and DataFrame objects indexed by timestamps into Period and PeriodIndex objects using the Pandas to_period() method.

Syntax / General Form:
1. Convert a Series to a PeriodIndex:
series.to_period(freq)

2. Convert a DataFrame to a PeriodIndex:
dataframe.to_period(freq)

Where:
• freq specifies the desired frequency:
  • 'D' → Daily
  • 'M' → Monthly
  • 'Q' → Quarterly
  • 'Y' → Yearly

"""

import pandas as pd

# --------------------------------------------------
# 1. Create a Series with timestamp index
# --------------------------------------------------

dates = pd.to_datetime([
    '2026-01-10',
    '2026-02-15',
    '2026-03-20',
    '2026-04-25'
])

sales = pd.Series(
    [1000, 1500, 1800, 2200],
    index=dates
)

print("Original Series:")
print(sales)


# --------------------------------------------------
# 2. Convert Series from timestamps to monthly periods
# --------------------------------------------------

period_series = sales.to_period('M')

print("\nSeries converted to Monthly Periods:")
print(period_series)


# --------------------------------------------------
# 3. Create a DataFrame with timestamp index
# --------------------------------------------------

df = pd.DataFrame(
    {
        'Sales': [1000, 1500, 1800, 2200],
        'Profit': [200, 300, 400, 500]
    },
    index=dates
)

print("\nOriginal DataFrame:")
print(df)


# --------------------------------------------------
# 4. Convert DataFrame to monthly periods
# --------------------------------------------------

period_df = df.to_period('M')

print("\nDataFrame converted to Monthly Periods:")
print(period_df)

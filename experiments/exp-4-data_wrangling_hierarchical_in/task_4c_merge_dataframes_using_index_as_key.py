"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 4: Data Wrangling & Hierarchical Indexing
Task C [4C]: Merge DataFrames using index as key and combine data using combine_first()

Aim:
To create two different Pandas DataFrames, merge them using the index as the merge key, and combine their data using the combine_first() method to fill missing values with available values from another DataFrame.

Syntax / General Form:
Merge using index:
pd.merge(df1, df2, left_index=True, right_index=True, how='outer')

combine_first():
df1.combine_first(df2)
The combine_first() method fills missing (NaN) values in the first DataFrame with corresponding values from the second DataFrame.

"""

import pandas as pd

# Create the first DataFrame
df1 = pd.DataFrame(
    {
        'Name': ['Ravi', 'Sita', 'Arun'],
        'Marks': [85, None, 78],
        'Grade': ['A', 'B', None]
    },
    index=[101, 102, 103]
)

# Create the second DataFrame
df2 = pd.DataFrame(
    {
        'Name': ['Ravi', 'Sita', 'Kiran'],
        'Marks': [90, 88, 82],
        'Grade': [None, 'A', 'B']
    },
    index=[101, 102, 104]
)

print("First DataFrame:")
print(df1)

print("\nSecond DataFrame:")
print(df2)

# Merge DataFrames using index as merge key
merged = pd.merge(
    df1,
    df2,
    left_index=True,
    right_index=True,
    how='outer',
    suffixes=('_DF1', '_DF2')
)

print("\nMerged DataFrame:")
print(merged)

# Combine data using combine_first()
combined = df1.combine_first(df2)

print("\nDataFrame after combine_first():")
print(combined)

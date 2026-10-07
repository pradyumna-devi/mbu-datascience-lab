"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 4: Data Wrangling & Hierarchical Indexing
Task B [4B]: Rearrange tabular data with hierarchical indexing using unstack and stack method

Aim:
To rearrange tabular data with hierarchical indexing using the Pandas unstack() and stack() methods.

Syntax / General Form:
unstack(): Converts one level of a hierarchical row index into columns
DataFrame.unstack(level=-1)
or
Series.unstack(level=-1)

stack(): Converts columns into a hierarchical row index
DataFrame.stack()
or
Series.stack()

"""

import pandas as pd

# Create hierarchical index
index = pd.MultiIndex.from_tuples(
    [
        ('Engineering', 'CSE'),
        ('Engineering', 'ECE'),
        ('Science', 'Physics'),
        ('Science', 'Chemistry')
    ],
    names=['Department', 'Branch']
)

# Create tabular data
data = pd.DataFrame(
    {
        '2025': [85, 78, 92, 88],
        '2026': [90, 82, 95, 91]
    },
    index=index
)

print("Original Tabular Data:")
print(data)

# Unstack the inner level
unstacked_data = data.unstack()

print("\nData after Unstack():")
print(unstacked_data)

# Stack the data back
stacked_data = unstacked_data.stack()

print("\nData after Stack():")
print(stacked_data)

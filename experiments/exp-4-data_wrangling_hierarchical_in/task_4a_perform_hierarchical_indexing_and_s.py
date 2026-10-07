"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 4: Data Wrangling & Hierarchical Indexing
Task A [4A]: Perform hierarchical indexing and select data subsets using partial indexing

Aim:
To create a Pandas Series with hierarchical (multi-level) indexing using a list of lists and to select subsets of data using partial indexing at the outer and inner levels.

Syntax / General Form:
Create MultiIndex:
pd.MultiIndex.from_arrays(arrays, names=None)

To create a Series:
pd.Series(data, index=multi_index)

To select data:
series.loc['Outer_Level']
series.loc[('Outer_Level', 'Inner_Level')]

"""

import pandas as pd

# Create a list of lists for hierarchical index
index = [
    ['Engineering', 'Engineering', 'Science', 'Science'],
    ['CSE', 'ECE', 'Physics', 'Chemistry']
]

# Create MultiIndex
multi_index = pd.MultiIndex.from_arrays(
    index,
    names=['Department', 'Branch']
)

# Create a Series using the hierarchical index
marks = pd.Series(
    [85, 78, 92, 88],
    index=multi_index
)

print("Original Series:")
print(marks)

# Partial indexing at the outer level
print("\nData for Engineering:")
print(marks.loc['Engineering'])

# Partial indexing at the inner level
print("\nData for CSE:")
print(marks.loc[('Engineering', 'CSE')])

# Selecting a subset using both levels
print("\nData for Science:")
print(marks.loc['Science'])

"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 7: Data Aggregation & Group Operations
Task B [7B]: Compute summary statistics such as sum, mean, and standard deviation using aggregate method

Aim:
To compute summary statistics such as sum, mean, and standard deviation for grouped data
using the aggregate method in Pandas across multiple features (Marks and Attendance).

Syntax / General Form:
df.groupby('Group_Column').aggregate({
    'Metric_1': ['sum', 'mean', 'std'],
    'Metric_2': ['sum', 'mean', 'std']
})
"""

import pandas as pd

# Create a DataFrame
data = {
    'Department': ['CSE', 'CSE', 'CSE', 'ECE', 'ECE', 'ECE',
                   'EEE', 'EEE', 'EEE'],
    'Marks': [80, 75, 85, 70, 65, 75, 90, 85, 95],
    'Attendance': [90, 85, 95, 80, 75, 85, 95, 90, 100]
}

df = pd.DataFrame(data)

print("Original DataFrame:")
print(df)

# Group data by Department and calculate summary statistics
result = df.groupby('Department').aggregate({
    'Marks': ['sum', 'mean', 'std'],
    'Attendance': ['sum', 'mean', 'std']
})

print("\nSummary Statistics:")
print(result)

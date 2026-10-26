"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 7: Data Aggregation & Group Operations
Task A [7A]: Split data into groups using groupby method including single key and multiple keys

Aim:
To create a tabular dataset as a DataFrame and split data into groups using groupby method
including single key and multiple key values. Select groups by considering single and multiple columns,
and calculate average marks for each department and year combination.

Syntax / General Form:
Group by single key:
grouped = df.groupby('Column_Name')

Group by multiple keys:
grouped_multi = df.groupby(['Column_1', 'Column_2'])

Calculate grouped mean:
df.groupby('Column_Name')['Target_Metric'].mean()
"""

import pandas as pd

# Create a tabular dataset
data = {
    'Name': ['Ravi', 'Sita', 'Arun', 'Priya', 'Kiran', 'Anil', 'Lakshmi', 'Rahul'],
    'Department': ['CSE', 'CSE', 'ECE', 'ECE', 'CSE', 'ECE', 'CSE', 'ECE'],
    'Year': [2, 2, 3, 3, 2, 3, 3, 2],
    'Marks': [85, 90, 78, 88, 75, 82, 95, 70]
}

# Create DataFrame
df = pd.DataFrame(data)

print("Original DataFrame:")
print(df)

# --------------------------------------------------
# 1. Group by a SINGLE KEY (Department)
# --------------------------------------------------
print("\n1. Group by Department:")
group1 = df.groupby('Department')

for name, group in group1:
    print("\nDepartment:", name)
    print(group)

# Calculate average marks for each department
print("\nAverage Marks by Department:")
print(df.groupby('Department')['Marks'].mean())

# --------------------------------------------------
# 2. Group by MULTIPLE KEYS (Department and Year)
# --------------------------------------------------
print("\n2. Group by Department and Year:")
group2 = df.groupby(['Department', 'Year'])

for name, group in group2:
    print("\nGroup:", name)
    print(group)

# Calculate average marks for each Department and Year
print("\nAverage Marks by Department and Year:")
print(df.groupby(['Department', 'Year'])['Marks'].mean())

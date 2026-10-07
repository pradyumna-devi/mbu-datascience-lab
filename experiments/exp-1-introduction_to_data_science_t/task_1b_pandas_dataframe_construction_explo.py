"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 1: Introduction to Data Science & Tabular Computing
Task B [1B]: Pandas DataFrame Construction & Exploratory Data Inspection

Aim:
To create a Pandas DataFrame from dictionary structures, inspect data types, compute summary statistics, and add derived columns.

Syntax / General Form:
pd.DataFrame(data)
df.describe()
df['New_Column'] = expression

"""

import pandas as pd

# Create dictionary dataset
dataset = {
    'Student_ID': ['MBU-001', 'MBU-002', 'MBU-003', 'MBU-004', 'MBU-005'],
    'Name': ['Aarav', 'Bhavna', 'Chaitanya', 'Divya', 'Eshwar'],
    'Lab_Score': [88, 94, 76, 92, 85],
    'Viva_Score': [82, 90, 70, 88, 80],
    'Attendance_Pct': [95.0, 98.5, 82.0, 91.0, 87.5]
}

df = pd.DataFrame(dataset)
print("Student Laboratory DataFrame:")
print(df)

# Summary statistics
print("\nDescriptive Summary Statistics:")
print(df[['Lab_Score', 'Viva_Score', 'Attendance_Pct']].describe())

# Compute derived metric
df['Total_Average'] = (df['Lab_Score'] + df['Viva_Score']) / 2
print("\nDataFrame with Computed Total Average:")
print(df[['Name', 'Lab_Score', 'Viva_Score', 'Total_Average']])

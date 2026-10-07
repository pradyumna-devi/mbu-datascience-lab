"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 5: Data Visualization with Matplotlib & Seaborn
Task D [5D]: Create Scatter Plot and Examine the Relationship Between Two One-Dimensional Data Series

Aim:
To create a Scatter Plot using two one-dimensional data series and examine the relationship or correlation between them using Python, Pandas, and Matplotlib.

Syntax / General Form:
Matplotlib:
plt.scatter(x, y)

Pandas:
df.plot.scatter(x='Column1', y='Column2')

Correlation Calculation:
correlation = df['Column1'].corr(df['Column2'])

"""

import pandas as pd
import matplotlib.pyplot as plt

# Two one-dimensional data series
study_hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
marks = [45, 50, 55, 60, 65, 70, 72, 80, 85, 90]

# Create DataFrame
df = pd.DataFrame({
    'Study_Hours': study_hours,
    'Marks': marks
})

print("Data:")
print(df)

# Create Scatter Plot
plt.figure(figsize=(8, 5))

plt.scatter(df['Study_Hours'], df['Marks'])

plt.title("Relationship Between Study Hours and Marks")
plt.xlabel("Study Hours")
plt.ylabel("Marks")
plt.grid(True)

plt.tight_layout()
plt.show()

# Calculate correlation
correlation = df['Study_Hours'].corr(df['Marks'])

print("\nCorrelation Coefficient:", round(correlation, 2))

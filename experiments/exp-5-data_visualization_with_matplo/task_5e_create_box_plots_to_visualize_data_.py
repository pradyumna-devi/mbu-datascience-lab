"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 5: Data Visualization with Matplotlib & Seaborn
Task E [5E]: Create Box Plots to Visualize Data with Many Categorical Variables

Aim:
To create Box Plots for visualizing the distribution of numerical data across multiple categorical variables using Python, Pandas, Matplotlib, and Seaborn.

Syntax / General Form:
Seaborn:
sns.boxplot(x='Category', y='Value', data=df)

Pandas:
df.boxplot(column='Value', by='Category')

"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Create sample data
data = {
    'Department': [
        'CSE', 'CSE', 'CSE', 'CSE', 'CSE',
        'ECE', 'ECE', 'ECE', 'ECE', 'ECE',
        'EEE', 'EEE', 'EEE', 'EEE', 'EEE'
    ],
    'Marks': [
        78, 85, 90, 72, 88,
        65, 70, 82, 75, 80,
        60, 68, 72, 76, 85
    ]
}

df = pd.DataFrame(data)

print("Data:")
print(df)

# Create Box Plot
plt.figure(figsize=(8, 5))

sns.boxplot(
    x='Department',
    y='Marks',
    data=df
)

plt.title("Marks Distribution by Department")
plt.xlabel("Department")
plt.ylabel("Marks")
plt.grid(axis='y', linestyle='--', alpha=0.5)

plt.tight_layout()
plt.show()

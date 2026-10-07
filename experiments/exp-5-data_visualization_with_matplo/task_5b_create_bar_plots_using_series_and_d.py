"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 5: Data Visualization with Matplotlib & Seaborn
Task B [5B]: Create Bar Plots using Series and DataFrame index (Grouped & Stacked)

Aim:
To create bar plots using Pandas Series and DataFrame index, and to create both grouped bar plots and stacked bar plots using Matplotlib.

Syntax / General Form:
i. Create Bar Plots with a DataFrame — Side-by-Side Bars
df.plot(kind='bar')
or
df.plot.bar()
For a horizontal bar plot:
df.plot(kind='barh')

ii. Create Stacked Bar Plots from a DataFrame
df.plot(kind='bar', stacked=True)
or
df.plot.bar(stacked=True)

"""

import pandas as pd
import matplotlib.pyplot as plt

# Create DataFrame
data = {
    'Python': [85, 90, 78, 88],
    'Java': [75, 82, 80, 85],
    'C++': [80, 76, 85, 90]
}

df = pd.DataFrame(
    data,
    index=['Student1', 'Student2', 'Student3', 'Student4']
)

print("DataFrame:")
print(df)

# --------------------------------------------------
# 1. Create Grouped Bar Plot (Side-by-Side Bars)
# --------------------------------------------------
df.plot(
    kind='bar',
    figsize=(8, 5)
)

plt.title("Student Marks in Different Programming Languages (Grouped)")
plt.xlabel("Students")
plt.ylabel("Marks")
plt.xticks(rotation=0)
plt.legend(title="Subjects")
plt.tight_layout()
plt.show()

# --------------------------------------------------
# 2. Create Stacked Bar Plot
# --------------------------------------------------
df.plot(
    kind='bar',
    stacked=True,
    figsize=(8, 5)
)

plt.title("Stacked Bar Plot of Student Marks")
plt.xlabel("Students")
plt.ylabel("Total Marks")
plt.xticks(rotation=0)
plt.legend(title="Subjects")
plt.tight_layout()
plt.show()

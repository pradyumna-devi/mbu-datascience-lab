"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 5: Data Visualization with Matplotlib & Seaborn
Task C [5C]: Create Histogram to display value frequency and Density Plot to generate continuous distribution

Aim:
To create a Histogram for displaying the frequency distribution of observed data and a Density Plot for representing the continuous probability distribution of the data using Python, Pandas, Matplotlib, and Seaborn.

Syntax / General Form:
Histogram:
sns.histplot(data, bins=10, kde=False)

Density Plot:
sns.kdeplot(data, fill=True)

Histogram with Density Curve:
sns.histplot(data, bins=10, kde=True)

"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Sample observed data
data = [45, 50, 52, 55, 58, 60, 62, 65, 68, 70,
        72, 75, 78, 80, 82, 85, 88, 90, 92, 95]

# Create DataFrame
df = pd.DataFrame({'Marks': data})

print("Observed Data:")
print(df)

# --------------------------------------------------
# 1. Create Histogram
# --------------------------------------------------
plt.figure(figsize=(8, 5))
sns.histplot(df['Marks'], bins=6, kde=False)

plt.title("Histogram of Marks")
plt.xlabel("Marks")
plt.ylabel("Frequency")
plt.tight_layout()
plt.show()

# --------------------------------------------------
# 2. Create Density Plot
# --------------------------------------------------
plt.figure(figsize=(8, 5))
sns.kdeplot(df['Marks'], fill=True)

plt.title("Density Plot of Marks")
plt.xlabel("Marks")
plt.ylabel("Density")
plt.tight_layout()
plt.show()

# --------------------------------------------------
# 3. Combined Histogram with Density Curve
# --------------------------------------------------
plt.figure(figsize=(8, 5))
sns.histplot(df['Marks'], bins=6, kde=True)

plt.title("Histogram with Density Curve")
plt.xlabel("Marks")
plt.ylabel("Frequency / Density")
plt.tight_layout()
plt.show()

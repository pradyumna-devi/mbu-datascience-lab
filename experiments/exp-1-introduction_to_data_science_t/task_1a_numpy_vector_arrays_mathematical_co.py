"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 1: Introduction to Data Science & Tabular Computing
Task A [1A]: NumPy Vector Arrays & Mathematical Computations

Aim:
To create N-dimensional NumPy arrays and demonstrate vectorized mathematical operations, broadcasting, and slice indexing.

Syntax / General Form:
np.array(object)
np.mean(arr), np.std(arr)
arr[arr > condition]

"""

import numpy as np

# 1. Array creation & shape inspection
data = np.array([12, 18, 25, 30, 42, 55, 63, 78, 85, 92])
print("Original Array:")
print(data)

# 2. Vectorized operations & broadcasting
squared = data ** 2
standardized = (data - np.mean(data)) / np.std(data)

print("\nVectorized Mean:", np.mean(data))
print("Standard Deviation:", round(float(np.std(data)), 2))
print("Standardized Z-Scores:")
print(np.round(standardized, 2))

# 3. Boolean masking & filtering
high_values = data[data > 50]
print("\nFiltered Elements > 50:")
print(high_values)

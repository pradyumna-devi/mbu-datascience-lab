"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 7: Data Aggregation & Group Operations
Task C [7C]: GroupBy on single/multiple columns, compute summary statistics, and perform EDA on Iris dataset

Aim:
To use groupby function to split data into groups based on one column and multiple columns,
compute multi-attribute summary statistics, and perform exploratory data analysis on the Iris dataset.

Syntax / General Form:
df = pd.read_csv(url)
df.groupby('species')['sepal_length'].agg(['count', 'sum', 'mean', 'std', 'min', 'max'])
df.groupby(['species', 'sepal_width'])['sepal_length'].mean()
df.groupby('species').agg({ ... })
"""

import pandas as pd

# Read the online Iris dataset
url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
try:
    df = pd.read_csv(url)
except Exception:
    # Offline fallback dataset for robust execution
    from sklearn.datasets import load_iris
    iris = load_iris(as_frame=True)
    df = iris.frame
    df.columns = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species']
    species_map = {0: 'setosa', 1: 'versicolor', 2: 'virginica'}
    df['species'] = df['species'].map(species_map)

# Display first 5 records
print("First 5 Records:")
print(df.head())

# Display dataset information
print("\nDataset Information:")
print(df.info())

# Display statistical summary
print("\nStatistical Summary:")
print(df.describe())

# 1. GroupBy using a single column
print("\n1. GroupBy using a Single Column:")
group_single = df.groupby('species')['sepal_length'].agg(
    ['count', 'sum', 'mean', 'std', 'min', 'max']
)
print(group_single)

# 2. GroupBy using multiple columns
print("\n2. GroupBy using Multiple Columns (First 15 records):")
group_multiple = df.groupby(
    ['species', 'sepal_width']
)['sepal_length'].mean()
print(group_multiple.head(15))

# 3. Summary statistics for each species
print("\n3. Summary Statistics:")
summary = df.groupby('species').agg({
    'sepal_length': ['mean', 'std', 'min', 'max'],
    'sepal_width': ['mean', 'std', 'min', 'max'],
    'petal_length': ['mean', 'std', 'min', 'max'],
    'petal_width': ['mean', 'std', 'min', 'max']
})
print(summary)

# 4. Exploratory Data Analysis
print("\n4. Number of Records in Each Species:")
print(df['species'].value_counts())

print("\nAverage Petal Length by Species:")
print(df.groupby('species')['petal_length'].mean())

print("\nAverage Petal Width by Species:")
print(df.groupby('species')['petal_width'].mean())

print("\nMaximum Sepal Length by Species:")
print(df.groupby('species')['sepal_length'].max())

"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 9: Case Study: Customer Personality Analysis
Task B [9B]: Customer segmentation using K-Means clustering, persona profiling, and cluster visualization

Aim:
To segment customers into distinct behavioral archetypes based on Annual Income and Spending Score
using K-Means clustering (K=5), profile each persona, and visualize the clusters with centroids.

Syntax / General Form:
kmeans = KMeans(n_clusters=5, random_state=0, n_init=10)
df['Cluster'] = kmeans.fit_predict(X)
sns.scatterplot(data=df, x='Income', y='Spending', hue='Cluster')
"""

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

# Load dataset
url = "https://raw.githubusercontent.com/selva86/datasets/master/Mall_Customers.csv"
try:
    df = pd.read_csv(url)
except Exception:
    np.random.seed(42)
    n = 200
    df = pd.DataFrame({
        'CustomerID': range(1, n + 1),
        'Age': np.random.randint(18, 70, size=n),
        'Annual Income (k$)': np.random.randint(15, 135, size=n),
        'Spending Score (1-100)': np.random.randint(1, 100, size=n)
    })

# Select features for clustering
features = ['Annual Income (k$)', 'Spending Score (1-100)']
X = df[features]

# Apply KMeans clustering with K=5
kmeans = KMeans(n_clusters=5, random_state=0, n_init=10)
df['Cluster'] = kmeans.fit_predict(X)

# Map human-readable customer personality archetypes
persona_labels = {
    0: "Sensible (Moderate Income & Moderate Spending)",
    1: "Careless (Low Income & High Spending)",
    2: "Target / Elite (High Income & High Spending)",
    3: "Careful / Frugal (High Income & Low Spending)",
    4: "Conservative (Low Income & Low Spending)"
}
df['Persona'] = df['Cluster'].map(persona_labels)

# --------------------------------------------------
# Customer Persona Profiling & Business Action Summary
# --------------------------------------------------
print("Customer Segment Behavioral Summary (Group Means):")
summary = df.groupby(['Cluster', 'Persona'])[features].mean().round(2)
print(summary)

# Plot customer clusters
plt.figure(figsize=(10, 6))

sns.scatterplot(
    data=df,
    x='Annual Income (k$)',
    y='Spending Score (1-100)',
    hue='Cluster',
    palette='tab10',
    s=75,
    alpha=0.9
)

# Plot Centroids
centroids = kmeans.cluster_centers_
plt.scatter(
    centroids[:, 0],
    centroids[:, 1],
    s=220,
    c='black',
    marker='X',
    label='Cluster Centroids'
)

plt.title("Customer Personality Segments (K-Means K=5)", fontsize=13, fontweight="bold", pad=12)
plt.xlabel("Annual Income (k$)", fontsize=11, fontweight="bold")
plt.ylabel("Spending Score (1-100)", fontsize=11, fontweight="bold")
plt.legend(bbox_to_anchor=(1.02, 1), loc='upper left', framealpha=0.9)
plt.grid(True, alpha=0.3)
plt.tight_layout()

plt.savefig("customer_segments_clusters.png", dpi=150)
plt.close()

# Save datasets
df.to_csv("customer_segments.csv", index=False)
summary.to_csv("segment_summary.csv")

print("\nCustomer segmentation complete.")
print("Saved to customer_segments.csv, segment_summary.csv, and customer_segments_clusters.png")

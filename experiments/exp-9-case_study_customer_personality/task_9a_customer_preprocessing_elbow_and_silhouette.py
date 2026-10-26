"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 9: Case Study: Customer Personality Analysis
Task A [9A]: Customer data preprocessing, feature standardization, and optimal cluster determination via Elbow & Silhouette metrics

Aim:
To preprocess customer purchasing telemetry, standardize numerical features with StandardScaler,
and determine the optimal number of customer segmentation clusters K using the Elbow Method and Silhouette Analysis.

Syntax / General Form:
scaler = StandardScaler()
X = scaler.fit_transform(data)
kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
silhouette_score(X, labels)
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# 1. Load dataset (Mall Customers / Marketing Campaign)
url = "https://raw.githubusercontent.com/selva86/datasets/master/Mall_Customers.csv"
try:
    df = pd.read_csv(url)
except Exception:
    # Reliable local fallback generator
    np.random.seed(42)
    n = 200
    df = pd.DataFrame({
        'CustomerID': range(1, n + 1),
        'Age': np.random.randint(18, 70, size=n),
        'Annual Income (k$)': np.random.randint(15, 135, size=n),
        'Spending Score (1-100)': np.random.randint(1, 100, size=n)
    })

print("Dataset Preview:")
print(df.head())

# 2. Select customer features for clustering
features = ["Annual Income (k$)", "Spending Score (1-100)"]
data = df[features].copy()

# Clean missing values if present
data = data.fillna(data.median())

# 3. Standardize features
scaler = StandardScaler()
X = scaler.fit_transform(data)

# 4. Find suitable number of clusters using Elbow Method & Silhouette Scores
inertias = []
scores = []
k_range = range(2, 8)

for k in k_range:
    model = KMeans(
        n_clusters=k,
        random_state=42,
        n_init=10
    )
    labels = model.fit_predict(X)
    inertias.append(model.inertia_)
    scores.append(silhouette_score(X, labels))

# Display metric table
print("\nClustering Validation Diagnostics:")
for k, inertia, score in zip(k_range, inertias, scores):
    print(f"K = {k}: Inertia = {inertia:.2f}, Silhouette Score = {score:.4f}")

# Plot Elbow curve and Silhouette curve
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Elbow Curve
ax1.plot(k_range, inertias, marker="o", color="#38bdf8", linewidth=2)
ax1.set_xlabel("Number of Clusters (K)")
ax1.set_ylabel("Inertia (Within-Cluster Sum of Squares)")
ax1.set_title("Elbow Method For Optimal K")
ax1.grid(True, alpha=0.3)

# Silhouette Curve
ax2.plot(k_range, scores, marker="s", color="#10b981", linewidth=2)
ax2.set_xlabel("Number of Clusters (K)")
ax2.set_ylabel("Silhouette Score")
ax2.set_title("Silhouette Score vs Number of Clusters")
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("customer_elbow_silhouette.png", dpi=150)
plt.close()

best_k = list(k_range)[scores.index(max(scores))]
print(f"\nRecommended optimal cluster count: K = {best_k}")
print("Diagnostic plots saved as customer_elbow_silhouette.png")

"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 8: Web Scraping using Beautiful Soup & Text Analytics
Task E [8E]: Scatter Intensity Plot of Sentiments with decision thresholds

Aim:
To visualize the sentiment intensity of product reviews using a scatter plot,
with review index on the X-axis and VADER compound sentiment score on the Y-axis.

Syntax / General Form:
import matplotlib.pyplot as plt
plt.scatter(x_values, sentiment_scores)
plt.axhline(y=0.05, linestyle="--")
plt.axhline(y=-0.05, linestyle="--")
plt.show()
"""

import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load sentiment results or generate sample data
if not os.path.exists("sentiment_analysis_results.csv"):
    sample_data = {
        "review": [
            "The product is excellent and high quality.",
            "The quality is terrible and frustrating.",
            "The product is okay and acceptable.",
            "Loved this smartphone! Beautiful display.",
            "Terrible customer service. Defective charger.",
            "Battery backup is decent for daily usage.",
            "Fabulous camera and blazing fast charging!"
        ],
        "vader_compound": [0.7964, -0.7184, 0.2263, 0.8519, -0.7964, 0.0516, 0.8804],
        "vader_sentiment": ["Positive", "Negative", "Neutral", "Positive", "Negative", "Positive", "Positive"]
    }
    pd.DataFrame(sample_data).to_csv("sentiment_analysis_results.csv", index=False)

df = pd.read_csv("sentiment_analysis_results.csv")

# Ensure valid compound scores
df["vader_compound"] = pd.to_numeric(df["vader_compound"], errors="coerce")
df = df.dropna(subset=["vader_compound"]).reset_index(drop=True)

# Assign review indices
df["review_index"] = range(1, len(df) + 1)

# Palette mapping
palette = {
    "Positive": "#10b981",
    "Negative": "#ef4444",
    "Neutral": "#94a3b8"
}

plt.figure(figsize=(12, 6))

sns.scatterplot(
    data=df,
    x="review_index",
    y="vader_compound",
    hue="vader_sentiment",
    palette=palette,
    s=90,
    alpha=0.9
)

# Sentiment classification thresholds
plt.axhline(y=0.05, color="#10b981", linestyle="--", linewidth=1.5, label="Positive threshold (>= +0.05)")
plt.axhline(y=-0.05, color="#ef4444", linestyle="--", linewidth=1.5, label="Negative threshold (<= -0.05)")
plt.axhline(y=0, color="#64748b", linestyle=":", linewidth=1.2, label="Neutral reference (0.0)")

plt.ylim(-1.1, 1.1)
plt.xlabel("Review Index", fontsize=11, fontweight="bold")
plt.ylabel("VADER Compound Sentiment Score", fontsize=11, fontweight="bold")
plt.title("Sentiment Intensity of Product Reviews", fontsize=13, fontweight="bold", pad=12)
plt.legend(loc="upper right", framealpha=0.9)
plt.grid(True, alpha=0.3)
plt.tight_layout()

plt.savefig("sentiment_intensity_scatter.png", dpi=150)
plt.close()

print("Scatter intensity plot saved successfully as sentiment_intensity_scatter.png")

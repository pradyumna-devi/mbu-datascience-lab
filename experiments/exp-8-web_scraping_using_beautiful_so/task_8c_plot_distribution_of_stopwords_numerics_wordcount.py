"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 8: Web Scraping using Beautiful Soup & Text Analytics
Task C [8C]: Distribution of Stopwords, Numerics, Word Count, Character Count, and Average Word Length

Aim:
To analyze product reviews by calculating stopword frequency, numeric-token frequency,
word count, character count, and average word length, and to visualize their distributions using Seaborn subplots.

Syntax / General Form:
word_count = len(text.split())
character_count = len(text)
average_word_length = sum(len(w) for w in words) / len(words)
sns.histplot(data=df, x=column, kde=True)
"""

import os
import re
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter

# Load dataset
if not os.path.exists("product_reviews.csv"):
    sample_data = {
        "title": ["Great product", "Not satisfied", "Worth buying", "Superb device", "Faulty piece"],
        "review": [
            "Excellent quality with 5000mAh battery life and 120Hz display screen. Worth 100 dollars!",
            "The product stopped working after 2 days. Very poor build quality and zero stars.",
            "Good performance and decent camera. Delivery was fast and packing was 10 out of 10.",
            "Amazing user experience and crisp audio output. Truly 100% satisfied.",
            "Worst quality ever received. Failed within 24 hours of first usage."
        ],
        "rating": ["5 out of 5", "1 out of 5", "4 out of 5", "5 out of 5", "1 out of 5"]
    }
    pd.DataFrame(sample_data).to_csv("product_reviews.csv", index=False)

df = pd.read_csv("product_reviews.csv")
df["review"] = df["review"].fillna("").astype(str)

# Standard English stopwords set
stop_words = {
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're",
    "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he',
    'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's",
    'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
    'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are',
    'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do',
    'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because',
    'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against',
    'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
    'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
    'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how',
    'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
    'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's',
    't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd',
    'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't"
}

def analyze_review(text):
    tokens = re.findall(r"\b[\w']+\b", text.lower())
    words = re.findall(r"\b[A-Za-z]+\b", text)
    numeric_tokens = re.findall(r"\b\d+(?:\.\d+)?\b", text)
    stopword_tokens = [token for token in tokens if token in stop_words]

    return pd.Series({
        "word_count": len(tokens),
        "character_count": len(text),
        "numeric_count": len(numeric_tokens),
        "stopword_count": len(stopword_tokens),
        "average_word_length": (
            sum(len(word) for word in words) / len(words)
            if words else 0
        )
    })

statistics = df["review"].apply(analyze_review)
df = pd.concat([df, statistics], axis=1)

# Save calculated statistics
df.to_csv("review_statistics.csv", index=False)

# Plot distributions
columns = [
    ("stopword_count", "Stopword Count"),
    ("numeric_count", "Numeric Token Count"),
    ("word_count", "Word Count"),
    ("character_count", "Character Count"),
    ("average_word_length", "Average Word Length")
]

fig, axes = plt.subplots(3, 2, figsize=(12, 12))
axes = axes.flatten()

for i, (column, title) in enumerate(columns):
    sns.histplot(
        data=df, x=column, kde=True,
        ax=axes[i], bins=8, color="#0ea5e9"
    )
    axes[i].set_title(title, fontsize=11, fontweight="bold")
    axes[i].set_xlabel(title)
    axes[i].set_ylabel("Number of Reviews")
    axes[i].grid(True, alpha=0.3)

axes[-1].axis("off")
plt.tight_layout()
plt.savefig("review_statistics_distributions.png", dpi=150)
plt.close()

# Most common stopwords
all_tokens = re.findall(r"\b[\w']+\b", " ".join(df["review"]).lower())
stopword_frequency = Counter(token for token in all_tokens if token in stop_words)

print("Top Stopwords in Reviews:")
print(stopword_frequency.most_common(10))

print("\nDescriptive Statistics of Review Metrics:")
print(df[[
    "stopword_count",
    "numeric_count",
    "word_count",
    "character_count",
    "average_word_length"
]].describe())

print("\nDistribution plot saved as review_statistics_distributions.png")

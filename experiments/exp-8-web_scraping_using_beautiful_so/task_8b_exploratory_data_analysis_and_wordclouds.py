"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 8: Web Scraping using Beautiful Soup & Text Analytics
Task B [8B]: Exploratory Data Analysis and WordCloud Generation

Aim:
To perform exploratory data analysis (EDA) on product reviews and generate WordCloud visualizations
for all reviews, positive reviews, and negative reviews based on VADER compound sentiment scores.

Syntax / General Form:
from wordcloud import WordCloud
cloud = WordCloud(width=1000, height=500, background_color="white").generate(text)
cloud.to_file("wordcloud.png")
"""

import os
import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Load extracted reviews or initialize default review dataset
if not os.path.exists("product_reviews.csv"):
    sample_data = {
        "title": ["Great product", "Not satisfied", "Worth buying", "Excellent device", "Worst purchase"],
        "review": [
            "Excellent quality and amazing battery life. Worth every penny!",
            "The product stopped working after two days. Very poor build quality and disappointing.",
            "Good performance and decent camera. Delivery was fast and packing was great.",
            "Superb speed and crystal clear display. Highly recommended to everyone!",
            "Defective unit and awful customer support. Waste of money."
        ],
        "rating": ["5 out of 5", "2 out of 5", "4 out of 5", "5 out of 5", "1 out of 5"]
    }
    pd.DataFrame(sample_data).to_csv("product_reviews.csv", index=False)

df = pd.read_csv("product_reviews.csv")
df["review"] = df["review"].fillna("").astype(str)

# Initialize VADER sentiment analyzer
analyzer = SentimentIntensityAnalyzer()

def classify_sentiment(text):
    score = analyzer.polarity_scores(text)["compound"]
    if score >= 0.05:
        return "Positive"
    elif score <= -0.05:
        return "Negative"
    return "Neutral"

df["sentiment"] = df["review"].apply(classify_sentiment)

def generate_wordcloud(text, title, filename):
    if not text.strip():
        print(f"No text available for: {title}")
        return

    cloud = WordCloud(
        width=1200,
        height=600,
        background_color="white",
        max_words=150,
        collocations=False
    ).generate(text)

    plt.figure(figsize=(10, 5))
    plt.imshow(cloud, interpolation="bilinear")
    plt.axis("off")
    plt.title(title, fontsize=14, pad=12)
    plt.tight_layout()
    plt.savefig(filename, dpi=150, bbox_inches="tight")
    plt.close()

# 1. WordCloud for All reviews
all_text = " ".join(df["review"])
generate_wordcloud(all_text, "WordCloud - All Reviews", "wordcloud_all.png")

# 2. WordCloud for Positive reviews
positive_text = " ".join(df.loc[df["sentiment"] == "Positive", "review"])
generate_wordcloud(positive_text, "WordCloud - Positive Reviews", "wordcloud_positive.png")

# 3. WordCloud for Negative reviews
negative_text = " ".join(df.loc[df["sentiment"] == "Negative", "review"])
generate_wordcloud(negative_text, "WordCloud - Negative Reviews", "wordcloud_negative.png")

# Save analyzed dataset
df.to_csv("product_reviews_analyzed.csv", index=False)

print("Sentiment Counts in Dataset:")
print(df["sentiment"].value_counts())
print("\nWordCloud images saved successfully: wordcloud_all.png, wordcloud_positive.png, wordcloud_negative.png")

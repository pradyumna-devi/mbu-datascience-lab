"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 8: Web Scraping using Beautiful Soup & Text Analytics
Task D [8D]: Sentiment Analysis Using NLTK and VADER

Aim:
To calculate and compare the sentiment polarity scores (positive, negative, neutral, compound)
of product reviews using the VADER sentiment analyzer, and classify reviews as positive, negative, or neutral.

Syntax / General Form:
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()
scores = analyzer.polarity_scores("The product is excellent.")
"""

import os
import pandas as pd
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Load dataset or initialize sample data
if not os.path.exists("product_reviews.csv"):
    sample_data = {
        "title": ["Great product", "Not satisfied", "Worth buying", "Loved it", "Terrible support"],
        "review": [
            "The product is excellent and high quality.",
            "The quality is terrible and frustrating.",
            "The product is okay and acceptable.",
            "Loved this smartphone! Beautiful display.",
            "Terrible customer service. Defective charger."
        ],
        "rating": ["5/5", "1/5", "3/5", "5/5", "1/5"]
    }
    pd.DataFrame(sample_data).to_csv("product_reviews.csv", index=False)

df = pd.read_csv("product_reviews.csv")
df["review"] = df["review"].fillna("").astype(str)

# Initialize VADER Sentiment Intensity Analyzer
vader_analyzer = SentimentIntensityAnalyzer()

def classify(score):
    if score >= 0.05:
        return "Positive"
    elif score <= -0.05:
        return "Negative"
    return "Neutral"

# Calculate VADER scores
vader_scores = df["review"].apply(vader_analyzer.polarity_scores)

df["vader_positive"] = vader_scores.apply(lambda x: x["pos"])
df["vader_negative"] = vader_scores.apply(lambda x: x["neg"])
df["vader_neutral"] = vader_scores.apply(lambda x: x["neu"])
df["vader_compound"] = vader_scores.apply(lambda x: x["compound"])
df["vader_sentiment"] = df["vader_compound"].apply(classify)

# Display sample results
print("Sentiment Analysis Results:")
print(df[[
    "review",
    "vader_positive",
    "vader_negative",
    "vader_neutral",
    "vader_compound",
    "vader_sentiment"
]].to_string(index=False))

# Count sentiment categories
print("\nVADER Sentiment Distribution:")
print(df["vader_sentiment"].value_counts())

# Save output
df.to_csv("sentiment_analysis_results.csv", index=False)
print("\nResults saved successfully to sentiment_analysis_results.csv")

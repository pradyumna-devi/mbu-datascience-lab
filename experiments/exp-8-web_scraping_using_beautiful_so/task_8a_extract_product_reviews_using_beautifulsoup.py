"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 8: Web Scraping using Beautiful Soup & Text Analytics
Task A [8A]: Extract product reviews from HTML using Beautiful Soup and save to CSV

Aim:
To extract product reviews and related information from an authorized HTML page or review source
using Beautiful Soup and save the extracted data into a CSV file for further exploratory analysis.

Syntax / General Form:
from bs4 import BeautifulSoup
soup = BeautifulSoup(html_content, "html.parser")
elements = soup.select("CSS_SELECTOR")
text = elements[0].get_text(strip=True)
"""

from bs4 import BeautifulSoup
import pandas as pd
import os

# Sample HTML document for reproducible local execution
sample_html = """
<!DOCTYPE html>
<html>
<head><title>Customer Reviews Page</title></head>
<body>
  <div class="reviews-container">
    <div class="review">
      <h3 class="review-title">Great product</h3>
      <span class="rating">5 out of 5</span>
      <p class="review-text">Excellent quality and amazing battery life. Worth every penny!</p>
    </div>
    <div class="review">
      <h3 class="review-title">Not satisfied</h3>
      <span class="rating">2 out of 5</span>
      <p class="review-text">The product stopped working after two days. Very poor build quality.</p>
    </div>
    <div class="review">
      <h3 class="review-title">Worth buying</h3>
      <span class="rating">4 out of 5</span>
      <p class="review-text">Good performance and decent camera. Delivery was fast and packing was great.</p>
    </div>
  </div>
</body>
</html>
"""

# Check if reviews.html exists on disk, otherwise write sample HTML
if not os.path.exists("reviews.html"):
    with open("reviews.html", "w", encoding="utf-8") as f:
        f.write(sample_html.strip())

# Read HTML content
with open("reviews.html", "r", encoding="utf-8") as file:
    html_content = file.read()

soup = BeautifulSoup(html_content, "html.parser")

# Identify review blocks using CSS selector
review_blocks = soup.select(".review")
records = []

for block in review_blocks:
    review_element = block.select_one(".review-text")
    rating_element = block.select_one(".rating")
    title_element = block.select_one(".review-title")

    review_text = review_element.get_text(" ", strip=True) if review_element else ""
    rating_text = rating_element.get_text(" ", strip=True) if rating_element else ""
    title = title_element.get_text(" ", strip=True) if title_element else ""

    if review_text:
        records.append({
            "title": title,
            "review": review_text,
            "rating": rating_text
        })

df = pd.DataFrame(records)
df.to_csv("product_reviews.csv", index=False, encoding="utf-8-sig")

print("Extracted Reviews Preview:")
print(df.head())
print("\nTotal reviews extracted:", len(df))
print("Saved successfully to product_reviews.csv")

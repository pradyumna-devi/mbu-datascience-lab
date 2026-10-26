# Experiment 8: Web Scraping using Beautiful Soup & Text Analytics
**Course / Department**: Department of Data Science, Mohan Babu University  
**Category**: Web Scraping & NLP  
**Curriculum Standard**: Official Laboratory Practical  

---

## Overview
Extract product reviews and rating metrics using Beautiful Soup, perform exploratory text analytics, generate WordClouds for all/positive/negative reviews, compute distributions of lexical tokens (stopwords, numerics, word counts), evaluate sentiment polarity scores using VADER and NLTK, and construct scatter intensity plots with classification thresholds.

### Tech Stack & Key Concepts
- **Beautiful Soup (bs4)**
- **HTML DOM Parsing**
- **WordCloud Generation**
- **Text Statistics & EDA**
- **VADER Sentiment Intensity Analysis**
- **Sentiment Scatter Intensity Plots**
- **Pandas & Seaborn**

---

## Laboratory Modules & Python Source Scripts

| Task Letter | Code ID | Module Title | Script File |
|---|---|---|---|
| **A** | `8A` | Extract product reviews from HTML using Beautiful Soup and save to CSV | [`task_8a_extract_product_reviews_using_beautifulsoup.py`](./task_8a_extract_product_reviews_using_beautifulsoup.py) |
| **B** | `8B` | Exploratory Data Analysis and WordCloud Generation (All, Positive, Negative) | [`task_8b_exploratory_data_analysis_and_wordclouds.py`](./task_8b_exploratory_data_analysis_and_wordclouds.py) |
| **C** | `8C` | Distribution of Stopwords, Numerics, Word Count, Character Count, and Average Word Length | [`task_8c_plot_distribution_of_stopwords_numerics_wordcount.py`](./task_8c_plot_distribution_of_stopwords_numerics_wordcount.py) |
| **D** | `8D` | Sentiment Analysis and Polarity Scoring using NLTK and VADER | [`task_8d_sentiment_analysis_using_nltk_and_vader.py`](./task_8d_sentiment_analysis_using_nltk_and_vader.py) |
| **E** | `8E` | Scatter Intensity Plot of Sentiments with decision thresholds | [`task_8e_scatter_intensity_plot_of_sentiments.py`](./task_8e_scatter_intensity_plot_of_sentiments.py) |

---

## Execution Instructions
Run any task script directly via Python 3:
```bash
python <script_name>.py
```
All dependencies can be installed via:
```bash
pip install beautifulsoup4 pandas requests matplotlib seaborn wordcloud nltk vaderSentiment numpy
```

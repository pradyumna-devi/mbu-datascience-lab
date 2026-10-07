"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 2: Data Extraction & Web Data Acquisition
Task A [2A]: Structured Data Extraction from SQLite Database with SQL Queries

Aim:
To create an in-memory SQLite database, insert tabular records, and execute structured SQL SELECT queries with filtering and aggregations into Pandas.

Syntax / General Form:
sqlite3.connect(':memory:')
pd.read_sql_query(query, conn)

"""

import sqlite3
import pandas as pd

# Connect to in-memory SQLite database
conn = sqlite3.connect(':memory:')
cursor = conn.cursor()

# Create sample research publications table
cursor.execute('''
    CREATE TABLE research_publications (
        pub_id INTEGER PRIMARY KEY,
        domain TEXT,
        citations INTEGER,
        impact_factor REAL,
        year INTEGER
    )
''')

sample_data = [
    (1, 'Machine Learning', 142, 4.8, 2024),
    (2, 'Data Extraction', 89, 3.5, 2024),
    (3, 'Computer Vision', 215, 6.2, 2025),
    (4, 'Data Extraction', 64, 3.1, 2025),
    (5, 'Machine Learning', 198, 5.4, 2025),
    (6, 'Natural Language Processing', 175, 5.1, 2026)
]
cursor.executemany('INSERT INTO research_publications VALUES (?, ?, ?, ?, ?)', sample_data)
conn.commit()

# Extract data using SQL query
sql_query = """
    SELECT domain, COUNT(*) as paper_count, AVG(citations) as avg_citations, MAX(impact_factor) as max_if
    FROM research_publications
    GROUP BY domain
    ORDER BY avg_citations DESC;
"""

df_extracted = pd.read_sql_query(sql_query, conn)
print("Extracted Aggregated Records via SQL Query:")
print(df_extracted)
conn.close()

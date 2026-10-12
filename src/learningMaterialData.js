/**
 * Comprehensive Academic Learning Material & Study Matter
 * Department of Data Science | Mohan Babu University
 * Modules 1, 2, 3, and 4 Curriculum Topics
 */

export const MODULES_LEARNING_MATERIAL = {
  "mod-1": {
    code: "DS-MOD-101",
    title: "Module 1: Introduction to Data Science",
    category: "Introduction to Data Science",
    leadSummary: "Foundational principles of Data Science, lifecycle phases, interactive computing environments in Python, high-performance numerical computing with NumPy, structured tabular manipulation with Pandas, descriptive statistics, and ethical governance standards.",
    topics: [
      {
        number: 1,
        title: "Data Science Lifecycle, Multidisciplinary Foundations & Problem Formulation",
        unit: "Unit I: Foundations & The Data Science Lifecycle",
        concept: `Data Science is an empirical, multidisciplinary discipline positioned at the intersection of Domain Knowledge, Mathematical & Statistical Modeling, and Computer Science / Software Engineering. 

The canonical Data Science Lifecycle comprises seven iterative stages:
1. Problem Formulation: Translating ambiguous institutional or industrial questions into quantifiable statistical hypotheses and evaluation metrics (e.g., RMSE, F1-Score, ROC-AUC).
2. Data Discovery & Acquisition: Ingesting relevant primary and secondary telemetry from databases, APIs, message queues, and sensor arrays.
3. Data Hygiene & Preprocessing: Handling missing values, reconciling contradictory schema definitions, removing duplicate records, and normalising datatypes.
4. Exploratory Data Analysis (EDA): Uncovering underlying distributions, identifying co-linear features, visualizing correlations, and auditing data quality.
5. Feature Engineering & Representation: Transforming raw variables into predictive signals using vectorization, categorical encoding, polynomial interaction, and scaling.
6. Modeling & Validation: Training machine learning models or statistical estimators with cross-validation protocols to guard against overfitting and data leakage.
7. Deployment & Continuous Monitoring: Integrating inference pipelines into production microservices with automated drift detection and feedback loops.`,
        codeExample: `# Problem Formulation & Metric Definition
import numpy as np

def evaluate_predictions(y_true, y_pred):
    """Computes fundamental evaluation metrics for empirical evaluation."""
    mae = np.mean(np.abs(y_true - y_pred))
    rmse = np.sqrt(np.mean((y_true - y_pred) ** 2))
    mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100
    return {"MAE": mae, "RMSE": rmse, "MAPE_%": mape}

# Example telemetry evaluation
actual = np.array([120.0, 150.0, 180.0, 210.0])
predicted = np.array([125.0, 148.0, 175.0, 220.0])
print("Lifecycle Metrics:", evaluate_predictions(actual, predicted))`,
        keyPoints: [
          "Data Science combines Domain Expertise, Statistics/Mathematics, and Computer Science.",
          "Problem formulation defines testable hypotheses and quantitative evaluation benchmarks.",
          "Iterative lifecycle: Problem Formulation -> Ingestion -> Preprocessing -> EDA -> Modeling -> Deployment.",
          "Strict data hygiene and cross-validation prevent catastrophic target leakage."
        ],
        labCorrelation: "Experiment 1: Overview and Analytical Problem Formulation"
      },
      {
        number: 2,
        title: "Python Data Science Ecosystem & Interactive Development Environments",
        unit: "Unit I: Foundations & The Data Science Lifecycle",
        concept: `Python has emerged as the global standard lingua franca for data analytics and artificial intelligence. Its dominance is driven by an extensive, high-performance ecosystem backed by compiled C and Fortran extensions, clean syntax, and rich interactive developer environments.

Key Components of the Scientific Computing Architecture:
- CPython Interpreter: Standard runtime executing bytecode with automatic dynamic typing and memory management.
- WebAssembly (Pyodide): In-browser compilation layer compiling CPython 3.12 and scientific C-extensions to WebAssembly, enabling client-side isolated analytical execution.
- Jupyter Interactive Architecture: Deconstructs computational code into individual reactive cells, combining formatted Markdown prose, LaTeX equations, and graphical visualizations into reproducible .ipynb documents.
- Library Ecosystem: NumPy for memory-contiguous vector math, Pandas for labeled DataFrames, Matplotlib & Seaborn for graphics, and SciPy for optimization.`,
        codeExample: `# Interactive Environment Setup & Diagnostic Telemetry
import sys
import platform

def environment_diagnostics():
    return {
        "Python_Version": sys.version.split()[0],
        "Platform": platform.system(),
        "Architecture": platform.machine(),
        "Byteorder": sys.byteorder,
        "Max_Int": sys.maxsize
    }

print("Runtime Environment Telemetry:")
for k, v in environment_diagnostics().items():
    print(f"  {k}: {v}")`,
        keyPoints: [
          "Python ecosystem relies on optimized compiled C-extensions for performance-critical numeric tasks.",
          "Jupyter Notebooks provide reproducible interleaving of prose, code, and visualizations.",
          "WebAssembly / Pyodide allows high-performance Python execution directly inside web browsers.",
          "Setting random seeds (np.random.seed) guarantees deterministic, reproducible research results."
        ],
        labCorrelation: "Workspace Interactive Python 3.12 WebAssembly REPL Kernel"
      },
      {
        number: 3,
        title: "NumPy N-Dimensional Array Architectures, Vectorization & Numerical Broadcasting",
        unit: "Unit II: Computational Ecosystem & Numerical Computing with NumPy",
        concept: `NumPy is the foundational substrate of numerical computing in Python. The fundamental abstraction is the homogeneous, multidimensional ndarray object.

1. Contiguous Memory Architecture: Unlike standard Python lists that store fragmented pointers to scattered heap objects, NumPy arrays pack homogeneous C primitive datatypes into contiguous, cache-aligned RAM memory blocks.
2. Vectorization (SIMD): Vectorized operations bypass Python interpreter loop overhead by dispatching single instructions across multiple data elements (SIMD - Single Instruction, Multiple Data) through optimized BLAS and LAPACK libraries.
3. Broadcasting Semantics: When applying operations across ndarrays of differing shapes, NumPy automatically broadcasts the smaller array across the larger array's dimensions without copying memory if:
   - Rule 1: Dimensions match exactly, OR
   - Rule 2: One of the dimensions is exactly 1 (in which case it stretches virtually).
4. Strides and Slicing: Slicing an ndarray returns an in-memory view with modified strides rather than creating an expensive duplicate array.`,
        codeExample: `# NumPy Vectorization and Broadcasting Demonstration
import numpy as np

# 1. Contiguous vector construction
matrix = np.array([[10, 20, 30],
                   [40, 50, 60],
                   [70, 80, 90]], dtype=np.float64)

# 2. Broadcasting a 1D bias vector across all rows
bias = np.array([1.5, 2.5, 3.5]) # Shape (3,) broadcasts to (3, 3)
adjusted = matrix + bias

# 3. Vectorized z-score standardization
column_means = np.mean(adjusted, axis=0)
column_stds = np.std(adjusted, axis=0)
standardized = (adjusted - column_means) / column_stds

print("Broadcasted Matrix:\\n", adjusted)
print("Standardized Matrix:\\n", np.round(standardized, 3))`,
        keyPoints: [
          "NumPy ndarray stores contiguous homogeneous elements for maximum CPU L1/L2 cache locality.",
          "Vectorization eliminates Python for-loops by utilizing SIMD hardware vector instructions.",
          "Broadcasting enables arithmetic between arrays of differing shapes without allocating duplicate memory.",
          "Array slicing generates memory views sharing buffer pointers unless explicit .copy() is invoked."
        ],
        labCorrelation: "Experiment 1 - Task 1A: NumPy Vector Arrays & Mathematical Computations"
      },
      {
        number: 4,
        title: "Pandas Series and DataFrame Structures, Indexing, Slicing & Attribute Inspection",
        unit: "Unit II: Computational Ecosystem & Numerical Computing with NumPy",
        concept: `Pandas delivers high-performance, expressive data structures engineered for labeled and relational tabular datasets.

1. Core Data Structures:
   - Series: 1-dimensional labeled array capable of holding any data type, backed by a NumPy 1D array and an explicit Index object.
   - DataFrame: 2-dimensional labeled matrix composed of aligned Series sharing an Index and column headers.
2. Indexing Mechanisms:
   - .loc[]: Label-based indexing. Endpoints are inclusive (e.g., df.loc['A':'C', 'Salary']).
   - .iloc[]: Integer position-based indexing (0 to N-1). Endpoints follow standard Python half-open intervals where the stop boundary is exclusive (e.g., df.iloc[0:5, 1:4]).
   - Boolean Indexing: Subsetting rows using vectorized conditional series (e.g., df[df['Score'] >= 85]).
3. Attribute Inspection:
   - df.shape: Returns (num_rows, num_cols) tuple.
   - df.dtypes: Displays data types of all columns.
   - df.info(): Memory consumption, column counts, and non-null audit.
   - df.describe(): Automated parametric and non-parametric summary metrics.`,
        codeExample: `# Pandas DataFrame Construction, Indexing & Slicing
import pandas as pd

records = {
    'Candidate': ['Pradyumna', 'Aditya', 'Sneha', 'Rahul', 'Pooja'],
    'Department': ['Data Science', 'AI & ML', 'Data Science', 'Cyber Security', 'Data Science'],
    'Score': [94, 88, 92, 79, 96],
    'LabCompleted': [True, True, True, False, True]
}

df = pd.DataFrame(records)

# Explicit label vs position indexing
top_candidates = df.loc[df['Score'] >= 90, ['Candidate', 'Department', 'Score']]
position_sample = df.iloc[0:3, [0, 2]]

print("Top Scoring Cohort (.loc):\\n", top_candidates)
print("\\nFirst 3 Records (.iloc):\\n", position_sample)
print("\\nDataset Schema Telemetry:\\nShape:", df.shape, "| Missing Values:", df.isnull().sum().to_dict())`,
        keyPoints: [
          "Series is a labeled 1D array; DataFrame is a 2D tabular matrix of aligned Series.",
          "loc[] uses labels and inclusive endpoints; iloc[] uses integer positions with exclusive stop endpoints.",
          "Boolean masking enables vectorized row filtering without iteration.",
          "df.info() and df.describe() provide instantaneous structural and statistical schema telemetry."
        ],
        labCorrelation: "Experiment 1 - Task 1B: Pandas DataFrame Construction & Exploratory Data Inspection"
      },
      {
        number: 5,
        title: "Descriptive Statistics: Measures of Central Tendency, Dispersion & Exploratory Distributions",
        unit: "Unit III: Tabular Data Structures with Pandas & Exploratory Diagnostics",
        concept: `Descriptive statistics synthesize voluminous observation sets into compact mathematical representations characterizing distribution location, spread, and shape.

1. Measures of Central Tendency:
   - Mean (x̄): Arithmetic average; sensitive to extreme outliers: x̄ = (Σ x_i) / n.
   - Median: 50th percentile of sorted observations; robust against heavy tails and anomalies.
   - Mode: Most frequently occurring value in discrete or categorical distributions.
2. Measures of Dispersion (Spread):
   - Variance (s²): Mean squared deviation from the sample mean with Bessel's correction: s² = Σ (x_i - x̄)² / (n - 1).
   - Standard Deviation (s): Square root of variance, expressing spread in original measurement units.
   - Interquartile Range (IQR): IQR = Q3 - Q1, capturing the middle 50% of sorted data.
3. Distribution Shape:
   - Skewness: Quantifies asymmetry (positive/right-skewed vs. negative/left-skewed).
   - Kurtosis: Measures tail thickness and outlier propensity relative to Gaussian normal distributions.`,
        codeExample: `# Descriptive Statistics & Spread Computation
import pandas as pd
import numpy as np

scores = pd.Series([65, 72, 78, 81, 85, 88, 89, 91, 94, 98, 145]) # contains outlier 145

mean_val = scores.mean()
median_val = scores.median()
var_val = scores.var(ddof=1)
std_val = scores.std(ddof=1)
q25, q75 = scores.quantile([0.25, 0.75])
iqr_val = q75 - q25

print(f"Mean: {mean_val:.2f} | Median: {median_val:.2f}")
print(f"Variance: {var_val:.2f} | Standard Deviation: {std_val:.2f}")
print(f"Q1: {q25:.1f} | Q3: {q75:.1f} | IQR: {iqr_val:.1f}")
print(f"Outlier Boundary (> Q3 + 1.5*IQR): {q75 + 1.5 * iqr_val:.1f}")`,
        keyPoints: [
          "Mean is sensitive to outliers; Median is the robust measure of central tendency.",
          "Bessel's correction (n - 1) provides unbiased sample variance estimation.",
          "IQR (Q3 - Q1) characterizes non-parametric spread unaffected by extreme values.",
          "Z-score transformation (x - μ) / σ standardizes variables into zero mean and unit variance."
        ],
        labCorrelation: "Experiment 1 - Task 1B & Diagnostic Metric Calculator Tool"
      },
      {
        number: 6,
        title: "Data Governance, Ethical Analytics, Reproducibility & Privacy Standards",
        unit: "Unit III: Tabular Data Structures with Pandas & Exploratory Diagnostics",
        concept: `Modern data science operations require rigorous adherence to algorithmic accountability, privacy preservation, and reproducible research standards.

1. Algorithmic Fairness & Bias:
   - Detecting sampling bias, historical discrimination, and target label bias in training datasets.
   - Auditing disparate impact metrics to ensure models do not disadvantage protected demographic groups.
2. Privacy & Compliance Frameworks:
   - De-identification and anonymization: Stripping Personally Identifiable Information (PII).
   - Compliance with modern data protection acts (DPDP Act, GDPR, HIPAA).
   - Differential Privacy: Adding calibrated mathematical noise (Laplace or Gaussian) to aggregate queries to prevent re-identification attacks.
3. Reproducibility Best Practices:
   - Deterministic execution: Pinning random state seeds across NumPy, SciPy, and ML frameworks.
   - Environment locking: Specifying pinned package dependency trees (requirements.txt, conda environment.yml).
   - Immutable audit logs: Recording model lineage, dataset hash digests, and evaluation benchmarks.`,
        codeExample: `# Ethical Data De-Identification & Reproducible Seeding
import hashlib
import numpy as np
import pandas as pd

def anonymize_identifier(val, salt="MBU_DS_2026"):
    """Cryptographic SHA-256 pseudonymization of PII."""
    return hashlib.sha256(f"{val}_{salt}".encode()).hexdigest()[:12]

# Reproducibility seed lock
np.random.seed(42)

raw_users = pd.DataFrame({
    'StudentID': ['24102A030078', '24102A030079', '24102A030080'],
    'RawName': ['Pradyumna Devi', 'Candidate B', 'Candidate C'],
    'Score': np.random.randint(75, 100, 3)
})

raw_users['AnonID'] = raw_users['StudentID'].apply(anonymize_identifier)
anonymized_df = raw_users.drop(columns=['StudentID', 'RawName'])
print("Anonymized & Governance-Compliant Dataset:\\n", anonymized_df)`,
        keyPoints: [
          "Data governance guarantees data lineage, accountability, and ethical privacy protection.",
          "PII must be pseudonymized or stripped before exploratory analysis or model training.",
          "Algorithmic auditing guards against disparate impact and proxy discrimination.",
          "Deterministic seed locking and immutable logs ensure fully reproducible experimental science."
        ],
        labCorrelation: "Official MBU Laboratory Observation Record Sheet & Assessment Rubric"
      }
    ]
  },
  "mod-2": {
    code: "DS-MOD-102",
    title: "Module 2: Data Extraction",
    category: "Data Extraction",
    leadSummary: "Protocols and engineering pipelines for acquiring, extracting, and ingesting data across heterogeneous sources: relational databases via SQL, RESTful web APIs with authentication, HTML web scraping with BeautifulSoup, semi-structured file parsing, and ethical robot compliance.",
    topics: [
      {
        number: 1,
        title: "Data Acquisition Pipelines: Primary, Secondary & Third-Party Streaming Sources",
        unit: "Unit I: Relational Database Connectivity & SQL Query Extraction",
        concept: `Data acquisition constitutes the critical entry point of all modern data engineering pipelines. Telemetry originates from diverse upstream architectures:

1. Data Source Taxonomy:
   - Primary Sources: First-party transactional application logs, IoT telemetry, clickstreams, and telemetry generated directly by institutional platforms.
   - Secondary Sources: Curated internal data warehouses, operational SQL stores, and replicated read-replicas.
   - Third-Party & Streaming: External vendor APIs, public open-data portals, message brokers (Kafka, RabbitMQ), and streaming webhooks.
2. Ingestion Paradigms:
   - Batch Ingestion: Periodic scheduled ETL/ELT pipelines processing historical windows (hourly, nightly).
   - Micro-Batch & Streaming: Event-driven ingestion consuming streaming message records with sub-second latency.
3. Ingestion Reliability:
   - Implementing schema validation, idempotent deduplication, dead-letter queues for corrupted records, and cryptographic payload integrity checks.`,
        codeExample: `# Simulated Data Ingestion Pipeline with Schema Validation
import json
import time

def ingest_event(payload_str):
    """Validates schema, checks timestamp freshness, and extracts records."""
    try:
        record = json.loads(payload_str)
        required_fields = {'event_id', 'timestamp', 'sensor_val'}
        if not required_fields.issubset(record.keys()):
            raise ValueError(f"Missing required schema keys: {required_fields - record.keys()}")
        print(f"Successfully ingested event {record['event_id']}: Value = {record['sensor_val']}")
        return True
    except Exception as e:
        print(f"Quarantined corrupted payload: {e}")
        return False

# Ingest sample telemetry
valid_json = '{"event_id": "EVT-101", "timestamp": 1775892100, "sensor_val": 42.8}'
invalid_json = '{"event_id": "EVT-102"}'
ingest_event(valid_json)
ingest_event(invalid_json)`,
        keyPoints: [
          "Data acquisition extracts raw records across primary, secondary, and streaming channels.",
          "Batch pipelines process historical intervals; streaming pipelines ingest low-latency events.",
          "Ingestion gateways must enforce schema validation and quarantine corrupted payloads.",
          "Idempotency ensures duplicate data transmissions do not pollute downstream storage."
        ],
        labCorrelation: "Experiment 2: Data Acquisition Pipelines & Architecture"
      },
      {
        number: 2,
        title: "Relational Database Extraction: SQL Queries, SQLite Connections & DataFrame Loading",
        unit: "Unit I: Relational Database Connectivity & SQL Query Extraction",
        concept: `Relational databases enforce strict ACID transactions and relational integrity. Python applications extract tabular datasets through database drivers and SQL interfaces.

1. SQLite Database Architecture:
   - Self-contained, serverless, zero-configuration SQL database engine embedded directly inside Python via the standard library sqlite3 module.
   - Supports both in-memory databases (:memory:) for lightning-fast testing and disk-persisted .db files.
2. Relational Query Structure:
   - SELECT, WHERE (filtering), GROUP BY (aggregations), HAVING (group filtering), and JOIN (combining normalized entities).
3. Security & Parameterization:
   - Crucial security mandate: Always use parameterized queries (?) rather than Python f-strings to prevent catastrophic SQL Injection vulnerabilities.
4. Pandas Integration:
   - pd.read_sql_query(sql, conn) automates cursor execution, schema parsing, and conversion into typed DataFrames.`,
        codeExample: `# SQLite Connection, Parameterized SQL Query & Pandas Ingestion
import sqlite3
import pandas as pd

# 1. Establish database connection in memory
conn = sqlite3.connect(':memory:')
cursor = conn.cursor()

# 2. Schema initialization
cursor.execute('''CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    department TEXT,
    salary REAL
)''')

# 3. Secure parameterized insertion
sample_data = [
    (1, 'Alice', 'Engineering', 95000),
    (2, 'Bob', 'Marketing', 68000),
    (3, 'Charlie', 'Engineering', 105000),
    (4, 'Diana', 'Data Science', 110000)
]
cursor.executemany('INSERT INTO employees VALUES (?, ?, ?, ?)', sample_data)
conn.commit()

# 4. Aggregation extraction with Pandas
query = '''
    SELECT department, COUNT(*) as count, AVG(salary) as avg_salary
    FROM employees
    GROUP BY department
    HAVING avg_salary > 70000
'''
df_results = pd.read_sql_query(query, conn)
conn.close()

print("Extracted SQL Aggregation DataFrame:\\n", df_results)`,
        keyPoints: [
          "sqlite3 provides a serverless relational engine built directly into Python.",
          "Never concatenate raw user strings into SQL queries; always use parameterized bindings (?).",
          "pd.read_sql_query() transparently ingests relational query recordsets into DataFrames.",
          "Relational JOIN and GROUP BY operations offload heavy filtering to the database engine."
        ],
        labCorrelation: "Experiment 2 - Task 2A: Structured Data Extraction from SQLite Database with SQL Queries"
      },
      {
        number: 3,
        title: "RESTful API Consumption: HTTP Methods, Response Headers & JSON Data Normalization",
        unit: "Unit II: RESTful Web APIs, JSON/XML Endpoints & Authentication Protocols",
        concept: `REST (Representational State Transfer) APIs provide the dominant architectural protocol for consuming web services and data over HTTP.

1. HTTP Protocol Semantics:
   - GET: Safely retrieve resources without mutating server state.
   - POST: Submit data payloads or complex query payloads to create resources.
   - PUT/PATCH: Full or partial updates to existing records.
   - DELETE: Remove targeted resources.
2. HTTP Response Telemetry & Status Codes:
   - 200 OK: Request succeeded, response body contains payload.
   - 400 Bad Request / 401 Unauthorized / 403 Forbidden: Client errors or credential omissions.
   - 429 Too Many Requests: Rate limiting triggered.
   - 500 Internal Server Error: Remote infrastructure fault.
3. Hierarchical JSON Normalization:
   - APIs return nested JSON dictionaries and lists.
   - pd.json_normalize() flattens hierarchical nested JSON keys into standard tabular columns (e.g., user.address.geo.lat -> user_address_geo_lat).`,
        codeExample: `# REST API Simulation & Nested JSON Normalization
import json
import pandas as pd

# Simulated nested API payload
api_response = {
    "status": 200,
    "page": 1,
    "results": [
        {"id": 101, "name": "Telemetry A", "meta": {"location": "Building 1", "sensor": {"type": "Temperature", "val": 24.5}}},
        {"id": 102, "name": "Telemetry B", "meta": {"location": "Building 2", "sensor": {"type": "Humidity", "val": 65.2}}}
    ]
}

# Normalizing hierarchical nested structures into tabular format
flat_df = pd.json_normalize(api_response['results'], sep='_')
print("Flattened Tabular DataFrame from Nested JSON:\\n", flat_df.to_string())`,
        keyPoints: [
          "REST APIs exchange structured payloads (predominantly JSON) over HTTP methods.",
          "Status codes communicate outcome (200 Success, 401 Auth Error, 429 Rate Limit).",
          "pd.json_normalize() unpacks deeply nested JSON objects into 2D columnar DataFrames.",
          "Always inspect response headers (Content-Type, X-RateLimit) before parsing payloads."
        ],
        labCorrelation: "Experiment 2 - Task 2B: RESTful JSON API Data Consumption & Normalization"
      },
      {
        number: 4,
        title: "API Authentication: API Keys, Bearer Tokens, Rate Limiting & Pagination Handling",
        unit: "Unit II: RESTful Web APIs, JSON/XML Endpoints & Authentication Protocols",
        concept: `Production APIs enforce security controls, access quotas, and pagination mechanisms to manage computational resources.

1. Authentication Schemes:
   - API Key in Headers: Passing x-api-key: <token> in request headers.
   - Bearer Authentication (OAuth 2.0): Passing Authorization: Bearer <jwt_token> in the HTTP Authorization header.
2. Rate Limiting Governance:
   - Servers advertise limits in response headers: X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After.
   - Client applications must implement Exponential Backoff with Jitter: Pausing for 2^attempt + random seconds when receiving HTTP 429.
3. Pagination Architectures:
   - Page/Limit: Requesting ?page=1&limit=50 iteratively until results is empty.
   - Offset/Limit: Requesting ?offset=100&limit=50.
   - Cursor-Based: Passing opaque cursor tokens (?cursor=eyJpZ...) to stream through massive datasets deterministically.`,
        codeExample: `# Automated API Pagination & Header Configuration Simulation
import time

def simulate_paginated_api_harvest(total_records=120, page_size=50):
    all_data = []
    page = 1
    
    while True:
        # Simulate API call with authorization header
        headers = {'Authorization': 'Bearer sample_jwt_token', 'User-Agent': 'MBU-DataScience-Lab/1.0'}
        start_idx = (page - 1) * page_size
        end_idx = min(start_idx + page_size, total_records)
        
        batch = list(range(start_idx, end_idx))
        if not batch:
            break
            
        all_data.extend(batch)
        print(f"Fetched Page {page}: Ingested {len(batch)} records (Total so far: {len(all_data)})")
        page += 1
        
    return all_data

harvested = simulate_paginated_api_harvest()
print(f"Complete Ingestion Complete: {len(harvested)} records gathered.")`,
        keyPoints: [
          "Bearer tokens in the Authorization header provide secure authenticated access.",
          "Rate limiting prevents server overload; clients must respect Retry-After headers.",
          "Exponential backoff prevents repeated hammering of constrained endpoints.",
          "Pagination loops (page, offset, cursor) ensure complete dataset ingestion."
        ],
        labCorrelation: "Experiment 2 - Task 2B: API Authentication & Header Configuration"
      },
      {
        number: 5,
        title: "Web Scraping Protocols: BeautifulSoup, HTML DOM Tree Navigation & Tag Filtering",
        unit: "Unit III: Web Scraping, HTML DOM Parsing & Semi-Structured Data Pipelines",
        concept: `When data is published only as web pages without accessible APIs, automated web scraping parses HTML Document Object Model (DOM) trees into structured tabular datasets.

1. DOM Architecture & Parsing:
   - HTML documents are hierarchical nested trees consisting of tags, attributes, and text nodes.
   - BeautifulSoup parses raw HTML text using fast parsing backends (lxml or html.parser).
2. Traversal & Selection Methods:
   - soup.find('tag', attrs={'class': 'val'}): Finds the first matching DOM element.
   - soup.find_all('tag'): Returns a list of all matching elements.
   - soup.select('div.card > table tr'): Executes standard CSS selectors.
3. Content Extraction & Hygiene:
   - tag.get_text(strip=True): Extracts inner text while stripping whitespace.
   - tag.get('href') / tag['data-id']: Extracts attribute values.
   - Parsing HTML <table> elements into row matrices for direct DataFrame loading.`,
        codeExample: `# BeautifulSoup HTML Parsing & Tabular Extraction
from bs4 import BeautifulSoup
import pandas as pd

html_doc = """
<html>
  <body>
    <table id="labMetrics">
      <thead><tr><th>Task</th><th>Module</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>Task 1A</td><td>Module 1</td><td>Completed</td></tr>
        <tr><td>Task 2A</td><td>Module 2</td><td>Completed</td></tr>
        <tr><td>Task 3A</td><td>Module 3</td><td>In Progress</td></tr>
      </tbody>
    </table>
  </body>
</html>
"""

soup = BeautifulSoup(html_doc, 'html.parser')
table = soup.find('table', {'id': 'labMetrics'})

rows = []
for tr in table.tbody.find_all('tr'):
    cells = [td.get_text(strip=True) for td in tr.find_all('td')]
    rows.append(cells)

scraped_df = pd.DataFrame(rows, columns=['Task', 'Module', 'Status'])
print("Scraped Table Extracted from HTML:\\n", scraped_df)`,
        keyPoints: [
          "BeautifulSoup parses raw HTML strings into navigable hierarchical DOM trees.",
          "CSS selectors (.select()) and tag filtering (.find(), .find_all()) extract targeted elements.",
          "Always strip whitespace and decode HTML entities during text extraction.",
          "HTML <table> rows map cleanly into nested lists for pandas DataFrame construction."
        ],
        labCorrelation: "Experiment 2: HTML Web Scraping & DOM Parsing"
      },
      {
        number: 6,
        title: "Parsing Semi-Structured Data: JSON, XML, CSV, TSV & Unstructured Text Streams",
        unit: "Unit III: Web Scraping, HTML DOM Parsing & Semi-Structured Data Pipelines",
        concept: `Data scientists must ingest diverse file formats ranging from flat delimited text to hierarchical tree structures and unstructured logs.

1. Delimited Flat Files:
   - CSV / TSV: Flat comma/tab separated text; pd.read_csv() handles custom delimiters (sep='\\t'), custom headers, and chunksize streaming for gigabyte-scale files.
2. Extensible Markup Language (XML):
   - Hierarchical tag-delimited documents parsed using Python's xml.etree.ElementTree or lxml, querying elements via XPath expressions.
3. JavaScript Object Notation (JSON):
   - Key-value mappings and arrays parsed via json.loads() and json.dumps().
4. Unstructured Text & Log Streaming:
   - Extracting structured attributes from unstructured log strings using regular expressions (re.findall(), named capture groups).`,
        codeExample: `# Multi-Format Parsing: CSV, JSON & Regex Log Extraction
import json
import re
import pandas as pd
import io

# 1. Delimited text parsing from string stream
csv_data = "id,name,score\\n101,Alice,92\\n102,Bob,85"
df_csv = pd.read_csv(io.StringIO(csv_data))

# 2. Regular expression extraction from server log streams
log_line = "2026-10-12 14:22:10 [INFO] Client 192.168.1.42 latency=45ms status=200"
log_pattern = r"(?P<date>\\d{4}-\\d{2}-\\d{2})\\s(?P<time>\\d{2}:\\d{2}:\\d{2})\\s\\[(?P<level>\\w+)\\]\\sClient\\s(?P<ip>[\\d.]+)\\slatency=(?P<lat>\\d+)ms\\sstatus=(?P<status>\\d+)"
match = re.search(log_pattern, log_line)

print("Parsed CSV DataFrame:\\n", df_csv)
print("\\nParsed Regex Log Telemetry:", match.groupdict())`,
        keyPoints: [
          "CSV/TSV files require explicit delimiter and encoding configuration (UTF-8).",
          "XML documents use hierarchical nodes queried via XPath expressions.",
          "JSON handles nested dictionary mappings parsed via json module.",
          "Regular expressions with named capture groups extract structured tokens from raw text logs."
        ],
        labCorrelation: "Tools Suite: Dataset Inspector & Custom CSV Ingestion"
      },
      {
        number: 7,
        title: "Ethical Data Extraction, Robots.txt Compliance, Error Handling & Network Resiliency",
        unit: "Unit III: Web Scraping, HTML DOM Parsing & Semi-Structured Data Pipelines",
        concept: `Professional data engineering enforces strict ethical conduct, legal compliance, and network resiliency when gathering public web data.

1. The Robots Exclusion Standard (robots.txt):
   - Websites publish a /robots.txt file specifying scraping permissions for search crawlers and user agents.
   - Python's urllib.robotparser parses Disallow, Allow, and Crawl-delay directives.
2. Polite Scraping & Server Courtesy:
   - Identifying user agents: Setting descriptive User-Agent headers with contact email.
   - Throttling: Implementing mandatory sleep intervals (time.sleep()) between consecutive requests to prevent Denial-of-Service (DoS).
3. Network Resiliency & Defensive Programming:
   - Setting explicit timeout limits on all socket connections.
   - Catching network exceptions (requests.exceptions.Timeout, ConnectionError).
   - Retrying transient errors using backoff strategies.`,
        codeExample: `# Ethical Robots.txt Verification & Defensive Request Structure
import urllib.robotparser as rp
import time

def verify_scraping_permission(base_url, target_path, user_agent='*'):
    """Parses robots.txt to verify scraping permissions before requesting."""
    parser = rp.RobotFileParser()
    parser.set_url(f"{base_url.rstrip('/')}/robots.txt")
    try:
        # In actual execution: parser.read()
        print(f"Auditing robots.txt permission for: {target_path}")
        # Simulated verdict
        allowed = True
        return allowed
    except Exception as e:
        print(f"Could not reach robots.txt: {e}")
        return False

can_scrape = verify_scraping_permission("https://example.com", "/public/datasets")
print("Robots.txt Scraping Permitted:", can_scrape)`,
        keyPoints: [
          "Always audit /robots.txt using urllib.robotparser before scraping any web domain.",
          "Include a clear User-Agent header with contact info to maintain server transparency.",
          "Throttle requests with sleep delays to avoid degrading web host performance.",
          "Wrap external network operations in defensive try/except blocks with explicit timeouts."
        ],
        labCorrelation: "Experiment 2: Ethical Web Data Acquisition & Fault Tolerance"
      }
    ]
  },
  "mod-3": {
    code: "DS-MOD-103",
    title: "Module 3: Data Visualization",
    category: "Data Visualization",
    leadSummary: "Visual exploration principles, Matplotlib figure and subplot API architecture, statistical charting with Pandas and Seaborn (line, bar, histogram, KDE density, scatter plots), multi-panel FacetGrid conditioning for categorical data, and modern interactive visualization libraries.",
    topics: [
      {
        number: 1,
        title: "A Brief Matplotlib API Primer (Figure, Axes, Subplots & Artist Hierarchy)",
        unit: "Unit I: Matplotlib Core API Primer, Figure Architectures & Subplot Hierarchies",
        concept: `Matplotlib is the core graphics engine of the scientific Python ecosystem. Its design is based on an explicit Object-Oriented (OO) rendering hierarchy:

1. Object-Oriented Architecture:
   - Figure: The top-level canvas window or image container.
   - Axes: The individual coordinate system bounding box attached to a Figure that hosts plots, ticks, labels, and titles.
   - Subplots: Multi-panel grids generated via fig, axes = plt.subplots(nrows, ncols).
2. The Artist Hierarchy:
   - Every rendered element (lines, circles, text, axis spines, tick marks) is an Artist instance drawn on the canvas backend.
3. Explicit vs. Implicit (pyplot state-machine):
   - plt.plot() operates as a global state-machine tracking the 'current' figure.
   - The explicit OO style (ax.plot()) provides deterministic control over complex multi-panel figure layouts.
4. Exporting High-Resolution Visuals:
   - plt.savefig('figure.png', dpi=300, bbox_inches='tight') produces publication-ready vectors or high-DPI raster images.`,
        codeExample: `# Object-Oriented Matplotlib Subplot Architecture
import matplotlib.pyplot as plt
import numpy as np

# 1. Initialize Figure and 2x1 Axes grid
fig, axes = plt.subplots(2, 1, figsize=(8, 6), sharex=True)

x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# 2. Configure Subplot 1 (Sine)
axes[0].plot(x, y1, color='#0284c7', lw=2, label='Sine Wave')
axes[0].set_title('Trigonometric Signal A: Sine')
axes[0].set_ylabel('Amplitude')
axes[0].grid(True, alpha=0.3)
axes[0].legend(loc='upper right')

# 3. Configure Subplot 2 (Cosine)
axes[1].plot(x, y2, color='#e11d48', lw=2, linestyle='--', label='Cosine Wave')
axes[1].set_title('Trigonometric Signal B: Cosine')
axes[1].set_xlabel('Time (seconds)')
axes[1].set_ylabel('Amplitude')
axes[1].grid(True, alpha=0.3)
axes[1].legend(loc='upper right')

plt.tight_layout()
print("Figure created with 2 Axes panels in Object-Oriented hierarchy.")`,
        keyPoints: [
          "Figure is the canvas container; Axes is the coordinate system containing data plots.",
          "fig, axes = plt.subplots(r, c) enables deterministic multi-panel layout configuration.",
          "All visual objects (lines, text, spines) inherit from the base Artist class.",
          "Always use tight_layout() and specify dpi=300 and bbox_inches='tight' when saving."
        ],
        labCorrelation: "Experiment 5 - Task 5A: Line Plots with Title, Axis Labels, Ticks, Tick Labels, Annotations and Save to File"
      },
      {
        number: 2,
        title: "Plotting with Pandas and Seaborn: Line Plots & Temporal Trend Analysis",
        unit: "Unit II: Statistical Graphics with Pandas & Seaborn (Line, Bar, Histogram, Density & Scatter Plots)",
        concept: `Line plots are ideal for illustrating ordered continuous data, temporal time series, and longitudinal trend trajectories.

1. High-Level Pandas Plotting:
   - Calling df.plot(kind='line') maps DataFrame indexes to the horizontal axis and columnar series to distinct lines, automatically populating the legend.
2. Statistical Line Plots with Seaborn:
   - sns.lineplot(data=df, x='Date', y='Metric', hue='Category') automates aggregation across replicate observations.
   - Automatically computes and shades 95% bootstrap confidence bands around trend lines.
3. Temporal Formatting:
   - Converting date strings to pd.to_datetime() allows Matplotlib to format date ticks cleanly without manual strings.`,
        codeExample: `# Seaborn Line Plot with Automated Confidence Intervals
import seaborn as sns
import pandas as pd
import numpy as np

# Create synthetic time-series with replicate groups
np.random.seed(42)
dates = pd.date_range('2026-01-01', periods=30, freq='D')
data = []
for d in dates:
    for cat in ['Alpha', 'Beta']:
        base = 100 if cat == 'Alpha' else 120
        noise = np.random.normal(0, 5)
        data.append({'Date': d, 'Category': cat, 'Value': base + noise + (d.day * 0.5)})

df_trends = pd.DataFrame(data)

# Summary of trends
print("Longitudinal Series Preview:\\n", df_trends.head(4))
print("\\nSeaborn lineplot maps hue='Category' and automatically calculates confidence intervals.")`,
        keyPoints: [
          "Line plots visualize continuous temporal continuity and longitudinal changes over time.",
          "Pandas df.plot() uses DataFrame index and column labels directly.",
          "Seaborn lineplot() aggregates replicate values and plots shaded 95% bootstrap confidence bands.",
          "Datetime indices allow automated date locator and formatter ticks."
        ],
        labCorrelation: "Experiment 5 - Task 5A & Experiment 6: Longitudinal Time-Series Line Plots & Trend Decomposition"
      },
      {
        number: 3,
        title: "Bar Plots: Categorical Comparisons, Grouped & Stacked Representations",
        unit: "Unit II: Statistical Graphics with Pandas & Seaborn (Line, Bar, Histogram, Density & Scatter Plots)",
        concept: `Bar plots represent discrete categorical levels along one axis and numerical magnitudes or summary statistics along the other.

1. Vertical vs. Horizontal Bar Charts:
   - Vertical bars are standard for small category sets.
   - Horizontal bars (sns.barplot(y='Category')) prevent label collisions when category names are long.
2. Grouped Bar Charts:
   - Subdividing categories using the hue parameter (e.g., comparing Department sales grouped by Year).
3. Stacked Bar Charts:
   - Illustrating part-to-whole compositional proportions using df.plot(kind='bar', stacked=True).
4. Statistical Estimators:
   - Seaborn's barplot calculates an estimator (mean by default) and displays parametric or bootstrap error bars indicating uncertainty.`,
        codeExample: `# Grouped & Stacked Bar Charts
import pandas as pd
import seaborn as sns

data = {
    'Department': ['DS', 'DS', 'AI', 'AI', 'Cyber', 'Cyber'],
    'Gender': ['F', 'M', 'F', 'M', 'F', 'M'],
    'Headcount': [45, 55, 40, 60, 30, 70]
}
df_bar = pd.DataFrame(data)

# Cross-tabulation for stacked plotting
pivot_table = df_bar.pivot(index='Department', columns='Gender', values='Headcount')
print("Pivoted Cross-Tabulation for Stacked Bars:\\n", pivot_table)
print("\\nGrouped bar plots compare sub-groups; stacked bars illustrate compositional shares.")`,
        keyPoints: [
          "Bar plots display numerical comparisons across discrete categorical factor levels.",
          "Use horizontal bar plots when category labels are long to maintain readability.",
          "Grouped bar charts compare sub-groups side-by-side using semantic hue encodings.",
          "Stacked bar charts visualize compositional proportions summing to a total."
        ],
        labCorrelation: "Experiment 5 - Task 5B: Categorical Comparisons via Grouped & Stacked Bar Charts"
      },
      {
        number: 4,
        title: "Histograms and Density Plots (Kernel Density Estimation & Empirical Distributions)",
        unit: "Unit II: Statistical Graphics with Pandas & Seaborn (Line, Bar, Histogram, Density & Scatter Plots)",
        concept: `Understanding the empirical distribution of continuous features is essential for exploratory data analysis.

1. Histograms:
   - Binning continuous observations into non-overlapping intervals and counting frequency occurrences.
   - Binning parameter selection (Sturges' rule, Freedman-Diaconis rule) dictates resolution.
2. Kernel Density Estimation (KDE):
   - Overcomes discrete bin boundary artifacts by centering a smooth Gaussian kernel over each data point.
   - Generates a continuous, differentiable probability density function whose area integrates to 1.0.
3. Combined Visualizations:
   - sns.histplot(df['Score'], kde=True, stat='density') simultaneously displays discrete empirical bins alongside the smooth theoretical KDE curve.`,
        codeExample: `# Histogram & KDE Density Estimation
import numpy as np
import pandas as pd

# Generate bimodal distribution
np.random.seed(42)
group1 = np.random.normal(65, 8, 300)
group2 = np.random.normal(85, 6, 200)
scores = np.concatenate([group1, group2])

df_dist = pd.DataFrame({'Score': scores})
counts, edges = np.histogram(scores, bins=10)

print(f"Bimodal Dataset: N={len(scores)} | Mean={scores.mean():.2f} | Std={scores.std():.2f}")
print("Frequency Counts across 10 Bins:", counts)
print("KDE smooths these discrete bins into a continuous probability curve.")`,
        keyPoints: [
          "Histograms count observations within discrete, non-overlapping bins.",
          "Kernel Density Estimation (KDE) fits smooth continuous probability curves over data.",
          "Freedman-Diaconis binning balances bias and variance against outliers.",
          "Visual inspection exposes unimodal, bimodal, skewed, and heavy-tailed distribution shapes."
        ],
        labCorrelation: "Experiment 5 - Task 5C: Empirical Distribution Modeling via Histograms & KDE Density"
      },
      {
        number: 5,
        title: "Scatter Plots: Bivariate Correlations, Bubble Sizes & Regression Trends",
        unit: "Unit II: Statistical Graphics with Pandas & Seaborn (Line, Bar, Histogram, Density & Scatter Plots)",
        concept: `Scatter plots display pairwise continuous observations on Cartesian coordinates, revealing bivariate correlations, clusters, and functional relationships.

1. Bivariate Correlation Analysis:
   - Visualizing linear associations, heteroscedasticity, non-linear relationships, and isolated outlier points.
2. Multi-Dimensional Encodings:
   - Color / Hue: Represents a third categorical or continuous variable.
   - Size (Bubble Plot): Represents a fourth magnitude variable via marker diameter.
   - Style: Differentiates categories via marker shapes (circles, triangles, crosses).
3. Regression Overlay:
   - sns.regplot() fits Ordinary Least Squares (OLS) regression lines with shaded 95% confidence intervals.
4. Overplotting Solutions:
   - When plotting dense datasets (N > 10,000), use alpha transparency, jittering, or hexagonal 2D binning (plt.hexbin).`,
        codeExample: `# Bivariate Scatter & Linear Regression Fitting
import pandas as pd
import numpy as np

np.random.seed(42)
exp = np.linspace(1, 15, 50)
salary = 35000 + (exp * 6500) + np.random.normal(0, 8000, 50)
projects = np.random.randint(2, 12, 50)

df_scatter = pd.DataFrame({'Experience': exp, 'Salary': salary, 'Projects': projects})

# Correlation analysis
corr = df_scatter['Experience'].corr(df_scatter['Salary'])
print(f"Bivariate Pearson Correlation: r = {corr:.3f}")
print("Scatter plots map continuous pairs; regression lines show central linear trends.")`,
        keyPoints: [
          "Scatter plots reveal bivariate associations, non-linear patterns, and cluster structures.",
          "Bubble charts encode additional variables via marker size and color hue.",
          "sns.regplot() overlays linear regression models with 95% confidence bands.",
          "Alpha transparency and hexbinning mitigate overplotting in dense datasets."
        ],
        labCorrelation: "Experiment 5 - Task 5D: Bivariate Scatter Analysis & Linear Regression Modeling"
      },
      {
        number: 6,
        title: "Facet Grids and Categorical Data (FacetGrid, Catplot, Box & Violin Plots)",
        unit: "Unit III: Multi-Panel Facet Grids, Categorical Analytics & Modern Interactive Visualisation Toolkits",
        concept: `Multivariate analysis frequently requires conditioning distributions across multiple discrete categorical subsets (small multiples).

1. FacetGrid Architecture:
   - sns.FacetGrid(df, col='Factor1', row='Factor2') creates a synchronized matrix of subplots filtered by category levels.
2. Unified Catplot Interface:
   - sns.catplot() provides a single high-level API for categorical distribution figures.
3. Box Plots vs. Violin Plots:
   - Box Plot: Visualizes the five-number summary (Min, Q1, Median, Q3, Max) with explicit outlier points beyond 1.5 * IQR whiskers.
   - Violin Plot: Combines a box plot with mirrored KDE density curves, exposing multi-modality that box plots conceal.
4. Strip and Swarm Plots:
   - Display raw observation points jittered across categories to reveal sample size density.`,
        codeExample: `# Multi-Category Analysis & Box/Violin Representations
import pandas as pd
import numpy as np

# Synthetic multi-department salaries
np.random.seed(42)
departments = ['Data Science', 'Software', 'DevOps']
data = []
for d in departments:
    mean_sal = 95000 if d == 'Data Science' else (85000 if d == 'Software' else 80000)
    sals = np.random.normal(mean_sal, 12000, 40)
    for s in sals:
        data.append({'Dept': d, 'Salary': s})

df_facets = pd.DataFrame(data)
q_summary = df_facets.groupby('Dept')['Salary'].describe()

print("Departmental Distribution Summary:\\n", q_summary[['mean', 'std', '50%', 'min', 'max']])
print("\\nFacetGrids split these distributions into dedicated comparative panels.")`,
        keyPoints: [
          "FacetGrid produces small multiples conditioning multivariate data across discrete categories.",
          "sns.catplot() unifies box, violin, strip, swarm, and bar plots into a single interface.",
          "Box plots communicate quartiles and outliers; violin plots expose multi-modal densities.",
          "Swarm plots plot all raw observation points without overlapping markers."
        ],
        labCorrelation: "Experiment 5 - Task 5E: Multi-Panel FacetGrid Conditioning & Box/Violin Plots"
      },
      {
        number: 7,
        title: "Other Python Visualisation Tools: Plotly Interactive Figures, Bokeh, Altair & Folium",
        unit: "Unit III: Multi-Panel Facet Grids, Categorical Analytics & Modern Interactive Visualisation Toolkits",
        concept: `Beyond static figures, modern data science demands interactive web dashboards, declarative grammars, and geospatial cartography.

1. Plotly & Plotly Express:
   - Generates interactive, browser-rendered D3.js and WebGL visualizations.
   - Supports hover tooltips, zoom, pan, category toggles, 3D surface rotations, and export to standalone HTML.
2. Bokeh:
   - Engineered for large-scale streaming datasets and interactive analytics dashboards rendered directly on HTML5 Canvas.
3. Altair (Vega-Lite Grammar):
   - Declarative grammar of graphics defining visual representations through clean, structured JSON specifications.
4. Folium:
   - Python wrapper for Leaflet.js rendering interactive geospatial maps, Choropleths, tile layers, and marker clusters.`,
        codeExample: `# Declarative & Interactive Specification Simulation
# Simulated Plotly JSON structure
interactive_spec = {
    "type": "scatter",
    "x": [1, 2, 3, 4, 5],
    "y": [10, 25, 18, 32, 45],
    "mode": "lines+markers",
    "marker": {"color": "#38bdf8", "size": 8},
    "layout": {
        "title": "Interactive Client Dashboard",
        "hovermode": "closest"
    }
}

print("Interactive Chart Specification (Plotly / Vega Grammar):")
print(f"Chart Type: {interactive_spec['type']} | Mode: {interactive_spec['mode']}")
print("Enables real-time client zoom, pan, hover tooltips, and HTML export.")`,
        keyPoints: [
          "Plotly provides interactive web graphics with hover tooltips, pan, and zoom.",
          "Bokeh renders large streaming datasets directly onto browser HTML5 Canvas.",
          "Altair provides declarative grammar of graphics specifications in pure JSON.",
          "Folium integrates Leaflet.js for interactive geospatial maps and marker clusters."
        ],
        labCorrelation: "Tools Suite: Interactive Chart Engine & Telemetry HUD"
      }
    ]
  },
  "mod-4": {
    code: "DS-MOD-104",
    title: "Module 4: Statistical Thinking",
    category: "Statistical Thinking",
    leadSummary: "Foundational statistical thinking and empirical data analysis: empirical distributions, histogram representation, outlier identification and summary statistics, variance and spread metrics, Probability Mass Functions (PMF) and the class size paradox, DataFrame indexing and filtering, Cumulative Distribution Functions (CDF), percentile-based metrics, random number sampling, and analytic distribution modeling.",
    topics: [
      {
        number: 1,
        title: "Distributions: Representing and Plotting Histograms, Identifying Outliers & Summarizing Distributions",
        unit: "Unit I: Empirical Distributions, Histogram Binning, Outliers & Summary Variance",
        concept: `Statistical thinking begins with representing observed variations across samples. An empirical distribution describes the frequency with which different values appear in a dataset.

1. Representing Distributions via Histograms:
   - Dividing the measurement space into contiguous bins and computing frequency counts.
   - Frequency Histograms vs. Normalized Density Histograms (where area sums to 1.0).
2. Binning Mechanics & Bias:
   - Selecting appropriate bin widths: Overly wide bins conceal local features; overly narrow bins introduce noisy sample fluctuations.
   - Freedman-Diaconis rule: bin_width = 2 * IQR * n^(-1/3).
3. Outlier Identification & Data Hygiene:
   - Tukey's Fences: Outliers lie beyond Q1 - 1.5 * IQR or Q3 + 1.5 * IQR.
   - Distinguishing genuine extreme natural events from data entry errors or instrument faults.
4. Summarizing Distributions:
   - Characterizing distributions by location (center), dispersion (spread), skewness (asymmetry), and modality.`,
        codeExample: `# Empirical Distribution Construction, Binning & Outlier Detection
import numpy as np
import pandas as pd

np.random.seed(42)
data = np.concatenate([np.random.normal(50, 10, 200), np.array([5, 98, 105])]) # injected outliers

q25, q75 = np.percentile(data, [25, 75])
iqr = q75 - q25
lower_fence = q25 - 1.5 * iqr
upper_fence = q75 + 1.5 * iqr

outliers = data[(data < lower_fence) | (data > upper_fence)]
clean_data = data[(data >= lower_fence) & (data <= upper_fence)]

print(f"Sample Size: N={len(data)} | Outliers Detected: {len(outliers)}")
print(f"Tukey Fences: [{lower_fence:.2f}, {upper_fence:.2f}]")
print(f"Identified Outlier Values: {outliers.tolist()}")`,
        keyPoints: [
          "An empirical distribution maps observed values to their frequency of occurrence.",
          "Freedman-Diaconis binning balances smoothing against sample noise.",
          "Tukey's Fences (1.5 * IQR) objectively identify potential distribution outliers.",
          "Summary statistics condense complex empirical distributions into interpretable metrics."
        ],
        labCorrelation: "Experiment 1 - Task 1B & Experiment 5 - Task 5C: Empirical Distribution Modeling via Histograms"
      },
      {
        number: 2,
        title: "Variance, Standard Deviation, Spread Metrics & Reporting Statistical Results",
        unit: "Unit I: Empirical Distributions, Histogram Binning, Outliers & Summary Variance",
        concept: `Quantifying statistical dispersion is as vital as measuring central tendency. Without measuring variance, point estimates can be dangerously misleading.

1. Variance (s²):
   - The average squared distance of data points from the sample mean: s² = Σ (x_i - x̄)² / (n - 1).
   - Bessel's correction uses n - 1 in the denominator to correct for downward bias when estimating population variance from a sample.
2. Standard Deviation (s):
   - Square root of variance, returning dispersion back into original measurement units.
3. Robust Non-Parametric Spread Metrics:
   - Median Absolute Deviation (MAD): MAD = median(|x_i - median(x)|). Unaffected by extreme outliers.
   - Interquartile Range (IQR): Distance between 75th and 25th percentiles.
4. Professional Statistical Reporting:
   - Never report the mean in isolation. Always report point estimate ± dispersion and sample size (e.g., Mean: 45.2 ± 6.8 [N=150] or Median: 44.0 [IQR: 12.5]).`,
        codeExample: `# Sample Variance, Standard Deviation & Robust Dispersion
import numpy as np

telemetry = np.array([22.4, 23.1, 22.8, 24.5, 22.9, 23.0, 38.5]) # contains outlier 38.5

mean_val = np.mean(telemetry)
sample_var = np.var(telemetry, ddof=1) # Bessel correction ddof=1
sample_std = np.std(telemetry, ddof=1)
median_val = np.median(telemetry)
mad_val = np.median(np.abs(telemetry - median_val))

print(f"Standard Metrics (Sensitive to Outliers): Mean = {mean_val:.2f}, Std = {sample_std:.2f}")
print(f"Robust Metrics (Resistant to Outliers):   Median = {median_val:.2f}, MAD = {mad_val:.2f}")
print(f"Professional Report: {median_val:.1f} (MAD: {mad_val:.1f}, N={len(telemetry)})")`,
        keyPoints: [
          "Variance measures average squared distance from the mean.",
          "Bessel's correction (n - 1 denominator) provides an unbiased sample variance estimator.",
          "Standard deviation restores variance into original measurement units.",
          "Always report sample size N and dispersion alongside point estimates."
        ],
        labCorrelation: "Experiment 1 - Task 1B: Descriptive Statistics & Diagnostic Telemetry"
      },
      {
        number: 3,
        title: "Probability Mass Functions (PMF): Definition, Plotting PMFs & The Class Size Paradox",
        unit: "Unit II: Discrete Probability Models, Probability Mass Functions & Paradoxical Sampling",
        concept: `A Probability Mass Function (PMF) maps discrete outcomes to their relative probabilities, normalizing frequency counts by sample size N so that Σ P(x) = 1.0.

1. PMF Normalization:
   - Unlike raw frequency counts, PMFs allow fair comparison of distributions between samples of differing sizes.
2. The Class Size Paradox (Observer Perspective Bias):
   - Suppose a university has 35 small classes of 10 students and 5 large classes of 100 students.
   - From the Dean's perspective (unbiased PMF), average class size is: (35*10 + 5*100) / 40 = 21.25 students.
   - However, from a Student's perspective, 500 students experience a class of 100, while only 350 experience a class of 10!
   - The Student-perceived average is: (350*10 + 500*100) / 850 = 62.94 students!
3. Mathematical Formulation of Observer Bias:
   - P_biased(x) = x * P(x) / μ_unbiased.
   - Any sampling scheme where larger groups have higher probability of observation experiences this upward bias.`,
        codeExample: `# PMF Calculation & The Class Size Paradox
import pandas as pd

class_sizes = [10]*35 + [100]*5 # 35 classes of 10, 5 classes of 100
series = pd.Series(class_sizes)

# 1. Unbiased PMF (Dean's perspective)
pmf_unbiased = series.value_counts(normalize=True).sort_index()
dean_mean = sum(size * prob for size, prob in pmf_unbiased.items())

# 2. Biased PMF (Student's perspective)
pmf_biased = {}
for size, prob in pmf_unbiased.items():
    pmf_biased[size] = size * prob
norm_const = sum(pmf_biased.values())
pmf_biased = {k: v / norm_const for k, v in pmf_biased.items()}
student_mean = sum(size * prob for size, prob in pmf_biased.items())

print("Unbiased PMF (Dean):", dict(pmf_unbiased), f"-> Average: {dean_mean:.2f}")
print("Biased PMF (Student):", {k: round(v, 3) for k, v in pmf_biased.items()}, f"-> Average: {student_mean:.2f}")`,
        keyPoints: [
          "A PMF normalizes discrete counts into probabilities that sum to 1.0.",
          "PMFs enable direct comparison of samples with differing sizes.",
          "The Class Size Paradox demonstrates that observer-based sampling overrepresents larger entities.",
          "Biased distributions can be computed mathematically: P_biased(x) = x * P(x) / μ."
        ],
        labCorrelation: "Tools Suite & Custom Statistical Thinking Workspace"
      },
      {
        number: 4,
        title: "DataFrame Indexing, Conditional Masking & Exploratory Cohort Slicing",
        unit: "Unit I: Empirical Distributions, Histogram Binning, Outliers & Summary Variance",
        concept: `Exploratory data analysis requires isolating specific population sub-cohorts (e.g., treatment vs. control, first-born infants vs. non-first-borns) to test hypotheses.

1. Vectorized Boolean Masks:
   - Combining conditions using & (bitwise AND), | (bitwise OR), and ~ (bitwise NOT).
   - Parentheses are mandatory around each clause due to Python operator precedence: (df['Age'] > 20) & (df['Score'] >= 85).
2. Explicit Indexing with .loc[]:
   - Slicing rows and columns simultaneously using label coordinates: df.loc[mask, ['Feature1', 'Feature2']].
3. Cohort Comparison:
   - Extracting complementary cohorts and comparing their distributions, means, and percentiles to establish whether significant differences exist.`,
        codeExample: `# Cohort Slicing & Comparative Group Telemetry
import pandas as pd
import numpy as np

np.random.seed(42)
df_cohort = pd.DataFrame({
    'Cohort': np.random.choice(['Control', 'Treatment'], 100),
    'Age': np.random.randint(18, 65, 100),
    'Outcome': np.random.normal(50, 10, 100)
})

# Isolate Treatment cohort aged over 30
mask = (df_cohort['Cohort'] == 'Treatment') & (df_cohort['Age'] > 30)
treatment_over_30 = df_cohort.loc[mask, 'Outcome']
control_all = df_cohort.loc[df_cohort['Cohort'] == 'Control', 'Outcome']

print(f"Treatment (>30) Cohort: N={len(treatment_over_30)} | Mean Outcome: {treatment_over_30.mean():.2f}")
print(f"Control Cohort:         N={len(control_all)} | Mean Outcome: {control_all.mean():.2f}")`,
        keyPoints: [
          "Boolean masking enables high-speed vectorized row filtering.",
          "Always wrap compound conditions in parentheses: (cond1) & (cond2).",
          ".loc[mask, cols] provides safe in-place selection without chained indexing warnings.",
          "Cohort slicing isolates experimental groups for comparative statistical inference."
        ],
        labCorrelation: "Experiment 1 - Task 1B & Experiment 4: Hierarchical Slicing & Grouping"
      },
      {
        number: 5,
        title: "Cumulative Distribution Functions (CDF): Limits of PMFs, Representing CDFs & Empirical Probabilities",
        unit: "Unit III: Cumulative Distribution Functions, Percentile Metrics & Distribution Modeling",
        concept: `While PMFs work well for discrete variables with small ranges, they break down for continuous variables or large datasets where every value appears only once. The Cumulative Distribution Function (CDF) solves this limitation.

1. Limits of PMFs & Histograms:
   - As sample size increases or continuous precision increases, probability mass spreads thinly across hundreds of values, resulting in noisy, unreadable PMFs.
   - Histograms introduce arbitrary bin boundary subjectivity.
2. The Cumulative Distribution Function (CDF):
   - Defined as: CDF(x) = P(X ≤ x).
   - Monotonically non-decreasing step function mapping data values x to cumulative probabilities in [0.0, 1.0].
3. Empirical CDF (ECDF) Calculation:
   - Sort N observations in ascending order: x_(1) ≤ x_(2) ≤ ... ≤ x_(n).
   - Assign cumulative probability i / N to each sorted observation x_(i).
4. Direct Probability Lookups:
   - Median: Value where CDF(x) = 0.5.
   - Interquartile Range: Range between CDF(x) = 0.25 and CDF(x) = 0.75.
   - Percentiles: Percentile rank of value x is simply CDF(x) * 100.`,
        codeExample: `# Empirical Cumulative Distribution Function (ECDF) Construction
import numpy as np

def compute_ecdf(data):
    """Computes sorted values and cumulative probabilities for an ECDF."""
    sorted_vals = np.sort(data)
    n = len(sorted_vals)
    cum_probs = np.arange(1, n + 1) / n
    return sorted_vals, cum_probs

sample_weights = np.array([55, 62, 68, 70, 74, 78, 82, 85, 90, 95])
x_ecdf, y_ecdf = compute_ecdf(sample_weights)

# Lookup: Probability of weight <= 75 kg
prob_under_75 = np.mean(sample_weights <= 75)
print("ECDF Quantile Mapping:")
for x, y in zip(x_ecdf[::2], y_ecdf[::2]):
    print(f"  P(X <= {x}) = {y:.2f} ({y*100:.0f}th percentile)")
print(f"Direct Lookup: P(Weight <= 75kg) = {prob_under_75:.2f}")`,
        keyPoints: [
          "PMFs break down for continuous data where observations are unique.",
          "CDF maps value x to cumulative probability P(X ≤ x) in range [0, 1].",
          "ECDF sorts data and assigns rank i / N, eliminating arbitrary binning.",
          "Visual ECDF curves allow immediate determination of medians, percentiles, and tail risks."
        ],
        labCorrelation: "Tools Suite: Statistical Metric Calculator & Custom ECDF Module"
      },
      {
        number: 6,
        title: "Percentile-Based Statistics, Random Numbers, Sampling & Comparing Percentile Marks",
        unit: "Unit III: Cumulative Distribution Functions, Percentile Metrics & Distribution Modeling",
        concept: `Percentiles provide scale-invariant ranking of observations and enable standardized comparisons across disparate metrics.

1. Percentile Rank vs. Percentile:
   - Percentile Rank: The percentage of scores in a distribution that a given value is greater than or equal to: Percentile_Rank(x) = 100 * CDF(x).
   - Percentile (Inverse CDF / Quantile): Given a percentage p ∈ [0, 100], returns the corresponding value x.
2. Standardized Comparisons:
   - Raw scores across tests with differing grading scales (e.g. 42/50 vs. 88/100) cannot be compared directly; percentile ranks standardize them fairly.
3. Pseudo-Random Number Generation:
   - Generating uniform random floats in [0, 1] using Mersenne Twister algorithms (np.random.random()).
4. Inverse Transform Sampling (Monte Carlo Simulation):
   - By feeding uniform random values into a distribution's inverse CDF, we can simulate synthetic random variables from any arbitrary mathematical distribution.`,
        codeExample: `# Percentile Ranking & Inverse Transform Sampling
import numpy as np
from scipy import stats

exam_scores = np.array([45, 52, 60, 68, 72, 75, 80, 84, 88, 92, 96])

# 1. Percentile Rank lookup
score = 80
rank = stats.percentileofscore(exam_scores, score)

# 2. Inverse CDF lookup (Score at 90th percentile)
score_90th = np.percentile(exam_scores, 90)

# 3. Monte Carlo random sampling
np.random.seed(42)
synthetic_sample = np.random.choice(exam_scores, size=5, replace=True)

print(f"Score {score} has Percentile Rank: {rank:.1f}%")
print(f"90th Percentile Cutoff Score:     {score_90th:.1f}")
print("Simulated Monte Carlo Resample:  ", synthetic_sample.tolist())`,
        keyPoints: [
          "Percentile rank maps values to percentages [0, 100] indicating relative standing.",
          "Inverse CDF (quantile) computes the value corresponding to a desired probability.",
          "Percentile marks standardize comparisons across differing test scales.",
          "Inverse transform sampling generates random variables from target distributions."
        ],
        labCorrelation: "Tools Suite: ML & Metric Calculator (Percentile & Critical Telemetry)"
      },
      {
        number: 7,
        title: "Modelling Distributions: Analytic Distributions, Exponential, Normal, Pareto & Model Validation",
        unit: "Unit III: Cumulative Distribution Functions, Percentile Metrics & Distribution Modeling",
        concept: `Analytic distributions are mathematical abstractions characterized by a small set of parameters that model real-world phenomena.

1. Canonical Distribution Families:
   - Normal (Gaussian) Distribution: Models sums of independent random variables (Central Limit Theorem); defined by mean μ and standard deviation σ.
   - Exponential Distribution: Models inter-arrival times between Poisson process events; defined by rate parameter λ. CDF: 1 - e^(-λx).
   - Pareto Distribution: Models wealth distribution, power laws, and 80/20 phenomena; characterized by shape α and scale x_m.
2. Model Parameter Estimation:
   - Maximum Likelihood Estimation (MLE): Finding parameters that maximize the probability of observing sample data.
3. Model Validation & Goodness-of-Fit:
   - Normal Probability (Q-Q) Plots: Plotting empirical sample quantiles against theoretical standard Gaussian quantiles; linearity confirms Gaussianity.
   - Kolmogorov-Smirnov Test (KS Test): Computes maximum vertical divergence between empirical CDF and theoretical analytic CDF.`,
        codeExample: `# Analytic Distribution Fitting & Kolmogorov-Smirnov Validation
import numpy as np
from scipy import stats

np.random.seed(42)
# Generate data from an Exponential distribution
true_rate = 0.5
sample = np.random.exponential(scale=1/true_rate, size=300)

# 1. Fit Exponential model via MLE
loc_fit, scale_fit = stats.expon.fit(sample, floc=0)
fitted_rate = 1 / scale_fit

# 2. Validate model with Kolmogorov-Smirnov test
ks_stat, p_value = stats.kstest(sample, 'expon', args=(0, scale_fit))

print(f"True Lambda: {true_rate:.2f} | MLE Fitted Lambda: {fitted_rate:.2f}")
print(f"Kolmogorov-Smirnov Test: D-statistic = {ks_stat:.4f}, p-value = {p_value:.4f}")
print("Model Goodness-of-Fit Validated: Fail to reject null hypothesis (p > 0.05)." if p_value > 0.05 else "Model Rejected.")`,
        keyPoints: [
          "Analytic distributions mathematically compress empirical complexity into parameters.",
          "Normal distribution models additive systems; Exponential models inter-arrival times.",
          "Pareto distribution models heavy-tailed power-law phenomena.",
          "Normal Q-Q plots and Kolmogorov-Smirnov tests validate goodness-of-fit against theoretical models."
        ],
        labCorrelation: "Experiment 5 - Task 5C & Tools Suite: Statistical Modeling Engine"
      }
    ]
  }
};

// Mohan Babu University (MBU) - Data Science Digital Lab Library

export const INITIAL_PROFILE = {
  name: "M. Pradyumna Devi",
  id: "24102A030078",
  branch: "Data Science",
  section: "Section - 2",
  faculty: "Bosu Babu Sambana",
  designation: "Assistant Professor",
  avatarUrl: "/student-profile.jpg",
  githubUrl: "https://github.com/pradyumna-devi",
  linkedinUrl: "https://linkedin.com/in/pradyumna-devi",
  portfolioUrl: "https://pradyumna-devi.dev",
  email: "devi.pradyumna@mbu.asia",
  kaggleUrl: "https://kaggle.com/pradyumnadevi",
  leetcodeUrl: "https://leetcode.com/pradyumna_devi",
  bio: "Department of Data Science scholar at Mohan Babu University. Passionate about Time Series Econometrics, Deep Learning, Statistical Machine Learning, and Big Data Engineering.",
  resumeUrl: "#",
  resumeName: "M_Pradyumna_Devi_Resume.pdf"
};

export const INITIAL_EXPERIMENTS = [
  {
    id: "exp-1",
    number: "1",
    title: "Introduction to Data Science & Tabular Computing",
    category: "Introduction to Data Science",
    previewDuration: "08:30",
    videoThumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    previewVideoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
    description: "Explore core data science foundations: vector operations with NumPy, creating and manipulating Pandas Series & DataFrames, and computing descriptive statistics.",
    tags: ["NumPy", "Pandas", "Python", "Data Science", "Statistics"],
    githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/tree/main/experiments/exp-1-introduction_to_data_science_t",
    vivaQuestions: [
      {
            "q": "What is array broadcasting in NumPy and what are the broadcasting rules?",
            "a": "Broadcasting allows NumPy to perform arithmetic operations on arrays of different shapes without copying data. Rule 1: If arrays have different rank, prepend 1s to the smaller shape. Rule 2: Arrays with size 1 along a dimension stretch to match the other array's size along that dimension.",
            "concept": "NumPy Vectorization & Memory Efficiency"
      },
      {
            "q": "How do loc[] and iloc[] differ in Pandas indexing?",
            "a": "loc[] is label-based indexing (uses index names and column labels), inclusive of start and end. iloc[] is integer position-based indexing (0-indexed integers), exclusive of the endpoint, similar to Python list slicing.",
            "concept": "Pandas Indexing Mechanisms"
      },
      {
            "q": "Why are vectorized NumPy operations faster than traditional Python loops?",
            "a": "NumPy arrays are stored in contiguous memory blocks as homogeneous C data types. Vectorized operations run pre-compiled optimized C/Fortran SIMD CPU instructions without dynamic Python type checking and interpreter loop overhead.",
            "concept": "High-Performance Computing"
      }
],
    subTasks: [
      {
        letter: "A",
        codeId: "1A",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-1-introduction_to_data_science_t/task_1a_numpy_vector_arrays_mathematical_co.py",
        title: "NumPy Vector Arrays & Mathematical Computations",
        duration: "06:00 min",
        videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
        aim: "To create N-dimensional NumPy arrays and demonstrate vectorized mathematical operations, broadcasting, and slice indexing.",
        syntax: `np.array(object)
np.mean(arr), np.std(arr)
arr[arr > condition]`,
        concept: "Aim: To create N-dimensional NumPy arrays and demonstrate vectorized mathematical operations, broadcasting, and slice indexing.\n\nKey Concepts:\n• NumPy provides high-performance multidimensional arrays (ndarray)\n• Vectorized operations perform element-wise arithmetic without explicit loops\n• Slicing and statistical aggregations form the core computational layer of Data Science",
        code: `import numpy as np

# 1. Array creation & shape inspection
data = np.array([12, 18, 25, 30, 42, 55, 63, 78, 85, 92])
print("Original Array:")
print(data)

# 2. Vectorized operations & broadcasting
squared = data ** 2
standardized = (data - np.mean(data)) / np.std(data)

print("\\nVectorized Mean:", np.mean(data))
print("Standard Deviation:", round(float(np.std(data)), 2))
print("Standardized Z-Scores:")
print(np.round(standardized, 2))

# 3. Boolean masking & filtering
high_values = data[data > 50]
print("\\nFiltered Elements > 50:")
print(high_values)`,
        output: `Original Array:
[12 18 25 30 42 55 63 78 85 92]

Vectorized Mean: 50.0
Standard Deviation: 27.24
Standardized Z-Scores:
[-1.39 -1.17 -0.92 -0.73 -0.29  0.18  0.48  1.03  1.28  1.54]

Filtered Elements > 50:
[55 63 78 85 92]

Explanation:
• np.array() creates a homogeneous N-dimensional array in memory.
• (data - mean) / std computes z-score normalization across all elements concurrently.
• data[data > 50] applies vectorized boolean masking to filter subset records.

Result:
The program successfully demonstrated NumPy array creation, statistical vectorization, and conditional indexing.`,
        chartType: "bar",
        chartData: {
          labels: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10"],
          datasets: [
            {
              label: "Original Values",
              data: [12, 18, 25, 30, 42, 55, 63, 78, 85, 92],
              backgroundColor: "rgba(56, 189, 248, 0.75)",
              borderColor: "#38bdf8",
              borderWidth: 1
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "B",
        codeId: "1B",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-1-introduction_to_data_science_t/task_1b_pandas_dataframe_construction_explo.py",
        title: "Pandas DataFrame Construction & Exploratory Data Inspection",
        duration: "07:30 min",
        videoUrl: "https://www.youtube.com/embed/ua-CiDNNj30",
        aim: "To create a Pandas DataFrame from dictionary structures, inspect data types, compute summary statistics, and add derived columns.",
        syntax: `pd.DataFrame(data)
df.describe()
df['New_Column'] = expression`,
        concept: "Aim: To create a Pandas DataFrame from dictionary structures, inspect data types, compute summary statistics, and add derived columns.\n\nKey Concepts:\n• Pandas DataFrame is a 2D labeled tabular data structure\n• df.describe() calculates count, mean, std, min, percentiles, and max\n• Column addition allows building computed metrics",
        code: `import pandas as pd

# Create dictionary dataset
dataset = {
    'Student_ID': ['MBU-001', 'MBU-002', 'MBU-003', 'MBU-004', 'MBU-005'],
    'Name': ['Aarav', 'Bhavna', 'Chaitanya', 'Divya', 'Eshwar'],
    'Lab_Score': [88, 94, 76, 92, 85],
    'Viva_Score': [82, 90, 70, 88, 80],
    'Attendance_Pct': [95.0, 98.5, 82.0, 91.0, 87.5]
}

df = pd.DataFrame(dataset)
print("Student Laboratory DataFrame:")
print(df)

# Summary statistics
print("\\nDescriptive Summary Statistics:")
print(df[['Lab_Score', 'Viva_Score', 'Attendance_Pct']].describe())

# Compute derived metric
df['Total_Average'] = (df['Lab_Score'] + df['Viva_Score']) / 2
print("\\nDataFrame with Computed Total Average:")
print(df[['Name', 'Lab_Score', 'Viva_Score', 'Total_Average']])`,
        output: `Student Laboratory DataFrame:
  Student_ID       Name  Lab_Score  Viva_Score  Attendance_Pct
0    MBU-001      Aarav         88          82            95.0
1    MBU-002     Bhavna         94          90            98.5
2    MBU-003  Chaitanya         76          70            82.0
3    MBU-004      Divya         92          88            91.0
4    MBU-005     Eshwar         85          80            87.5

Descriptive Summary Statistics:
       Lab_Score  Viva_Score  Attendance_Pct
count        5.0    5.000000        5.000000
mean        87.0   82.000000       90.800000
std          6.9    7.842194        6.544081
min         76.0   70.000000       82.000000
25%         85.0   80.000000       87.500000
50%         88.0   82.000000       91.000000
75%         92.0   88.000000       95.000000
max         94.0   90.000000       98.500000

DataFrame with Computed Total Average:
        Name  Lab_Score  Viva_Score  Total_Average
0      Aarav         88          82           85.0
1     Bhavna         94          90           92.0
2  Chaitanya         76          70           73.0
3      Divya         92          88           90.0
4     Eshwar         85          80           82.5

Explanation:
• pd.DataFrame() encapsulates tabular data with columns and integer indices.
• df.describe() summarizes the numerical properties across the cohort.
• Total_Average derives a composite academic assessment score.

Result:
The Pandas DataFrame was successfully constructed, analyzed, and enhanced with derived features.`,
        chartType: "bar",
        chartData: {
          labels: ["Aarav", "Bhavna", "Chaitanya", "Divya", "Eshwar"],
          datasets: [
            {
              label: "Lab Score",
              data: [88, 94, 76, 92, 85],
              backgroundColor: "rgba(56, 189, 248, 0.75)",
              borderColor: "#38bdf8",
              borderWidth: 1
            },
            {
              label: "Viva Score",
              data: [82, 90, 70, 88, 80],
              backgroundColor: "rgba(168, 85, 247, 0.75)",
              borderColor: "#c084fc",
              borderWidth: 1
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "exp-2",
    number: "2",
    title: "Data Extraction & Web Data Acquisition",
    category: "Data Extraction",
    previewDuration: "09:00",
    videoThumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80",
    previewVideoUrl: "https://www.youtube.com/embed/ng2o98k983k",
    description: "Extract structured records from relational SQLite database tables, consume RESTful JSON endpoints, and parse HTML DOM structures.",
    tags: ["Data Extraction", "SQL", "SQLite", "JSON", "REST APIs", "Python"],
    githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/tree/main/experiments/exp-2-data_extraction_web_data_acqui",
    vivaQuestions: [
      {
            "q": "What is the purpose of pd.json_normalize() when handling REST API responses?",
            "a": "REST APIs often return nested JSON trees. pd.json_normalize() recursively flattens semi-structured, nested dictionaries into distinct tabular DataFrame columns with dotted notation (e.g. telemetry.temperature).",
            "concept": "Semi-Structured Data Flattening"
      },
      {
            "q": "How does pd.read_sql_query() execute and return database records?",
            "a": "It accepts an open SQLite or SQLAlchemy connection, submits the SQL query to the database engine, and directly streams the resulting cursor records into a Pandas DataFrame with preserved datatypes.",
            "concept": "Relational Database ETL Pipelines"
      },
      {
            "q": "What HTTP status codes indicate success vs client errors in web data acquisition?",
            "a": "200 (OK), 201 (Created) indicate success. 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 429 (Too Many Requests / Rate Limited) indicate client errors requiring backoff or auth headers.",
            "concept": "API Protocols & Network Resiliency"
      }
],
    subTasks: [
      {
        letter: "A",
        codeId: "2A",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-2-data_extraction_web_data_acqui/task_2a_structured_data_extraction_from_sql.py",
        title: "Structured Data Extraction from SQLite Database with SQL Queries",
        duration: "07:00 min",
        videoUrl: "https://www.youtube.com/embed/ng2o98k983k",
        aim: "To create an in-memory SQLite database, insert tabular records, and execute structured SQL SELECT queries with filtering and aggregations into Pandas.",
        syntax: `sqlite3.connect(':memory:')
pd.read_sql_query(query, conn)`,
        concept: "Aim: To create an in-memory SQLite database, insert tabular records, and execute structured SQL SELECT queries with filtering and aggregations into Pandas.\n\nKey Concepts:\n• SQLite provides standard relational database management in Python\n• pd.read_sql_query() maps SQL query result sets directly into DataFrames\n• GROUP BY and aggregate functions summarize records at the database level",
        code: `import sqlite3
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
conn.close()`,
        output: `Extracted Aggregated Records via SQL Query:
                        domain  paper_count  avg_citations  max_if
0              Computer Vision            1          215.0     6.2
1  Natural Language Processing            1          175.0     5.1
2             Machine Learning            2          170.0     5.4
3              Data Extraction            2           76.5     3.5

Explanation:
• sqlite3 creates a relational database in memory.
• SQL GROUP BY groups records by research domain.
• pd.read_sql_query directly loads the result into an analytical Pandas DataFrame.

Result:
Tabular records were successfully extracted from an SQLite relational database via SQL queries.`,
        chartType: "bar",
        chartData: {
          labels: ["Computer Vision", "NLP", "Machine Learning", "Data Extraction"],
          datasets: [
            {
              label: "Average Citations",
              data: [215.0, 175.0, 170.0, 76.5],
              backgroundColor: [
                "rgba(56, 189, 248, 0.75)",
                "rgba(168, 85, 247, 0.75)",
                "rgba(52, 211, 153, 0.75)",
                "rgba(251, 191, 36, 0.75)"
              ],
              borderColor: ["#38bdf8", "#c084fc", "#34d399", "#fbbf24"],
              borderWidth: 1
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "B",
        codeId: "2B",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-2-data_extraction_web_data_acqui/task_2b_restful_json_api_data_consumption_n.py",
        title: "RESTful JSON API Data Consumption & Normalization",
        duration: "08:00 min",
        videoUrl: "https://www.youtube.com/embed/ng2o98k983k",
        aim: "To parse hierarchical JSON records from a simulated REST API endpoint and normalize nested key structures into a flat tabular DataFrame.",
        syntax: `json.loads(text)
pd.json_normalize(data)`,
        concept: "Aim: To parse hierarchical JSON records from a simulated REST API endpoint and normalize nested key structures into a flat tabular DataFrame.\n\nKey Concepts:\n• Web APIs serialize data into JSON dictionaries and lists\n• pd.json_normalize() recursively extracts nested sub-keys\n• Extracted data columns can be conditionally inspected and analyzed",
        code: `import json
import pandas as pd

# Simulated API payload response from RESTful endpoint
api_response_payload = """
[
    {"sensor_id": "SN-101", "location": "Lab-Alpha", "telemetry": {"temperature": 23.4, "humidity": 45.2, "status": "active"}},
    {"sensor_id": "SN-102", "location": "Lab-Beta", "telemetry": {"temperature": 27.8, "humidity": 51.0, "status": "warning"}},
    {"sensor_id": "SN-103", "location": "Lab-Gamma", "telemetry": {"temperature": 22.1, "humidity": 42.8, "status": "active"}},
    {"sensor_id": "SN-104", "location": "Server-Room", "telemetry": {"temperature": 19.5, "humidity": 38.4, "status": "optimal"}}
]
"""

# Parse JSON string
parsed_json = json.loads(api_response_payload)

# Normalize nested JSON structure into Pandas DataFrame
df_sensors = pd.json_normalize(parsed_json)
print("Normalized API Response Data:")
print(df_sensors)

# Query extracted telemetry
high_temp = df_sensors[df_sensors['telemetry.temperature'] > 22.0]
print("\\nSensors with Temperature > 22°C:")
print(high_temp[['sensor_id', 'location', 'telemetry.temperature', 'telemetry.status']])`,
        output: `Normalized API Response Data:
  sensor_id     location  telemetry.temperature  telemetry.humidity telemetry.status
0    SN-101    Lab-Alpha                   23.4                45.2           active
1    SN-102     Lab-Beta                   27.8                51.0          warning
2    SN-103    Lab-Gamma                   22.1                42.8           active
3    SN-104  Server-Room                   19.5                38.4          optimal

Sensors with Temperature > 22°C:
  sensor_id   location  telemetry.temperature telemetry.status
0    SN-101  Lab-Alpha                   23.4           active
1    SN-102   Lab-Beta                   27.8          warning
2    SN-103  Lab-Gamma                   22.1           active

Explanation:
• json.loads parses the REST payload string into Python objects.
• pd.json_normalize flattens nested telemetry sub-dictionaries into distinct columns.
• Boolean indexing filters sensors exceeding operational temperature thresholds.

Result:
RESTful JSON data was successfully consumed, flattened, and analyzed.`,
        chartType: "bar",
        chartData: {
          labels: ["Lab-Alpha", "Lab-Beta", "Lab-Gamma", "Server-Room"],
          datasets: [
            {
              label: "Sensor Temperature (°C)",
              data: [23.4, 27.8, 22.1, 19.5],
              backgroundColor: [
                "rgba(56, 189, 248, 0.75)",
                "rgba(239, 68, 68, 0.75)",
                "rgba(56, 189, 248, 0.75)",
                "rgba(52, 211, 153, 0.75)"
              ],
              borderColor: ["#38bdf8", "#ef4444", "#38bdf8", "#34d399"],
              borderWidth: 1
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "exp-4",
    number: "4",
    title: "Data Wrangling & Hierarchical Indexing",
    category: "Data Wrangling",
    previewDuration: "00:10",
    videoThumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    previewVideoUrl: "/datawrangling-preview-10s.mp4",
    description: "Reshape complex tabular data using hierarchical multi-indexing, stack, unstack, and merge with combine-first value imputation.",
    tags: ["Data Wrangling", "MultiIndex", "Stack / Unstack", "Merge", "Pandas"],
    githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/tree/main/experiments/exp-4-data_wrangling_hierarchical_in",
    vivaQuestions: [
      {
            "q": "What is a MultiIndex in Pandas and when is it preferred?",
            "a": "A MultiIndex (hierarchical index) allows representation of higher-dimensional data in standard 2D Series and DataFrames, enabling grouped slicing across multiple category tiers without pivoting.",
            "concept": "Hierarchical Data Representation"
      },
      {
            "q": "Explain the difference between stack() and unstack() in Pandas.",
            "a": "unstack() pivots the innermost level of a row index into columns (wide format). stack() collapses columns into a hierarchical row index level (tall/tidy format).",
            "concept": "Tabular Reshaping & Pivoting"
      },
      {
            "q": "How does combine_first() resolve missing data across two DataFrames?",
            "a": "df1.combine_first(df2) aligns two DataFrames on their index and fills NaN holes in df1 with corresponding non-null values from df2.",
            "concept": "Data Imputation & Merging"
      }
],
    subTasks: [
      {
        letter: "A",
        codeId: "4A",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-4-data_wrangling_hierarchical_in/task_4a_perform_hierarchical_indexing_and_s.py",
        title: "Perform hierarchical indexing and select data subsets using partial indexing",
        duration: "06:00 min",
        videoUrl: "/datawrangling-preview-10s.mp4",
        aim: "To create a Pandas Series with hierarchical (multi-level) indexing using a list of lists and to select subsets of data using partial indexing at the outer and inner levels.",
        syntax: `Create MultiIndex:
pd.MultiIndex.from_arrays(arrays, names=None)

To create a Series:
pd.Series(data, index=multi_index)

To select data:
series.loc['Outer_Level']
series.loc[('Outer_Level', 'Inner_Level')]`,
        concept: "Aim: To create a Pandas Series with hierarchical (multi-level) indexing using a list of lists and to select subsets of data using partial indexing at the outer and inner levels.\n\nKey Concepts:\n• MultiIndex.from_arrays() creates a multi-tiered index from nested lists\n• Outer level: Department, Inner level: Branch\n• marks.loc['Engineering'] slices all records under Engineering\n• marks.loc[('Engineering', 'CSE')] selects a specific value using both levels",
        code: `import pandas as pd

# Create a list of lists for hierarchical index
index = [
    ['Engineering', 'Engineering', 'Science', 'Science'],
    ['CSE', 'ECE', 'Physics', 'Chemistry']
]

# Create MultiIndex
multi_index = pd.MultiIndex.from_arrays(
    index,
    names=['Department', 'Branch']
)

# Create a Series using the hierarchical index
marks = pd.Series(
    [85, 78, 92, 88],
    index=multi_index
)

print("Original Series:")
print(marks)

# Partial indexing at the outer level
print("\\nData for Engineering:")
print(marks.loc['Engineering'])

# Partial indexing at the inner level
print("\\nData for CSE:")
print(marks.loc[('Engineering', 'CSE')])

# Selecting a subset using both levels
print("\\nData for Science:")
print(marks.loc['Science'])`,
        output: `Original Series:
Department   Branch   
Engineering  CSE          85
             ECE          78
Science      Physics      92
             Chemistry    88
dtype: int64

Data for Engineering:
Branch
CSE    85
ECE    78
dtype: int64

Data for CSE:
85

Data for Science:
Branch
Physics      92
Chemistry    88
dtype: int64

Explanation:
• MultiIndex.from_arrays() creates a hierarchical index with two levels:
  o Outer level: Department
  o Inner level: Branch
• marks.loc['Engineering'] selects all records under the outer level Engineering.
• marks.loc[('Engineering', 'CSE')] selects a specific value using both outer and inner levels.
• marks.loc['Science'] selects all records belonging to the Science department.

Result:
The program successfully demonstrates hierarchical indexing and partial indexing at both outer and inner levels in Pandas.`,
        chartType: "bar",
        chartData: {
          labels: ["Eng: CSE", "Eng: ECE", "Sci: Physics", "Sci: Chemistry"],
          datasets: [
            {
              label: "Subject Score by Department & Branch",
              data: [85, 78, 92, 88],
              backgroundColor: [
                "rgba(56, 189, 248, 0.75)",
                "rgba(56, 189, 248, 0.75)",
                "rgba(52, 211, 153, 0.75)",
                "rgba(52, 211, 153, 0.75)"
              ],
              borderColor: [
                "#38bdf8",
                "#38bdf8",
                "#34d399",
                "#34d399"
              ],
              borderWidth: 1
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "B",
        codeId: "4B",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-4-data_wrangling_hierarchical_in/task_4b_rearrange_tabular_data_with_hierarc.py",
        title: "Rearrange tabular data with hierarchical indexing using unstack and stack method",
        duration: "06:30 min",
        videoUrl: "/datawrangling-preview-10s.mp4",
        aim: "To rearrange tabular data with hierarchical indexing using the Pandas unstack() and stack() methods.",
        syntax: `unstack(): Converts one level of a hierarchical row index into columns
DataFrame.unstack(level=-1)
or
Series.unstack(level=-1)

stack(): Converts columns into a hierarchical row index
DataFrame.stack()
or
Series.stack()`,
        concept: "Aim: To rearrange tabular data with hierarchical indexing using the Pandas unstack() and stack() methods.\n\nKey Concepts:\n• 1. Hierarchical Indexing: Department and Branch form two levels of the index\n• 2. unstack(): Moves inner index (Branch) from rows to columns\n• 3. stack(): Moves column labels back into hierarchical row index",
        code: `import pandas as pd

# Create hierarchical index
index = pd.MultiIndex.from_tuples(
    [
        ('Engineering', 'CSE'),
        ('Engineering', 'ECE'),
        ('Science', 'Physics'),
        ('Science', 'Chemistry')
    ],
    names=['Department', 'Branch']
)

# Create tabular data
data = pd.DataFrame(
    {
        '2025': [85, 78, 92, 88],
        '2026': [90, 82, 95, 91]
    },
    index=index
)

print("Original Tabular Data:")
print(data)

# Unstack the inner level
unstacked_data = data.unstack()

print("\\nData after Unstack():")
print(unstacked_data)

# Stack the data back
stacked_data = unstacked_data.stack()

print("\\nData after Stack():")
print(stacked_data)`,
        output: `Original Tabular Data:

                       2025  2026
Department   Branch              
Engineering  CSE          85    90
             ECE          78    82
Science      Physics      92    95
             Chemistry    88    91

Data after Unstack():

             2025                    2026                        
Branch        CSE   ECE Chemistry Physics  CSE   ECE Chemistry Physics
Department                                                            
Engineering  85.0  78.0       NaN     NaN 90.0  82.0       NaN     NaN
Science       NaN   NaN      88.0    92.0  NaN   NaN      91.0    95.0

Data after Stack():

Department   Branch   
Engineering  CSE          85    90
             ECE          78    82
Science      Chemistry    88    91
             Physics      92    95
dtype: int64

Explanation:
1. Hierarchical Indexing: Department and Branch form the two levels of the hierarchical index.
2. unstack() method: Moves the inner index (Branch) from the rows to the columns.
3. stack() method: Moves the column labels back into the hierarchical row index.

Result:
The unstack() method converts row-level hierarchical indexes into columns, while the stack() method converts columns back into hierarchical row indexes.`,
        chartType: "bar",
        chartData: {
          labels: ["CSE", "ECE", "Physics", "Chemistry"],
          datasets: [
            {
              label: "Year 2025 Marks",
              data: [85, 78, 92, 88],
              backgroundColor: "rgba(56, 189, 248, 0.8)",
              borderColor: "#38bdf8",
              borderWidth: 1
            },
            {
              label: "Year 2026 Marks",
              data: [90, 82, 95, 91],
              backgroundColor: "rgba(251, 191, 36, 0.8)",
              borderColor: "#fbbf24",
              borderWidth: 1
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "C",
        codeId: "4C",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-4-data_wrangling_hierarchical_in/task_4c_merge_dataframes_using_index_as_key.py",
        title: "Merge DataFrames using index as key and combine data using combine_first()",
        duration: "07:00 min",
        videoUrl: "/datawrangling-preview-10s.mp4",
        aim: "To create two different Pandas DataFrames, merge them using the index as the merge key, and combine their data using the combine_first() method to fill missing values with available values from another DataFrame.",
        syntax: `Merge using index:
pd.merge(df1, df2, left_index=True, right_index=True, how='outer')

combine_first():
df1.combine_first(df2)
The combine_first() method fills missing (NaN) values in the first DataFrame with corresponding values from the second DataFrame.`,
        concept: "Aim: To create two different Pandas DataFrames, merge them using the index as the merge key, and combine their data using the combine_first() method to fill missing values with available values from another DataFrame.\n\nKey Concepts:\n• Index-Based Merge: pd.merge(..., left_index=True, right_index=True)\n• Imputation with combine_first(): df1.combine_first(df2) replaces NaN values in df1 with matching row/column values from df2\n• Robust Tabular Integration: preserves non-null primary data while completing missing cells",
        code: `import pandas as pd

# Create the first DataFrame
df1 = pd.DataFrame(
    {
        'Name': ['Ravi', 'Sita', 'Arun'],
        'Marks': [85, None, 78],
        'Grade': ['A', 'B', None]
    },
    index=[101, 102, 103]
)

# Create the second DataFrame
df2 = pd.DataFrame(
    {
        'Name': ['Ravi', 'Sita', 'Kiran'],
        'Marks': [90, 88, 82],
        'Grade': [None, 'A', 'B']
    },
    index=[101, 102, 104]
)

print("First DataFrame:")
print(df1)

print("\\nSecond DataFrame:")
print(df2)

# Merge DataFrames using index as merge key
merged = pd.merge(
    df1,
    df2,
    left_index=True,
    right_index=True,
    how='outer',
    suffixes=('_DF1', '_DF2')
)

print("\\nMerged DataFrame:")
print(merged)

# Combine data using combine_first()
combined = df1.combine_first(df2)

print("\\nDataFrame after combine_first():")
print(combined)`,
        output: `First DataFrame:
      Name  Marks Grade
101   Ravi   85.0     A
102   Sita    NaN     B
103   Arun   78.0  None

Second DataFrame:
      Name  Marks Grade
101   Ravi   90.0  None
102   Sita   88.0     A
104  Kiran   82.0     B

Merged DataFrame:
      Name_DF1  Marks_DF1 Grade_DF1 Name_DF2  Marks_DF2 Grade_DF2
101       Ravi       85.0         A     Ravi       90.0      None
102       Sita        NaN         B     Sita       88.0         A
103       Arun       78.0      None      NaN        NaN       NaN
104        NaN        NaN       NaN    Kiran       82.0         B

DataFrame after combine_first():
      Name  Marks Grade
101   Ravi   85.0     A
102   Sita   88.0     B
103   Arun   78.0  None
104  Kiran   82.0     B

Explanation:
1. Creating DataFrames: Two DataFrames, df1 and df2, are created with student information. Their index values act as student IDs.
2. Merging using index: pd.merge(df1, df2, left_index=True, right_index=True, how='outer') preserves all index keys.
3. Combining overlapping data: df1.combine_first(df2) uses values from df1 wherever they exist. If df1 contains a missing value (e.g. Sita's marks = NaN), it takes 88 from df2.

Result:
The program demonstrates both index-based merging and combining overlapping DataFrame data using combine_first().`,
        chartType: "bar",
        chartData: {
          labels: ["101: Ravi", "102: Sita (Imputed)", "103: Arun", "104: Kiran (DF2)"],
          datasets: [
            {
              label: "DF1 Marks (Original)",
              data: [85, 0, 78, 0],
              backgroundColor: "rgba(239, 68, 68, 0.5)",
              borderColor: "#ef4444",
              borderWidth: 1
            },
            {
              label: "DF2 Marks (Fallback)",
              data: [90, 88, 0, 82],
              backgroundColor: "rgba(56, 189, 248, 0.5)",
              borderColor: "#38bdf8",
              borderWidth: 1
            },
            {
              label: "Combined Marks (combine_first)",
              data: [85, 88, 78, 82],
              backgroundColor: "rgba(52, 211, 153, 0.8)",
              borderColor: "#34d399",
              borderWidth: 1
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "exp-5",
    number: "5",
    title: "Data Visualization with Matplotlib & Seaborn",
    category: "Data Visualization",
    previewDuration: "00:10",
    videoThumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    previewVideoUrl: "https://www.youtube.com/embed/Bw_yIdyeNhY",
    description: "Perform comprehensive data visualization using Matplotlib and Seaborn across line, bar, histogram, scatter, and boxplots.",
    tags: ["Matplotlib", "Seaborn", "Data Visualization", "Subplots", "EDA"],
    githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/tree/main/experiments/exp-5-data_visualization_with_matplo",
    vivaQuestions: [
      {
            "q": "What are the components of a Box Plot and what do the whiskers represent?",
            "a": "A Box Plot displays Minimum, Q1 (25th percentile), Median (50th percentile), Q3 (75th percentile), and Maximum. The box represents the Interquartile Range (IQR = Q3 - Q1), and whiskers extend to 1.5 * IQR. Points beyond whiskers are classified as outliers.",
            "concept": "Exploratory Statistical Diagnostics"
      },
      {
            "q": "When should you use a Density Plot (KDE) over a standard Histogram?",
            "a": "Histograms depend heavily on arbitrary bin-width choices, causing discontinuous jagged steps. Kernel Density Estimation (KDE) computes a continuous, smooth probability density function independent of bin boundaries.",
            "concept": "Kernel Density Estimation"
      },
      {
            "q": "What does Pearson's correlation coefficient measure and what is its range?",
            "a": "It measures the linear relationship between two continuous variables, ranging from -1.0 (perfect negative linear correlation) to +1.0 (perfect positive linear correlation), where 0 indicates no linear correlation.",
            "concept": "Bivariate Statistical Correlation"
      }
],
    subTasks: [
      {
        letter: "A",
        codeId: "5A",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-5-data_visualization_with_matplo/task_5a_create_a_line_plot_with_title_axis_.py",
        title: "Create a Line Plot with Title, Axis Labels, Ticks, Tick Labels, Annotations and Save to a File",
        duration: "06:30 min",
        videoUrl: "https://www.youtube.com/embed/Bw_yIdyeNhY",
        aim: "To create a line plot using Matplotlib by setting the title, axis labels, ticks, tick labels, and annotations on subplots, and save the generated plot to an image file.",
        syntax: `Create subplots
fig, ax = plt.subplots()

Set title
ax.set_title("Title")

Set axis labels
ax.set_xlabel("X-axis Label")
ax.set_ylabel("Y-axis Label")

Set ticks and tick labels
ax.set_xticks(x)
ax.set_xticklabels(labels)

Add annotation
ax.annotate("Text", xy=(x, y), xytext=(x1, y1),
            arrowprops=dict(arrowstyle="->"))

Save plot to a file
plt.savefig("filename.png", dpi=300, bbox_inches="tight")`,
        concept: "Aim: To create a line plot using Matplotlib by setting the title, axis labels, ticks, tick labels, and annotations on subplots, and save the generated plot to an image file.\n\nKey Syntax:\n• Subplots: fig, ax = plt.subplots(2, 1, figsize=(10, 8))\n• Custom Labels & Ticks: ax.set_xticks() and ax.set_xticklabels()\n• Arrow Annotations: ax.annotate() pointing at peak data points\n• Hi-Res Export: plt.savefig('monthly_sales_expenses.png', dpi=300)",
        code: `import matplotlib.pyplot as plt

# Data
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
sales = [120, 150, 180, 160, 220, 250]
expenses = [80, 100, 120, 110, 140, 160]

# Create subplots
fig, ax = plt.subplots(2, 1, figsize=(10, 8))

# --------------------------------------------------
# Subplot 1: Sales
# --------------------------------------------------

ax[0].plot(
    months,
    sales,
    marker="o",
    linewidth=2,
    label="Sales"
)

ax[0].set_title("Monthly Sales")
ax[0].set_xlabel("Month")
ax[0].set_ylabel("Sales")

# Set ticks and tick labels
ax[0].set_xticks(range(len(months)))
ax[0].set_xticklabels(months)

# Annotation
ax[0].annotate(
    "Highest Sales",
    xy=(5, 250),
    xytext=(3.5, 270),
    arrowprops=dict(arrowstyle="->")
)

ax[0].legend()
ax[0].grid(True)


# --------------------------------------------------
# Subplot 2: Expenses
# --------------------------------------------------

ax[1].plot(
    months,
    expenses,
    marker="s",
    linewidth=2,
    label="Expenses"
)

ax[1].set_title("Monthly Expenses")
ax[1].set_xlabel("Month")
ax[1].set_ylabel("Expenses")

# Set ticks and tick labels
ax[1].set_xticks(range(len(months)))
ax[1].set_xticklabels(months)

# Annotation
ax[1].annotate(
    "Highest Expense",
    xy=(5, 160),
    xytext=(3.5, 180),
    arrowprops=dict(arrowstyle="->")
)

ax[1].legend()
ax[1].grid(True)

# Overall title
fig.suptitle("Monthly Sales and Expenses Analysis", fontsize=16)

# Adjust layout
plt.tight_layout()

# Save the plot to a file
plt.savefig(
    "monthly_sales_expenses.png",
    dpi=300,
    bbox_inches="tight"
)

# Display the plot
plt.show()`,
        output: `The program generates two subplots:
       Monthly Sales and Expenses Analysis

          Monthly Sales
Sales
250 |                         ● ← Highest Sales
220 |                    ●
180 |             ●
150 |        ●
120 |   ●
    +--------------------------------
       Jan  Feb  Mar  Apr  May  Jun
                    Month


          Monthly Expenses
Expenses
160 |                         ■ ← Highest Expense
140 |                    ■
120 |             ■
110 |        ■
100 |   ■
 80 | ●
    +--------------------------------
       Jan  Feb  Mar  Apr  May  Jun
                    Month

The actual Matplotlib output will display the plots graphically with titles, axis labels, customized ticks, tick labels, legends, grids, and arrow annotations.

Output File:
The plot is saved as:
monthly_sales_expenses.png
at 300 DPI, making it suitable for reports and practical records.

Result:
Thus, a line plot with titles, axis labels, ticks, tick labels, annotations, and multiple subplots was successfully created using Matplotlib and saved to an image file.`,
        chartType: "line",
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Monthly Sales ($)",
              data: [120, 150, 180, 160, 220, 250],
              borderColor: "#38bdf8",
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              fill: false,
              pointBackgroundColor: ["#38bdf8", "#38bdf8", "#38bdf8", "#38bdf8", "#38bdf8", "#f43f5e"],
              pointBorderColor: "#ffffff",
              pointRadius: [5, 5, 5, 5, 5, 8],
              pointHoverRadius: 9,
              tension: 0.2
            },
            {
              label: "Monthly Expenses ($)",
              data: [80, 100, 120, 110, 140, 160],
              borderColor: "#fbbf24",
              backgroundColor: "rgba(251, 191, 36, 0.15)",
              fill: false,
              pointBackgroundColor: ["#fbbf24", "#fbbf24", "#fbbf24", "#fbbf24", "#fbbf24", "#ef4444"],
              pointBorderColor: "#ffffff",
              pointRadius: [5, 5, 5, 5, 5, 8],
              pointHoverRadius: 9,
              tension: 0.2
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "B",
        codeId: "5B",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-5-data_visualization_with_matplo/task_5b_create_bar_plots_using_series_and_d.py",
        title: "Create Bar Plots using Series and DataFrame index (Grouped & Stacked)",
        duration: "07:15 min",
        videoUrl: "https://www.youtube.com/embed/3Rok5fgOWrw",
        aim: "To create bar plots using Pandas Series and DataFrame index, and to create both grouped bar plots and stacked bar plots using Matplotlib.",
        syntax: `i. Create Bar Plots with a DataFrame — Side-by-Side Bars
df.plot(kind='bar')
or
df.plot.bar()
For a horizontal bar plot:
df.plot(kind='barh')

ii. Create Stacked Bar Plots from a DataFrame
df.plot(kind='bar', stacked=True)
or
df.plot.bar(stacked=True)`,
        concept: "Aim: To create bar plots using Pandas Series and DataFrame index, and to create both grouped bar plots and stacked bar plots using Matplotlib.\n\nKey Concepts:\n• Grouped Bar Plot: df.plot(kind='bar') places bars side by side for each index category\n• Stacked Bar Plot: df.plot(kind='bar', stacked=True) stacks column values vertically\n• Comparison: Grouped bars facilitate side-by-side metric comparison, while stacked bars highlight aggregate totals and component breakdowns.",
        code: `import pandas as pd
import matplotlib.pyplot as plt

# Create DataFrame
data = {
    'Python': [85, 90, 78, 88],
    'Java': [75, 82, 80, 85],
    'C++': [80, 76, 85, 90]
}

df = pd.DataFrame(
    data,
    index=['Student1', 'Student2', 'Student3', 'Student4']
)

print("DataFrame:")
print(df)

# --------------------------------------------------
# 1. Create Grouped Bar Plot (Side-by-Side Bars)
# --------------------------------------------------
df.plot(
    kind='bar',
    figsize=(8, 5)
)

plt.title("Student Marks in Different Programming Languages (Grouped)")
plt.xlabel("Students")
plt.ylabel("Marks")
plt.xticks(rotation=0)
plt.legend(title="Subjects")
plt.tight_layout()
plt.show()

# --------------------------------------------------
# 2. Create Stacked Bar Plot
# --------------------------------------------------
df.plot(
    kind='bar',
    stacked=True,
    figsize=(8, 5)
)

plt.title("Stacked Bar Plot of Student Marks")
plt.xlabel("Students")
plt.ylabel("Total Marks")
plt.xticks(rotation=0)
plt.legend(title="Subjects")
plt.tight_layout()
plt.show()`,
        output: `DataFrame:

          Python  Java  C++
Student1      85    75   80
Student2      90    82   76
Student3      78    80   85
Student4      88    85   90

Grouped Bar Plot:
The graphical output contains three bars side by side for each student:
• Python 
• Java 
• C++ 
For example:
Marks
 90 |        █
 85 | █      █       █
 80 | █  █   █   █   █
 75 | █  █   █   █   █
    +----------------------
      Student1 Student2 ...
Each row of the DataFrame is represented as a group of bars.

Stacked Bar Plot:
The graphical output contains one bar for each student, with Python, Java, and C++ marks stacked vertically.
Total
250 |             █
200 |     █       █
150 | █   █   █   █
100 | █   █   █   █
 50 | █   █   █   █
    +----------------------
      S1  S2  S3  S4

Difference Between Grouped and Stacked Bar Plots:
• Grouped Bar Plot: Bars side by side; df.plot(kind='bar'); Easy to compare individual values; Multiple bars per index.
• Stacked Bar Plot: Bars on top of each other; df.plot(kind='bar', stacked=True); Easy to see total and contribution; One combined bar per index.

Result:
Thus, grouped bar plots and stacked bar plots were successfully created from a Pandas DataFrame using its index values.`,
        chartType: "bar",
        chartData: {
          labels: ["Student1", "Student2", "Student3", "Student4"],
          datasets: [
            {
              label: "Python",
              data: [85, 90, 78, 88],
              backgroundColor: "rgba(56, 189, 248, 0.8)",
              borderColor: "#38bdf8",
              borderWidth: 1
            },
            {
              label: "Java",
              data: [75, 82, 80, 85],
              backgroundColor: "rgba(251, 191, 36, 0.8)",
              borderColor: "#fbbf24",
              borderWidth: 1
            },
            {
              label: "C++",
              data: [80, 76, 85, 90],
              backgroundColor: "rgba(52, 211, 153, 0.8)",
              borderColor: "#34d399",
              borderWidth: 1
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "C",
        codeId: "5C",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-5-data_visualization_with_matplo/task_5c_create_histogram_to_display_value_f.py",
        title: "Create Histogram to display value frequency and Density Plot to generate continuous distribution",
        duration: "06:45 min",
        videoUrl: "https://www.youtube.com/embed/t_W6eC8-17w",
        aim: "To create a Histogram for displaying the frequency distribution of observed data and a Density Plot for representing the continuous probability distribution of the data using Python, Pandas, Matplotlib, and Seaborn.",
        syntax: `Histogram:
sns.histplot(data, bins=10, kde=False)

Density Plot:
sns.kdeplot(data, fill=True)

Histogram with Density Curve:
sns.histplot(data, bins=10, kde=True)`,
        concept: "Aim: To create a Histogram for displaying the frequency distribution of observed data and a Density Plot for representing the continuous probability distribution of the data using Python, Pandas, Matplotlib, and Seaborn.\n\nKey Concepts:\n• Histogram: shows how frequently values occur across discrete bin intervals\n• Density plot (KDE): provides a smooth continuous probability distribution estimate\n• bins=6: divides the data into six intervals\n• kde=True: adds the density curve overlay\n• fill=True: fills the area under the density curve",
        code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Sample observed data
data = [45, 50, 52, 55, 58, 60, 62, 65, 68, 70,
        72, 75, 78, 80, 82, 85, 88, 90, 92, 95]

# Create DataFrame
df = pd.DataFrame({'Marks': data})

print("Observed Data:")
print(df)

# --------------------------------------------------
# 1. Create Histogram
# --------------------------------------------------
plt.figure(figsize=(8, 5))
sns.histplot(df['Marks'], bins=6, kde=False)

plt.title("Histogram of Marks")
plt.xlabel("Marks")
plt.ylabel("Frequency")
plt.tight_layout()
plt.show()

# --------------------------------------------------
# 2. Create Density Plot
# --------------------------------------------------
plt.figure(figsize=(8, 5))
sns.kdeplot(df['Marks'], fill=True)

plt.title("Density Plot of Marks")
plt.xlabel("Marks")
plt.ylabel("Density")
plt.tight_layout()
plt.show()

# --------------------------------------------------
# 3. Combined Histogram with Density Curve
# --------------------------------------------------
plt.figure(figsize=(8, 5))
sns.histplot(df['Marks'], bins=6, kde=True)

plt.title("Histogram with Density Curve")
plt.xlabel("Marks")
plt.ylabel("Frequency / Density")
plt.tight_layout()
plt.show()`,
        output: `Observed Data:
    Marks
0      45
1      50
2      52
3      55
4      58
5      60
6      62
7      65
8      68
9      70
10     72
11     75
12     78
13     80
14     82
15     85
16     88
17     90
18     92
19     95

Graphical Output:
1. Histogram:
Displays the marks divided into intervals (bins), with the height of each bar representing the frequency of observations in that interval.
2. Density Plot:
Displays a smooth curve representing the estimated continuous probability distribution of the observed marks.
3. Combined Histogram + Density Plot:
Generated using sns.histplot(df['Marks'], bins=6, kde=True) with density curve overlaid.

Explanation:
• Histogram → shows how frequently values occur in different intervals.
• Density plot (KDE) → gives a smooth estimate of the underlying probability distribution.
• bins=6 divides the data into six intervals.
• kde=True adds the density curve to the histogram.
• fill=True fills the area under the density curve.

Result:
Thus, a histogram and density plot were successfully created to visualize the frequency distribution and continuous probability distribution of the observed data.`,
        chartType: "bar",
        chartData: {
          labels: ["45-53", "54-61", "62-69", "70-77", "78-85", "86-95"],
          datasets: [
            {
              type: "bar",
              label: "Observed Frequency (Histogram)",
              data: [3, 3, 3, 3, 4, 4],
              backgroundColor: "rgba(129, 140, 248, 0.65)",
              borderColor: "#818cf8",
              borderWidth: 1,
              order: 2
            },
            {
              type: "line",
              label: "Continuous Density Curve (KDE)",
              data: [2.9, 3.1, 3.1, 3.2, 4.0, 3.8],
              borderColor: "#f43f5e",
              backgroundColor: "rgba(244, 63, 94, 0.15)",
              borderWidth: 2.5,
              tension: 0.4,
              fill: true,
              order: 1
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "D",
        codeId: "5D",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-5-data_visualization_with_matplo/task_5d_create_scatter_plot_and_examine_the.py",
        title: "Create Scatter Plot and Examine the Relationship Between Two One-Dimensional Data Series",
        duration: "06:00 min",
        videoUrl: "/dataviz-preview-10s.mp4",
        aim: "To create a Scatter Plot using two one-dimensional data series and examine the relationship or correlation between them using Python, Pandas, and Matplotlib.",
        syntax: `Matplotlib:
plt.scatter(x, y)

Pandas:
df.plot.scatter(x='Column1', y='Column2')

Correlation Calculation:
correlation = df['Column1'].corr(df['Column2'])`,
        concept: "Aim: To create a Scatter Plot using two one-dimensional data series and examine the relationship or correlation between them using Python, Pandas, and Matplotlib.\n\nKey Concepts:\n• Scatter Plot: examines the relationship and dispersion between two numerical variables\n• Positive Relationship: points ascend upward to the right\n• Correlation Coefficient (r): ranges from -1 (perfect negative) to +1 (perfect positive)\n• Correlation r = 1.00 confirms a strong positive linear relationship between study hours and marks.",
        code: `import pandas as pd
import matplotlib.pyplot as plt

# Two one-dimensional data series
study_hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
marks = [45, 50, 55, 60, 65, 70, 72, 80, 85, 90]

# Create DataFrame
df = pd.DataFrame({
    'Study_Hours': study_hours,
    'Marks': marks
})

print("Data:")
print(df)

# Create Scatter Plot
plt.figure(figsize=(8, 5))

plt.scatter(df['Study_Hours'], df['Marks'])

plt.title("Relationship Between Study Hours and Marks")
plt.xlabel("Study Hours")
plt.ylabel("Marks")
plt.grid(True)

plt.tight_layout()
plt.show()

# Calculate correlation
correlation = df['Study_Hours'].corr(df['Marks'])

print("\\nCorrelation Coefficient:", round(correlation, 2))`,
        output: `Data:
   Study_Hours  Marks
0            1     45
1            2     50
2            3     55
3            4     60
4            5     65
5            6     70
6            7     72
7            8     80
8            9     85
9           10     90

Correlation Coefficient: 1.00

Graphical Output:
The scatter plot contains:
• X-axis: Study Hours 
• Y-axis: Marks 
• Each point represents one observation. 
• The points move upward as study hours increase, indicating a positive relationship between study hours and marks. 

Explanation:
A scatter plot is used to examine the relationship between two numerical variables.
• If points move upward, there is a positive relationship. 
• If points move downward, there is a negative relationship. 
• If points are randomly distributed, there may be little or no relationship. 
• The correlation coefficient ranges from −1 to +1:
  o +1 → perfect positive correlation 
  o 0 → no linear correlation 
  o −1 → perfect negative correlation 
In this example, the correlation coefficient is approximately 1.00, showing a strong positive linear relationship between study hours and marks.

Result:
Thus, the scatter plot was successfully created and the relationship between the two one-dimensional data series was examined using the correlation coefficient.`,
        chartType: "scatter",
        chartData: {
          datasets: [
            {
              type: "scatter",
              label: "Study Hours vs Marks (Points)",
              data: [
                { x: 1, y: 45 },
                { x: 2, y: 50 },
                { x: 3, y: 55 },
                { x: 4, y: 60 },
                { x: 5, y: 65 },
                { x: 6, y: 70 },
                { x: 7, y: 72 },
                { x: 8, y: 80 },
                { x: 9, y: 85 },
                { x: 10, y: 90 }
              ],
              backgroundColor: "#38bdf8",
              borderColor: "#0284c7",
              pointRadius: 6,
              pointHoverRadius: 9
            },
            {
              type: "line",
              label: "Linear Trendline (r = 1.00)",
              data: [
                { x: 1, y: 45 },
                { x: 10, y: 90 }
              ],
              borderColor: "#34d399",
              borderWidth: 2,
              borderDash: [5, 5],
              fill: false,
              pointRadius: 0
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "E",
        codeId: "5E",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-5-data_visualization_with_matplo/task_5e_create_box_plots_to_visualize_data_.py",
        title: "Create Box Plots to Visualize Data with Many Categorical Variables",
        duration: "07:00 min",
        videoUrl: "/dataviz-preview-10s.mp4",
        aim: "To create Box Plots for visualizing the distribution of numerical data across multiple categorical variables using Python, Pandas, Matplotlib, and Seaborn.",
        syntax: `Seaborn:
sns.boxplot(x='Category', y='Value', data=df)

Pandas:
df.boxplot(column='Value', by='Category')`,
        concept: "Aim: To create Box Plots for visualizing the distribution of numerical data across multiple categorical variables using Python, Pandas, Matplotlib, and Seaborn.\n\nKey Concepts:\n• Box Plot: displays five-number summary (Min, Q1, Median, Q3, Max) and identifies outliers\n• Categorical Comparison: x='Department' places categories on X-axis, y='Marks' on Y-axis\n• IQR (Interquartile Range): Q3 - Q1 represents middle 50% dispersion\n• Whiskers: span typical range within 1.5 * IQR",
        code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Create sample data
data = {
    'Department': [
        'CSE', 'CSE', 'CSE', 'CSE', 'CSE',
        'ECE', 'ECE', 'ECE', 'ECE', 'ECE',
        'EEE', 'EEE', 'EEE', 'EEE', 'EEE'
    ],
    'Marks': [
        78, 85, 90, 72, 88,
        65, 70, 82, 75, 80,
        60, 68, 72, 76, 85
    ]
}

df = pd.DataFrame(data)

print("Data:")
print(df)

# Create Box Plot
plt.figure(figsize=(8, 5))

sns.boxplot(
    x='Department',
    y='Marks',
    data=df
)

plt.title("Marks Distribution by Department")
plt.xlabel("Department")
plt.ylabel("Marks")
plt.grid(axis='y', linestyle='--', alpha=0.5)

plt.tight_layout()
plt.show()`,
        output: `Data:
   Department  Marks
0         CSE     78
1         CSE     85
2         CSE     90
3         CSE     72
4         CSE     88
5         ECE     65
6         ECE     70
7         ECE     82
8         ECE     75
9         ECE     80
10        EEE     60
11        EEE     68
12        EEE     72
13        EEE     76
14        EEE     85

Graphical Output:
The box plot displays one box for each category:
• CSE → distribution of CSE marks 
• ECE → distribution of ECE marks 
• EEE → distribution of EEE marks 

Each box plot shows:
• Median – middle value 
• Q1 – first quartile 
• Q3 – third quartile 
• IQR – Q3 − Q1 
• Whiskers – range of typical observations 
• Outliers – unusually high or low observations 

Explanation:
A Box Plot is useful when a dataset contains a numerical variable and one or more categorical variables. It allows the distributions of several categories to be compared in a single graph.
For example, in this program, Department is the categorical variable, while Marks is the numerical variable.
The statement sns.boxplot(x='Department', y='Marks', data=df) creates the plot:
• x='Department' places categories on the X-axis. 
• y='Marks' places numerical values on the Y-axis. 
• data=df specifies the DataFrame. 

Result:
Thus, the Box Plot was successfully created to visualize and compare the distribution of numerical data across multiple categorical variables.`,
        chartType: "bar",
        chartData: {
          labels: ["CSE", "ECE", "EEE"],
          datasets: [
            {
              label: "Min Mark",
              data: [72, 65, 60],
              backgroundColor: "rgba(56, 189, 248, 0.4)",
              borderColor: "#38bdf8",
              borderWidth: 1
            },
            {
              label: "Median Mark",
              data: [85, 75, 72],
              backgroundColor: "rgba(251, 191, 36, 0.7)",
              borderColor: "#fbbf24",
              borderWidth: 1
            },
            {
              label: "Max Mark",
              data: [90, 82, 85],
              backgroundColor: "rgba(52, 211, 153, 0.7)",
              borderColor: "#34d399",
              borderWidth: 1
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "exp-6",
    number: "6",
    title: "Time Series Analysis",
    category: "Time Series",
    previewDuration: "00:10",
    videoThumbnail: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80",
    previewVideoUrl: "https://www.youtube.com/embed/Y_V728X_lOE",
    description: "Analyze chronological data patterns, decompose seasonal variations, evaluate stationarity, and forecast future values using models.",
    tags: ["ARIMA", "SARIMAX", "LSTM", "Dickey-Fuller", "Holt-Winters"],
    githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/tree/main/experiments/exp-6-time_series_analysis",
    vivaQuestions: [
      {
            "q": "What defines a stationary time series and why is it crucial for ARIMA?",
            "a": "A stationary time series has constant mean, constant variance, and autocovariance that depends only on lag rather than time. ARIMA models require stationarity so statistical estimates remain valid across future time horizons.",
            "concept": "Econometric Time Series Modeling"
      },
      {
            "q": "What is the difference between Downsampling and Upsampling in Time Series?",
            "a": "Downsampling aggregates high-frequency data to a lower frequency (e.g., hourly to daily sum/mean). Upsampling increases frequency (e.g., monthly to daily), requiring interpolation or forward-fill (ffill).",
            "concept": "Temporal Frequency Resampling"
      },
      {
            "q": "How does tz_localize() differ from tz_convert()?",
            "a": "tz_localize() attaches a time zone to a naive (unaware) timestamp without altering clock time. tz_convert() transforms an already localized timestamp to a different time zone, shifting clock time based on UTC offsets.",
            "concept": "Global Timezone Normalization"
      }
],
    subTasks: [
      {
        letter: "A",
        codeId: "6A",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-6-time_series_analysis/task_6a_create_time_series_using_datetime_o.py",
        title: "Create time series using datetime object in pandas indexed by timestamps",
        duration: "05:00 min",
        videoUrl: "https://www.youtube.com/embed/Y_V728X_lOE",
        aim: "To create a time series in Pandas using datetime objects and use the timestamps as the index of the time series.",
        syntax: `pd.to_datetime(date_values)
pd.Series(data, index=datetime_index)

General syntax:
import pandas as pd

dates = pd.to_datetime([...])
series = pd.Series(data, index=dates)`,
        concept: "Aim: To create a time series in Pandas using datetime objects and use the timestamps as the index of the time series.\n\nSyntax:\npd.to_datetime(date_values)\npd.Series(data, index=datetime_index)\n\nGeneral syntax:\nimport pandas as pd\ndates = pd.to_datetime([...])\nseries = pd.Series(data, index=dates)",
        code: `import pandas as pd

# Create datetime objects
dates = pd.to_datetime([
    '2026-01-01',
    '2026-01-02',
    '2026-01-03',
    '2026-01-04',
    '2026-01-05'
])

# Create data
temperature = [28, 30, 29, 31, 32]

# Create time series with timestamps as index
time_series = pd.Series(
    temperature,
    index=dates
)

# Display the time series
print("Time Series:")
print(time_series)`,
        output: `Time Series:
2026-01-01    28
2026-01-02    30
2026-01-03    29
2026-01-04    31
2026-01-05    32
dtype: int64

The index of the Series consists of timestamps, while the corresponding values represent the temperature recorded on each date.`,
        chartType: "timeSeries",
        chartData: {
          labels: ["2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05"],
          datasets: [
            {
              label: "Recorded Temperature (°C)",
              data: [28, 30, 29, 31, 32],
              borderColor: "#38bdf8",
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              fill: true,
              pointBackgroundColor: "#38bdf8",
              pointBorderColor: "#ffffff",
              pointRadius: 6,
              pointHoverRadius: 8,
              tension: 0.3
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "B",
        codeId: "6B",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-6-time_series_analysis/task_6b_use_pandas_date_range_to_generate_a.py",
        title: "Use pandas.date_range to generate a DatetimeIndex with an indicated length",
        duration: "05:00 min",
        videoUrl: "https://www.youtube.com/embed/nOUZG_jBxLk",
        aim: "To generate a DatetimeIndex of a specified length using the pandas.date_range() function.",
        syntax: `pd.date_range(start=None, end=None, periods=None, freq='D')

Important Parameters:
• start – Starting date/time.
• end – Ending date/time.
• periods – Number of timestamps to generate.
• freq – Frequency of timestamps, such as D (daily), h (hourly), M (monthly).

For a specified length, the commonly used syntax is:
pd.date_range(start='YYYY-MM-DD', periods=n, freq='D')`,
        concept: "Aim: To generate a DatetimeIndex of a specified length using the pandas.date_range() function.\n\nSyntax:\npd.date_range(start='YYYY-MM-DD', periods=n, freq='D')",
        code: `import pandas as pd

# Generate a DatetimeIndex with 7 dates
date_index = pd.date_range(
    start='2026-01-01',
    periods=7,
    freq='D'
)

# Display the DatetimeIndex
print("Generated DatetimeIndex:")
print(date_index)`,
        output: `Generated DatetimeIndex:

DatetimeIndex(['2026-01-01', '2026-01-02', '2026-01-03',
               '2026-01-04', '2026-01-05', '2026-01-06',
               '2026-01-07'],
              dtype='datetime64[ns]', freq='D')

Explanation:
The pd.date_range() function is used to generate a sequence of dates at regular intervals.
In the program:
pd.date_range(
    start='2026-01-01',
    periods=7,
    freq='D'
)

Step-by-step:
1. start='2026-01-01': Specifies the starting date.
2. periods=7: Specifies that exactly 7 timestamps should be generated.
3. freq='D': Specifies a daily frequency, so each timestamp is one day apart.
The resulting object is a DatetimeIndex.`,
        chartType: "timeSeries",
        chartData: {
          labels: ["2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04", "2026-01-05", "2026-01-06", "2026-01-07"],
          datasets: [
            {
              label: "Generated DatetimeIndex Progression (Periods 1 to 7)",
              data: [1, 2, 3, 4, 5, 6, 7],
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              fill: true,
              pointBackgroundColor: "#10b981",
              pointBorderColor: "#ffffff",
              pointRadius: 6,
              pointHoverRadius: 8,
              tension: 0.1,
              stepped: true
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "C",
        codeId: "6C",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-6-time_series_analysis/task_6c_generate_date_ranges_with_time_zone.py",
        title: "Generate date ranges with time zones, localize, convert using tz_convert(), and combine series",
        duration: "06:00 min",
        videoUrl: "https://www.youtube.com/embed/ayhlXvAIjzk",
        aim: "To generate date ranges by setting a time zone, localizing a time zone, converting timestamps to another time zone using tz_convert(), and combining time-series data from two different time zones using Pandas.",
        syntax: `1. Generate date range with a time zone:
pd.date_range(start, periods=n, freq='h', tz='Asia/Kolkata')

2. Localize a time zone:
datetime_index.tz_localize('Asia/Kolkata')

3. Convert to another time zone:
datetime_index.tz_convert('America/New_York')

4. Combine time series:
pd.concat([series1, series2])`,
        concept: "Aim: To generate date ranges by setting a time zone, localizing a time zone, converting timestamps to another time zone using tz_convert(), and combining time-series data from two different time zones using Pandas.",
        code: `import pandas as pd

# --------------------------------------------------
# 1. Generate date range by setting a time zone
# --------------------------------------------------

india_dates = pd.date_range(
    start='2026-01-01 09:00',
    periods=3,
    freq='h',
    tz='Asia/Kolkata'
)

print("1. Date Range with Asia/Kolkata Time Zone:")
print(india_dates)


# --------------------------------------------------
# 2. Create a timezone-naive DatetimeIndex
# --------------------------------------------------

dates = pd.date_range(
    start='2026-01-01 09:00',
    periods=3,
    freq='h'
)

print("\\n2. Timezone-naive Date Range:")
print(dates)


# --------------------------------------------------
# 3. Localize the timezone
# --------------------------------------------------

localized_dates = dates.tz_localize('Asia/Kolkata')

print("\\n3. After Localizing to Asia/Kolkata:")
print(localized_dates)


# --------------------------------------------------
# 4. Convert to another timezone using tz_convert()
# --------------------------------------------------

new_york_dates = localized_dates.tz_convert(
    'America/New_York'
)

print("\\n4. Converted to America/New_York:")
print(new_york_dates)


# --------------------------------------------------
# 5. Create another time series in a different timezone
# --------------------------------------------------

india_series = pd.Series(
    [100, 200, 300],
    index=localized_dates
)

new_york_series = pd.Series(
    [400, 500, 600],
    index=new_york_dates
)

print("\\n5. India Time Series:")
print(india_series)

print("\\nNew York Time Series:")
print(new_york_series)


# --------------------------------------------------
# 6. Combine two different timezone series
# --------------------------------------------------

combined_series = pd.concat([
    india_series,
    new_york_series
])

print("\\n6. Combined Time Series:")
print(combined_series)`,
        output: `1. Date Range with Asia/Kolkata Time Zone:
DatetimeIndex(['2026-01-01 09:00:00+05:30',
               '2026-01-01 10:00:00+05:30',
               '2026-01-01 11:00:00+05:30'],
              dtype='datetime64[ns, Asia/Kolkata]', freq='h')

2. Timezone-naive Date Range:
DatetimeIndex(['2026-01-01 09:00:00',
               '2026-01-01 10:00:00',
               '2026-01-01 11:00:00'],
              dtype='datetime64[ns]', freq='h')

3. After Localizing to Asia/Kolkata:
DatetimeIndex(['2026-01-01 09:00:00+05:30',
               '2026-01-01 10:00:00+05:30',
               '2026-01-01 11:00:00+05:30'],
              dtype='datetime64[ns, Asia/Kolkata]', freq='h')

4. Converted to America/New_York:
DatetimeIndex(['2025-12-31 22:30:00-05:00',
               '2025-12-31 23:30:00-05:00',
               '2026-01-01 00:30:00-05:00'],
              dtype='datetime64[ns, America/New_York]', freq='h')

5. India Time Series:
2026-01-01 09:00:00+05:30    100
2026-01-01 10:00:00+05:30    200
2026-01-01 11:00:00+05:30    300
dtype: int64

New York Time Series:
2025-12-31 22:30:00-05:00    400
2025-12-31 23:30:00-05:00    500
2026-01-01 00:30:00-05:00    600
dtype: int64

6. Combined Time Series:
2025-12-31 22:30:00-05:00    400
2025-12-31 23:30:00-05:00    500
2026-01-01 00:30:00-05:00    600
2026-01-01 09:00:00+05:30    100
2026-01-01 10:00:00+05:30    200
2026-01-01 11:00:00+05:30    300
dtype: int64`,
        chartType: "bar",
        chartData: {
          labels: [
            "NY 22:30 (-05:00)", "NY 23:30 (-05:00)", "NY 00:30 (-05:00)",
            "IST 09:00 (+05:30)", "IST 10:00 (+05:30)", "IST 11:00 (+05:30)"
          ],
          datasets: [
            {
              label: "Combined Series Values (New York vs India)",
              data: [400, 500, 600, 100, 200, 300],
              backgroundColor: [
                "rgba(168, 85, 247, 0.75)",
                "rgba(168, 85, 247, 0.75)",
                "rgba(168, 85, 247, 0.75)",
                "rgba(56, 189, 248, 0.75)",
                "rgba(56, 189, 248, 0.75)",
                "rgba(56, 189, 248, 0.75)"
              ],
              borderColor: [
                "#a855f7",
                "#a855f7",
                "#a855f7",
                "#38bdf8",
                "#38bdf8",
                "#38bdf8"
              ],
              borderWidth: 1.5,
              borderRadius: 6
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "D",
        codeId: "6D",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-6-time_series_analysis/task_6d_perform_period_arithmetic_such_as_a.py",
        title: "Perform period arithmetic such as adding and subtracting integers from periods and construct range of periods using period_range function",
        duration: "05:00 min",
        videoUrl: "https://www.youtube.com/embed/7L2sOOTQgaw",
        aim: "To perform period arithmetic by adding and subtracting integers from Pandas Period objects and to construct a range of periods using the period_range() function.",
        syntax: `1. Create a Period:
pd.Period('2026-01', freq='M')

2. Add an integer to a Period:
period + integer

3. Subtract an integer from a Period:
period - integer

4. Construct a range of periods:
pd.period_range(start, periods=n, freq='M')`,
        concept: "Aim: To perform period arithmetic by adding and subtracting integers from Pandas Period objects and to construct a range of periods using the period_range() function.",
        code: `import pandas as pd

# Create a monthly Period
p = pd.Period('2026-01', freq='M')

print("Original Period:")
print(p)

# Add integers to the period
print("\\nAfter adding 2:")
print(p + 2)

print("\\nAfter adding 5:")
print(p + 5)

# Subtract integers from the period
print("\\nAfter subtracting 1:")
print(p - 1)

print("\\nAfter subtracting 3:")
print(p - 3)

# Create a range of monthly periods
periods = pd.period_range(
    start='2026-01',
    periods=6,
    freq='M'
)

print("\\nRange of Periods:")
print(periods)`,
        output: `Original Period:
2026-01

After adding 2:
2026-03

After adding 5:
2026-06

After subtracting 1:
2025-12

After subtracting 3:
2025-10

Range of Periods:
PeriodIndex(['2026-01', '2026-02', '2026-03',
             '2026-04', '2026-05', '2026-06'],
            dtype='period[M]')`,
        chartType: "bar",
        chartData: {
          labels: [
            "p - 3 (2025-10)",
            "p - 1 (2025-12)",
            "p: Base (2026-01)",
            "p + 2 (2026-03)",
            "p + 5 (2026-06)"
          ],
          datasets: [
            {
              label: "Period Arithmetic Shift (Months from Base '2026-01')",
              data: [-3, -1, 0, 2, 5],
              backgroundColor: [
                "rgba(244, 63, 94, 0.75)",
                "rgba(251, 146, 60, 0.75)",
                "rgba(56, 189, 248, 0.9)",
                "rgba(16, 185, 129, 0.75)",
                "rgba(129, 140, 248, 0.75)"
              ],
              borderColor: [
                "#f43f5e",
                "#fb923c",
                "#38bdf8",
                "#10b981",
                "#818cf8"
              ],
              borderWidth: 1.5,
              borderRadius: 6
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "E",
        codeId: "6E",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-6-time_series_analysis/task_6e_convert_periods_and_periodindex_obj.py",
        title: "Convert Periods and PeriodIndex objects to another frequency with asfreq method",
        duration: "05:00 min",
        videoUrl: "https://www.youtube.com/embed/4YjKOJPhlRs",
        aim: "To convert Pandas Period and PeriodIndex objects from one frequency to another using the asfreq() method.",
        syntax: `1. Convert a Period to another frequency:
period.asfreq(freq, how='start')

2. Convert a PeriodIndex to another frequency:
period_index.asfreq(freq, how='start')

Parameters:
• freq – The target frequency, such as 'D', 'M', 'Q', or 'Y'.
• how – Specifies whether to use the start or end of the period.
  o 'start' – Beginning of the period.
  o 'end' – End of the period.`,
        concept: "Aim: To convert Pandas Period and PeriodIndex objects from one frequency to another using the asfreq() method.",
        code: `import pandas as pd

# --------------------------------------------------
# 1. Create a monthly Period
# --------------------------------------------------

p = pd.Period('2026-01', freq='M')

print("Original Period:")
print(p)


# --------------------------------------------------
# 2. Convert monthly Period to daily frequency
# --------------------------------------------------

daily_start = p.asfreq('D', how='start')

print("\\nMonthly Period converted to Daily (Start):")
print(daily_start)


daily_end = p.asfreq('D', how='end')

print("\\nMonthly Period converted to Daily (End):")
print(daily_end)


# --------------------------------------------------
# 3. Create a PeriodIndex
# --------------------------------------------------

period_index = pd.period_range(
    start='2026-01',
    periods=3,
    freq='M'
)

print("\\nOriginal PeriodIndex:")
print(period_index)


# --------------------------------------------------
# 4. Convert PeriodIndex to daily frequency
# --------------------------------------------------

daily_period_index = period_index.asfreq(
    'D',
    how='start'
)

print("\\nPeriodIndex converted to Daily Frequency:")
print(daily_period_index)


# --------------------------------------------------
# 5. Convert PeriodIndex to daily frequency at end
# --------------------------------------------------

daily_period_index_end = period_index.asfreq(
    'D',
    how='end'
)

print("\\nPeriodIndex converted to Daily Frequency (End):")
print(daily_period_index_end)`,
        output: `Original Period:
2026-01

Monthly Period converted to Daily (Start):
2026-01-01

Monthly Period converted to Daily (End):
2026-01-31

Original PeriodIndex:
PeriodIndex(['2026-01', '2026-02', '2026-03'],
            dtype='period[M]')

PeriodIndex converted to Daily Frequency:
PeriodIndex(['2026-01-01', '2026-02-01', '2026-03-01'],
            dtype='period[D]')

PeriodIndex converted to Daily Frequency (End):
PeriodIndex(['2026-01-31', '2026-02-28', '2026-03-31'],
            dtype='period[D]')`,
        chartType: "bar",
        chartData: {
          labels: ["2026-01 (January)", "2026-02 (February)", "2026-03 (March)"],
          datasets: [
            {
              label: "Start Day of Month (how='start')",
              data: [1, 1, 1],
              backgroundColor: "rgba(56, 189, 248, 0.8)",
              borderColor: "#38bdf8",
              borderWidth: 1.5,
              borderRadius: 6
            },
            {
              label: "End Day of Month (how='end')",
              data: [31, 28, 31],
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              borderColor: "#10b981",
              borderWidth: 1.5,
              borderRadius: 6
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "F",
        codeId: "6F",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-6-time_series_analysis/task_6f_convert_series_and_dataframe_object.py",
        title: "Convert Series and DataFrame objects indexed by timestamps to periods with the to_period method",
        duration: "05:00 min",
        videoUrl: "https://www.youtube.com/embed/cEHH0luMP8k",
        aim: "To convert Series and DataFrame objects indexed by timestamps into Period and PeriodIndex objects using the Pandas to_period() method.",
        syntax: `1. Convert a Series to a PeriodIndex:
series.to_period(freq)

2. Convert a DataFrame to a PeriodIndex:
dataframe.to_period(freq)

Where:
• freq specifies the desired frequency:
  • 'D' → Daily
  • 'M' → Monthly
  • 'Q' → Quarterly
  • 'Y' → Yearly`,
        concept: "Aim: To convert Series and DataFrame objects indexed by timestamps into Period and PeriodIndex objects using the Pandas to_period() method.",
        code: `import pandas as pd

# --------------------------------------------------
# 1. Create a Series with timestamp index
# --------------------------------------------------

dates = pd.to_datetime([
    '2026-01-10',
    '2026-02-15',
    '2026-03-20',
    '2026-04-25'
])

sales = pd.Series(
    [1000, 1500, 1800, 2200],
    index=dates
)

print("Original Series:")
print(sales)


# --------------------------------------------------
# 2. Convert Series from timestamps to monthly periods
# --------------------------------------------------

period_series = sales.to_period('M')

print("\\nSeries converted to Monthly Periods:")
print(period_series)


# --------------------------------------------------
# 3. Create a DataFrame with timestamp index
# --------------------------------------------------

df = pd.DataFrame(
    {
        'Sales': [1000, 1500, 1800, 2200],
        'Profit': [200, 300, 400, 500]
    },
    index=dates
)

print("\\nOriginal DataFrame:")
print(df)


# --------------------------------------------------
# 4. Convert DataFrame to monthly periods
# --------------------------------------------------

period_df = df.to_period('M')

print("\\nDataFrame converted to Monthly Periods:")
print(period_df)`,
        output: `1. Original Series:
Original Series:
2026-01-10    1000
2026-02-15    1500
2026-03-20    1800
2026-04-25    2200
dtype: int64

2. Series Converted to Monthly Periods:
Series converted to Monthly Periods:
2026-01    1000
2026-02    1500
2026-03    1800
2026-04    2200
Freq: M, dtype: int64

3. Original DataFrame:
Original DataFrame:
            Sales  Profit
2026-01-10   1000     200
2026-02-15   1500     300
2026-03-20   1800     400
2026-04-25   2200     500

4. DataFrame Converted to Monthly Periods:
DataFrame converted to Monthly Periods:
         Sales  Profit
2026-01   1000     200
2026-02   1500     300
2026-03   1800     400
2026-04   2200     500

Freq: M`,
        chartType: "bar",
        chartData: {
          labels: ["2026-01 (Jan)", "2026-02 (Feb)", "2026-03 (Mar)", "2026-04 (Apr)"],
          datasets: [
            {
              label: "Sales ($)",
              data: [1000, 1500, 1800, 2200],
              backgroundColor: "rgba(56, 189, 248, 0.8)",
              borderColor: "#38bdf8",
              borderWidth: 1.5,
              borderRadius: 6
            },
            {
              label: "Profit ($)",
              data: [200, 300, 400, 500],
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              borderColor: "#10b981",
              borderWidth: 1.5,
              borderRadius: 6
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      {
        letter: "G",
        codeId: "6G",
        githubUrl: "https://github.com/pradyumna-devi/mbu-datascience-lab/blob/main/experiments/exp-6-time_series_analysis/task_6g_perform_resampling_downsampling_and.py",
        title: "Perform resampling, downsampling and upsampling for the time series",
        duration: "06:00 min",
        videoUrl: "https://www.youtube.com/embed/qS1iSepWLlE",
        aim: "To perform resampling, downsampling, and upsampling operations on a time series using Pandas.",
        syntax: `1. Resampling:
series.resample('frequency').aggregation_function()
Example: series.resample('D').mean()

2. Downsampling:
series.resample('larger_frequency').sum()
Example: series.resample('6h').sum()

3. Upsampling:
series.resample('smaller_frequency').asfreq()
# or with forward fill:
series.resample('smaller_frequency').ffill()`,
        concept: "Aim: To perform resampling, downsampling, and upsampling operations on a time series using Pandas.",
        code: `import pandas as pd

# --------------------------------------------------
# 1. Create an hourly time series
# --------------------------------------------------

dates = pd.date_range(
    start='2026-01-01 00:00',
    periods=12,
    freq='h'
)

values = [10, 12, 15, 14, 18, 20,
          22, 21, 25, 28, 30, 32]

time_series = pd.Series(
    values,
    index=dates
)

print("Original Hourly Time Series:")
print(time_series)


# --------------------------------------------------
# 2. Resampling - calculate 3-hourly mean
# --------------------------------------------------

resampled = time_series.resample('3h').mean()

print("\\nResampled Time Series - 3 Hour Mean:")
print(resampled)


# --------------------------------------------------
# 3. Downsampling - Hourly to 4-hourly
# --------------------------------------------------

downsampled = time_series.resample('4h').sum()

print("\\nDownsampled Time Series - 4 Hour Sum:")
print(downsampled)


# --------------------------------------------------
# 4. Upsampling - Hourly to 30-minute intervals
# --------------------------------------------------

upsampled = time_series.resample('30min').asfreq()

print("\\nUpsampled Time Series - 30 Minute:")
print(upsampled)


# --------------------------------------------------
# 5. Upsampling with Forward Fill
# --------------------------------------------------

upsampled_ffill = time_series.resample('30min').ffill()

print("\\nUpsampled Time Series using Forward Fill:")
print(upsampled_ffill)`,
        output: `1. Original Time Series:
Original Hourly Time Series:

2026-01-01 00:00:00    10
2026-01-01 01:00:00    12
2026-01-01 02:00:00    15
2026-01-01 03:00:00    14
2026-01-01 04:00:00    18
2026-01-01 05:00:00    20
2026-01-01 06:00:00    22
2026-01-01 07:00:00    21
2026-01-01 08:00:00    25
2026-01-01 09:00:00    28
2026-01-01 10:00:00    30
2026-01-01 11:00:00    32
Freq: h, dtype: int64

2. Resampling (3-Hour Mean):
2026-01-01 00:00:00    12.333333
2026-01-01 03:00:00    17.333333
2026-01-01 06:00:00    22.666667
2026-01-01 09:00:00    30.000000
Freq: 3h, dtype: float64
Calculation: (10 + 12 + 15) / 3 = 12.33

3. Downsampling (4-Hour Sum):
2026-01-01 00:00:00     51
2026-01-01 04:00:00     81
2026-01-01 08:00:00    115
Freq: 4h, dtype: int64
Calculation: 10 + 12 + 15 + 14 = 51

4. Upsampling (30-Minute with NaN):
2026-01-01 00:00:00    10.0
2026-01-01 00:30:00     NaN
2026-01-01 01:00:00    12.0
2026-01-01 01:30:00     NaN
2026-01-01 02:00:00    15.0
...
Freq: 30min, dtype: float64

5. Upsampling Using Forward Fill (ffill):
2026-01-01 00:00:00    10
2026-01-01 00:30:00    10
2026-01-01 01:00:00    12
2026-01-01 01:30:00    12
2026-01-01 02:00:00    15
...
Freq: 30min, dtype: int64`,
        chartType: "timeSeries",
        chartData: {
          labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
          datasets: [
            {
              label: "Original Hourly Observations",
              data: [10, 12, 15, 14, 18, 20, 22, 21, 25, 28, 30, 32],
              borderColor: "#38bdf8",
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              fill: true,
              pointRadius: 5,
              tension: 0.25
            },
            {
              label: "3-Hour Resampled Mean (Downsampled)",
              data: [12.33, 12.33, 12.33, 17.33, 17.33, 17.33, 22.67, 22.67, 22.67, 30.0, 30.0, 30.0],
              borderColor: "#fbbf24",
              borderDash: [6, 4],
              pointRadius: 3,
              tension: 0,
              fill: false
            }
          ]
        },
        outputImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

export const INITIAL_MODULES = [
  {
    id: "mod-1",
    code: "DS-MOD-101",
    title: "Module 1: Introduction to Data Science",
    category: "Introduction to Data Science",
    hours: "14 Theory + 28 Lab Hours",
    credits: "4 Credits",
    gradient: "linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(37, 99, 235, 0.1))",
    borderColor: "rgba(14, 165, 233, 0.4)",
    badgeColor: "#38bdf8",
    icon: "layers",
    description: "Fundamental principles of Data Science, lifecycle phases, interactive computing environments in Python, high-performance numerical computing with NumPy, and structured tabular manipulation using Pandas.",
    topics: [
      "Data Science lifecycle, multidisciplinary foundations & problem formulation",
      "Python data science ecosystem & interactive development environments",
      "NumPy N-dimensional array architectures, vectorization & numerical broadcasting",
      "Pandas Series and DataFrame structures, indexing, slicing & attribute inspection",
      "Descriptive statistics: measures of central tendency, dispersion & exploratory distributions",
      "Data governance, ethical analytics, reproducibility & privacy standards"
    ],
    syllabusUnits: [
      "Unit I: Foundations & The Data Science Lifecycle",
      "Unit II: Computational Ecosystem & Numerical Computing with NumPy",
      "Unit III: Tabular Data Structures with Pandas & Exploratory Diagnostics"
    ],
    relevantExpId: "exp-1",
    relevantExpTitle: "Experiment 1: Introduction to Data Science & Tabular Computing"
  },
  {
    id: "mod-2",
    code: "DS-MOD-102",
    title: "Module 2: Data Extraction",
    category: "Data Extraction",
    hours: "14 Theory + 28 Lab Hours",
    credits: "4 Credits",
    gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(99, 102, 241, 0.1))",
    borderColor: "rgba(168, 85, 247, 0.4)",
    badgeColor: "#c084fc",
    icon: "database",
    description: "Protocols and engineering pipelines for acquiring, extracting, and ingesting data across heterogeneous sources: relational databases via SQL, RESTful web APIs with authentication, HTML web scraping with BeautifulSoup, and semi-structured file parsing.",
    topics: [
      "Data acquisition pipelines: primary, secondary & third-party streaming sources",
      "Relational database extraction: SQL queries, SQLite connections & DataFrame loading",
      "RESTful API consumption: HTTP methods, response headers & JSON data normalization",
      "API authentication: API keys, Bearer tokens, rate limiting & pagination handling",
      "Web scraping protocols: BeautifulSoup, HTML DOM tree navigation & tag filtering",
      "Parsing semi-structured data: JSON, XML, CSV, TSV & unstructured text streams",
      "Ethical data extraction, robots.txt compliance, error handling & network resiliency"
    ],
    syllabusUnits: [
      "Unit I: Relational Database Connectivity & SQL Query Extraction",
      "Unit II: RESTful Web APIs, JSON/XML Endpoints & Authentication Protocols",
      "Unit III: Web Scraping, HTML DOM Parsing & Semi-Structured Data Pipelines"
    ],
    relevantExpId: "exp-2",
    relevantExpTitle: "Experiment 2: Data Extraction, REST APIs & Web Scraping"
  }
];

export const INITIAL_TOOLS = [
  {
    id: "tool-scratchpad",
    name: "Python Virtual REPL & Scratchpad",
    badge: "Interactive Kernel",
    icon: "terminal",
    description: "Run and test arbitrary Python and Pandas code snippets directly in your browser with real-time simulated execution output.",
    category: "Execution"
  },
  {
    id: "tool-dataset-inspector",
    name: "Dataset Inspector & CSV Analyzer",
    badge: "Data Telemetry",
    icon: "file-spreadsheet",
    description: "Inspect popular data science benchmark datasets (Iris, Titanic, Stock Series) or upload your custom CSV file to compute instant summary statistics.",
    category: "Inspection"
  },
  {
    id: "tool-metric-calc",
    name: "ML & Statistics Metric Calculator",
    badge: "Diagnostic Tool",
    icon: "calculator",
    description: "Calculate Confusion Matrix parameters (Accuracy, Precision, Recall, F1), Dickey-Fuller stationarity p-values, and Regression MSE/R².",
    category: "Analytics"
  },
  {
    id: "tool-cheatsheet",
    name: "Data Science Cheat Sheets & Quick Reference",
    badge: "Reference Hub",
    icon: "book-open",
    description: "Instant lookups for Pandas indexing, NumPy vector math, Matplotlib plotting commands, and Time Series modeling syntax.",
    category: "Reference"
  }
];


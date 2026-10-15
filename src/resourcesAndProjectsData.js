// Mohan Babu University (MBU) - Data Science Digital Lab
// Curated Resources and Real-World Capstone Projects Data

export const INITIAL_RESOURCES = {
  datasets: [
    {
      id: "dataset-iris",
      csvKey: "iris",
      title: "Iris Flower Benchmark Dataset",
      category: "Classification",
      format: "CSV",
      samples: "150 rows",
      features: "4 numeric features + 1 target",
      size: "4.8 KB",
      badgeColor: "#38bdf8",
      icon: "flower-2",
      description: "Fisher's classic multivariate dataset consisting of 50 samples from each of three species of Iris (Iris setosa, Iris virginica, and Iris versicolor). Measures Sepal Length, Sepal Width, Petal Length, and Petal Width.",
      tags: ["Classification", "K-Means", "PCA", "Fisher 1936"],
      filename: "iris_dataset_benchmark.csv",
      sampleScript: `import numpy as np
import pandas as pd

# Load Iris Flower Benchmark Dataset
url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
try:
    df = pd.read_csv(url)
except Exception:
    # Synthetic fallback simulation
    data = {
        'sepal_length': [5.1, 4.9, 4.7, 7.0, 6.4, 6.9, 6.3, 5.8, 7.1],
        'sepal_width': [3.5, 3.0, 3.2, 3.2, 3.2, 3.1, 3.3, 2.7, 3.0],
        'petal_length': [1.4, 1.4, 1.3, 4.7, 4.5, 4.9, 6.0, 5.1, 5.9],
        'petal_width': [0.2, 0.2, 0.2, 1.4, 1.5, 1.5, 2.5, 1.9, 2.1],
        'species': ['setosa', 'setosa', 'setosa', 'versicolor', 'versicolor', 'versicolor', 'virginica', 'virginica', 'virginica']
    }
    df = pd.DataFrame(data)

print("--- IRIS DATASET SHAPE & HEAD ---")
print(f"Shape: {df.shape[0]} rows x {df.shape[1]} columns")
print(df.head())

print("\\n--- GROUPED SUMMARY STATISTICS BY SPECIES ---")
print(df.groupby('species').mean().round(2))
`
    },
    {
      id: "dataset-titanic",
      csvKey: "titanic",
      title: "Titanic Passenger Manifest & Survival",
      category: "Binary Classification",
      format: "CSV",
      samples: "891 rows",
      features: "12 attributes",
      size: "59.8 KB",
      badgeColor: "#10b981",
      icon: "ship",
      description: "Historical manifest of passengers aboard RMS Titanic. Used widely in data wrangling and classification to predict passenger survival based on class (Pclass), gender (Sex), age (Age), fare (Fare), and embarkation port.",
      tags: ["Binary Classification", "Missing Value Imputation", "Logistic Regression"],
      filename: "titanic_passenger_survival.csv",
      sampleScript: `import numpy as np
import pandas as pd

# Titanic Data Wrangling & Survival Rate Analysis
data = {
    'PassengerId': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'Survived': [0, 1, 1, 1, 0, 0, 0, 0, 1, 1],
    'Pclass': [3, 1, 3, 1, 3, 3, 1, 3, 3, 2],
    'Sex': ['male', 'female', 'female', 'female', 'male', 'male', 'male', 'male', 'female', 'female'],
    'Age': [22, 38, 26, 35, 35, np.nan, 54, 2, 27, 14],
    'Fare': [7.25, 71.28, 7.92, 53.10, 8.05, 8.46, 51.86, 21.07, 11.13, 30.07]
}
df = pd.DataFrame(data)

print("--- TITANIC SURVIVAL TELEMETRY ---")
print(f"Total Passengers Analyzed: {len(df)}")
print(f"Overall Survival Rate: {df['Survived'].mean():.1%}")

print("\\n--- SURVIVAL RATE BY GENDER ---")
print(df.groupby('Sex')['Survived'].mean().round(3))

print("\\n--- SURVIVAL RATE BY PASSENGER CLASS ---")
print(df.groupby('Pclass')['Survived'].mean().round(3))
`
    },
    {
      id: "dataset-stocks",
      csvKey: "stocks",
      title: "Daily Tech Equities Price Series (OHLCV)",
      category: "Time Series",
      format: "CSV",
      samples: "100 trading days",
      features: "6 temporal series (Open, High, Low, Close, Volume, Ticker)",
      size: "18.2 KB",
      badgeColor: "#a855f7",
      icon: "trending-up",
      description: "Daily trading telemetry covering major technology stocks (AAPL, MSFT, GOOGL, NVDA). Includes moving averages, daily return ratios, and volatility metrics for quantitative backtesting.",
      tags: ["Time Series", "Rolling Statistics", "Financial Analytics", "ADF Test"],
      filename: "tech_equities_daily_ohlcv.csv",
      sampleScript: `import numpy as np
import pandas as pd

# Time Series Rolling Statistics on Stock Series
np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=30, freq='B')
close_prices = 180 + np.cumsum(np.random.randn(30) * 2.5)

df = pd.DataFrame({'Date': dates, 'Close': close_prices})
df['MA_5'] = df['Close'].rolling(window=5).mean()
df['Daily_Return'] = df['Close'].pct_change() * 100

print("--- DAILY EQUITIES TIMESERIES TELEMETRY ---")
print(df[['Date', 'Close', 'MA_5', 'Daily_Return']].tail(8).round(2))
print(f"\\n30-Day Mean Close: \${df['Close'].mean():.2f}")
print(f"Maximum Close: \${df['Close'].max():.2f}")
print(f"Return Volatility (Std Dev): {df['Daily_Return'].std():.2f}%")
`
    },
    {
      id: "dataset-wine",
      csvKey: "wine",
      title: "Wine Quality Physicochemical Benchmark",
      category: "Regression / Ranking",
      format: "CSV",
      samples: "1,599 samples",
      features: "11 physicochemical metrics + 1 quality score",
      size: "84.3 KB",
      badgeColor: "#f43f5e",
      icon: "glass-water",
      description: "Physicochemical tests (fixed acidity, volatile acidity, citric acid, residual sugar, chlorides, free sulfur dioxide, density, pH, sulphates, alcohol) used to model wine sensory quality preferences.",
      tags: ["Multivariate Regression", "Correlation Matrix", "Sensory Scoring"],
      filename: "wine_quality_physicochemical.csv",
      sampleScript: `import numpy as np
import pandas as pd

# Physicochemical Correlation Matrix
data = {
    'fixed_acidity': [7.4, 7.8, 7.8, 11.2, 7.4],
    'volatile_acidity': [0.70, 0.88, 0.76, 0.28, 0.70],
    'citric_acid': [0.00, 0.00, 0.04, 0.56, 0.00],
    'residual_sugar': [1.9, 2.6, 2.3, 1.9, 1.9],
    'alcohol': [9.4, 9.8, 9.8, 9.8, 9.4],
    'quality': [5, 5, 5, 6, 5]
}
df = pd.DataFrame(data)

print("--- WINE QUALITY CORRELATION ENGINE ---")
print(df.corr().round(2))
`
    },
    {
      id: "dataset-california",
      csvKey: "california",
      title: "California Housing Regional Valuation",
      category: "Multivariate Regression",
      format: "CSV",
      samples: "500 block groups",
      features: "8 geographic & demographic predictors",
      size: "42.0 KB",
      badgeColor: "#f59e0b",
      icon: "home",
      description: "Derived from the 1990 U.S. Census. Records median house values for California districts along with median income, housing median age, total rooms, population, and geographic coordinates.",
      tags: ["Regression", "Spatial Statistics", "Feature Engineering"],
      filename: "california_housing_telemetry.csv",
      sampleScript: `import numpy as np
import pandas as pd

# California Housing Regression Analysis
data = {
    'MedInc': [8.32, 8.30, 7.25, 5.64, 3.84, 4.03, 3.65, 3.12],
    'HouseAge': [41.0, 21.0, 52.0, 52.0, 52.0, 52.0, 52.0, 52.0],
    'AveRooms': [6.98, 6.23, 8.28, 5.81, 6.28, 4.76, 4.93, 4.79],
    'Population': [322.0, 2401.0, 496.0, 558.0, 565.0, 413.0, 1094.0, 1157.0],
    'MedHouseVal': [4.52, 3.58, 3.52, 3.41, 3.42, 2.69, 2.99, 2.41]
}
df = pd.DataFrame(data)

print("--- CALIFORNIA HOUSING SUMMARY ---")
print(df.describe().round(2))
correlation = df['MedInc'].corr(df['MedHouseVal'])
print(f"\\nIncome vs Housing Valuation Correlation: {correlation:.3f}")
`
    },
    {
      id: "dataset-students",
      csvKey: "students",
      title: "MBU Student Laboratory Performance Telemetry",
      category: "Academic Analytics",
      format: "CSV",
      samples: "50 student records",
      features: "6 evaluation metrics (Lab Attendance, Task Runs, Quiz, Viva, Final Grade)",
      size: "6.5 KB",
      badgeColor: "#6366f1",
      icon: "graduation-cap",
      description: "Official internal academic cohort dataset tracking Data Science laboratory session attendance, code execution frequencies, unit quiz scores, viva voce marks, and cumulative course outcome grading.",
      tags: ["Curriculum Analytics", "Cohort Slicing", "Grade Prediction"],
      filename: "mbu_student_ds_lab_performance.csv",
      sampleScript: `import numpy as np
import pandas as pd

# Academic Performance Evaluation & Honors Thresholds
data = {
    'RollNo': ['24102A030078', '24102A030079', '24102A030080', '24102A030081', '24102A030082'],
    'StudentName': ['M. Pradyumna Devi', 'Aditya Verma', 'Sneha Reddy', 'Rohan Iyer', 'Pooja Sharma'],
    'LabAttendance': [98, 92, 95, 88, 94],
    'KernelRuns': [142, 95, 110, 64, 88],
    'VivaScore': [29, 26, 28, 22, 27],
    'FinalScore': [98.5, 91.0, 94.2, 84.0, 92.8]
}
df = pd.DataFrame(data)

print("--- MBU DATA SCIENCE LAB SCHOLAR METRICS ---")
print(df[['StudentName', 'LabAttendance', 'KernelRuns', 'VivaScore', 'FinalScore']])
print(f"\\nCohort Mean Score: {df['FinalScore'].mean():.2f}%")
print(f"Highest Achiever: {df.loc[df['FinalScore'].idxmax()]['StudentName']} ({df['FinalScore'].max()}%)")
`
    }
  ],

  officialDocs: [
    {
      id: "doc-pyodide",
      name: "Pyodide CPython 3.12 WebAssembly",
      icon: "terminal",
      version: "v0.26.4 WASM",
      badge: "Runtime Engine",
      url: "https://pyodide.org/en/stable/",
      summary: "Client-side WebAssembly port of the CPython 3.12 interpreter, enabling direct in-browser execution of scientific Python packages without server roundtrips.",
      topics: ["WebAssembly (WASM)", "CPython 3.12", "Virtual Memory Pointers", "Micropip Package Ingestion"]
    },
    {
      id: "doc-numpy",
      name: "NumPy Multi-Dimensional Vector Math",
      icon: "binary",
      version: "v2.1 Reference",
      badge: "Core Array Library",
      url: "https://numpy.org/doc/stable/",
      summary: "Fundamental package for scientific computing in Python. Provides fast N-dimensional array objects, vector broadcasting, linear algebra, and Fourier transforms.",
      topics: ["ndarray Manipulation", "Vector Broadcasting", "np.linalg SVD & Eig", "Array Strides & Slicing"]
    },
    {
      id: "doc-pandas",
      name: "Pandas Data Analysis & Manipulation",
      icon: "database",
      version: "v2.2 API Guide",
      badge: "Data Wrangling",
      url: "https://pandas.pydata.org/docs/",
      summary: "Fast, flexible, and expressive data structures designed to make working with relational or labeled data intuitive. Features DataFrames, Series, and MultiIndex.",
      topics: ["DataFrame & Series", "Hierarchical Indexing", "groupby() & agg()", "Time Series Resampling"]
    },
    {
      id: "doc-matplotlib",
      name: "Matplotlib & Seaborn Visualizations",
      icon: "bar-chart-3",
      version: "v3.9 Engine",
      badge: "Scientific Plots",
      url: "https://matplotlib.org/stable/users/index.html",
      summary: "Comprehensive library for creating static, animated, and interactive scientific charts, multi-panel diagnostic subplots, and statistical heatmaps.",
      topics: ["Figure & Axes Hierarchy", "Seaborn Distplots", "Heatmaps & Regplots", "Colorbar Formats"]
    },
    {
      id: "doc-sklearn",
      name: "Scikit-Learn Machine Learning in Python",
      icon: "cpu",
      version: "v1.5 Reference",
      badge: "ML Toolkit",
      url: "https://scikit-learn.org/stable/",
      summary: "Simple and efficient tools for predictive data analysis, feature preprocessing, model classification, regression fitting, clustering, and metrics evaluation.",
      topics: ["Pipelines & Transformers", "train_test_split", "Confusion Matrix", "ROC-AUC & F1-Score"]
    },
    {
      id: "doc-statsmodels",
      name: "Statsmodels Statistical Computations",
      icon: "trending-up",
      version: "v0.14 Framework",
      badge: "Econometrics",
      url: "https://www.statsmodels.org/stable/",
      summary: "Classes and functions for statistical model estimation, hypothesis testing, exploratory data forensics, and time series Augmented Dickey-Fuller (ADF) tests.",
      topics: ["ADF Stationarity Test", "OLS Regression", "ARIMA / SARIMAX", "Hypothesis P-Values"]
    }
  ],

  textbooks: [
    {
      id: "book-mbu-manual",
      title: "MBU Data Science Digital Library Observation Record & Manual",
      author: "Mohan Babu University Department of Data Science",
      edition: "Academic Year 2024-2025 Edition",
      badge: "Official Lab Manual",
      icon: "book-open",
      description: "Official computational syllabus manual covering Experiments 6 through 10, including Array computing, HTML web scraping, hierarchical multi-indexing, exploratory plotting, and Dickey-Fuller stationarity analysis.",
      isDownloadableManual: true
    },
    {
      id: "book-python-data-analysis",
      title: "Python for Data Analysis (3rd Edition)",
      author: "Wes McKinney (Creator of Pandas)",
      edition: "O'Reilly Media",
      badge: "Core Reference",
      icon: "book-marked",
      description: "The definitive practical guide to data manipulation, exploratory cleaning, time-series analysis, and numerical processing using Pandas, NumPy, and IPython."
    },
    {
      id: "book-hands-on-ml",
      title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow",
      author: "Aurélien Géron",
      edition: "3rd Edition • O'Reilly",
      badge: "Practical ML Guide",
      icon: "cpu",
      description: "Comprehensive end-to-end guide taking students from foundational exploratory data analysis and regression pipelines up to deep neural architectures."
    },
    {
      id: "book-islp",
      title: "An Introduction to Statistical Learning with Applications in Python (ISLP)",
      author: "G. James, D. Witten, T. Hastie, R. Tibshirani",
      edition: "Springer Texts in Statistics",
      badge: "Theoretical Rigor",
      icon: "bookmark",
      description: "Rigorous yet intuitive mathematical foundation of statistical learning algorithms, probability modeling, classification boundaries, and resampling techniques."
    }
  ],

  quickSnippets: [
    {
      title: "Pandas MultiIndex & Reshaping (Stack / Unstack)",
      category: "Data Wrangling",
      code: `import pandas as pd
arrays = [['Metro', 'Metro', 'Rural', 'Rural'], ['North', 'South', 'North', 'South']]
index = pd.MultiIndex.from_arrays(arrays, names=('Region', 'Zone'))
df = pd.DataFrame({'Sales': [450, 620, 210, 340], 'Returns': [12, 19, 4, 8]}, index=index)
# Unstack inner index into columns:
wide_df = df.unstack(level='Zone')
print(wide_df)`
    },
    {
      title: "Augmented Dickey-Fuller (ADF) Stationarity Evaluation",
      category: "Time Series",
      code: `import numpy as np
from statsmodels.tsa.stattools import adfuller

# Simulate time series:
data = np.cumsum(np.random.randn(100))
adf_result = adfuller(data, autolag='AIC')
print(f"ADF Statistic: {adf_result[0]:.4f}")
print(f"p-value: {adf_result[1]:.4f}")
print("Stationary (Reject H0):", adf_result[1] < 0.05)`
    },
    {
      title: "Classification Confusion Matrix Diagnostics",
      category: "Machine Learning",
      code: `from sklearn.metrics import confusion_matrix, classification_report
y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0]
cm = confusion_matrix(y_true, y_pred)
print("Confusion Matrix:\\n", cm)
print("\\nClassification Report:\\n", classification_report(y_true, y_pred))`
    },
    {
      title: "Matplotlib Scientific Dual-Subplot Canvas",
      category: "Visualization",
      code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
ax1.plot(x, np.sin(x), color='#06b6d4', lw=2)
ax1.set_title("Harmonic Waveform")
ax2.plot(x, np.exp(-x/3) * np.cos(x), color='#a855f7', lw=2)
ax2.set_title("Damped Oscillation")
plt.tight_layout()
plt.show()`
    }
  ]
};

export const INITIAL_PROJECTS = [
  {
    id: "proj-telegram-bot-n8n",
    title: "Telegram Automation Bot using n8n",
    domain: "Automation & Bots",
    badge: "Official Project",
    badgeColor: "#0ea5e9",
    difficulty: "Intermediate",
    duration: "Production",
    techStack: [
      "n8n Workflow Automation",
      "Telegram Bot API",
      "Event-Driven Workflows",
      "Python 3.12",
      "Webhooks & REST APIs",
      "Conditional Logic Routing"
    ],
    datasetName: "Telegram Real-Time Event Webhook JSON Stream",
    summary: "Built an automated Telegram bot using n8n to design event-driven workflows with conditional logic, command routing, and automated user responses.",
    description: "An event-driven chatbot and automation pipeline built on the n8n automation engine and Telegram Bot API. It listens for incoming triggers, parses JSON webhook payloads, executes multi-branch conditional routing (commands like /start, /help, /lab, /evaluate), and dispatches automated contextual responses in real time.",
    keyMetrics: [
      { label: "Automation Engine", val: "n8n Workflow" },
      { label: "Integration", val: "Telegram Bot API" },
      { label: "Routing Latency", val: "< 100ms" }
    ],
    architecture: [
      "Event Trigger: Telegram Webhook / Polling node captures user chat interactions",
      "Payload Ingestion: Extracts user_id, chat_id, message_text, and metadata from Telegram JSON update",
      "Conditional Branching: n8n Switch/If nodes route commands (/start, /lab, /help, custom text)",
      "Logic Execution: Formats responses and interacts with backend APIs or computational logic",
      "Output Dispatch: Telegram node sends formatted Markdown responses back to the user chat"
    ],
    code: `import json
import time

# Simulation of n8n Telegram Bot Event-Driven Workflow
print("=== TELEGRAM AUTOMATION BOT (n8n WORKFLOW ENGINE) ===")
print("Workflow Engine: n8n Node-Based Automation")
print("Target Platform: Telegram Bot API")
print("Status: Active & Listening for Webhook Triggers\\n")

# 1. Simulated Incoming Telegram Update Payload
sample_telegram_update = {
    "update_id": 100028941,
    "message": {
        "message_id": 42,
        "from": {
            "id": 987654321,
            "is_bot": False,
            "first_name": "Pradyumna",
            "username": "pradyumna_devi",
            "language_code": "en"
        },
        "chat": {
            "id": 987654321,
            "first_name": "Pradyumna",
            "type": "private"
        },
        "date": int(time.time()),
        "text": "/lab status"
    }
}

print("1. [n8n Webhook Node] Received Incoming Telegram Update:")
print(json.dumps(sample_telegram_update, indent=2))

# 2. n8n Function / Code Node (Parser & Router)
incoming_text = sample_telegram_update["message"]["text"].strip()
user = sample_telegram_update["message"]["from"]["first_name"]
chat_id = sample_telegram_update["message"]["chat"]["id"]

print(f"\\n2. [n8n Router Node] Evaluating Message from '{user}' (Chat ID: {chat_id}): '{incoming_text}'")

def process_bot_command(cmd):
    cmd_lower = cmd.lower()
    if cmd_lower.startswith("/start"):
        return f"👋 Hello {user}! Welcome to the Data Science Lab Bot automated via n8n. Type /lab for options."
    elif cmd_lower.startswith("/lab"):
        return "🧪 MBU Data Science Lab Status: Virtual Kernel CPython 3.12 active, 5 practical labs available."
    elif cmd_lower.startswith("/help"):
        return "ℹ️ Available commands:\\n/start - Welcome message\\n/lab - Check lab status\\n/status - Server health"
    else:
        return f"🤖 n8n Bot: Received '{cmd}'. Custom conditional workflow triggered successfully!"

response_text = process_bot_command(incoming_text)

# 3. [n8n Telegram Node] Outgoing Response Dispatch
outgoing_payload = {
    "chat_id": chat_id,
    "text": response_text,
    "parse_mode": "Markdown"
}

print("\\n3. [n8n Telegram Dispatcher Node] Sent Output Message:")
print(json.dumps(outgoing_payload, indent=2))
print("\\n✅ n8n Telegram Bot Workflow executed successfully with 0 errors!")
`
  }
];

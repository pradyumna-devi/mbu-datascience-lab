// Mohan Babu University (MBU) - Data Science Digital Lab Library

export const INITIAL_PROFILE = {
  name: "Mudimela Pradyumna Devi",
  id: "24102A030078",
  branch: "Computer Science and Engineering (Data Science)",
  section: "Section - 2",
  faculty: "Bosu Babu Sambana",
  designation: "Assistant Professor",
  avatarUrl: "./student-profile.jpg",
  githubUrl: "https://github.com/pradyumna-devi",
  linkedinUrl: "https://linkedin.com/in/mudimela-pradyumna-devi",
  portfolioUrl: "https://pradyumna-devi.dev",
  email: "mudimelapradyumnadevi@gmail.com",
  phone: "9182361994",
  location: "Nandyal",
  cgpa: "9.76 / 10.0",
  youtubeUrl: "https://youtube.com/@mudimelapradyumnadevi",
  youtubeHandle: "YouTube Channel",
  kaggleUrl: "https://kaggle.com/pradyumnadevi",
  leetcodeUrl: "https://leetcode.com/pradyumna_devi",
  bio: "B.Tech in Computer Science and Engineering (Data Science) scholar at Mohan Babu University (CGPA: 9.76/10.0). Developer & technical educator building event-driven automation bots and explaining Data Structures & Algorithms concepts.",
  resumeUrl: "#",
  resumeName: "Mudimela_Pradyumna_Devi_Resume.pdf"
};

export const INITIAL_EXPERIMENTS = [
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
    relevantExpId: "exp-4",
    relevantExpTitle: "Experiment 4: Data Wrangling & Hierarchical Indexing",
    flipCards: [
      {
        id: "fc-1-1",
        number: 1,
        unit: "Unit I: Foundations & The Data Science Lifecycle",
        topic: "Data Science lifecycle, multidisciplinary foundations & problem formulation",
        question: "What is the multidisciplinary foundation of Data Science and how is an analytical problem formulated?",
        icon: "layers",
        summary: "Data Science bridges Domain Expertise, Mathematics/Statistics, and Computer Science to solve empirical problems.",
        breakdown: [
          "Problem Formulation: Define quantifiable business/scientific metrics (RMSE, F1-Score, AUC) and state testable hypotheses.",
          "End-to-End Lifecycle: Telemetry Acquisition -> Cleaning/Hygiene -> Exploratory Data Analysis (EDA) -> Feature Engineering -> Model Training -> Validation -> Deployment.",
          "Multidisciplinary Triangle: The intersection of Software Engineering, Statistical Inference, and Domain Subject-Matter Insight.",
          "Evaluation Criteria: Ensuring statistical power, generalizability to out-of-distribution data, and avoiding target leakage."
        ],
        labMapping: "Data Science Computing & Tabular Workflows",
        relevantTask: "Core Principles",
        keySyntax: "import numpy as np\nimport pandas as pd\ndf.info()\ndf.describe()",
        conceptTag: "Data Science Foundations"
      },
      {
        id: "fc-1-2",
        number: 2,
        unit: "Unit I: Foundations & The Data Science Lifecycle",
        topic: "Python data science ecosystem & interactive development environments",
        question: "How does the Python computational ecosystem support interactive exploration and reproducible scientific workflows?",
        icon: "terminal",
        summary: "Python serves as the primary scientific computing language via optimized C-extensions, vector array libraries, and WebAssembly kernels.",
        breakdown: [
          "Core Computational Stack: CPython 3.12 interpreter, NumPy for N-dimensional arrays, Pandas for labeled tables, Matplotlib/Seaborn for publication plotting.",
          "Interactive Environments: Jupyter Notebooks (.ipynb) integrating executable code, markdown prose, LaTeX math formulas, and interactive diagnostics.",
          "WebAssembly Execution: Pyodide compilation enabling in-browser execution with isolated memory pointers without external servers.",
          "Workflow Determinism: Setting random seeds (np.random.seed(42)) to guarantee repeatable analytical experiments."
        ],
        labMapping: "Interactive Python 3.12 WebAssembly Kernel & Jupyter Notebook Exporter",
        relevantTask: "Workspace Virtual REPL",
        keySyntax: "import sys, io\n%matplotlib inline\nnp.random.seed(42)",
        conceptTag: "Python Scientific Stack"
      },
      {
        id: "fc-1-3",
        number: 3,
        unit: "Unit II: Computational Ecosystem & Numerical Computing with NumPy",
        topic: "NumPy N-dimensional array architectures, vectorization & numerical broadcasting",
        question: "How does NumPy achieve high-speed computation via contiguous memory blocks, SIMD vectorization, and broadcasting?",
        icon: "binary",
        summary: "NumPy arrays (ndarray) eliminate dynamic Python interpreter overhead by executing pre-compiled C routines across contiguous memory buffers.",
        breakdown: [
          "Memory Architecture: Homogeneous, fixed-size C data types packed in contiguous RAM blocks for maximum CPU cache L1/L2 hits.",
          "Vectorized Operations: Element-wise arithmetic applied in parallel across multidimensional arrays without explicit Python for-loops.",
          "Broadcasting Semantics: Smaller arrays stretch along dimensions of size 1 to match larger operands without copying data in memory.",
          "Boolean Masking & Slicing: Extracting data subsets with vectorized condition filters: data[data > 50]."
        ],
        labMapping: "NumPy Vector Arrays & Mathematical Computations",
        relevantTask: "Numerical Computing",
        keySyntax: "data = np.array([12, 18, 25, 30, 42, 55, 63, 78, 85, 92])\nstandardized = (data - np.mean(data)) / np.std(data)\nhigh_vals = data[data > 50]",
        conceptTag: "NumPy Vectorization & SIMD"
      },
      {
        id: "fc-1-4",
        number: 4,
        unit: "Unit III: Tabular Data Structures with Pandas & Exploratory Diagnostics",
        topic: "Pandas Series and DataFrame structures, indexing, slicing & attribute inspection",
        question: "How do Pandas Series and DataFrame structures operate, and how do loc[] and iloc[] indexing mechanisms differ?",
        icon: "table",
        summary: "Pandas provides high-performance tabular structures with labeled axes, heterogeneous column datatypes, and relational transformations.",
        breakdown: [
          "Core Data Structures: Series (1D labeled array with homogeneous values) and DataFrame (2D tabular matrix composed of aligned Series).",
          "loc[] Indexing: Label-based selection using explicit index names and column labels; endpoints are inclusive.",
          "iloc[] Indexing: Integer position-based indexing (0-indexed); endpoints are exclusive, matching Python slice convention.",
          "Structural Inspection: df.shape, df.dtypes, df.columns, df.head(5), df.tail(5) for rapid dataset schema validation."
        ],
        labMapping: "Pandas DataFrame Construction & Exploratory Data Inspection",
        relevantTask: "Data Exploration",
        keySyntax: "df = pd.DataFrame(data)\nhigh_scores = df.loc[df['Score'] >= 85, ['Name', 'Grade']]\nsubset = df.iloc[0:5, 1:4]",
        conceptTag: "Pandas Indexing & Slicing"
      },
      {
        id: "fc-1-5",
        number: 5,
        unit: "Unit III: Tabular Data Structures with Pandas & Exploratory Diagnostics",
        topic: "Descriptive statistics: measures of central tendency, dispersion & exploratory distributions",
        question: "What statistical measures quantify central tendency, dispersion, and feature distributions during exploratory data analysis?",
        icon: "line-chart",
        summary: "Descriptive statistics compress large-scale datasets into parametric and non-parametric summary metrics to characterize distributions.",
        breakdown: [
          "Central Tendency: Mean (arithmetic center), Median (50th percentile robust against outliers), Mode (peak frequency).",
          "Dispersion & Spread: Variance (sigma^2), Standard Deviation (sigma), Interquartile Range (IQR = Q3 - Q1), Minimum & Maximum.",
          "Z-Score Standardization: z = (x - mu) / sigma normalizes disparate features into zero-mean, unit-variance standardized distributions.",
          "Automated Telemetry: df.describe() computes count, mean, std, min, 25%, 50%, 75%, and max across all numerical columns."
        ],
        labMapping: "Descriptive Statistics & Live Diagnostic Telemetry",
        relevantTask: "Statistical Diagnostics",
        keySyntax: "stats_summary = df.describe()\nmu = df['Score'].mean()\nsigma = df['Score'].std()\niqr = df['Score'].quantile(0.75) - df['Score'].quantile(0.25)",
        conceptTag: "Descriptive Statistics"
      },
      {
        id: "fc-1-6",
        number: 6,
        unit: "Unit III: Tabular Data Structures with Pandas & Exploratory Diagnostics",
        topic: "Data governance, ethical analytics, reproducibility & privacy standards",
        question: "What ethical responsibilities, governance standards, and reproducibility practices are required in data science?",
        icon: "award",
        summary: "Modern data science mandates rigorous adherence to algorithmic accountability, privacy preservation, and immutable auditability.",
        breakdown: [
          "Algorithmic Fairness: Detecting historical bias in training sets, assessing disparate impact, avoiding proxy discrimination.",
          "Privacy & Compliance: Anonymization, tokenization, differential privacy guarantees, adherence to DPDP Act and GDPR frameworks.",
          "Reproducibility Standards: Environment locking (requirements.txt), fixed random states, immutable execution logs.",
          "Academic Evaluation: Formal MBU Laboratory Observation Record sheets with multi-tier faculty assessment rubrics."
        ],
        labMapping: "Official MBU Lab Observation Record Sheet & Assessment Rubric",
        relevantTask: "Lab Record Modal",
        keySyntax: "np.random.seed(42)\n# Document data provenance & fairness metrics\nrecord_html = generate_lab_record(exp, subtask, code, output)",
        conceptTag: "Data Governance & Ethics"
      }
    ]
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
    relevantExpId: "exp-4",
    relevantExpTitle: "Experiment 4: Data Wrangling & Hierarchical Indexing",
    flipCards: [
      {
        id: "fc-2-1",
        number: 1,
        unit: "Unit I: Relational Database Connectivity & SQL Query Extraction",
        topic: "Data acquisition pipelines: primary, secondary & third-party streaming sources",
        question: "How are automated data acquisition pipelines structured across primary, secondary, and streaming data sources?",
        icon: "database",
        summary: "Data acquisition establishes the foundation of data engineering pipelines by ingesting telemetry from heterogeneous upstream providers.",
        breakdown: [
          "Data Source Taxonomy: Primary (first-party sensors, logs, user events), Secondary (relational operational DBs, data warehouses), Streaming (real-time message buses).",
          "Ingestion Architectures: Scheduled batch ETL (extract-transform-load) windows vs. event-driven streaming micro-batches.",
          "Ingestion Hygiene: Schema enforcement, encoding standardization (UTF-8), deduplication, and corruption quarantine."
        ],
        labMapping: "Data Acquisition Pipelines & Ingestion Architecture",
        relevantTask: "Data Engineering",
        keySyntax: "import sqlite3\nimport requests\nimport json\nimport pandas as pd",
        conceptTag: "Data Ingestion Architecture"
      },
      {
        id: "fc-2-2",
        number: 2,
        unit: "Unit I: Relational Database Connectivity & SQL Query Extraction",
        topic: "Relational database extraction: SQL queries, SQLite connections & DataFrame loading",
        question: "How does Python interface with relational database engines using SQL queries and load records directly into Pandas DataFrames?",
        icon: "git-merge",
        summary: "Relational extraction connects to SQL engines, executes filtered/aggregated queries, and ingests tabular recordsets directly into memory.",
        breakdown: [
          "Database Connections: sqlite3.connect() establishing connection objects and cursor handles to in-memory (:memory:) or file-based databases.",
          "Relational Queries: Executing SELECT, WHERE, GROUP BY, HAVING, and JOIN queries across multiple indexed tables.",
          "Security & Parameterization: Using parameterized queries with tuple arguments (?) to prevent SQL injection vulnerabilities.",
          "Pandas SQL Ingestion: pd.read_sql_query(query, conn) automatically handles cursor execution, column mapping, and DataFrame construction."
        ],
        labMapping: "Structured Data Extraction from SQLite Database with SQL Queries",
        relevantTask: "SQL Extraction",
        keySyntax: "conn = sqlite3.connect(':memory:')\nquery = 'SELECT department, AVG(salary) FROM employees GROUP BY department'\ndf = pd.read_sql_query(query, conn)\nconn.close()",
        conceptTag: "SQL & Relational Extraction"
      },
      {
        id: "fc-2-3",
        number: 3,
        unit: "Unit II: RESTful Web APIs, JSON/XML Endpoints & Authentication Protocols",
        topic: "RESTful API consumption: HTTP methods, response headers & JSON data normalization",
        question: "How are RESTful APIs consumed over HTTP and how are hierarchical nested JSON payloads flattened into tabular DataFrames?",
        icon: "globe",
        summary: "REST APIs deliver semi-structured JSON payloads that require HTTP protocol interaction and tabular normalization via json_normalize.",
        breakdown: [
          "HTTP Request Protocols: GET (read records), POST (submit queries/data), PUT/PATCH (mutations), DELETE (removals).",
          "HTTP Response Telemetry: Status codes 200 (OK), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 429 (Rate Limit Exceeded).",
          "Hierarchical JSON Normalization: pd.json_normalize(records) flattens nested JSON objects and arrays into 2D columnar DataFrames.",
          "Schema Handling: Casting ISO-8601 date strings to datetime objects and managing sparse/null fields."
        ],
        labMapping: "RESTful JSON API Data Consumption & Normalization",
        relevantTask: "API Pipelines",
        keySyntax: "res = requests.get('https://api.example.com/data', timeout=10)\npayload = res.json()\ndf = pd.json_normalize(payload['results'], sep='_')",
        conceptTag: "REST APIs & JSON Normalization"
      },
      {
        id: "fc-2-4",
        number: 4,
        unit: "Unit II: RESTful Web APIs, JSON/XML Endpoints & Authentication Protocols",
        topic: "API authentication: API keys, Bearer tokens, rate limiting & pagination handling",
        question: "How do API authentication tokens, rate limiting controls, and pagination loops ensure robust extraction in production?",
        icon: "shield-check",
        summary: "Production APIs require authentication credentials, rate-limiting compliance, and pagination loops to ingest full datasets safely.",
        breakdown: [
          "Authentication Schemes: API Keys in query/header, Basic Auth, OAuth 2.0 Bearer tokens (headers={'Authorization': f'Bearer {token}'}).",
          "Rate Limit Compliance: Monitoring X-RateLimit-Remaining and Retry-After headers, implementing exponential backoff with jitter.",
          "Pagination Loops: Iterating through offset/limit parameters or cursor tokens to consume multi-page datasets without memory exhaustion.",
          "Connection Pooling: Using requests.Session() to reuse TCP connections across repetitive API calls."
        ],
        labMapping: "API Authentication & Header Configuration",
        relevantTask: "Security & Auth",
        keySyntax: "headers = {'Authorization': f'Bearer {api_key}', 'Accept': 'application/json'}\nparams = {'page': page_num, 'limit': 50}\nsession = requests.Session()",
        conceptTag: "API Security & Rate Limiting"
      },
      {
        id: "fc-2-5",
        number: 5,
        unit: "Unit III: Web Scraping, HTML DOM Parsing & Semi-Structured Data Pipelines",
        topic: "Web scraping protocols: BeautifulSoup, HTML DOM tree navigation & tag filtering",
        question: "How does BeautifulSoup parse and traverse the HTML Document Object Model (DOM) to extract structured tabular datasets?",
        icon: "file-code",
        summary: "Web scraping parses unstructured HTML documents into hierarchical DOM element trees for targeted CSS selector extraction.",
        breakdown: [
          "DOM Tree Parsing: BeautifulSoup(html, 'html.parser') builds an in-memory navigable tree of tags, attributes, and text nodes.",
          "Targeted Querying: soup.find() for single elements, soup.find_all() for collections, and soup.select() using standard CSS selectors.",
          "Content Cleaning: element.get_text(strip=True), element.get('href'), parsing HTML <table> structures into list-of-lists for DataFrame conversion.",
          "HTML Entities & Encoding: Handling special HTML character entities and multi-byte UTF-8 decodings."
        ],
        labMapping: "HTML Web Scraping & DOM Parsing",
        relevantTask: "DOM Parsing",
        keySyntax: "from bs4 import BeautifulSoup\nsoup = BeautifulSoup(html_content, 'html.parser')\ntable = soup.find('table', {'id': 'reportTable'})\nrows = [[td.text.strip() for td in tr.find_all('td')] for tr in table.find_all('tr')]",
        conceptTag: "HTML DOM Web Scraping"
      },
      {
        id: "fc-2-6",
        number: 6,
        unit: "Unit III: Web Scraping, HTML DOM Parsing & Semi-Structured Data Pipelines",
        topic: "Parsing semi-structured data: JSON, XML, CSV, TSV & unstructured text streams",
        question: "What strategies and parsing libraries transform semi-structured formats (JSON, XML, CSV, TSV) into typed analytics matrices?",
        icon: "file-spreadsheet",
        summary: "Semi-structured data contains embedded delimiters or tags that require schema parsing and datatype coercion.",
        breakdown: [
          "Delimited Text: pd.read_csv() supporting custom separators (comma, tab, pipe), custom missing-value indicators, and chunksize streaming.",
          "Hierarchical XML: xml.etree.ElementTree parsing root nodes, attributes, and XPath syntax queries.",
          "JSON Serialization: json.loads() and json.dumps() for in-flight dictionary/string conversions.",
          "Unstructured Regular Expressions: Using re.findall() and capture groups to extract timestamps, IP addresses, and numerical metrics from log files."
        ],
        labMapping: "Tools Suite: Dataset Inspector & Custom CSV Ingestion",
        relevantTask: "Tools Tab",
        keySyntax: "import xml.etree.ElementTree as ET\nroot = ET.fromstring(xml_text)\ndf = pd.read_csv('records.tsv', sep='\\t')\nlog_matches = re.findall(r'(\\d{4}-\\d{2}-\\d{2})\\s+(\\w+)', log_stream)",
        conceptTag: "Data Serialization & Parsing"
      },
      {
        id: "fc-2-7",
        number: 7,
        unit: "Unit III: Web Scraping, HTML DOM Parsing & Semi-Structured Data Pipelines",
        topic: "Ethical data extraction, robots.txt compliance, error handling & network resiliency",
        question: "What ethical compliance standards, robots.txt directives, and fault-tolerance policies govern automated web data acquisition?",
        icon: "shield-alert",
        summary: "Professional data extraction adheres strictly to robots.txt terms of service, server politeness delays, and defensive error handling.",
        breakdown: [
          "robots.txt Protocol: Checking /robots.txt using urllib.robotparser to respect User-agent permissions, Disallow rules, and Crawl-delay parameters.",
          "Polite Extraction: Injecting custom User-Agent headers with contact information and applying rate-delay sleep timers between requests.",
          "Network Resiliency: Wrapping remote requests in try...except requests.exceptions.RequestException with timeout limits.",
          "Legal & Terms Compliance: Avoiding copyrighted data harvesting, respecting site terms of service, and ensuring analytical privacy."
        ],
        labMapping: "Ethical Web Data Acquisition & Fault Tolerance",
        relevantTask: "Ethics & Compliance",
        keySyntax: "import urllib.robotparser as rp\nrobot = rp.RobotFileParser()\nrobot.set_url('https://target.com/robots.txt')\nrobot.read()\ncan_fetch = robot.can_fetch('*', 'https://target.com/data')",
        conceptTag: "Ethical Extraction & Compliance"
      }
    ]
  },
  {
    id: "mod-3",
    code: "DS-MOD-103",
    title: "Module 3: Data Visualization",
    category: "Data Visualization",
    hours: "14 Theory + 28 Lab Hours",
    credits: "4 Credits",
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(244, 63, 94, 0.1))",
    borderColor: "rgba(236, 72, 153, 0.4)",
    badgeColor: "#f472b6",
    icon: "bar-chart-2",
    description: "Visual exploration principles, Matplotlib figure and subplot API architecture, statistical charting with Pandas and Seaborn (line, bar, histogram, KDE density, scatter plots), multi-panel FacetGrid conditioning for categorical data, and modern interactive visualization libraries.",
    topics: [
      "A brief Matplotlib API primer (Figure, Axes, subplots & artist hierarchy)",
      "Plotting with Pandas and Seaborn: Line plots & temporal trend analysis",
      "Bar plots: Categorical comparisons, grouped & stacked representations",
      "Histograms and density plots (Kernel Density Estimation & empirical distributions)",
      "Scatter plots: Bivariate correlations, bubble sizes & regression trends",
      "Facet grids and categorical data (FacetGrid, catplot, box & violin plots)",
      "Other Python visualisation tools: Plotly interactive figures, Bokeh, Altair & Folium"
    ],
    syllabusUnits: [
      "Unit I: Matplotlib Core API Primer, Figure Architectures & Subplot Hierarchies",
      "Unit II: Statistical Graphics with Pandas & Seaborn (Line, Bar, Histogram, Density & Scatter Plots)",
      "Unit III: Multi-Panel Facet Grids, Categorical Analytics & Modern Interactive Visualisation Toolkits"
    ],
    relevantExpId: "exp-5",
    relevantExpTitle: "Experiment 5: Data Visualization with Matplotlib & Seaborn",
    flipCards: [
      {
        id: "fc-3-1",
        number: 1,
        unit: "Unit I: Matplotlib Core API Primer, Figure Architectures & Subplot Hierarchies",
        topic: "A brief Matplotlib API primer (Figure, Axes, subplots & artist hierarchy)",
        question: "How does Matplotlib structure its object-oriented hierarchy of Figures, Axes, Spines, and Artists, and how do subplots operate?",
        icon: "layout",
        summary: "Matplotlib provides an object-oriented rendering engine with Figures representing top-level canvas containers and Axes hosting individual plot surfaces.",
        breakdown: [
          "Object-Oriented Architecture: fig, axes = plt.subplots(nrows, ncols) cleanly separates the canvas container (Figure) from individual coordinate systems (Axes).",
          "Artist Hierarchy: Every graphical element (Line2D, Text, Rectangle, Axis spines, tick marks) is an Artist instance drawn on the rendering backend canvas.",
          "Explicit vs. State-Machine (pyplot): Object-oriented ax.plot() provides deterministic multi-panel layout control, avoiding plt.plot() state-tracking collisions.",
          "Figure Polish & Export: Configuring high-DPI resolution (dpi=300), tight bounding boxes (bbox_inches='tight'), and clean gridlines (ax.grid(True))."
        ],
        labMapping: "Experiment 5 - Task 5A: Line Plots with Title, Axis Labels, Ticks, Tick Labels, Annotations and Save to File",
        relevantTask: "Task 5A",
        keySyntax: "import matplotlib.pyplot as plt\nfig, ax = plt.subplots(2, 1, figsize=(10, 8))\nax[0].plot(months, sales, marker='o', lw=2, label='Sales')\nax[0].set_title('Monthly Sales')\nax[0].grid(True)\nplt.tight_layout()\nplt.savefig('sales_analysis.png', dpi=300, bbox_inches='tight')",
        conceptTag: "Matplotlib Object-Oriented Hierarchy"
      },
      {
        id: "fc-3-2",
        number: 2,
        unit: "Unit II: Statistical Graphics with Pandas & Seaborn (Line, Bar, Histogram, Density & Scatter Plots)",
        topic: "Plotting with Pandas and Seaborn: Line plots & temporal trend analysis",
        question: "How do Pandas and Seaborn streamline line plotting, temporal continuity, and confidence interval estimation across longitudinal series?",
        icon: "trending-up",
        summary: "Line plots illustrate continuous trends and time series, with Seaborn automatically calculating bootstrapped confidence intervals.",
        breakdown: [
          "Pandas Series/DataFrame Integration: df.plot(kind='line') directly uses index labels for X-axes and DataFrame column headers for legend entries.",
          "Seaborn lineplot(): sns.lineplot(data=df, x='time', y='metric', hue='category') aggregates replicate observations and shades 95% bootstrap confidence bands.",
          "Temporal Time-Series Formatting: Automatic date locator and date formatter handlers on Axes without manual tick placement.",
          "Multi-Series Styling: Line styles (solid, dashed, dotted), markers (circles, diamonds), and semantic hue/style encodings."
        ],
        labMapping: "Experiment 5 - Task 5A & Experiment 6: Longitudinal Time-Series Line Plots & Trend Decomposition",
        relevantTask: "Task 5A & Task 6A",
        keySyntax: "import seaborn as sns\nimport pandas as pd\nsns.lineplot(data=time_df, x='Date', y='Metric', hue='Region', errorbar='ci')\nplt.title('Regional Metric Trends Over Time')\nplt.xlabel('Timestamp')\nplt.ylabel('Observed Value')",
        conceptTag: "Line Plots & Time Trends"
      },
      {
        id: "fc-3-3",
        number: 3,
        unit: "Unit II: Statistical Graphics with Pandas & Seaborn (Line, Bar, Histogram, Density & Scatter Plots)",
        topic: "Bar plots: Categorical comparisons, grouped & stacked representations",
        question: "How are categorical distributions and metric aggregations compared using vertical, horizontal, grouped, and stacked bar charts?",
        icon: "bar-chart",
        summary: "Bar plots encode numerical magnitudes for discrete categorical levels, supporting central tendency comparisons with error bars.",
        breakdown: [
          "Vertical vs. Horizontal Orientations: Use vertical bars for standard categories; switch to horizontal (sns.barplot(y='long_label')) to prevent label collisions.",
          "Grouped Bar Charts: Comparing sub-groups side-by-side using the hue parameter (e.g. comparing Department across Gender or Year).",
          "Stacked Bar Charts: Visualizing compositional part-to-whole proportions using df.plot(kind='bar', stacked=True).",
          "Error Bars & Estimators: Seaborn's barplot automatically applies an estimator (default mean) with parametric or bootstrap error bars."
        ],
        labMapping: "Experiment 5 - Task 5B: Categorical Comparisons via Grouped & Stacked Bar Charts",
        relevantTask: "Task 5B",
        keySyntax: "sns.barplot(data=df, x='Department', y='Salary', hue='Level', palette='viridis')\n# Stacked bar via pandas\ndf_crosstab.plot(kind='bar', stacked=True, colormap='Spectral')\nplt.legend(title='Category Tier')",
        conceptTag: "Bar Plots & Categorical Comparisons"
      },
      {
        id: "fc-3-4",
        number: 4,
        unit: "Unit II: Statistical Graphics with Pandas & Seaborn (Line, Bar, Histogram, Density & Scatter Plots)",
        topic: "Histograms and density plots (Kernel Density Estimation & empirical distributions)",
        question: "How do histograms and Kernel Density Estimation (KDE) density plots reveal modality, skewness, and distribution shapes?",
        icon: "activity",
        summary: "Histograms bin continuous values into frequency counts, while KDE fits smooth continuous probability density functions over observed data.",
        breakdown: [
          "Histogram Binning Strategies: Choosing bin width using Sturges' rule, Freedman-Diaconis rule (robust to outliers), or explicit bin boundaries.",
          "Kernel Density Estimation: Superimposing Gaussian kernels over each data point to compute a continuous density curve: sns.kdeplot().",
          "Combined Distribution Inspection: sns.histplot(data=df, x='score', kde=True, stat='density') simultaneously showing discrete bars and continuous curve.",
          "Skewness & Modality Diagnostics: Identifying unimodal, bimodal, right-skewed, and leptokurtic distribution characteristics."
        ],
        labMapping: "Experiment 5 - Task 5C: Empirical Distribution Modeling via Histograms & KDE Density",
        relevantTask: "Task 5C",
        keySyntax: "sns.histplot(data=df, x='FinalScore', kde=True, bins=25, stat='density', color='#06b6d4')\nplt.title('Empirical Distribution with KDE')\nplt.xlabel('Examination Score')\nplt.ylabel('Probability Density')",
        conceptTag: "Histograms & Density Modeling"
      },
      {
        id: "fc-3-5",
        number: 5,
        unit: "Unit II: Statistical Graphics with Pandas & Seaborn (Line, Bar, Histogram, Density & Scatter Plots)",
        topic: "Scatter plots: Bivariate correlations, bubble sizes & regression trends",
        question: "How do scatter plots expose bivariate correlations, non-linear relationships, multi-dimensional bubble encodings, and regression models?",
        icon: "scatter-chart",
        summary: "Scatter plots map Cartesian (X, Y) coordinates of continuous pairs, exposing covariance, clustering, and regression trajectories.",
        breakdown: [
          "Bivariate Correlation Inspection: Revealing linear association, heteroscedasticity, clustering, and outlier anomalies between two metrics.",
          "Multidimensional Encodings: Mapping color to hue, marker shape to style, and circle diameter to numerical size (bubble plots).",
          "Statistical Regression Fits: sns.regplot() and sns.lmplot() fitting Ordinary Least Squares (OLS) or polynomial regression lines with 95% confidence intervals.",
          "Hexbin Density Plotting: Mitigating severe overplotting in large-scale datasets (N > 10,000) using hexagonal binning (plt.hexbin)."
        ],
        labMapping: "Experiment 5 - Task 5D: Bivariate Scatter Analysis & Linear Regression Modeling",
        relevantTask: "Task 5D",
        keySyntax: "sns.scatterplot(data=df, x='Experience', y='Salary', hue='Role', size='Projects', sizes=(40, 300))\nsns.regplot(data=df, x='Experience', y='Salary', scatter=False, color='#ef4444')\nplt.title('Experience vs Salary with Regression Fit')",
        conceptTag: "Scatter Plots & Regression"
      },
      {
        id: "fc-3-6",
        number: 6,
        unit: "Unit III: Multi-Panel Facet Grids, Categorical Analytics & Modern Interactive Visualisation Toolkits",
        topic: "Facet grids and categorical data (FacetGrid, catplot, box & violin plots)",
        question: "How do multi-panel FacetGrids and categorical plots (catplot, boxplots, violin plots) split multivariate spaces across discrete strata?",
        icon: "grid",
        summary: "Facet grids condition a dataset across categorical factors to produce small multiples, while box/violin plots summarize multi-group distributions.",
        breakdown: [
          "Small Multiples Architecture: sns.FacetGrid(df, col='Region', row='Year') creates a matrix of identical subplots parameterized by category.",
          "Unified High-Level Interface: sns.catplot(kind='box' / 'violin' / 'strip' / 'swarm') unifying categorical distribution figures.",
          "Boxplots vs. Violin Plots: Boxplots display five-number summary (min, Q1, median, Q3, max) with outlier points; violin plots combine boxplots with mirrored KDE densities.",
          "Strip & Swarm Plots: Plotting individual jittered or non-overlapping raw observation points alongside aggregate summaries."
        ],
        labMapping: "Experiment 5 - Task 5E: Multi-Panel FacetGrid Conditioning & Box/Violin Plots",
        relevantTask: "Task 5E",
        keySyntax: "g = sns.FacetGrid(df, col='Department', hue='Gender', height=4)\ng.map(sns.scatterplot, 'Age', 'Salary')\ng.add_legend()\nsns.catplot(data=df, x='Department', y='Salary', kind='violin', inner='quartile')",
        conceptTag: "Facet Grids & Categorical Analytics"
      },
      {
        id: "fc-3-7",
        number: 7,
        unit: "Unit III: Multi-Panel Facet Grids, Categorical Analytics & Modern Interactive Visualisation Toolkits",
        topic: "Other Python visualisation tools: Plotly interactive figures, Bokeh, Altair & Folium",
        question: "What complementary Python visualization libraries exist for interactive web graphics, declarative grammars, and geospatial mapping?",
        icon: "sparkles",
        summary: "Modern Python ecosystems extend beyond static figures into interactive D3/WebGL web graphics, declarative grammars, and geographic maps.",
        breakdown: [
          "Plotly / Plotly Express: Web-first interactive visualizations supporting hover tooltips, zoom, pan, 3D surface rotations, and export to HTML/JSON.",
          "Bokeh: Real-time streaming and large-scale interactive server dashboards rendered directly in browser HTML5 Canvas.",
          "Altair (Vega-Lite Grammar): Declarative grammar of graphics defining charts through pure JSON specifications and intuitive aesthetic channels.",
          "Folium: Leaflet.js wrapper in Python for interactive geospatial maps, choropleth heatmaps, and coordinate marker clusters."
        ],
        labMapping: "Tools Suite: Interactive Chart Engine & Telemetry HUD",
        relevantTask: "Interactive Tools",
        keySyntax: "import plotly.express as px\nfig = px.scatter(df, x='GDP', y='LifeExp', size='Pop', color='Continent', hover_name='Country', log_x=True)\nfig.write_html('interactive_chart.html')\n# Bokeh, Altair & Folium for streaming and geospatial dashboards",
        conceptTag: "Interactive & Geospatial Toolkits"
      }
    ]
  },
  {
    id: "mod-4",
    code: "DS-MOD-104",
    title: "Module 4: Statistical Thinking",
    category: "Statistical Thinking",
    hours: "14 Theory + 28 Lab Hours",
    credits: "4 Credits",
    gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.1))",
    borderColor: "rgba(16, 185, 129, 0.4)",
    badgeColor: "#34d399",
    icon: "trending-up",
    description: "Foundational statistical thinking and empirical data analysis: empirical distributions, histogram representation, outlier identification and summary statistics, variance and spread metrics, Probability Mass Functions (PMF) and the class size paradox, DataFrame indexing and filtering, Cumulative Distribution Functions (CDF), percentile-based metrics, random number sampling, and analytic distribution modeling.",
    topics: [
      "Distributions: Representing and plotting histograms, identifying outliers & summarizing distributions",
      "Variance, standard deviation, spread metrics & reporting statistical results",
      "Probability Mass Functions (PMF): Definition, plotting PMFs, other visualizations & the class size paradox",
      "DataFrame indexing, conditional masking & exploratory cohort slicing",
      "Cumulative Distribution Functions (CDF): Limits of PMFs, representing CDFs & empirical probabilities",
      "Percentile-based statistics, random numbers, sampling & comparing percentile marks",
      "Modelling distributions: Analytic distributions, exponential, normal, Pareto & model validation"
    ],
    syllabusUnits: [
      "Unit I: Empirical Distributions, Histogram Binning, Outliers & Summary Variance",
      "Unit II: Discrete Probability Models, Probability Mass Functions & Paradoxical Sampling",
      "Unit III: Cumulative Distribution Functions, Percentile Metrics & Distribution Modeling"
    ],
    relevantExpId: "exp-5",
    relevantExpTitle: "Experiment 5: Advanced Exploratory Data Analysis & Statistical Visualizations",
    flipCards: [
      {
        id: "fc-4-1",
        number: 1,
        unit: "Unit I: Empirical Distributions, Histogram Binning, Outliers & Summary Variance",
        topic: "Distributions: Representing and plotting histograms, identifying outliers & summarizing distributions",
        question: "How do histograms represent empirical data distributions, how are binning choices evaluated, and how are anomalous outliers detected and summarized?",
        icon: "bar-chart",
        summary: "Histograms partition continuous or discrete observations into non-overlapping bins, exposing shape, central clustering, spread, and outlier points.",
        breakdown: [
          "Histogram Construction: Discretizing continuous domain intervals into equal-width bins and counting observation frequencies in each bucket.",
          "Binning Considerations: Under-binning oversmooths multi-modal peaks; over-binning introduces spurious sample noise; Freedman-Diaconis rule balances width.",
          "Outlier Detection & Hygiene: Identifying values beyond 1.5 * IQR or 3 standard deviations; distinguishing genuine extreme events from recording errors.",
          "Summary Statistics: Condensing distribution profiles into central tendency (mean, median, mode) and shape measures (skewness, kurtosis)."
        ],
        labMapping: "Experiment 5 - Task 5C: Empirical Distribution Modeling via Histograms",
        relevantTask: "Task 5C",
        keySyntax: "import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\ncounts, bin_edges = np.histogram(data, bins='auto')\nq25, q75 = np.percentile(data, [25, 75])\niqr = q75 - q25\noutliers = data[(data < q25 - 1.5 * iqr) | (data > q75 + 1.5 * iqr)]",
        conceptTag: "Histograms & Outlier Detection"
      },
      {
        id: "fc-4-2",
        number: 2,
        unit: "Unit I: Empirical Distributions, Histogram Binning, Outliers & Summary Variance",
        topic: "Variance, standard deviation, spread metrics & reporting statistical results",
        question: "What metrics quantify statistical dispersion and variance, and how should analytical results and uncertainty be communicated accurately?",
        icon: "activity",
        summary: "Variance and standard deviation measure the dispersion of data points around their mean, establishing the basis for confidence intervals and statistical reporting.",
        breakdown: [
          "Sample vs. Population Variance: Applying Bessel's correction (N - 1 denominator) for unbiased sample variance estimation: s² = Σ(x - x̄)² / (n - 1).",
          "Standard Deviation (σ): Square root of variance, expressing spread in original measurement units rather than squared units.",
          "Robust Spread Metrics: Interquartile Range (IQR = Q3 - Q1) and Median Absolute Deviation (MAD), unaffected by extreme distribution tails.",
          "Reporting Integrity: Stating point estimates alongside dispersion metrics (e.g., Mean ± Std or Median [IQR]) and sample size N to avoid misleading claims."
        ],
        labMapping: "Experiment 5 - Task 5C: Descriptive Statistics & Diagnostic Distribution Plots",
        relevantTask: "Task 5C",
        keySyntax: "variance = np.var(data, ddof=1)\nstd_dev = np.std(data, ddof=1)\nmad = np.median(np.abs(data - np.median(data)))\nprint(f'Mean: {np.mean(data):.2f} ± {std_dev:.2f} (N={len(data)})')",
        conceptTag: "Variance & Dispersion Metrics"
      },
      {
        id: "fc-4-3",
        number: 3,
        unit: "Unit II: Discrete Probability Models, Probability Mass Functions & Paradoxical Sampling",
        topic: "Probability Mass Functions (PMF): Definition, plotting PMFs, other visualizations & the class size paradox",
        question: "What is a Probability Mass Function (PMF), how does it normalize frequency counts into probabilities, and why does the Class Size Paradox occur?",
        icon: "pie-chart",
        summary: "A PMF maps discrete outcomes to relative probabilities summing to 1.0, revealing observational sampling biases such as the Class Size Paradox.",
        breakdown: [
          "PMF Normalization: Dividing discrete value counts by total sample size N so that Σ P(x) = 1.0, enabling direct comparison across unequal sample sizes.",
          "Visualizing PMFs: Step plots and normalized discrete bar charts illustrating probabilities of exact discrete integer outcomes.",
          "The Class Size Paradox: Institutional averages (mean students per class) differ sharply from student-perceived averages because larger classes sample more students.",
          "Observer-Biased Weighting: Mathematically computing biased distributions by multiplying unweighted PMF probabilities by observation size: P_biased(x) = x * P(x) / μ."
        ],
        labMapping: "Tools Suite & Custom Statistical Thinking Workspace",
        relevantTask: "PMF Telemetry",
        keySyntax: "val_counts = pd.Series(sizes).value_counts().sort_index()\npmf = val_counts / len(sizes)\n# Unbiased vs Biased Student Perspective:\nbiased_pmf = pmf * pmf.index\nbiased_pmf /= biased_pmf.sum()\nprint('Dean Average:', pmf.index.to_series().mul(pmf).sum())\nprint('Student Average:', biased_pmf.index.to_series().mul(biased_pmf).sum())",
        conceptTag: "Probability Mass Functions & Sampling Bias"
      },
      {
        id: "fc-4-4",
        number: 4,
        unit: "Unit I: Empirical Distributions, Histogram Binning, Outliers & Summary Variance",
        topic: "DataFrame indexing, conditional masking & exploratory cohort slicing",
        question: "How does boolean indexing and hierarchical slicing in Pandas isolate demographic cohorts, experimental subgroups, and treatment distributions?",
        icon: "table",
        summary: "Conditional masking and label/integer indexing extract precise comparative cohorts for hypothesis testing and subgroup distribution analysis.",
        breakdown: [
          "Boolean Series Vectors: Applying vectorized logical operators (& for AND, | for OR, ~ for NOT) to generate truth masks across millions of rows.",
          "loc vs. iloc Indexing: df.loc[condition, ['featureA', 'featureB']] guarantees explicit labeled selection without chained assignment warnings.",
          "Cohort Segmentation: Splitting populations into control and treatment cohorts (e.g., first-born infants vs. other infants, high-income vs. low-income).",
          "Grouped Stratification: df.groupby('cohort')['target'].agg(['mean', 'std', 'median', 'count']) for comparative group summaries."
        ],
        labMapping: "Experiment 4 - Task 4B & Experiment 5: Hierarchical Slicing & Grouping",
        relevantTask: "Task 4B & Task 5A",
        keySyntax: "cohort_mask = (df['Age'] >= 25) & (df['Status'] == 'Active')\ncohort_a = df.loc[cohort_mask, 'Score']\ncohort_b = df.loc[~cohort_mask, 'Score']\nprint(cohort_a.describe())",
        conceptTag: "DataFrame Cohort Indexing"
      },
      {
        id: "fc-4-5",
        number: 5,
        unit: "Unit III: Cumulative Distribution Functions, Percentile Metrics & Distribution Modeling",
        topic: "Cumulative Distribution Functions (CDF): Limits of PMFs, representing CDFs & empirical probabilities",
        question: "Why do PMFs break down when continuous values or sample sizes vary, and how does the Cumulative Distribution Function (CDF) resolve these limits?",
        icon: "git-commit",
        summary: "The CDF maps value x to probability P(X ≤ x), eliminating binning artifacts and providing smooth, sample-size-invariant distribution representations.",
        breakdown: [
          "Limits of PMFs: As sample size increases or continuous values have few duplicate points, PMF probabilities become tiny and noisy.",
          "CDF Definition: CDF(x) = fraction of sample values ≤ x; monotonically non-decreasing curve from 0.0 to 1.0.",
          "Empirical CDF (ECDF) Calculation: Sorting values x_(1) ≤ x_(2) ≤ ... ≤ x_(n) and assigning cumulative probabilities (1/n, 2/n, ..., n/n).",
          "Interpreting Probabilities: Direct visual lookup of medians (CDF = 0.5), interquartile ranges (CDF = 0.75 - 0.25), and tail probabilities."
        ],
        labMapping: "Tools Suite: Statistical Metric Calculator & Custom ECDF Module",
        relevantTask: "Tools Tab",
        keySyntax: "sorted_data = np.sort(data)\ncdf_probs = np.arange(1, len(data) + 1) / len(data)\nplt.step(sorted_data, cdf_probs, where='post')\nplt.xlabel('Value (x)')\nplt.ylabel('Cumulative Probability P(X <= x)')\nplt.grid(True)",
        conceptTag: "Cumulative Distribution Functions"
      },
      {
        id: "fc-4-6",
        number: 6,
        unit: "Unit III: Cumulative Distribution Functions, Percentile Metrics & Distribution Modeling",
        topic: "Percentile-based statistics, random numbers, sampling & comparing percentile marks",
        question: "How are percentile ranks and inverse CDFs computed, and how does pseudo-random number generation enable Monte Carlo sampling simulations?",
        icon: "shuffle",
        summary: "Percentiles quantify relative rank within a distribution regardless of scale, while pseudo-random generators sample synthetic populations.",
        breakdown: [
          "Percentile Rank: The percentage of scores in a distribution that a specific value is greater than or equal to: percentile_rank = 100 * CDF(x).",
          "Inverse CDF (Quantile Function): Given probability p ∈ [0, 1], returns the value x such that CDF(x) = p (e.g. median = quantile(0.50)).",
          "Comparing Standardized Scores: Percentile ranks enable direct performance comparison across tests with differing scales, difficulty, and standard deviations.",
          "Random Number Sampling: Using uniform generators (np.random.rand()) and inverse transform sampling to generate synthetic variables from target CDFs."
        ],
        labMapping: "Tools Suite: ML & Metric Calculator (Percentile & Critical Telemetry)",
        relevantTask: "Metric Calculator",
        keySyntax: "from scipy import stats\nrank = stats.percentileofscore(scores, 85)\nval_at_90th = np.percentile(scores, 90)\n# Random generation\nrandom_sample = np.random.choice(scores, size=100, replace=True)\nuniform_randoms = np.random.uniform(0, 1, 1000)",
        conceptTag: "Percentiles & Random Sampling"
      },
      {
        id: "fc-4-7",
        number: 7,
        unit: "Unit III: Cumulative Distribution Functions, Percentile Metrics & Distribution Modeling",
        topic: "Modelling distributions: Analytic distributions, exponential, normal, Pareto & model validation",
        question: "How are empirical data distributions fitted and validated against analytic models like the Normal, Exponential, Lognormal, and Pareto distributions?",
        icon: "cpu",
        summary: "Analytic distributions provide mathematical models that abstract noisy empirical data into compact parameterizations (μ, σ, λ, α).",
        breakdown: [
          "Analytic Model Families: Normal (bell curve for additive processes), Exponential (waiting times between Poisson events), Lognormal, and Pareto (power law 80/20 distributions).",
          "Parameter Estimation: Maximum Likelihood Estimation (MLE) or sample moments (mean, variance) fitting model parameters to empirical observations.",
          "Normal Probability (Q-Q) Plots: Plotting sorted sample quantiles against theoretical standard normal quantiles to test Gaussian normality.",
          "Model Goodness-of-Fit: Evaluating Kolmogorov-Smirnov test (scipy.stats.kstest) and comparing empirical CDFs against analytic CDF curves."
        ],
        labMapping: "Experiment 5 - Task 5C & Tools Suite: Statistical Modeling Engine",
        relevantTask: "Task 5C & Tools",
        keySyntax: "from scipy import stats\n# Fit Normal distribution:\nmu, std = stats.norm.fit(data)\n# Q-Q plot for normality verification:\nstats.probplot(data, dist='norm', plot=plt)\n# Kolmogorov-Smirnov test:\nks_stat, p_val = stats.kstest(data, 'norm', args=(mu, std))",
        conceptTag: "Analytic Distribution Modeling"
      }
    ]
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


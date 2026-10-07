"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 5: Data Visualization with Matplotlib & Seaborn
Task A [5A]: Create a Line Plot with Title, Axis Labels, Ticks, Tick Labels, Annotations and Save to a File

Aim:
To create a line plot using Matplotlib by setting the title, axis labels, ticks, tick labels, and annotations on subplots, and save the generated plot to an image file.

Syntax / General Form:
Create subplots
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
plt.savefig("filename.png", dpi=300, bbox_inches="tight")

"""

import matplotlib.pyplot as plt

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
plt.show()

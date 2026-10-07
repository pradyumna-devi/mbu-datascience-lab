# Experiment 6: Time Series Analysis
**Course / Department**: Department of Data Science, Mohan Babu University  
**Category**: Time Series  
**Curriculum Standard**: Official Laboratory Practical  

---

## Overview
Analyze chronological data patterns, decompose seasonal variations, evaluate stationarity, and forecast future values using models.

### Tech Stack & Key Concepts
- **ARIMA**
- **SARIMAX**
- **LSTM**
- **Dickey-Fuller**
- **Holt-Winters**

---

## Laboratory Modules & Python Source Scripts

| Task Letter | Code ID | Module Title | Script File |
|---|---|---|---|
| **A** | `6A` | Create time series using datetime object in pandas indexed by timestamps | [`task_6a_create_time_series_using_datetime_o.py`](./task_6a_create_time_series_using_datetime_o.py) |
| **B** | `6B` | Use pandas.date_range to generate a DatetimeIndex with an indicated length | [`task_6b_use_pandas_date_range_to_generate_a.py`](./task_6b_use_pandas_date_range_to_generate_a.py) |
| **C** | `6C` | Generate date ranges with time zones, localize, convert using tz_convert(), and combine series | [`task_6c_generate_date_ranges_with_time_zone.py`](./task_6c_generate_date_ranges_with_time_zone.py) |
| **D** | `6D` | Perform period arithmetic such as adding and subtracting integers from periods and construct range of periods using period_range function | [`task_6d_perform_period_arithmetic_such_as_a.py`](./task_6d_perform_period_arithmetic_such_as_a.py) |
| **E** | `6E` | Convert Periods and PeriodIndex objects to another frequency with asfreq method | [`task_6e_convert_periods_and_periodindex_obj.py`](./task_6e_convert_periods_and_periodindex_obj.py) |
| **F** | `6F` | Convert Series and DataFrame objects indexed by timestamps to periods with the to_period method | [`task_6f_convert_series_and_dataframe_object.py`](./task_6f_convert_series_and_dataframe_object.py) |
| **G** | `6G` | Perform resampling, downsampling and upsampling for the time series | [`task_6g_perform_resampling_downsampling_and.py`](./task_6g_perform_resampling_downsampling_and.py) |

---

## Execution Instructions
Run any task script directly via Python 3:
```bash
python <script_name>.py
```
All dependencies can be installed via:
```bash
pip install numpy pandas matplotlib seaborn
```

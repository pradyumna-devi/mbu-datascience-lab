import cv2
import numpy as np
import subprocess
import os

def create_dataviz_video():
    width = 640
    height = 360
    fps = 30
    duration_sec = 10
    total_frames = fps * duration_sec # 300 frames

    output_temp_avi = "temp_dataviz.avi"
    output_final_mp4 = "public/dataviz-preview-10s.mp4"

    os.makedirs("public", exist_ok=True)

    fourcc = cv2.VideoWriter_fourcc(*'MJPG')
    writer = cv2.VideoWriter(output_temp_avi, fourcc, fps, (width, height))

    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    sales = [120, 150, 180, 160, 220, 250]
    expenses = [80, 100, 120, 110, 140, 160]

    for frame_idx in range(total_frames):
        current_time_sec = frame_idx / fps
        img = np.zeros((height, width, 3), dtype=np.uint8)
        img[:] = (18, 13, 9) # Dark navy / slate

        # Tech grid lines
        for gx in range(0, width, 40):
            cv2.line(img, (gx, 35), (gx, height - 25), (32, 24, 18), 1)
        for gy in range(40, height - 20, 30):
            cv2.line(img, (20, gy), (width - 20, gy), (32, 24, 18), 1)

        # Header bar
        cv2.rectangle(img, (0, 0), (width, 32), (30, 22, 16), -1)
        cv2.line(img, (0, 32), (width, 32), (80, 50, 30), 1)

        # University & Lab title
        cv2.putText(img, "MBU DATA SCIENCE LAB", (16, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (200, 160, 80), 1, cv2.LINE_AA)
        cv2.putText(img, "|  EXP-05: DATA VISUALIZATION (MATPLOTLIB & SEABORN)", (195, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (240, 240, 240), 1, cv2.LINE_AA)

        # REC & Timer
        cv2.circle(img, (width - 120, 16), 5, (50, 50, 235), -1)
        timer_str = f"REC  00:{int(current_time_sec):02d} / 00:10"
        cv2.putText(img, timer_str, (width - 108, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (160, 220, 255), 1, cv2.LINE_AA)

        # Bottom status bar
        cv2.rectangle(img, (0, height - 24), (width, height), (22, 16, 12), -1)
        cv2.line(img, (0, height - 24), (width, height - 24), (60, 40, 25), 1)

        if current_time_sec < 2.5:
            # 5A: Line plot with annotations
            stage_title = "[5A] LINE PLOT & ANNOTATIONS (MONTHLY SALES & EXPENSES)"
            sub_info = "Dual Subplots | Highest Sales: $250k | Highest Expense: $160k"
            stage_color = (248, 189, 56)

            progress = frame_idx / (fps * 2.5)
            pts_sales = []
            pts_exp = []
            for i in range(len(months)):
                if (i / len(months)) <= progress:
                    px = int(80 + i * 85)
                    py_s = int(140 - (sales[i] - 100) * 0.6)
                    py_e = int(270 - (expenses[i] - 50) * 0.7)
                    pts_sales.append((px, py_s))
                    pts_exp.append((px, py_e))

            if len(pts_sales) > 1:
                cv2.polylines(img, [np.array(pts_sales)], False, (248, 189, 56), 2, cv2.LINE_AA)
                for pt in pts_sales:
                    cv2.circle(img, pt, 5, (255, 255, 255), -1)
                    cv2.circle(img, pt, 7, (248, 189, 56), 1)

            if len(pts_exp) > 1:
                cv2.polylines(img, [np.array(pts_exp)], False, (94, 63, 244), 2, cv2.LINE_AA)
                for pt in pts_exp:
                    cv2.rectangle(img, (pt[0]-4, pt[1]-4), (pt[0]+4, pt[1]+4), (255, 255, 255), -1)

            cv2.putText(img, "Sales Subplot [0]", (80, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (248, 189, 56), 1, cv2.LINE_AA)
            cv2.putText(img, "Expenses Subplot [1]", (80, 180), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (94, 63, 244), 1, cv2.LINE_AA)

        elif current_time_sec < 5.0:
            # 5B: Grouped and Stacked Bar Plots
            stage_title = "[5B] GROUPED & STACKED BAR PLOTS (STUDENT MARKS)"
            sub_info = "Pandas df.plot(kind='bar', stacked=True) | Python, Java, C++"
            stage_color = (80, 210, 120)

            students = ["S1", "S2", "S3", "S4"]
            m_python = [85, 90, 78, 88]
            m_java = [75, 82, 80, 85]
            m_cpp = [80, 76, 85, 90]

            for s_idx in range(4):
                bx = 100 + s_idx * 120
                h_py = int(m_python[s_idx] * 0.8)
                h_ja = int(m_java[s_idx] * 0.8)
                h_cp = int(m_cpp[s_idx] * 0.8)

                # Grouped side by side
                cv2.rectangle(img, (bx, 280 - h_py), (bx + 20, 280), (248, 189, 56), -1) # Python cyan
                cv2.rectangle(img, (bx + 24, 280 - h_ja), (bx + 44, 280), (11, 158, 245), -1) # Java amber
                cv2.rectangle(img, (bx + 48, 280 - h_cp), (bx + 68, 280), (80, 210, 120), -1) # C++ green
                cv2.putText(img, students[s_idx], (bx + 24, 300), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (200, 200, 200), 1, cv2.LINE_AA)

            cv2.putText(img, "Cyan: Python", (width - 150, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (248, 189, 56), 1, cv2.LINE_AA)
            cv2.putText(img, "Amber: Java", (width - 150, 80), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (11, 158, 245), 1, cv2.LINE_AA)
            cv2.putText(img, "Green: C++", (width - 150, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (80, 210, 120), 1, cv2.LINE_AA)

        elif current_time_sec < 7.5:
            # 5C: Histogram & Density Plot (KDE)
            stage_title = "[5C] SEABORN HISTOGRAM & DENSITY PLOT (KDE)"
            sub_info = "sns.histplot(bins=6, kde=True) | Gaussian Kernel Density Fit"
            stage_color = (250, 140, 60)

            bin_heights = [50, 65, 80, 110, 95, 70]
            for b_idx in range(6):
                bx = 110 + b_idx * 65
                bh = bin_heights[b_idx]
                cv2.rectangle(img, (bx, 280 - bh), (bx + 55, 280), (160, 80, 50), -1)
                cv2.rectangle(img, (bx, 280 - bh), (bx + 55, 280), (250, 140, 60), 1)

            # Smooth KDE curve overlay
            kde_pts = []
            for kx in range(100, 520, 6):
                # Simulated gaussian curve
                ky = int(280 - 120 * np.exp(-((kx - 320) ** 2) / (2 * (85 ** 2))))
                kde_pts.append((kx, ky))
            if len(kde_pts) > 1:
                cv2.polylines(img, [np.array(kde_pts)], False, (56, 189, 248), 3, cv2.LINE_AA)
                cv2.putText(img, "Continuous KDE Density", (340, 140), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (56, 189, 248), 1, cv2.LINE_AA)

        else:
            # 5D & 5E: Scatter Plot (Correlation=1.00) & Box Plots
            stage_title = "[5D/5E] SCATTER CORRELATION (r=1.00) & SEABORN BOXPLOTS"
            sub_info = "Study Hours vs Marks (Corr: 1.00) & Departmental Distribution"
            stage_color = (248, 140, 129)

            # Scatter points
            sh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            mk = [45, 50, 55, 60, 65, 70, 72, 80, 85, 90]
            scat_pts = []
            for i in range(len(sh)):
                px = int(80 + sh[i] * 22)
                py = int(280 - (mk[i] - 40) * 3.2)
                scat_pts.append((px, py))
                cv2.circle(img, (px, py), 5, (248, 189, 56), -1)
                cv2.circle(img, (px, py), 8, (255, 255, 255), 1)
            cv2.polylines(img, [np.array(scat_pts)], False, (100, 200, 255), 1, cv2.LINE_AA)
            cv2.putText(img, "Linear Fit (r = 1.00)", (80, 110), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (248, 189, 56), 1, cv2.LINE_AA)

            # Boxplots on right side
            depts = ["CSE", "ECE", "EEE"]
            d_colors = [(248, 189, 56), (80, 210, 120), (250, 140, 60)]
            for d_idx in range(3):
                dx = 380 + d_idx * 75
                # Box
                cv2.rectangle(img, (dx - 22, 170 + d_idx*15), (dx + 22, 230 + d_idx*15), d_colors[d_idx], 2)
                # Median line
                cv2.line(img, (dx - 22, 200 + d_idx*15), (dx + 22, 200 + d_idx*15), (255, 255, 255), 2)
                # Whiskers
                cv2.line(img, (dx, 140 + d_idx*15), (dx, 170 + d_idx*15), d_colors[d_idx], 1)
                cv2.line(img, (dx, 230 + d_idx*15), (dx, 260 + d_idx*15), d_colors[d_idx], 1)
                cv2.putText(img, depts[d_idx], (dx - 14, 285), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (220, 220, 220), 1, cv2.LINE_AA)

            cv2.putText(img, "Department Box Plots", (370, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (255, 255, 255), 1, cv2.LINE_AA)

        # Stage titles
        cv2.putText(img, stage_title, (24, 52), cv2.FONT_HERSHEY_SIMPLEX, 0.44, stage_color, 1, cv2.LINE_AA)
        cv2.putText(img, sub_info, (24, height - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.34, (180, 190, 205), 1, cv2.LINE_AA)

        writer.write(img)

    writer.release()
    print("AVI generated successfully:", output_temp_avi)

    cmd = [
        "ffmpeg", "-y",
        "-i", output_temp_avi,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-profile:v", "baseline",
        "-level", "3.0",
        "-movflags", "+faststart",
        output_final_mp4
    ]
    subprocess.run(cmd, check=True)
    print("MP4 generated successfully:", output_final_mp4)
    if os.path.exists(output_temp_avi):
        os.remove(output_temp_avi)

if __name__ == "__main__":
    create_dataviz_video()

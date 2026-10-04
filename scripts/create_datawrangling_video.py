import cv2
import numpy as np
import subprocess
import os

def create_datawrangling_video():
    width = 640
    height = 360
    fps = 30
    duration_sec = 10
    total_frames = fps * duration_sec # 300 frames

    output_temp_avi = "temp_datawrangling.avi"
    output_final_mp4 = "public/datawrangling-preview-10s.mp4"

    os.makedirs("public", exist_ok=True)

    fourcc = cv2.VideoWriter_fourcc(*'MJPG')
    writer = cv2.VideoWriter(output_temp_avi, fourcc, fps, (width, height))

    for frame_idx in range(total_frames):
        current_time_sec = frame_idx / fps
        img = np.zeros((height, width, 3), dtype=np.uint8)
        img[:] = (20, 14, 10) # Dark rich slate/navy

        # Background grid
        for gx in range(0, width, 40):
            cv2.line(img, (gx, 35), (gx, height - 25), (35, 26, 20), 1)
        for gy in range(40, height - 20, 30):
            cv2.line(img, (20, gy), (width - 20, gy), (35, 26, 20), 1)

        # Header bar
        cv2.rectangle(img, (0, 0), (width, 32), (32, 22, 16), -1)
        cv2.line(img, (0, 32), (width, 32), (80, 55, 30), 1)

        # University & Lab title
        cv2.putText(img, "MBU DATA SCIENCE LAB", (16, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (210, 165, 85), 1, cv2.LINE_AA)
        cv2.putText(img, "|  EXP-04: DATA WRANGLING & HIERARCHICAL INDEXING", (195, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (245, 245, 245), 1, cv2.LINE_AA)

        # REC & Timer
        cv2.circle(img, (width - 120, 16), 5, (50, 50, 235), -1)
        timer_str = f"REC  00:{int(current_time_sec):02d} / 00:10"
        cv2.putText(img, timer_str, (width - 108, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (160, 220, 255), 1, cv2.LINE_AA)

        # Bottom status bar
        cv2.rectangle(img, (0, height - 24), (width, height), (24, 18, 14), -1)
        cv2.line(img, (0, height - 24), (width, height - 24), (65, 45, 30), 1)

        if current_time_sec < 3.3:
            # 4A: Hierarchical Indexing & Partial Slicing
            stage_title = "[4A] HIERARCHICAL MULTIINDEX SERIES & PARTIAL SLICING"
            sub_info = "MultiIndex.from_arrays([Dept, Branch]) | series.loc['Engineering']"
            stage_color = (248, 189, 56) # Cyan / Amber

            # Table Header
            cv2.rectangle(img, (80, 65), (560, 95), (45, 32, 24), -1)
            cv2.putText(img, "Department", (95, 85), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (200, 200, 200), 1, cv2.LINE_AA)
            cv2.putText(img, "Branch", (260, 85), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (200, 200, 200), 1, cv2.LINE_AA)
            cv2.putText(img, "Marks (Series)", (420, 85), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (248, 189, 56), 1, cv2.LINE_AA)

            rows = [
                ("Engineering", "CSE", "85", True),
                ("Engineering", "ECE", "78", True),
                ("Science", "Physics", "92", False),
                ("Science", "Chemistry", "88", False),
            ]

            for r_idx, (dept, branch, val, is_eng) in enumerate(rows):
                ry = 105 + r_idx * 34
                # Highlight Engineering subset
                if is_eng:
                    pulse = int(25 + 15 * np.sin(current_time_sec * 6))
                    cv2.rectangle(img, (80, ry - 5), (560, ry + 25), (40 + pulse, 30 + pulse, 20), -1)
                    cv2.rectangle(img, (80, ry - 5), (560, ry + 25), (248, 189, 56), 1)
                else:
                    cv2.rectangle(img, (80, ry - 5), (560, ry + 25), (28, 20, 16), -1)

                cv2.putText(img, dept, (95, ry + 16), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (255, 255, 255), 1, cv2.LINE_AA)
                cv2.putText(img, branch, (260, ry + 16), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (180, 220, 255), 1, cv2.LINE_AA)
                cv2.putText(img, val, (450, ry + 16), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (80, 240, 160), 1, cv2.LINE_AA)

            # Query bubble
            cv2.rectangle(img, (80, 255), (560, 290), (35, 25, 20), -1)
            cv2.rectangle(img, (80, 255), (560, 290), (80, 160, 240), 1)
            cv2.putText(img, ">> marks.loc['Engineering']  ==>  CSE: 85, ECE: 78", (95, 278), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (100, 220, 255), 1, cv2.LINE_AA)

        elif current_time_sec < 6.6:
            # 4B: unstack() and stack()
            stage_title = "[4B] TABULAR RESHAPING WITH UNSTACK() & STACK()"
            sub_info = "unstack(): Row Level -> Column Headers | stack(): Columns -> Hierarchical Rows"
            stage_color = (80, 210, 120)

            cv2.rectangle(img, (70, 65), (570, 160), (35, 25, 20), -1)
            cv2.rectangle(img, (70, 65), (570, 160), (60, 45, 35), 1)
            cv2.putText(img, "data.unstack() Matrix Transformation [2025 | 2026]", (85, 88), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (240, 200, 100), 1, cv2.LINE_AA)

            cols = ["CSE", "ECE", "Physics", "Chemistry"]
            for c_i, cname in enumerate(cols):
                cx = 160 + c_i * 95
                cv2.putText(img, cname, (cx, 115), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (160, 210, 255), 1, cv2.LINE_AA)

            cv2.putText(img, "Engineering", (80, 135), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (255, 255, 255), 1, cv2.LINE_AA)
            cv2.putText(img, "85 | 90", (165, 135), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (100, 240, 160), 1, cv2.LINE_AA)
            cv2.putText(img, "78 | 82", (260, 135), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (100, 240, 160), 1, cv2.LINE_AA)
            cv2.putText(img, "NaN", (360, 135), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (140, 140, 140), 1, cv2.LINE_AA)
            cv2.putText(img, "NaN", (460, 135), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (140, 140, 140), 1, cv2.LINE_AA)

            cv2.putText(img, "Science", (80, 155), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (255, 255, 255), 1, cv2.LINE_AA)
            cv2.putText(img, "NaN", (165, 155), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (140, 140, 140), 1, cv2.LINE_AA)
            cv2.putText(img, "NaN", (260, 155), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (140, 140, 140), 1, cv2.LINE_AA)
            cv2.putText(img, "92 | 95", (360, 155), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (100, 240, 160), 1, cv2.LINE_AA)
            cv2.putText(img, "88 | 91", (460, 155), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (100, 240, 160), 1, cv2.LINE_AA)

            arrow_y = 195
            cv2.arrowedLine(img, (320, 175), (320, 210), (80, 210, 120), 2, tipLength=0.3)
            cv2.putText(img, "unstacked.stack() -> Restores Multilevel Rows", (170, arrow_y + 35), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (80, 210, 120), 1, cv2.LINE_AA)

            cv2.rectangle(img, (70, 250), (570, 290), (35, 25, 20), -1)
            cv2.putText(img, ">> Reconstructed 2-Level MultiIndex: Department x Branch", (85, 275), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (200, 240, 255), 1, cv2.LINE_AA)

        else:
            # 4C: Merge on Index & combine_first()
            stage_title = "[4C] INDEX MERGE & COMBINE_FIRST() OVERLAPPING DATA"
            sub_info = "pd.merge(left_index=True, right_index=True) | df1.combine_first(df2)"
            stage_color = (200, 120, 250)

            cv2.rectangle(img, (70, 60), (300, 150), (35, 25, 20), -1)
            cv2.rectangle(img, (70, 60), (300, 150), (60, 45, 35), 1)
            cv2.putText(img, "DF1 (Primary)", (85, 80), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (255, 200, 100), 1, cv2.LINE_AA)
            cv2.putText(img, "101: Ravi  [85, A]", (85, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (200, 200, 200), 1, cv2.LINE_AA)
            cv2.putText(img, "102: Sita  [NaN, B]  <-- Missing", (85, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (250, 100, 100), 1, cv2.LINE_AA)
            cv2.putText(img, "103: Arun  [78, None]", (85, 140), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (200, 200, 200), 1, cv2.LINE_AA)

            cv2.rectangle(img, (340, 60), (570, 150), (35, 25, 20), -1)
            cv2.rectangle(img, (340, 60), (570, 150), (60, 45, 35), 1)
            cv2.putText(img, "DF2 (Fallback)", (355, 80), cv2.FONT_HERSHEY_SIMPLEX, 0.40, (100, 200, 255), 1, cv2.LINE_AA)
            cv2.putText(img, "101: Ravi  [90, None]", (355, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (200, 200, 200), 1, cv2.LINE_AA)
            cv2.putText(img, "102: Sita  [88, A]   <-- Available", (355, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (80, 240, 140), 1, cv2.LINE_AA)
            cv2.putText(img, "104: Kiran [82, B]", (355, 140), cv2.FONT_HERSHEY_SIMPLEX, 0.36, (200, 200, 200), 1, cv2.LINE_AA)

            cv2.rectangle(img, (70, 175), (570, 290), (38, 28, 22), -1)
            cv2.rectangle(img, (70, 175), (570, 290), (200, 120, 250), 1)
            cv2.putText(img, "RESULT: df1.combine_first(df2) [Imputed & Complete]", (85, 200), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (200, 120, 250), 1, cv2.LINE_AA)

            cv2.putText(img, "101 | Ravi  | Marks: 85.0 (from DF1) | Grade: A", (85, 222), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (220, 220, 220), 1, cv2.LINE_AA)
            cv2.putText(img, "102 | Sita  | Marks: 88.0 (IMPUTED)  | Grade: B", (85, 242), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (80, 240, 140), 1, cv2.LINE_AA)
            cv2.putText(img, "103 | Arun  | Marks: 78.0 (from DF1) | Grade: None", (85, 262), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (220, 220, 220), 1, cv2.LINE_AA)
            cv2.putText(img, "104 | Kiran | Marks: 82.0 (from DF2) | Grade: B", (85, 282), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (120, 200, 255), 1, cv2.LINE_AA)

        # Stage Banner
        cv2.putText(img, stage_title, (16, height - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.38, stage_color, 1, cv2.LINE_AA)
        cv2.putText(img, sub_info, (width - 340, height - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.34, (200, 200, 200), 1, cv2.LINE_AA)

        writer.write(img)

    writer.release()
    print("AVI generated successfully:", output_temp_avi)

    # Convert AVI to MP4 (H.264) using ffmpeg
    cmd = [
        "ffmpeg", "-y",
        "-i", output_temp_avi,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        output_final_mp4
    ]
    subprocess.run(cmd, check=True)
    print("MP4 generated successfully:", output_final_mp4)

    if os.path.exists(output_temp_avi):
        os.remove(output_temp_avi)

if __name__ == "__main__":
    create_datawrangling_video()

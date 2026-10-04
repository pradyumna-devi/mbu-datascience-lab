import cv2
import numpy as np
import subprocess
import os

def create_timeseries_video():
    width = 640
    height = 360
    fps = 30
    duration_sec = 10
    total_frames = fps * duration_sec # 300 frames

    output_temp_avi = "temp_timeseries.avi"
    output_final_mp4 = "public/timeseries-preview-10s.mp4"

    # Make sure public folder exists
    os.makedirs("public", exist_ok=True)

    fourcc = cv2.VideoWriter_fourcc(*'MJPG')
    writer = cv2.VideoWriter(output_temp_avi, fourcc, fps, (width, height))

    np.random.seed(42)
    # Generate underlying time series signal: trend + diurnal seasonality + noise
    t_points = np.linspace(0, 10, total_frames)
    base_trend = 180 - (t_points * 6) # upward trend in values (lower y is higher in image)
    diurnal = 35 * np.sin(t_points * 3.5)
    noise = np.random.normal(0, 5, total_frames)
    full_signal = base_trend + diurnal + noise

    for frame_idx in range(total_frames):
        current_time_sec = frame_idx / fps
        img = np.zeros((height, width, 3), dtype=np.uint8)
        # Background gradient: very dark navy / slate
        img[:] = (18, 13, 9) # BGR: #090d12

        # Draw tech grid lines
        for gx in range(0, width, 40):
            cv2.line(img, (gx, 35), (gx, height - 25), (32, 24, 18), 1)
        for gy in range(40, height - 20, 30):
            cv2.line(img, (20, gy), (width - 20, gy), (32, 24, 18), 1)

        # Header bar
        cv2.rectangle(img, (0, 0), (width, 32), (30, 22, 16), -1)
        cv2.line(img, (0, 32), (width, 32), (80, 50, 30), 1)

        # University & Lab title
        cv2.putText(img, "MBU DATA SCIENCE LAB", (16, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (200, 160, 80), 1, cv2.LINE_AA)
        cv2.putText(img, "|  EXP-06: TIME SERIES ANALYSIS", (195, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.42, (240, 240, 240), 1, cv2.LINE_AA)

        # REC & Timer (top right)
        cv2.circle(img, (width - 120, 16), 5, (50, 50, 235), -1) # Red REC dot
        timer_str = f"REC  00:{int(current_time_sec):02d} / 00:10"
        cv2.putText(img, timer_str, (width - 108, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (160, 220, 255), 1, cv2.LINE_AA)

        # Bottom status bar
        cv2.rectangle(img, (0, height - 24), (width, height), (22, 16, 12), -1)
        cv2.line(img, (0, height - 24), (width, height - 24), (60, 40, 25), 1)

        # Stages logic
        if current_time_sec < 3.0:
            stage_title = "[1/4] SIGNAL ACQUISITION & TELEMETRY"
            sub_info = "Status: Non-Stationary (ADF: -1.78, p=0.388) | Sampling: 50Hz"
            stage_color = (248, 189, 56) # Cyan BGR
            # Draw raw signal up to current frame with trailing cursor
            active_len = int((frame_idx / (fps * 3.0)) * (width - 80)) + 40
            pts = []
            for i in range(max(2, frame_idx + 1)):
                px = int(40 + (i / (fps * 3.0)) * (width - 80))
                py = int(np.clip(full_signal[i], 50, height - 50))
                pts.append((px, py))
            if len(pts) > 1:
                cv2.polylines(img, [np.array(pts)], False, (248, 189, 56), 2, cv2.LINE_AA)
                # Glowing head
                cv2.circle(img, pts[-1], 5, (255, 255, 255), -1)
                cv2.circle(img, pts[-1], 8, (248, 189, 56), 1)
                # Vertical scanning cursor
                cv2.line(img, (pts[-1][0], 40), (pts[-1][0], height - 30), (100, 200, 255), 1)

        elif current_time_sec < 6.0:
            stage_title = "[2/4] SEASONAL DECOMPOSITION (PERIOD = 24h)"
            sub_info = "Decomposition: Trend Cycle (Amber) + Seasonal Wave (Green) + Residuals"
            stage_color = (80, 210, 120) # Green BGR
            
            # Draw 3 separated component curves
            # 1. Trend
            trend_pts = []
            for i in range(frame_idx + 1):
                px = int(40 + (i / total_frames) * (width - 80))
                py = int(75 + (i / total_frames) * 30)
                trend_pts.append((px, py))
            if len(trend_pts) > 1:
                cv2.polylines(img, [np.array(trend_pts)], False, (11, 158, 245), 2, cv2.LINE_AA) # Amber
                cv2.putText(img, "TREND", (50, 70), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (11, 158, 245), 1, cv2.LINE_AA)

            # 2. Seasonality
            season_pts = []
            for i in range(frame_idx + 1):
                px = int(40 + (i / total_frames) * (width - 80))
                py = int(160 + 20 * np.sin((i / 15.0)))
                season_pts.append((px, py))
            if len(season_pts) > 1:
                cv2.polylines(img, [np.array(season_pts)], False, (129, 185, 16), 2, cv2.LINE_AA) # Green
                cv2.putText(img, "SEASONALITY (24H)", (50, 145), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (129, 185, 16), 1, cv2.LINE_AA)

            # 3. Residual
            resid_pts = []
            for i in range(frame_idx + 1):
                px = int(40 + (i / total_frames) * (width - 80))
                py = int(245 + noise[i] * 1.5)
                resid_pts.append((px, py))
            if len(resid_pts) > 1:
                cv2.polylines(img, [np.array(resid_pts)], False, (153, 72, 236), 1, cv2.LINE_AA) # Rose
                cv2.putText(img, "RESIDUAL NOISE", (50, 230), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (153, 72, 236), 1, cv2.LINE_AA)

        elif current_time_sec < 8.2:
            stage_title = "[3/4] DIFFERENCING (d=1) & ARIMA MODEL FITTING"
            sub_info = "ADF Stat: -6.4219 | p < 0.0001 (STATIONARY) | AIC: 4128.4"
            stage_color = (250, 140, 60)

            # Draw differenced stationary signal
            diff_pts = []
            for i in range(1, frame_idx + 1):
                px = int(40 + (i / total_frames) * (width - 80))
                diff_val = full_signal[i] - full_signal[i-1]
                py = int(160 + diff_val * 4.5)
                diff_pts.append((px, py))
            if len(diff_pts) > 1:
                cv2.polylines(img, [np.array(diff_pts)], False, (220, 180, 50), 2, cv2.LINE_AA)
                cv2.line(img, (40, 160), (width - 40, 160), (70, 70, 70), 1, cv2.LINE_AA) # zero line

            # Stationarity banner badge
            cv2.rectangle(img, (width - 240, 55), (width - 40, 105), (35, 45, 20), -1)
            cv2.rectangle(img, (width - 240, 55), (width - 40, 105), (80, 180, 50), 1)
            cv2.putText(img, "STATIONARITY CONFIRMED", (width - 232, 75), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (100, 240, 100), 1, cv2.LINE_AA)
            cv2.putText(img, "p-value = 1.77e-8 <= 0.05", (width - 232, 95), cv2.FONT_HERSHEY_SIMPLEX, 0.34, (200, 240, 200), 1, cv2.LINE_AA)

        else:
            stage_title = "[4/4] 48-HOUR HORIZON FORECASTING (95% CI)"
            sub_info = "Forecast Complete | MAPE: 3.82% | R2: 0.964 | Confidence: 95%"
            stage_color = (248, 140, 129) # Purple/Indigo BGR

            # Historical portion
            hist_pts = []
            split_frame = int(fps * 6.5)
            for i in range(split_frame):
                px = int(40 + (i / total_frames) * (width - 80))
                py = int(np.clip(full_signal[i], 60, height - 60))
                hist_pts.append((px, py))
            if len(hist_pts) > 1:
                cv2.polylines(img, [np.array(hist_pts)], False, (180, 180, 180), 1, cv2.LINE_AA)

            # Split line
            split_x = hist_pts[-1][0]
            cv2.line(img, (split_x, 50), (split_x, height - 35), (100, 100, 255), 1)
            cv2.putText(img, "NOW (T=0)", (split_x - 30, 48), cv2.FONT_HERSHEY_SIMPLEX, 0.32, (150, 150, 255), 1, cv2.LINE_AA)

            # Confidence Interval Cone
            future_frames = frame_idx - split_frame
            if future_frames > 0:
                upper_pts = []
                lower_pts = []
                forecast_pts = []
                for i in range(split_frame, frame_idx + 1):
                    px = int(40 + (i / total_frames) * (width - 80))
                    step = (i - split_frame)
                    py_fore = int(hist_pts[-1][1] - (step * 0.35) + 18 * np.sin(step * 0.25))
                    spread = int(6 + step * 0.45)
                    forecast_pts.append((px, py_fore))
                    upper_pts.append((px, py_fore - spread))
                    lower_pts.append((px, py_fore + spread))

                # Fill CI Polygon
                ci_poly = upper_pts + lower_pts[::-1]
                ci_overlay = img.copy()
                cv2.fillPoly(ci_overlay, [np.array(ci_poly)], (80, 40, 60))
                cv2.addWeighted(ci_overlay, 0.45, img, 0.55, 0, img)

                # CI Boundaries
                cv2.polylines(img, [np.array(upper_pts)], False, (180, 100, 140), 1, cv2.LINE_AA)
                cv2.polylines(img, [np.array(lower_pts)], False, (180, 100, 140), 1, cv2.LINE_AA)

                # Forecast line
                cv2.polylines(img, [np.array(forecast_pts)], False, (248, 140, 129), 2, cv2.LINE_AA)
                cv2.circle(img, forecast_pts[-1], 5, (255, 255, 255), -1)
                cv2.circle(img, forecast_pts[-1], 8, (248, 140, 129), 1)
                cv2.putText(img, "48h PREDICTION", (forecast_pts[-1][0] - 80, forecast_pts[-1][1] - 12), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (248, 140, 129), 1, cv2.LINE_AA)

        # Stage titles
        cv2.putText(img, stage_title, (24, 52), cv2.FONT_HERSHEY_SIMPLEX, 0.45, stage_color, 1, cv2.LINE_AA)
        cv2.putText(img, sub_info, (24, height - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.34, (180, 190, 205), 1, cv2.LINE_AA)

        writer.write(img)

    writer.release()
    print("AVI generated successfully:", output_temp_avi)

    # Convert to web-compatible MP4 using ffmpeg with libx264
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
    create_timeseries_video()

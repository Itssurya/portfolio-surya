import os
import sys
import glob
import subprocess
from PIL import Image, ImageOps, ImageDraw

def get_ffmpeg_exe():
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return "ffmpeg"

def main():
    print("=== Hero Video & Image Asset Builder ===")
    ffmpeg_exe = get_ffmpeg_exe()
    print(f"Using FFmpeg: {ffmpeg_exe}")

    candidates = (
        glob.glob("public/*speaking*.mp4") +
        glob.glob("public/*.mp4") +
        glob.glob("intro.mp4") +
        glob.glob("intro.mov") +
        glob.glob("*speaking*.gif") +
        glob.glob("*.gif")
    )

    inputs = [c for c in candidates if "hero.mp4" not in c and "hero.webm" not in c]
    if not inputs:
        print("Error: No input video found!")
        sys.exit(1)
    
    input_file = inputs[0]
    print(f"Selected video input: {input_file}")

    os.makedirs("public/hero", exist_ok=True)

    mp4_out = "public/hero/hero.mp4"
    webm_out = "public/hero/hero.webm"
    bust_out = "public/portrait-bust.webp"
    og_out = "public/og.jpg"

    # Tight crop around centered standing subject (crop 400x720 at X=440, Y=0)
    # Plus strong background whitening (rimax=0.88) so background is 100% pure 255,255,255 white
    filter_complex = "crop=400:720:440:0,scale=576:-2,colorlevels=rimax=0.88:gimax=0.88:bimax=0.88,format=yuv420p"

    # Export hero.mp4 with spoken audio track
    cmd_mp4 = [
        ffmpeg_exe, "-y", "-i", input_file,
        "-vf", filter_complex,
        "-c:v", "libx264", "-crf", "20", "-preset", "slow",
        "-c:a", "aac", "-b:a", "128k",
        "-movflags", "+faststart",
        mp4_out
    ]

    # Export hero.webm with spoken audio track
    cmd_webm = [
        ffmpeg_exe, "-y", "-i", input_file,
        "-vf", filter_complex,
        "-c:v", "libvpx-vp9", "-crf", "30", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "96k",
        webm_out
    ]

    print("Encoding tightly cropped hero.mp4 with spoken audio track...")
    subprocess.run(cmd_mp4, check=True)

    print("Encoding tightly cropped hero.webm with spoken audio track...")
    subprocess.run(cmd_webm, check=True)

    # Extract PNG frame using FFmpeg for PIL image crops
    temp_frame = "temp_frame_still.png"
    cmd_frame = [ffmpeg_exe, "-y", "-i", input_file, "-ss", "00:00:02", "-vframes", "1", "-update", "1", temp_frame]
    subprocess.run(cmd_frame, check=True)

    frame = Image.open(temp_frame).convert("RGB")

    bust = ImageOps.fit(frame, (480, 600), centering=(0.5, 0.3))
    bust.save(bust_out, "WEBP", quality=92)
    print(f"Saved {bust_out}")

    og = Image.new("RGB", (1200, 630), color=(244, 242, 238))
    avatar = ImageOps.fit(frame, (400, 500), centering=(0.5, 0.3))
    og.paste(avatar, (720, 65))
    og.save(og_out, "JPEG", quality=92)
    print(f"Saved {og_out}")

    if os.path.exists(temp_frame):
        os.remove(temp_frame)

    print("=== Tightly cropped Hero MP4 video with real voice audio built successfully! ===")

if __name__ == "__main__":
    main()

#!/usr/bin/env bash
# Web-friendly H.264/AAC MP4: capped resolution, baseline profile, lower bitrate (smaller file, max compatibility).
set -euo pipefail
cd "$(dirname "$0")"
SRC="public/Lead Generator.mov"
DST="public/shiiman-lead-demo.mp4"
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install with: brew install ffmpeg"
  exit 1
fi
if [[ ! -f "$SRC" ]]; then
  echo "Missing: $SRC"
  exit 1
fi
echo "Encoding (large sources take a long time). Output: $DST"
ffmpeg -y -i "$SRC" \
  -vf "scale='min(1280,iw)':-2:flags=lanczos,format=yuv420p" \
  -c:v libx264 -profile:v baseline -level 3.1 \
  -pix_fmt yuv420p -crf 28 -preset medium \
  -maxrate 2500k -bufsize 5000k \
  -movflags +faststart \
  -c:a aac -ac 2 -ar 44100 -b:a 96k \
  "$DST"
echo "Done: $DST"

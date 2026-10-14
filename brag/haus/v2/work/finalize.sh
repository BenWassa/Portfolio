#!/usr/bin/env bash
# Finalize the render: pick the poster, bake it as frame 0, and loudness-normalize the audio
# (two-pass loudnorm, linear) so the mix sits with the other brag videos (~ -16 LUFS).
# Render first: (cd composition && npx hyperframes render --quality delivery --output ../work/brag-raw.mp4)
# Usage (from brag/haus/v2): bash work/finalize.sh [poster-seconds]
set -euo pipefail
cd "$(dirname "$0")/.."
POSTER_T="${1:-6.5}"   # settled UVP frame: headline + sub + ranked stack

ffmpeg -y -v error -ss "$POSTER_T" -i work/brag-raw.mp4 -frames:v 1 -q:v 2 brag.jpg

# pass 1: measure
MEAS=$(ffmpeg -nostats -i work/brag-raw.mp4 -af loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p' )
get() { echo "$MEAS" | python3 -c "import sys,json; print(json.load(sys.stdin)['$1'])"; }
I=$(get input_i); TP=$(get input_tp); LRA=$(get input_lra); TH=$(get input_thresh); OFF=$(get target_offset)
echo "measured: I=$I TP=$TP LRA=$LRA thresh=$TH offset=$OFF"

# pass 2: apply linearly + bake poster as frame 0 (same duration, same frame count)
ffmpeg -y -v error -i work/brag-raw.mp4 -i brag.jpg \
  -filter_complex "[0:v][1:v]overlay=0:0:enable='eq(n,0)'[v];[0:a]loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=$I:measured_TP=$TP:measured_LRA=$LRA:measured_thresh=$TH:offset=$OFF:linear=true:print_format=summary[a]" \
  -map "[v]" -map "[a]" -t 40.5 -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p \
  -c:a aac -b:a 192k -ar 44100 -movflags +faststart brag.mp4
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,nb_frames -of default=nw=1 brag.mp4

#!/bin/sh
# v5 bed: bundled vol-10 from 0s, -6 dB. The track is 60.0s and the video is 65.5s, so at G(96) the groove jumps back
# 48 beats (12 bars, same bar phase) with a 60 ms crossfade. Intro runs 0..G(16) untouched. G(k) = k * 0.5457.
SRC="$HOME/.claude/plugins/cache/brag/brag/0.4.0/skills/brag/assets/music/happy-beats-business-moves-vol-10-by-ende-dot-app.mp3"
OUT="../composition/assets/music/bed-mix.wav"
LA=52.387      # G(96): where the jump happens in video time
JB=26.194      # G(48): where in the track we land
DUR=66.03      # G(121)
mkdir -p ../composition/assets/music
ffmpeg -y -v error -i "$SRC" -filter_complex "
 [0:a]atrim=0:$(echo "$LA + 0.03" | bc),asetpts=PTS-STARTPTS,afade=t=out:st=$(echo "$LA - 0.03" | bc):d=0.06[a];
 [0:a]atrim=$(echo "$JB - 0.03" | bc):$(echo "$JB + $DUR - $LA + 0.5" | bc),asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.06,adelay=$(echo "($LA - 0.03) * 1000 / 1" | bc | cut -d. -f1)|$(echo "($LA - 0.03) * 1000 / 1" | bc | cut -d. -f1)[b];
 [a][b]amix=inputs=2:normalize=0:duration=longest,atrim=0:$DUR,volume=-6dB,afade=t=in:st=0:d=0.8,afade=t=out:st=$(echo "$DUR - 1.0" | bc):d=1.0" \
 -ar 48000 -ac 2 -c:a pcm_s16le "$OUT"

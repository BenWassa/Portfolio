#!/bin/sh
# v6 bed: bundled vol-10 from 0s, -6 dB. The track is 60.0s and the video is 90.0s, so the groove loops: the track
# plays straight to video beat 96, then repeats its beats 48-96 (12 bars, same bar phase) twice, with 60 ms
# crossfades at the joints. Beat k sits at k * 0.5457s in both the video and the track.
SRC="$HOME/.claude/plugins/cache/brag/brag/0.4.0/skills/brag/assets/music/happy-beats-business-moves-vol-10-by-ende-dot-app.mp3"
OUT="../composition/assets/music/bed-mix.wav"
T96=52.387; T48=26.194; T144=78.581; DUR=90.04
mkdir -p ../composition/assets/music
ms() { echo "($1) * 1000 / 1" | bc | cut -d. -f1; }
ffmpeg -y -v error -i "$SRC" -filter_complex "
 [0:a]atrim=0:$(echo "$T96 + 0.03" | bc),asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.8,afade=t=out:st=$(echo "$T96 - 0.03" | bc):d=0.06[a];
 [0:a]atrim=$(echo "$T48 - 0.03" | bc):$(echo "$T96 + 0.03" | bc),asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.06,afade=t=out:st=$(echo "$T96 - $T48" | bc):d=0.06,adelay=$(ms "$T96 - 0.03")|$(ms "$T96 - 0.03")[b];
 [0:a]atrim=$(echo "$T48 - 0.03" | bc):$(echo "$T48 + $DUR - $T144 + 0.5" | bc),asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.06,adelay=$(ms "$T144 - 0.03")|$(ms "$T144 - 0.03")[c];
 [a][b][c]amix=inputs=3:normalize=0:duration=longest,atrim=0:$DUR,volume=-6dB,afade=t=out:st=$(echo "$DUR - 1.0" | bc):d=1.0" \
 -ar 48000 -ac 2 -c:a pcm_s16le "$OUT"

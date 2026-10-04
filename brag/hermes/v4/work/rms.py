# Per-0.1s RMS of a wav, normalised to the 0..1 range the glow expects. Usage: rms.py in.wav out.json
import subprocess, re, json, sys
src, out = sys.argv[1], sys.argv[2]
p = subprocess.run(["ffmpeg","-v","error","-i",src,"-af","asetnsamples=4800,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=-","-f","null","-"],capture_output=True,text=True)
db = [float(m) for m in re.findall(r"RMS_level=(-?[\d.inf]+)", p.stdout) if m not in ("-inf",)]
# map -28..-17 dB onto 0.14..0.84 (the range the glow was tuned to), then 3-tap smooth
raw = [min(0.84, max(0.14, 0.14 + (d + 28) / 11 * 0.70)) for d in db]
sm = [raw[0]] + [0.25 * raw[i - 1] + 0.5 * raw[i] + 0.25 * raw[i + 1] for i in range(1, len(raw) - 1)] + [raw[-1]]
vals = [round(v, 3) for v in sm]
json.dump(vals, open(out, "w"), separators=(",", ":"))
print(len(vals), min(vals), max(vals))

# Pre-mixes the hook's clock ratchet: one soft click per clock minute (9:12 -> 9:47),
# matching the clock strip's steps(35) tween from 0.35s to 3.05s. Seeded gain jitter.
import wave, array, random, os
W = os.path.dirname(os.path.abspath(__file__))
def load(p):
    with wave.open(p) as w:
        return array.array('h', w.readframes(w.getnframes()))
a, b = load(f'{W}/tick.wav'), load(f'{W}/tick2.wav')
SR, START, SPAN, STEPS = 44100, 0.35, 2.7, 35
out = [0.0] * int(SR * 3.3)
rng = random.Random(912)
for k in range(1, STEPS + 1):
    t = START + k * SPAN / STEPS
    src = a if k % 2 else b
    g = 0.55 + rng.random() * 0.45
    i0 = int(t * SR)
    for j, s in enumerate(src):
        if i0 + j < len(out): out[i0 + j] += s * g
peak = max(abs(x) for x in out) or 1
scale = min(1.0, 30000 / peak)
with wave.open(f'{W}/../composition/assets/sfx/mix/clock-ticks.wav', 'w') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(array.array('h', [int(x * scale) for x in out]).tobytes())
print('ticks', STEPS, 'peak', peak)

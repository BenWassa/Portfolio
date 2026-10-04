# Pre-mixes the hook's clock ratchet: one soft click per clock step (9:12 -> 11:00 PM, 36 steps),
# at the exact times build-composition.mjs wrote to clock-steps.json. Seeded gain jitter; the
# final tick (11:00) is the loudest. Run build-composition.mjs first.
import wave, array, random, os, json
W = os.path.dirname(os.path.abspath(__file__))
def load(p):
    with wave.open(p) as w:
        return array.array('h', w.readframes(w.getnframes()))
a, b = load(f'{W}/tick.wav'), load(f'{W}/tick2.wav')
steps = json.load(open(f'{W}/clock-steps.json'))['steps']
SR = 44100
out = [0.0] * int(SR * (steps[-1] + 0.4))
rng = random.Random(1100)
for k, t in enumerate(steps, 1):
    src = a if k % 2 else b
    g = 1.0 if k == len(steps) else 0.55 + rng.random() * 0.4
    i0 = int(t * SR)
    for j, s in enumerate(src):
        if i0 + j < len(out): out[i0 + j] += s * g
peak = max(abs(x) for x in out) or 1
scale = min(1.0, 30000 / peak)
os.makedirs(f'{W}/../composition/assets/sfx/mix', exist_ok=True)
with wave.open(f'{W}/../composition/assets/sfx/mix/clock-ticks.wav', 'w') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(array.array('h', [int(x * scale) for x in out]).tobytes())
print('ticks', len(steps), 'last at', steps[-1], 's, peak', peak)

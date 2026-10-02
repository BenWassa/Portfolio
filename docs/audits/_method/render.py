#!/usr/bin/env python3
"""Render the per-project findings doc from raw/*.json. Regenerate, never hand-edit."""
import json, glob, os, sys, datetime

AUDIT = sys.argv[1] if len(sys.argv) > 1 else "docs/audits/2026-09-18"
rows = {}
for p in sorted(glob.glob(f"{AUDIT}/raw/*.json")):
    d = json.load(open(p)); rows[d["dir"]] = d

MATERIAL = json.load(open(f"{AUDIT}/material-drift.json")) if os.path.exists(f"{AUDIT}/material-drift.json") else {}

def sect(d, r):
    dm = r.get("demo_mode", {}) or {}
    g  = r.get("git", {}) or {}
    dep= r.get("deploy", {}) or {}
    rd = r.get("readiness", {}) or {}
    o = [f"### `{d}`", ""]
    if d in MATERIAL:
        o += [f"> **⚠ Action needed:** {MATERIAL[d]}", ""]
    o += [f"**{rd.get('one_liner','—')}**", ""]
    o += ["| | |", "|---|---|",
          f"| Recommendation | **`{r.get('recommendation','?')}`** ({r.get('confidence','?')} confidence) |",
          f"| Demo mode | **`{dm.get('level','?')}`** |"]
    if dm.get("triggers"): o.append(f"| Triggers | {'; '.join(f'`{t}`' for t in dm['triggers'][:4])} |")
    o.append(f"| Seed data / blocks writes / auth isolated | {dm.get('seed_data')} / {dm.get('blocks_writes')} / {dm.get('auth_isolated')} |")
    if rd.get("stack"): o.append(f"| Stack | {', '.join(rd['stack'][:6])} |")
    if rd.get("build_cmd"): o.append(f"| Build | `{rd['build_cmd']}` |")
    o.append(f"| Deployed | {dep.get('configured')} {('— ' + dep['url']) if dep.get('url') else ''} {('(' + dep['kind'] + ')') if dep.get('kind') else ''} |")
    o.append(f"| Git | `{g.get('branch','?')}` @ {g.get('head_date','?')} · {g.get('uncommitted',0)} uncommitted · {g.get('unpushed',0)} unpushed |")
    if rd.get("screenshots"): o.append(f"| Screenshots in repo | {', '.join(f'`{s}`' for s in rd['screenshots'][:3])} |")
    o.append("")
    if r.get("rationale"): o += [f"{r['rationale']}", ""]
    if dm.get("evidence"):
        o += ["<details><summary>Demo-mode evidence</summary>", ""]
        o += [f"- `{e}`" for e in dm["evidence"][:10]]
        if dm.get("notes"): o += ["", dm["notes"]]
        o += ["", "</details>", ""]
    if r.get("drift_flags"):
        o += ["<details><summary>Drift findings</summary>", ""]
        o += [f"- {f}" for f in r["drift_flags"]]
        o += ["", "</details>", ""]
    return "\n".join(o)

order = sorted(rows, key=lambda d: (
    {"demo":0,"link":1,"index":2,"skip":3}.get(rows[d].get("recommendation"),9), d.lower()))

out = [f"""---
status: reference
lane: reference
updated: {datetime.date.today()}
---

# Per-project findings — audit {os.path.basename(AUDIT)}

Generated from `raw/*.json` by `docs/audits/_method/render.py`. **Do not hand-edit** —
change the raw JSON and re-render, or the two will drift.

{len(rows)} locally-cloned repositories, audited read-only. Method: `docs/audits/_method/AUDIT-SPEC.md`.

Sorted by recommendation, then name.
"""]
cur = None
for d in order:
    rec = rows[d].get("recommendation", "?")
    if rec != cur:
        cur = rec
        n = sum(1 for x in rows.values() if x.get("recommendation") == rec)
        out.append(f"\n---\n\n## Recommended `{rec}` ({n})\n")
    out.append(sect(d, rows[d]))

open(f"{AUDIT}/FINDINGS-BY-PROJECT.md", "w").write("\n".join(out))
print(f"rendered {len(rows)} projects -> {AUDIT}/FINDINGS-BY-PROJECT.md")

#!/usr/bin/env python3
"""Aggregate subagent research JSONs -> Almanac claude block + summary report."""
import json, os, sys, datetime, glob

SC = os.path.dirname(os.path.abspath(__file__))
RES = f"{SC}/results"
TODAY = datetime.date.today().isoformat()

def load_results():
    out = {}
    for p in sorted(glob.glob(f"{RES}/*.json")):
        try:
            d = json.load(open(p))
        except Exception as e:
            print(f"  !! unparseable {os.path.basename(p)}: {e}", file=sys.stderr)
            continue
        out[d.get("dir") or os.path.basename(p)[:-5]] = d
    return out

def assessment_line(r):
    """Compact one-string summary for Almanac's claude.assessment (rendered in its UI)."""
    dm = r.get("demo_mode", {}) or {}
    lvl = dm.get("level", "?")
    rec = r.get("recommendation", "?")
    conf = r.get("confidence", "?")
    stack = ", ".join((r.get("readiness", {}) or {}).get("stack", [])[:4])
    one = (r.get("readiness", {}) or {}).get("one_liner", "").strip()
    trig = ", ".join(dm.get("triggers", [])[:3])
    parts = [f"demo={lvl}", f"rec={rec}"]
    if trig: parts.append(f"triggers[{trig}]")
    if stack: parts.append(f"stack[{stack}]")
    flags = r.get("drift_flags", []) or []
    if flags: parts.append(f"drift[{'; '.join(flags[:2])}]")
    head = " | ".join(parts)
    tail = f" — {one}" if one else ""
    rat = r.get("rationale", "").strip()
    if rat: tail += f" Rationale: {rat}"
    return f"[{TODAY} audit] {head}{tail} (confidence: {conf})"

def main():
    results = load_results()
    print(f"loaded {len(results)} result files")

    inv_path = "/Users/benjaminhaddon/Github Repos/almanac/data/github-inventory.json"
    inv = json.load(open(inv_path))
    by_lower = {r["repo"].lower(): r for r in inv["repos"]}

    matched, unmatched = 0, []
    for d, r in results.items():
        entry = by_lower.get(d.lower())
        if not entry:
            unmatched.append(d); continue
        entry["claude"]["assessment"] = assessment_line(r)
        entry["claude"]["last_audited"] = TODAY
        entry["claude"]["drift_flag"] = bool(r.get("drift_flags"))
        # alignment_score deliberately left as-is (unused field, undefined semantics)
        matched += 1

    json.dump(inv, open(f"{SC}/github-inventory.updated.json", "w"), indent=1)
    print(f"matched into inventory: {matched}")
    if unmatched:
        print(f"NO ALMANAC ENTRY (local-only, not on GitHub): {unmatched}")

    # summary table
    rows = []
    for d, r in sorted(results.items()):
        dm = r.get("demo_mode", {}) or {}
        rows.append({
            "dir": d,
            "demo": dm.get("level", "?"),
            "rec": r.get("recommendation", "?"),
            "conf": r.get("confidence", "?"),
            "drift": len(r.get("drift_flags", []) or []),
            "deployed": (r.get("deploy", {}) or {}).get("configured", False),
            "one_liner": (r.get("readiness", {}) or {}).get("one_liner", ""),
            "rationale": r.get("rationale", ""),
            "triggers": dm.get("triggers", []),
            "drift_flags": r.get("drift_flags", []) or [],
            "stack": (r.get("readiness", {}) or {}).get("stack", []),
            "url": (r.get("deploy", {}) or {}).get("url", ""),
        })
    json.dump(rows, open(f"{SC}/summary.json", "w"), indent=1)

    from collections import Counter
    print("\ndemo_mode:", dict(Counter(x["demo"] for x in rows)))
    print("recommendation:", dict(Counter(x["rec"] for x in rows)))
    print(f"with drift flags: {sum(1 for x in rows if x['drift'])}")
    print(f"\n{'repo':<28} {'demo':<9} {'rec':<6} {'drift':<5} {'conf'}")
    for x in rows:
        print(f"{x['dir']:<28} {x['demo']:<9} {x['rec']:<6} {x['drift']:<5} {x['conf']}")

if __name__ == "__main__":
    main()

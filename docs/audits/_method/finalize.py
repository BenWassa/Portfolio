#!/usr/bin/env python3
"""Push audit findings back into Almanac's inventory.

Almanac is the index of every repo; this directory is the evidence. This script
carries the evidence across so a decision can be made in Almanac without having
to open the audit.

Writes into each matched repo's `claude` block, which `capture-github.mjs:189`
carries over wholesale, so nothing written here is lost to a nightly capture:

    claude.assessment    one-line prose summary (human reading)
    claude.demo_state    playbook | partial | none   — what demo machinery exists
    claude.demo_rec      demo | link | index | skip   — what the audit recommends
    claude.last_audited  ISO date
    claude.drift_flag    true when this repo needs action before it can be shown

`demo_state` and `demo_rec` are structured rather than parsed back out of the
assessment prose: they drive Almanac's demo pass, and a regex over a sentence is
not a data model.

Usage:
    python3 docs/audits/_method/finalize.py [AUDIT_DIR] [--inventory PATH] [--write]

Without --write the updated inventory is written beside the audit as
`github-inventory.updated.json` and nothing is touched in the Almanac repo.
"""
import argparse, datetime, glob, json, os, re, sys

DEFAULT_AUDIT = "docs/audits/2026-09-18"
DEFAULT_INVENTORY = os.path.expanduser("~/Github Repos/almanac/data/github-inventory.json")

# The vocabulary is shared with docs/DEMO-MODE-METHODS.md and with Almanac's
# DemoIntent type. Anything outside these sets is a typo in a raw record, and is
# reported rather than written through.
DEMO_STATES = {"playbook", "partial", "none"}
DEMO_RECS = {"demo", "link", "index", "skip"}

# A raw record is keyed by the local directory name, which is not always the
# GitHub repo name. Only genuine renames belong here — a repo that is simply
# absent from the inventory should be reported, not aliased into the wrong row.
DIR_ALIASES = {
    "NightShift": "night-shift",
}

# Audited repos that correctly have no Almanac entry, so their absence is not
# reported as a problem. `odysseus` is owned by another account; the inventory
# only captures repos Ben owns.
NOT_OWNED = {"odysseus"}


def assessment_line(name, record, today, material):
    """The prose summary, unchanged in shape from the 2026-09-18 run."""
    dm = record.get("demo_mode", {}) or {}
    rd = record.get("readiness", {}) or {}
    parts = [f"demo={dm.get('level', '?')}", f"rec={record.get('recommendation', '?')}"]
    triggers = dm.get("triggers", [])[:2]
    if triggers:
        parts.append("trigger[" + ", ".join(triggers) + "]")
    stack = rd.get("stack", [])[:3]
    if stack:
        parts.append("stack[" + ", ".join(stack) + "]")
    out = f"[{today} portfolio audit] " + " | ".join(parts)
    one_liner = (rd.get("one_liner") or "").strip()
    if one_liner:
        out += f" — {one_liner}"
    if name in material:
        out += f" ACTION NEEDED: {material[name]}."
    rationale = (record.get("rationale") or "").strip()
    if rationale:
        out += f" {rationale}"
    return out[:1200]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("audit", nargs="?", default=DEFAULT_AUDIT)
    parser.add_argument("--inventory", default=DEFAULT_INVENTORY)
    parser.add_argument("--write", action="store_true",
                        help="write the inventory in place instead of beside the audit")
    args = parser.parse_args()

    # `last_audited` is when the evidence was gathered, not when this script
    # ran. The audit directory is named for that date; re-running finalize a
    # week later must not re-stamp 46 assessments as freshly audited.
    match = re.search(r"(\d{4}-\d{2}-\d{2})", os.path.basename(args.audit.rstrip("/")))
    today = match.group(1) if match else datetime.date.today().isoformat()

    records = {}
    for path in sorted(glob.glob(f"{args.audit}/raw/*.json")):
        record = json.load(open(path))
        records[record["dir"]] = record
    if not records:
        sys.exit(f"No raw records under {args.audit}/raw/ — nothing to finalize.")

    material_path = f"{args.audit}/material-drift.json"
    material = json.load(open(material_path)) if os.path.exists(material_path) else {}

    inventory = json.load(open(args.inventory))
    by_repo = {repo["repo"].lower(): repo for repo in inventory["repos"]}

    matched, unmatched, bad_values = 0, [], []
    for name, record in records.items():
        entry = by_repo.get(DIR_ALIASES.get(name, name).lower())
        if not entry:
            if name not in NOT_OWNED:
                unmatched.append(name)
            continue

        state = (record.get("demo_mode", {}) or {}).get("level", "")
        rec = record.get("recommendation", "")
        if state not in DEMO_STATES:
            bad_values.append(f"{name}: demo_state={state!r}")
            state = ""
        if rec not in DEMO_RECS:
            bad_values.append(f"{name}: demo_rec={rec!r}")
            rec = ""

        entry["claude"]["assessment"] = assessment_line(name, record, today, material)
        entry["claude"]["demo_state"] = state
        entry["claude"]["demo_rec"] = rec
        entry["claude"]["last_audited"] = today
        entry["claude"]["drift_flag"] = name in material
        matched += 1

    # Every repo carries the keys, so Almanac never has to distinguish "absent"
    # from "not audited" — an unaudited repo says so with an empty string.
    for repo in inventory["repos"]:
        repo.setdefault("claude", {})
        repo["claude"].setdefault("demo_state", "")
        repo["claude"].setdefault("demo_rec", "")

    # Match `capture-github.mjs:222` byte for byte — two-space indent, trailing
    # newline. Any other formatting rewrites all 4,000 lines and buries the
    # actual change in the diff.
    out_path = args.inventory if args.write else f"{args.audit}/github-inventory.updated.json"
    with open(out_path, "w") as handle:
        json.dump(inventory, handle, indent=2, ensure_ascii=False)
        handle.write("\n")

    audited = sum(1 for r in inventory["repos"] if r["claude"].get("demo_rec"))
    print(f"matched {matched}/{len(records)} audit records against {len(inventory['repos'])} inventory repos")
    print(f"demo_rec now set on {audited}; drift_flag set on {sum(1 for n in records if n in material)}")
    if unmatched:
        print("no almanac entry (inventory may be stale):", ", ".join(sorted(unmatched)))
    if bad_values:
        print("unrecognised values (left empty):", "; ".join(bad_values))
    print(f"wrote {out_path}")


if __name__ == "__main__":
    main()

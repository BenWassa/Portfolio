# Audits

Point-in-time sweeps of the whole project estate. The purpose is that **this never has to
be re-derived from scratch** — findings, method, and raw data are all version-controlled.

## Layout

```
docs/audits/
├── _method/              reusable, audit-independent
│   ├── AUDIT-SPEC.md     the brief given to each research agent
│   ├── render.py         raw/*.json  ->  FINDINGS-BY-PROJECT.md
│   ├── aggregate.py      raw/*.json  ->  summary + stats
│   └── finalize.py       raw/*.json  ->  Almanac claude-block updates
└── 2026-09-18/
    ├── FINDINGS-BY-PROJECT.md    per-project detail (GENERATED — do not hand-edit)
    ├── CROSS-PROJECT-PATTERNS.md synthesis: archetypes, effort tiers, failure modes
    ├── SECURITY-ACTIONS.md       incidental security/privacy findings
    ├── material-drift.json       curated "needs action" list
    ├── targets.json              what was audited and why
    └── raw/*.json                one machine-readable record per repo
```

`FINDINGS-BY-PROJECT.md` is generated. Edit `raw/*.json` and re-render, or the two drift:

```sh
python3 docs/audits/_method/render.py docs/audits/2026-09-18
```

## Where else the findings live

- **Almanac** (`data/github-inventory.json`) carries a one-line summary per repo in
  `claude.assessment`, plus `claude.last_audited` and `claude.drift_flag`. Those survive
  the nightly capture (`capture-github.mjs:189`) and render in Almanac's own UI.
  Almanac is the *index*; this directory is the *evidence*.
- **`docs/DEMO-MODE-METHODS.md`** is the durable methodology distilled from the findings —
  read that before deciding which projects get demos.

## Running another audit

1. `mkdir -p docs/audits/<date>/raw`
2. Build the target list (locally-cloned repos not already displayed) — see
   `2026-09-18/targets.json` for the shape.
3. Fan out agents in batches of ~6, each given `_method/AUDIT-SPEC.md` verbatim.
   **Instruct them to write each result JSON immediately** rather than batching writes —
   the 2026-09-18 run lost 6 of 8 agents to a rate limit and only kept 30 results because
   some had already written.
4. `render.py`, then `finalize.py` to push summaries back into Almanac.

Agents must be **read-only** on audited repos. No edits, no git state changes, no installs,
no builds.

## Audit log

| Date | Scope | Result |
|---|---|---|
| 2026-09-18 | 48 locally-cloned repos not on the portfolio | 2 playbook / 21 partial / 25 none; 27 `demo`, 8 `link`, 6 `index`, 7 `skip`; 21 material-drift; 3 security actions |

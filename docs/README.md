# docs/ — agent work lanes

This directory is **not** build output. The Vite build emits to `dist/` (git-ignored)
and GitHub Pages deploys via `.github/workflows/deploy-pages.yml`.

| Lane | Meaning |
| --- | --- |
| `docs/open/` | Active plans, audits, decision docs, in-flight workstreams. |
| `docs/closed/` | Completed workstreams, kept for provenance. Move here, never delete. |

Every lane document starts with a front-matter block:

```yaml
---
status: open | blocked | closed
lane: opus | standard | human
issues: [12, 13]
owner: <who is driving this>
updated: YYYY-MM-DD
---
```

See `CLAUDE.md` for the full operating rules.

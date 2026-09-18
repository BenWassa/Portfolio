# Repo research spec — demo-mode + freshness audit

You are auditing locally-cloned repos under `/Users/benjaminhaddon/Github Repos/`.

## HARD RULES
- **READ-ONLY on every repo you audit.** Never edit, commit, stage, checkout, stash,
  pull, push, or run a build/install in the repos you are auditing. No `git checkout`,
  no `git restore`, no `npm install`, no `npm run`. Inspection commands only
  (`git log`, `git status`, `git remote -v`, `cat`, `grep`, `find`, `ls`).
- The ONLY file you write is your result JSON in the scratchpad path you are given.
- If a repo directory is missing or has no `.git`, still emit a record with
  `"error": "<what was wrong>"` and move on. Never fail the whole batch for one repo.

## What to determine per repo

### 1. Demo / template mode
Does the app have a mode that shows realistic seeded content without real user data?

Search for (case-insensitive, across source, not node_modules):
- URL triggers: `mode=demo`, `mode=template`, `demo=1`, `?preview`, `isDemo`, `demoMode`
- Env triggers: `VITE_*_MODE`, `*_DEMO`, `NEXT_PUBLIC_*_DEMO`, `.env.example` entries
- Mode resolvers: a file/hook/function choosing between real and demo state
  (e.g. `useConfiguredAppState`, `getAppState`, `resolveMode`)
- Seed/fixture data: `seed*`, `fixtures/`, `mock*`, `sample-data*`, `demo-data*`,
  `template/` directories
- Write-blocking in demo: disabled export/import/sync/save paths when in demo mode
- Auth isolation: anonymous/fake user handling for demo sessions

Classify `level` as:
- `playbook` — a real mode gate AND deterministic seed data AND some guard on durable
  writes. This is the standard set by `hearth_v2/docs/DEMO_STATE_PLAYBOOK.md`.
- `partial` — some of the above but incomplete (e.g. seeds but no mode gate; a demo flag
  that doesn't block writes; hardcoded sample content with no switch).
- `none` — no demo affordance found.

Record the exact triggers and cite file paths (`path/to/file.ts:LINE`) as evidence.
Do not claim a level you cannot cite evidence for.

### 2. Git / freshness state
From the local clone:
- current branch, HEAD commit date (`git log -1 --format=%cd --date=short`)
- uncommitted changes count (`git status --porcelain | wc -l`)
- unpushed commits (`git log @{u}.. --oneline | wc -l`; if no upstream, say so)
- behind remote (`git fetch` is NOT allowed — use existing refs only;
  `git log ..@{u} --oneline | wc -l` and note the ref may be stale)

### 3. Deployment
- Is there a deploy config? (`.github/workflows/*pages*`, `firebase.json`, `vercel.json`,
  `netlify.toml`, `CNAME`, a `docs/` build output, `homepage` in package.json)
- What URL does it imply, if any?

### 4. Portfolio readiness
- README present and substantive?
- Detected stack (framework, language, key deps from package.json/requirements.txt)
- Build command, if any
- Any existing screenshot/preview images in-repo (path them)
- A one-sentence description of what the project actually does, written from the code and
  README — not copied from the GitHub description.

### 5. Drift flags
Anything where the repo's stated state and actual state disagree: README documents
features not present, unpushed local work, a demo URL in the README that doesn't match
deploy config, stale lockfile vs package.json, abandoned WIP branches, TODO-heavy core.

## Output
Write ONE file per repo: `<SCRATCH>/research/results/<dir>.json`

```json
{
  "dir": "repo-folder-name",
  "demo_mode": {
    "level": "playbook|partial|none",
    "triggers": [],
    "seed_data": false,
    "blocks_writes": false,
    "auth_isolated": false,
    "evidence": ["path:line"],
    "notes": ""
  },
  "git": {
    "branch": "", "head_date": "", "uncommitted": 0,
    "unpushed": 0, "behind": 0, "upstream": ""
  },
  "deploy": { "configured": false, "kind": "", "url": "", "evidence": "" },
  "readiness": {
    "has_readme": false, "stack": [], "build_cmd": "",
    "screenshots": [], "one_liner": ""
  },
  "drift_flags": [],
  "recommendation": "demo|link|index|skip",
  "rationale": "one or two sentences",
  "confidence": "high|medium|low"
}
```

`recommendation` meanings, for a personal portfolio site:
- `demo` — good enough to embed live in an iframe (has or could cheaply get demo mode)
- `link` — worth a card that links out, but not embeddable (needs real data/login, or heavy)
- `index` — real work, but only merits a text listing, not a full card
- `skip` — not portfolio material (work/consulting, backups, scratch, abandoned)

Be honest and specific. "No demo mode found" is a perfectly good finding. Do not inflate
a recommendation to be generous — this feeds a curation decision where precision matters.

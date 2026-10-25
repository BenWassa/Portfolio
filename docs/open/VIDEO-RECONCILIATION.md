---
status: open
lane: opus-recommendation
issues: [25, 36, 44, 45]
owner: Ben
updated: 2026-10-25
---

# Launch-video ("brag") reconciliation: #36, #45, and the video part of #44

Review only. Nothing was moved, deleted, merged, or published to produce this document. All
numbers below were measured from the git objects of `origin/content/brag-videos-pr` (#36),
`origin/content/brag-videos` (#45) and `origin/content/refresh-integration` (#44), and from
`ffprobe` / `ffmpeg` runs on a throwaway sparse checkout of #36's `brag/` tree (since removed).
Where something is inference rather than measurement it says so.

## Decision log

- **2026-10-25, D3 settled (Ben): rendered videos live outside this repo.** No mp4, mov, webm,
  wav or mp3 is committed here; `.gitignore` enforces it (`brag/**/*.mp4` and friends, plus the
  `brag/*/v[0-9]*/` scratch folders). Venue follows the recommendation below (separate
  `portfolio-media` repo, private for the archive, final cuts served from a Release asset or that
  repo). The archive step (section 5, step 4) is not done yet. Still open: D1 (which projects),
  D2 (which version is final), D4 (older versions), D5 (music, font and logo rights in the
  renders) and D6 (how a card references a video).

## 1. Recommendation (read this first)

1. **Do not merge #36 or #45 as they stand, and do not merge #44 while it still carries
   `brag/`.** All three put the same 802 files and about 273 MB of compressed objects into
   `main`'s permanent history. The repo's own workplan already says the rendered mp4 should stay
   "outside the repo unless Ben wants it committed" (`docs/open/INCLUSION-AND-DEMO-WORKPLAN.md`,
   Brag videos section). Nobody has recorded that Ben wants it.
2. **#36 is the canonical source of the video work; #45 is redundant and should be closed as
   superseded (by Ben, not by this doc).** The `brag/` trees on #36, #45 and #44 are
   byte-identical (blob for blob). #45 adds nothing unique except 23 regenerated project-doc files
   that are metadata-only and describe the old 20-project portfolio, so merging them after #44
   would overwrite #44's 36-entry docs (23 merge conflicts, section 2.4).
3. **Cut one fresh slim branch for the videos later** (`content/brag-slim`, off `main` after
   release 1): the index table, plans, share copy and poster frames (about 2.8 MB), plus the
   CLAUDE.md / AGENTS.md / `.gitignore` brag rules. Put the 13 rendered mp4s (251.6 MB) and the
   Hyperframes compositions in a separate `portfolio-media` repo (private for the full archive; the
   final cuts get a public URL from there or from a Release asset).
4. **Release 1 of the portfolio refresh proceeds without `brag/`.** The site currently
   references no video anywhere (section 4.1), so nothing on the live site depends on these files.
   #44 needs `brag/` removed before it merges (section 5, step 2).
5. **Ben decides, in order:** which projects get a video (HAUS was never chosen), which version is
   final for each, where the mp4s live, whether to keep the earlier versions at all, and the
   licensing questions for the music, fonts and logos baked into the renders (section 6).

## 2. File-level comparison

### 2.1 Branch relationships

| Branch | PR | Base | Commits over `main` (4346c0c) | Files changed vs `main` |
| --- | --- | --- | --- | --- |
| `content/brag-videos-pr` | #36 | 4346c0c (main) | 12 (Oct 3 to Oct 4) | 805 (802 under `brag/`, plus `.gitignore`, `AGENTS.md`, `CLAUDE.md`) |
| `content/brag-videos` | #45 | bcdb16f (the perf commit, not in `main`) | 15: bcdb16f, the same 12 brag commits re-written with new hashes, and 2 generated-doc commits (Oct 24) | 838 |
| `content/refresh-integration` | #44 | 4346c0c | 31 (25 non-merge), merging #36 to #43 plus 2 fix commits | 883 (802 under `brag/`) |

- #36's tip (5c2baa2) **is an ancestor of #44**, so #44 already contains #36's history unchanged.
- #36's tip is **not** an ancestor of #45. #45 is a rebase of the same 12 commits onto bcdb16f, so
  it has identical content but different commit hashes. Merging both would put the same 12
  commits into history twice, with different SHAs.
- bcdb16f ("Optimize portfolio loading and project image delivery") is PR #37's commit. #36's body
  says it was deliberately rebased off it. #45 carries it again, and #44 carries it via the merge
  of `perf/image-delivery`. So #45 also lands #37's change outside #37.

### 2.2 `brag/` tree: identical on all three

Compared as sorted (path, blob SHA) lists.

| Comparison | Paths in `brag/` | Same path, same blob | Same path, different blob | Only in one side |
| --- | --- | --- | --- | --- |
| #36 vs #45 | 802 / 802 | 802 | 0 | 0 |
| #36 vs #44 | 802 / 802 | 802 | 0 | 0 |
| #45 vs #44 | 802 / 802 | 802 | 0 | 0 |

`git diff --stat origin/content/brag-videos-pr origin/content/brag-videos -- brag` is empty.
Total bytes by path: 324,710,576. Because identical content shares blob SHAs, git stores the
duplicated files once: 802 paths collapse to **270 unique blobs, 278,070,521 bytes raw,
272,735,017 bytes on disk** (the difference comes from files repeated across versions, mostly the
Hearth composition assets).

### 2.3 What the three branches add outside `brag/`

| Path group | #36 | #45 | #44 |
| --- | --- | --- | --- |
| `.gitignore`, `AGENTS.md` (brag rules) | yes | same blobs as #36 | same blobs as #36 |
| `CLAUDE.md` section 8 "Brag videos" | yes | same blob as #36 (`fd81b4f`) | different blob (`5866116`): #45's text plus a Narrative/Morpheus template-exception paragraph, so #44 is newer |
| perf commit bcdb16f (`PRODUCT.md`, `scripts/optimize-project-images.mjs`, `Onboarding`, `LightPillar`, `Pillar`, `ProjectCard`, `main.tsx`, `imageUtils`, `package*.json`) | no | yes | yes (via #37 merge) |
| `llm-project-contexts/portfolio-project-docs/` | untouched | 23 files rewritten, 20-project snapshot | 39 files, 36-project snapshot |

### 2.4 Verifying the prior scan ("all 838 files in #45 also appear in #44, none unique to #45")

- **Path-level: true.** All 838 paths changed in #45 are also changed in #44. 45 paths are in #44
  only, none of them under `brag/`.
- **Content-level: not true.** On those 838 shared paths, **813 have the same blob and 25 differ.**
  The 25 are `CLAUDE.md`, `package.json` (#44 adds the `health` script), `ALL_PROJECTS.html`,
  `ALL_PROJECTS.md`, `INDEX.md` and the 20 per-project docs.
- So #45 does have unique content, but it is the worse side of each difference:
  - Its two final commits (22a81e4 "regenerate portfolio project docs", 72de8f5 "refresh
    generated project docs metadata", both Oct 24) change only the `Generated:`, `Branch:` and
    `Commit:` header lines (the diff contains nothing else). The snapshot still says
    `Total projects: 20`; #44's says 36.
  - A trial `git merge-tree` of #45 into #44 gives **23 conflicts**, all in the generated docs
    directory. Resolving them the obvious way (take #45) would regress 36 entries back to 20.
- Net: #45 should not be merged after #44, and before #44 it would make #44 conflict. Nothing
  worth keeping is only in #45.

## 3. Per-project inventory (final candidates)

All 13 renders are H.264 + AAC, 30 fps. Sizes are exact bytes from the git tree; durations are
from `ffprobe`; loudness is from `ffmpeg ebur128` (integrated). Bitrate is size x 8 / duration.
Each version folder holds: `brag.mp4` (rendered; poster is baked in as frame 0), `brag.jpg`
(poster), `share-copy.txt`, `brag-plan.md`, `composition-brief.md`, `composition/` (Hyperframes
source) and `work/` (capture and build scripts). Only `brag.mp4` is a rendered output; the rest
is source or text.

### 3.1 Hearth (5 versions, 130,008,806 bytes of mp4)

| Ver | Commit date | Size (bytes) | Duration | Resolution | Mbps | LUFS | Angle (from `brag/README.md`) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| v1 | Oct 3 (moved to `v1/` Oct 4) | 12,203,791 | 22.6s | 1920x1080 | 4.3 | -16.3 | "You pick." chat standoff, then app tour |
| v2 | Oct 4 | 27,001,840 | 22.2s | 1920x1080 | 9.7 | -16.3 | "Still scrolling." save, tag the mood, pick by mood |
| v3 | Oct 3 | 29,977,760 | 37.3s | 1920x1080 | 6.4 | -15.9 | v2 re-timed, two beats per gesture |
| v4 | Oct 4 | 30,083,640 | 40.6s | 1920x1080 | 5.9 | -15.9 | "One place for it all." new UVP, new Spaces scene |
| **v5** | Oct 4 | **30,741,775** | **40.6s** | 1920x1080 | 6.1 | -15.9 | v4 with new turn lines "Which app was that on?" / "Doesn't matter. It's on the shelf." |

**Likely final: v5. Confidence: medium.** Reasons: it is the last version; its plan records that
Ben reviewed v4's turn screen and picked option 1 of six drafted replacements; length 40.6s
matches the pattern in the project notes (Hearth 22s lengthened to 37s, then 40s, "treat 15-25s
as a default to exceed deliberately"). Against: no note records Ben's review of v5 itself, and its
plan lists the Spaces caption "Your people, your shelves." as still open. Hearth is the only
landscape (1920x1080) video; Hermes and HAUS are vertical 1080x1920.
Source is the app's public demo seed; the plan states no real user data. Hearth's "Choose a
Space" screen is rebuilt from source rather than captured (the demo hides the switcher), which
the plan discloses.

### 3.2 Hermes (6 versions, 102,275,212 bytes of mp4)

| Ver | Commit date | Size (bytes) | Duration | Resolution | Mbps | LUFS | Angle |
| --- | --- | --- | --- | --- | --- | --- | --- |
| v1 | Oct 3 | 5,454,796 | 22.4s | 1080x1920 | 1.9 | **-29.0** | "A newspaper that delivers itself." Re-rendered from the preserved composition; README says the original render was not kept |
| v2 | Oct 3 | 5,645,051 | 24.8s | 1080x1920 | 1.8 | -16.0 | "A circulation of one." real run log and push |
| v3 | Oct 3 | 14,862,989 | 31.0s | 1080x1920 | 3.8 | -16.0 | "I replaced three news apps with one finished paper." |
| v4 | Oct 3 | 18,988,689 | 48.6s | 1080x1920 | 3.1 | -16.0 | problem first, slower holds |
| v5 | Oct 4 | 26,378,568 | 66.0s | 1080x1920 | 3.2 | -16.0 | half speed, every page scrolled, Sports re-captured and checked |
| **v6** | Oct 4 | **30,945,119** | **90.1s** | 1080x1920 | 2.8 | -16.0 | v5 plus 2.2s stillness at the end of each of 11 app screens |

**Likely final: v6. Confidence: medium-high.** Ben's recorded feedback on v3 was "nearly perfect,
but a bit too fast", and on v5 "nearly perfect; just wait 2-3 seconds longer at the end of each
screen". v6 is exactly that change and nothing else. No note records Ben's verdict on v6. At 90s it
is far beyond the skill's 25s guideline (Ben has been pushing for slower, so this is deliberate,
but 90s is a poor fit for a card thumbnail or social post; a cut-down is a possible decision).
Flags: it shows the Oct 2 edition of a static public page, and the plan records that the Blue
Jays time shown by the app was an app bug that the capture removed.

### 3.3 HAUS (2 versions, 19,359,154 bytes of mp4)

| Ver | Commit date | Size (bytes) | Duration | Resolution | Mbps | LUFS | Angle |
| --- | --- | --- | --- | --- | --- | --- | --- |
| v1 | Oct 4 | 8,944,746 | 25.0s | 1080x1920 | 2.9 | -16.0 | issue, UVP, proof, together; held to the 25s gate |
| **v2** | Oct 4 | **10,414,408** | **40.5s** | 1080x1920 | 2.1 | -16.0 | v1 re-ordered: one feature per chapter, a numbered rail, the real Settings > This session control |

**Likely final: v2. Confidence: medium-low.** It is the response to Ben's recorded v1 review
("no coherent order... see each feature through"), following the one-feature-per-chapter rules,
and it was normalised to -16 LUFS (the project note records the -24 raw gap and the finalize
step). But there is no recorded review of v2, and **HAUS was never chosen by Ben as the third
project** (issue #25: "Third: Ben has not chosen. Do not pick for him."). Whether HAUS gets a
video at all is a decision, not an assumption. Source is the public demo (fake household
"Maple Street House").

### 3.4 Totals

- Rendered mp4: **13 files, 251,643,172 bytes** (251,294,022 on disk). The 3 likely finals are
  **72,101,302 bytes** (Hearth v5 30.7 MB, Hermes v6 30.9 MB, HAUS v2 10.4 MB); the other
  10 earlier versions are 179.5 MB.
- Everything that is not an mp4: **257 unique blobs, 26,427,349 bytes raw (21.4 MB on disk)**:
  Hyperframes compositions (png, jpg, html, ogg and wav sound effects, woff2 for HAUS), capture
  scripts, plans, share copy, posters.
- Text plus posters for all 13 versions (plans, briefs, share copy, `brag.jpg`, `brag/README.md`):
  **50 unique blobs, 2,828,591 bytes**. Each final poster is 170 to 260 KB.
- Those plus the full sources (composition, work) of the three finals: 17,291,926 bytes.
- The mp4s are 90% of the unique bytes and are already H.264, so git cannot compress them
  (disk size is 99.9% of raw size).
- The music track, system fonts (Hermes), raw renders and `work/` intermediates are gitignored,
  not tracked. The tracked `.ogg` and `.wav` files are short UI sound effects; their origin is
  not documented in the tree (not verified here).
- Size reduction is available without changing the sources: a scratch re-encode at x264 CRF 26,
  preset slow, audio copied, gave Hearth v5 11.5 MB (from 30.7), Hermes v6 12.7 MB (from 30.9)
  and HAUS v2 5.0 MB (from 10.4), about 29 MB for the three finals. **These were size-only
  trials; picture quality was not reviewed.** Hearth v1 and v2 show how uneven the original
  bitrates are (4.3 vs 9.7 Mbps at the same length).

## 4. Repo weight and where the files could live

### 4.1 Does the site use video?

No. On `main` and on #44, a search of `src/`, `scripts/` and `index.html` finds no `.mp4`,
`<video>`, `.webm`, video URL field or poster reference (the only hits are `manifest.webmanifest`
and workplan prose). The Pages deploy builds with Vite (`root: 'src'`, `publicDir: 'src/public'`)
and uploads `dist/`. A root-level `brag/` folder is **not** part of `dist/`, so the 311 MB in
`brag/` would not be published to Pages as it stands; it would only live in git. If videos were
ever copied into `src/public/`, every deploy would re-upload them.
How a card references a video is an open schema question (issue #25: "decide where finished
mp4s live and how a card references them", feeding schema v2, #13).

### 4.2 What each branch costs

Measured with `git rev-list --objects --disk-usage` (objects not already reachable from
`origin/main`):

| Branch | Added objects | Added bytes on disk |
| --- | --- | --- |
| #36 | 411 | 272,797,317 |
| #45 | 482 | 272,980,454 |
| #44 | 669 | 276,834,198 |
| Reference: all of `origin/main`'s history | n/a | 48,776,433 |

- The brag work is about **5.6x the entire current repository.** A fresh clone would go from
  roughly 49 MB to roughly 322 MB.
- #36, #45 and #44 largely overlap: merging two or three of them costs the same bytes once (same
  blob SHAs), plus the duplicated commit and tree objects. The risk of double integration is
  history noise and the doc conflicts in 2.4, not doubled storage.
- **History is permanent.** After a merge to `main`, removing the files later does not shrink the
  repo or clones, and only a history rewrite of a protected branch would (CLAUDE.md forbids it).
  The largest single file is 30.9 MB, under GitHub's per-file push limits (warning at 50 MB,
  block at 100 MB; as I know them from GitHub's docs, verify before relying on them).
- **Pushed branches already cost clones.** A default `git clone` fetches all branches, so as long
  as `content/brag-videos-pr`, `content/brag-videos` and `content/refresh-integration` stay on
  origin, a default clone already downloads the brag objects (the PR refs under `refs/pull/` are
  not fetched by default). The storage question therefore also covers what happens to these
  branches after an archive exists elsewhere (section 5, step 6).
- Pages limits are not the binding constraint: a published Pages site is limited to about 1 GB and
  a repo is recommended to stay under about 1 GB (GitHub docs, from memory; verify). The three
  finals (72 MB, or about 29 MB re-encoded) would fit the Pages artifact. What does not fit
  comfortably is putting 252 MB of renders into git permanently.

### 4.3 Options for storing the rendered mp4s

| Option | How the site would reference video | Pros | Cons / risks for this site |
| --- | --- | --- | --- |
| **A. Keep everything in `main` (#36/#44 as-is)** | Relative path (only if copied under `src/public/`) | One repo, full provenance in one place, GitHub plays mp4 in the blob view | +273 MB permanent, 5.6x clone growth, slows every CI `checkout` (the Pages workflow does a full `actions/checkout`), cannot be undone on `main`. Contradicts the workplan note. |
| **B. Git LFS** | Pointer files in git; real bytes via LFS | Small git history; files stay addressable at a path | Needs a history rewrite or a fresh branch (`git lfs migrate`), and LFS quotas on a free account are small relative to 252 MB (1 GiB storage and 1 GiB/month bandwidth as I recall; verify) so clones and CI could burn them. The Pages build would need `lfs: true` to get real files, and Pages does not serve LFS pointers. Adds tooling for one folder. Not recommended. |
| **C. GitHub Releases assets on `Portfolio`** | Absolute URL to the release asset, stored as a string in `project-descriptions.ts` | No git history cost; 2 GiB per file cap; free; stable tag; versions map naturally to tags such as `brag-hearth-v5` | Download URLs redirect to a CDN; browser `<video>` seeking and CORS behaviour should be tested before relying on it (not tested here). Manual upload step; assets are not diffable or reviewable in PRs; the Release page is public. Sources still need a home. |
| **D. Separate `portfolio-media` repo** | Absolute URL (Pages of that repo, or raw/release URL), stored as a string | Isolates the weight: Portfolio history stays small; the media repo can be reset or recreated at will; its own Pages (about 1 GB cap) serves files with normal range requests; can hold the full archive and the compositions | A second repo to maintain; a cross-repo URL contract; if public, every version is public; if private, it cannot serve the site. Needs its own CLAUDE.md rules. Best fit with "rendered mp4s outside the repo". |
| **E. Slim in-repo: sources, plans and posters only** | Posters in-repo; video URL points to C or D | Preserves provenance and reproducibility at about 2.8 MB (text and posters) to 17 MB (with the finals' sources); posters are what a card needs for mobile and no-autoplay fallback | The mp4 is not in the repo; a render step is needed to get it back (Hermes v1's original render was already lost, so older versions are not guaranteed reproducible). |

**Recommended combination: E + D (+ C as a convenience for the finals).** Portfolio holds the
index, plans, share copy and posters; `portfolio-media` holds all 13 mp4s and the compositions;
the final cuts, once approved, are served from there (or a Release asset). The site references a
URL string plus an in-repo poster, so nothing heavy enters Pages. Mobile: a 1080p vertical video
at the original bitrates is 10 to 30 MB, so show the poster and load video only on user action
(`preload="none"`, `controls`), and never autoplay.

## 5. Action list after approval (ordered)

Nothing here has been done.

1. **Ben decides** the items in section 6. Nothing proceeds before D1 to D3.
2. **Take `brag/` out of the refresh path.** A revert or a deletion commit does not help, because
   the blobs would stay in history once merged. #44 must be rebuilt without #36's 12 commits:
   re-merge #37 to #43 and re-apply the two fix commits, keeping the merge-commit style that
   #44's body asks for. Drop the CLAUDE.md section 8 text, the `.gitignore` brag block and the
   `AGENTS.md` note from that branch (they come back with the slim branch in step 8). Verify
   `git ls-tree -r origin/<branch> | grep -c ' brag/'` gives 0 and `git rev-list --objects
   --disk-usage origin/main..origin/<branch>` is back near 4 MB. Re-run `npm run lint`,
   `format:check` and `build`. Owner: the agent holding #44, `lane:opus` (it changes integration
   scope).
3. **Land release 1 without video** (per #44's own validation).
4. **Archive before closing anything.** Create `BenWassa/portfolio-media` (private) and push the
   full `brag/` tree from `content/brag-videos-pr` (tip 5c2baa2) as its first commit. Verify the
   13 mp4 blob SHAs match before any branch is deleted.
5. **Close #45 as superseded** by this decision (keep #36's branch until step 4 is verified).
   Do not merge #36 or #45. Do not edit their branches.
6. **Delete the three heavy branches from origin only after step 4**, accepting that GitHub keeps
   `refs/pull/N/head` for the PRs; this stops default clones from pulling the objects.
7. **If Ben approves the finals:** optional re-encode of the three finals (section 3.4), review the
   picture, then publish to the chosen host (C or D). Add each final's URL to its card in a
   `lane:opus` change to `project-descriptions.ts`; run `npm run portfolio:project-docs &&
   npm run portfolio:project-docs:compile`.
8. **Cut `content/brag-slim` off `main`** with the brag README table (links updated to the media
   location), plans, briefs, share copy, posters, and CLAUDE.md section 8 amended to say mp4s live
   in the media repo. Keep the `.gitignore` rules for music, fonts and `work/` intermediates.
9. **Update `docs/open/INCLUSION-AND-DEMO-WORKPLAN.md` WS4**, which still says "deferred by Ben,
   2026-10-02" although 13 videos were made on Oct 3 and 4, to record the outcome.

## 6. Decisions needed from Ben

- **D1. Which projects get a video.** Hermes and hearth_v2 were requested; HAUS was never chosen
  (issue #25). Include HAUS, or drop it?
- **D2. Which version is final per project.** Proposed: Hearth v5, Hermes v6, HAUS v2 (confidence
  in section 3). Hermes at 90s and Hearth landscape-only may warrant a shorter or differently
  framed cut.
- **D3. Where the rendered mp4s live.** Proposed: separate `portfolio-media` repo (and optionally a
  Release asset per final). Alternative: stay in-repo, accepting +273 MB forever.
- **D4. What happens to the 10 earlier versions.** Proposed: archive them in the media repo
  (private), keep their plans and posters in-repo. Alternative: delete the renders and keep only
  the compositions, accepting that older versions may not re-render identically.
- **D5. Licences and rights baked into the renders** (not resolvable from the tree): the bundled
  music track ("licence terms undocumented" in `.gitignore`) is **audible in every mp4** even
  though the audio file itself is not tracked; Hermes renders use proprietary system fonts (SF
  Pro, SF Mono, Arial, Georgia, kept out of git); Hermes Sports shows team and league logos
  fetched from third-party CDNs; the origin and licence of the UI sound effects are not recorded.
  Decide whether to publish with any of these, replace them, or keep the videos private.
- **D6. How a card references a video** (schema v2, #13): URL string plus an in-repo poster, with
  no autoplay and a mobile fallback. Settle this before cards link to any file.

## 7. Method notes

- Branch contents were compared with `git ls-tree -r -l` and `git diff --raw --no-abbrev`
  between `origin/main` and each branch, then by sorted (path, blob SHA) joins. No branch was
  checked out in the main checkout. A detached sparse worktree of #36's `brag/` was used for
  `ffprobe`/`ffmpeg` and has been removed.
- Merge behaviour was tested with `git merge-tree --write-tree` (no working tree touched).
- Final selection is inferred from plans, commit messages and the three project notes
  (audio loudness, pacing history, one-feature-per-chapter). No document in the tree says "this
  is the final version" for any project.
- GitHub limits and LFS or Release behaviour marked "as I recall" or "verify" were not checked
  against live documentation in this pass.

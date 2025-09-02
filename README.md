# Portfolio — Benjamin P. Haddon

This repository contains a small collection of live projects and prototypes at the intersection of research, storytelling, and web technology. Each project explores design, interaction patterns, and narrative frameworks with a focus on clarity, craft, and meaning.

## Live site

You can view the hosted portfolio site here:

- https://benwassa.github.io/Portfolio/

The site is built as a static site inside the `docs/` folder and published via GitHub Pages.

## Projects (high level)

The portfolio highlights a handful of projects, including:

- Skywalker — Movie-narrative guide & UX playground
- Sankofa — Mythic psychology narrative framework
- Dukkha — Digital well-being & dopamine craft
- Vox — Language-learning dashboard and tracker
- Orpheus — Experimental audio interfaces
- Agoge — Rites-of-passage research

For full project metadata and descriptions see `docs/project-descriptions.js`.

## Quick local preview

To preview the site locally, serve the `docs/` folder over HTTP. From the repository root you can use Python (recommended if installed):

```powershell
# from repository root
cd docs
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or if you prefer Node.js you can install a tiny static server and run it from `docs/`:

```powershell
npm install -g http-server
cd docs; http-server -p 8000
# then open http://localhost:8000
```

## Notes for maintainers

- The site's source files live in `docs/` (HTML, CSS, JS, and `Project_Images/`).
- Project metadata is exported from `docs/project-descriptions.js`. Image references in that file are relative to the `docs/` folder and were recently corrected to `Project_Images/<name>.png`.
- To update content, edit files under `docs/` and push to `main`; GitHub Pages will publish from `main` -> `docs/` (this repo is already configured that way).

## Contact

Benjamin P. Haddon — https://benwassa.github.io/

---

Small, focused README intended to make it easy to run and update the static portfolio. If you'd like, I can add a development script, CI publish workflow, or a CONTRIBUTING.md next.

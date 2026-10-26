# Hermes branding decision — preservation-first review

**Parent:** [#68](https://github.com/BenWassa/Portfolio/issues/68). The user-approved mandate is to preserve the source application's identity, avoid unnecessary redesign and prefer the real source-repository icon when suitable.

## Verified current sources

| Current portfolio artwork (not an app icon) | Current official PWA icon in the Hermes source repository |
|---|---|
| <img src="https://raw.githubusercontent.com/BenWassa/Portfolio/6703f4f06df7f5ac098c883ebeb13f814661cc2f/src/public/assets/projects/hermes.png" width="200" alt="Hermes current newspaper screenshot from portfolio"> | <img src="https://raw.githubusercontent.com/BenWassa/Hermes/main/docs/icons/icon-512.svg" width="200" alt="Hermes source-repository THE DAILY PWA SVG icon"> |

- **Current site:** `src/public/assets/projects/hermes.png` is a 1024px screenshot of *THE DAILY*, with square 0% radius. The live date, masthead, navigation and stories are part of a screenshot—not independent icon artwork.
- **Current source repository:** `BenWassa/Hermes/docs/manifest.json` identifies `docs/icons/icon-512.svg` (and `icon-192.svg`) as the actual installable application's icon, with an off-white newspaper page, navy rules, masthead and news-line graphics. [Source SVG](https://github.com/BenWassa/Hermes/blob/main/docs/icons/icon-512.svg) · [manifest](https://github.com/BenWassa/Hermes/blob/main/docs/manifest.json).
- The source SVG is **512-vector art**, not an old v1 caduceus icon. It can be rendered to 1024 without raster upscaling. However it contains a square inset border that needs a visual check if masked to 22.5% because the outer border corners would be clipped.

## Options for owner visual decision

**Recommended option for evaluation:** Restore the official THE DAILY PWA SVG as the portfolio's square app icon, rasterized at 1024×1024 with a 22.5% circular outer mask. This is authentic icon reuse rather than a visual redesign, but the square inset border needs approval at 90px and 200px.

**Conservative alternative:** Retain the current screenshot and classify Hermes as project artwork rather than an app icon, with a landscape card and non-cropped image layout. It would remain a product screenshot, not meet the square-app-icon spec.

**Do not:** Mask the screenshot blindly; it clips the top-left publication date and potentially other interface elements. Do not use `archive/v1-hermes` caduceus branding or synthesize new art.

No Hermes image has been changed in PR #68. The requested owner decision is **official THE DAILY PWA icon vs. preserved screenshot as non-icon artwork**. Either path requires a targeted follow-up and viewport review.

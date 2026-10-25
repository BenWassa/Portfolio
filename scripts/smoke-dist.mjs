#!/usr/bin/env node
/**
 * Static smoke test for the production build in dist/ (run `npm run build` first).
 *
 * Offline: no network requests, no browser. Checks that the build output is a
 * coherent, deployable static site:
 *   - dist/index.html exists and has the basics (doctype, viewport, #root)
 *   - every local src/href/content asset it references exists in dist/ (exact case)
 *   - JS and CSS bundles are referenced and non-empty
 *   - the web manifest parses and every icon it lists exists
 *   - every file in src/public (card images, icons, social) was copied to dist/
 *
 * Mobile (390px) / desktop (1440px) layout checks are intentionally not part of
 * this script; see the "Pull request checks" section of the README.
 *
 * Usage: node scripts/smoke-dist.mjs [distDir] [publicDir]
 */

import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, process.argv[2] ?? 'dist');
const publicDir = path.resolve(rootDir, process.argv[3] ?? 'src/public');

const failures = [];
const fail = (msg) => failures.push(msg);
let checked = 0;

const rel = (p) => path.relative(rootDir, p) || '.';
const isRemote = (v) => /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(v);

// Case-sensitive existence check (macOS is case-insensitive, the CI/Pages host is not).
const existsExactCase = (abs) => {
  const parts = path.relative(distDir, abs).split(path.sep).filter(Boolean);
  let cur = distDir;
  for (const part of parts) {
    let entries;
    try {
      entries = fs.readdirSync(cur);
    } catch {
      return false;
    }
    if (!entries.includes(part)) return false;
    cur = path.join(cur, part);
  }
  return fs.statSync(cur).isFile();
};

const checkLocalAsset = (ref, fromDir, context, { nonEmpty = false } = {}) => {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return null;
  const abs = clean.startsWith('/') ? path.join(distDir, clean) : path.resolve(fromDir, clean);
  checked += 1;
  if (!abs.startsWith(distDir + path.sep)) {
    fail(`${context}: "${ref}" resolves outside dist/`);
    return null;
  }
  if (!existsExactCase(abs)) {
    fail(`${context}: "${ref}" not found at ${rel(abs)}`);
    return null;
  }
  if (nonEmpty && fs.statSync(abs).size === 0) fail(`${context}: ${rel(abs)} is empty`);
  return abs;
};

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const main = () => {
  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error(`FAIL: ${rel(indexPath)} does not exist. Run \`npm run build\` first.`);
    process.exit(1);
  }
  const html = fs.readFileSync(indexPath, 'utf8');

  if (!/^\s*<!doctype html>/i.test(html)) fail('index.html: missing <!doctype html>');
  if (!/<meta[^>]+name=["']viewport["'][^>]*>/i.test(html))
    fail('index.html: missing viewport meta (mobile layout)');
  if (!/<title>[^<]+<\/title>/i.test(html)) fail('index.html: missing or empty <title>');
  if (!/id=["']root["']/.test(html)) fail('index.html: missing #root mount element');

  // Every local src/href, plus local og:image / twitter:image content.
  const refs = [];
  const attr = /<(script|link|img|source|video|audio)\b[^>]*>/gi;
  let tag;
  while ((tag = attr.exec(html)) !== null) {
    const t = tag[0];
    const kind = tag[1].toLowerCase();
    const relAttr = /\brel=["']([^"']+)["']/i.exec(t)?.[1] ?? '';
    for (const name of ['src', 'href']) {
      const m = new RegExp(`\\b${name}=["']([^"']+)["']`, 'i').exec(t);
      if (!m || isRemote(m[1]) || m[1].startsWith('#')) continue;
      refs.push({ ref: m[1], kind, rel: relAttr, tag: t });
    }
  }
  const metaImg =
    /<meta[^>]+(?:property|name)=["'](?:og|twitter):image["'][^>]+content=["']([^"']+)["']/gi;
  let mi;
  while ((mi = metaImg.exec(html)) !== null) {
    if (!isRemote(mi[1])) refs.push({ ref: mi[1], kind: 'meta', rel: '', tag: mi[0] });
  }

  let scripts = 0;
  let styles = 0;
  let manifestPath = null;
  for (const r of refs) {
    const isBundle = r.kind === 'script' || (r.kind === 'link' && /stylesheet/i.test(r.rel));
    const abs = checkLocalAsset(r.ref, distDir, `index.html <${r.kind}>`, { nonEmpty: true });
    if (!abs) continue;
    if (r.kind === 'script') scripts += 1;
    if (r.kind === 'link' && /stylesheet/i.test(r.rel)) styles += 1;
    if (r.kind === 'link' && /manifest/i.test(r.rel)) manifestPath = abs;
    if (isBundle && fs.statSync(abs).size < 1024)
      fail(`index.html: bundle ${rel(abs)} is suspiciously small (<1 KB)`);
  }
  if (scripts === 0) fail('index.html: no local JS bundle referenced');
  if (styles === 0) fail('index.html: no local CSS bundle referenced');

  // Manifest and its icons.
  if (!manifestPath) fail('index.html: no <link rel="manifest"> pointing at a file in dist/');
  else {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      if (!manifest.name && !manifest.short_name) fail('manifest: neither name nor short_name set');
      if (!Array.isArray(manifest.icons) || manifest.icons.length === 0)
        fail('manifest: no icons listed');
      for (const icon of manifest.icons ?? []) {
        if (icon?.src && !isRemote(icon.src)) {
          checkLocalAsset(icon.src, path.dirname(manifestPath), 'manifest icon', {
            nonEmpty: true,
          });
        }
      }
    } catch (e) {
      fail(`manifest: ${rel(manifestPath)} is not valid JSON (${e.message})`);
    }
  }

  // Everything in src/public must have been copied through to dist/.
  if (fs.existsSync(publicDir)) {
    for (const file of walk(publicDir)) {
      const target = path.join(distDir, path.relative(publicDir, file));
      checked += 1;
      if (!existsExactCase(target)) fail(`public asset ${rel(file)} missing from dist/`);
      else if (fs.statSync(target).size !== fs.statSync(file).size)
        fail(`public asset ${rel(file)} differs in size from dist/ copy`);
    }
  }

  if (failures.length) {
    console.error(
      `Smoke test FAILED (${failures.length} problem(s), ${checked} reference(s) checked):`
    );
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(
    `Smoke test passed: ${checked} asset reference(s) checked in ${rel(distDir)}/ (${scripts} script, ${styles} stylesheet).`
  );
};

main();

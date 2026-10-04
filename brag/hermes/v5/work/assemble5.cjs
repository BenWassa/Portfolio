// Builds composition/index.html from index5.src.html: inlines the music RMS curve, the status-bar
// icons, the beat-grid section times and the SFX <audio> clips (timed to the visual events).
// The bed has an intro grid (0.267 + n*BP) and, from the drop at 8.73s, a groove grid (k*BP): see index5.src.html.
const fs = require("fs");
const path = require("path");
const here = __dirname;
const out = path.join(here, "..", "composition", "index.html");

const BP = 0.5457;
const A = (n) => +(0.267 + BP * n).toFixed(3);
const G = (k) => +(BP * k).toFixed(3);

let h = fs.readFileSync(path.join(here, "index5.src.html"), "utf8");
const rms = fs.readFileSync(path.join(here, "rms-v5.json"), "utf8");

const icons = (c) => `
  <svg viewBox="0 0 18 12" style="width:18px;height:12px"><g fill="${c}"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></g></svg>
  <svg viewBox="0 0 16 12" style="width:16px;height:12px"><g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M1.5 4.6a9.5 9.5 0 0 1 13 0"/><path d="M4.2 7.4a5.6 5.6 0 0 1 7.6 0"/></g><circle cx="8" cy="10.3" r="1.6" fill="${c}"/></svg>
  <svg viewBox="0 0 27 13" style="width:27px;height:13px"><rect x="0.75" y="0.75" width="22.5" height="11.5" rx="3.5" fill="none" stroke="${c}" stroke-opacity=".45" stroke-width="1.5"/><rect x="2.5" y="2.5" width="16" height="8" rx="2" fill="${c}"/><rect x="24.6" y="4.3" width="1.8" height="4.4" rx="0.9" fill="${c}" fill-opacity=".45"/></svg>`;

const sfx = [];
let n = 0;
const add = (file, t, dur, vol) => {
  sfx.push(`<audio id="sfx${n}" src="assets/sfx/${file}" data-start="${t}" data-duration="${dur}" data-track-index="${30 + (n % 3)}" data-volume="${vol}"></audio>`);
  n++;
};
add("impactSoft_medium_001.ogg", A(1), 0.18, 0.3); // "Other news apps."
[2, 3, 4].forEach((i) => add("drop_001.ogg", A(i), 0.11, 0.35)); // three feeds land, one per beat
add("impactSoft_medium_001.ogg", G(16) + 0.1, 0.18, 0.4); // the drop: masthead
add("impactSoft_medium_001.ogg", G(18), 0.18, 0.33); // "One finished paper."
[25, 26, 27, 28].forEach((k) => add("click2.ogg", G(k), 0.06, 0.4)); // log lines
add("bong_001.ogg", G(32), 0.12, 0.5); // the morning push
[35, 45, 51, 57, 63, 69, 75, 83, 90, 99].forEach((k) => add("click_003.ogg", G(k), 0.02, 0.5)); // taps
add("bong_001.ogg", G(98), 0.12, 0.45); // the weekly push
add("switch_007.ogg", G(111) + 0.1, 0.2, 0.45); // dark mode
add("impactSoft_medium_001.ogg", G(115), 0.18, 0.38); // masthead
add("impactSoft_medium_001.ogg", G(116), 0.18, 0.33); // last line

h = h.replace("/*RMS*/[]", rms)
  .replace("/*ICONS_WHITE*/", icons("#ffffff"))
  .replace("/*ICONS_DARK*/", icons("#111111"))
  .replace("/*ICONS_LIGHT*/", icons("#f0eadc"));
h = h.replace(/\{\{G:(\d+)\}\}/g, (_, k) => G(+k)).replace(/\{\{GD:(\d+)\}\}/g, (_, k) => (BP * +k).toFixed(3));
h = h.replace("<!--SFX-->", sfx.join("\n      "));
if (/\{\{/.test(h)) throw new Error("unreplaced token");
fs.writeFileSync(out, h);
console.log("wrote", out, h.length, "bytes;", n, "sfx; duration", G(121));

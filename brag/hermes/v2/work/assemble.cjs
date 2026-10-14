// Builds composition/index.html from index.src.html: inlines the music RMS curve,
// the status-bar icons, and the SFX <audio> clips (timed to the visual events).
const fs = require("fs");
const path = require("path");
const here = __dirname;
const out = path.join(here, "..", "composition", "index.html");

let h = fs.readFileSync(path.join(here, "index.src.html"), "utf8");
const rms = fs.readFileSync(path.join(here, "rms-v2.json"), "utf8");

const icons = (c) => `
  <svg viewBox="0 0 18 12" style="width:calc(18px * var(--s));height:calc(12px * var(--s))"><g fill="${c}"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></g></svg>
  <svg viewBox="0 0 16 12" style="width:calc(16px * var(--s));height:calc(12px * var(--s))"><g fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"><path d="M1.5 4.6a9.5 9.5 0 0 1 13 0"/><path d="M4.2 7.4a5.6 5.6 0 0 1 7.6 0"/></g><circle cx="8" cy="10.3" r="1.6" fill="${c}"/></svg>
  <svg viewBox="0 0 27 13" style="width:calc(27px * var(--s));height:calc(13px * var(--s))"><rect x="0.75" y="0.75" width="22.5" height="11.5" rx="3.5" fill="none" stroke="${c}" stroke-opacity=".45" stroke-width="1.5"/><rect x="2.5" y="2.5" width="16" height="8" rx="2" fill="${c}"/><rect x="24.6" y="4.3" width="1.8" height="4.4" rx="0.9" fill="${c}" fill-opacity=".45"/></svg>`;

const sfx = [];
let n = 0;
const add = (file, t, dur, vol) => {
  sfx.push(`<audio id="sfx${n}" src="assets/sfx/${file}" data-start="${t}" data-duration="${dur}" data-track-index="${30 + (n % 3)}" data-volume="${vol}"></audio>`);
  n++;
};
add("impactSoft_medium_001.ogg", 0.27, 0.18, 0.4); // hook lands
[4.10, 4.64, 5.19, 5.74].forEach((t) => add("click2.ogg", t, 0.06, 0.42)); // log lines
add("bong_001.ogg", 7.35, 0.12, 0.55); // the push
[8.22, 9.83, 11.47, 12.56, 15.28, 17.47, 18.55].forEach((t) => add("click_003.ogg", t, 0.02, 0.5)); // taps
add("impactSoft_medium_001.ogg", 20.19, 0.18, 0.4); // masthead
add("impactSoft_medium_001.ogg", 21.83, 0.18, 0.35); // last line

h = h.replace("/*RMS*/[]", rms)
  .replace("/*ICONS_WHITE*/", icons("#ffffff"))
  .replace("/*ICONS_DARK*/", icons("#111111"))
  .replace("<!--SFX-->", sfx.join("\n      "));
fs.writeFileSync(out, h);
console.log("wrote", out, h.length, "bytes;", n, "sfx");

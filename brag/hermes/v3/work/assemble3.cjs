// Builds composition/index.html from index3.src.html: inlines the music RMS curve,
// the status-bar icons, and the SFX <audio> clips (timed to the visual events).
const fs = require("fs");
const path = require("path");
const here = __dirname;
const out = path.join(here, "..", "composition", "index.html");

let h = fs.readFileSync(path.join(here, "index3.src.html"), "utf8");
const rms = fs.readFileSync(path.join(here, "rms-v3.json"), "utf8");

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
add("impactSoft_medium_001.ogg", 0.27, 0.18, 0.35); // hook line lands
[4.64, 5.19, 5.74, 6.28].forEach((t) => add("click2.ogg", t, 0.06, 0.4)); // log lines
add("bong_001.ogg", 7.35, 0.12, 0.5); // the morning push
[8.22, 10.38, 12.56, 13.64, 14.73, 15.82, 16.93, 19.1, 21.28, 24.01].forEach((t) => add("click_003.ogg", t, 0.02, 0.5)); // taps
add("bong_001.ogg", 23.46, 0.12, 0.45); // the weekly push
add("switch_007.ogg", 26.95, 0.2, 0.45); // dark mode
add("impactSoft_medium_001.ogg", 28.37, 0.18, 0.38); // masthead
add("impactSoft_medium_001.ogg", 28.92, 0.18, 0.33); // last line

h = h.replace("/*RMS*/[]", rms)
  .replace("/*ICONS_WHITE*/", icons("#ffffff"))
  .replace("/*ICONS_DARK*/", icons("#111111"))
  .replace("/*ICONS_LIGHT*/", icons("#f0eadc"));
h = h.replace("<!--SFX-->", sfx.join("\n      "));
fs.writeFileSync(out, h);
console.log("wrote", out, h.length, "bytes;", n, "sfx");

// Renders the status-bar clock ("7:07", SF Pro semibold 17pt) as transparent 6x PNGs.
const puppeteer = require('/Users/benjaminhaddon/.npm/_npx/702923228c2ce1e6/node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');
const EXE = '/Users/benjaminhaddon/.cache/hyperframes/chrome/chrome-headless-shell/mac_arm-152.0.7977.30/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const font = 'file://' + path.resolve(__dirname, '../composition/assets/fonts/sf-pro.ttf');
(async () => {
  const b = await puppeteer.launch({ executablePath: EXE, headless: true });
  const p = await b.newPage();
  await p.setViewport({ width: 200, height: 100, deviceScaleFactor: 6 });
  for (const [name, color] of [['time-dark', '#111111'], ['time-light', '#f0eadc']]) {
    const f = path.resolve(__dirname, `sb-${name}.html`); fs.writeFileSync(f, `<style>@font-face{font-family:P;src:url("${font}");font-weight:100 900}html,body{margin:0;background:transparent}
      #t{width:56px;height:22px;line-height:22px;text-align:center;font-family:P;font-weight:600;font-size:17px;color:${color}}</style><div id="t">7:07</div>`); await p.goto('file://' + f);
    await p.evaluate(() => document.fonts.ready); console.log(name, await p.evaluate(() => document.fonts.check("600 17px P")));
    const el = await p.$('#t');
    await el.screenshot({ path: path.resolve(__dirname, `../composition/assets/ui/${name}.png`), omitBackground: true });
  }
  await b.close();
})();

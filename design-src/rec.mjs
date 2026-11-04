// node rec.mjs <example> <seconds> <outdir> [fps] [dark]
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs'
import { mkdirSync } from 'node:fs'
const [ex, secs, out, fpsArg, dark] = process.argv.slice(2)
const fps = Number(fpsArg || 30)
mkdirSync(out, { recursive: true })
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 600, height: 900 }, deviceScaleFactor: 2, colorScheme: dark ? 'dark' : 'light' })
p.on('pageerror', e => console.log('PE', e.message))
await p.goto(`http://127.0.0.1:5174/rec.html?ex=${ex}&fps=${fps}${dark ? '&dark=1' : ''}`)
for (let i = 0; i < 200; i++) { if (await p.evaluate(() => !!(window.__recReady && document.querySelector('.ss-stage')))) break; await new Promise(r => setTimeout(r, 100)) }
await p.evaluate(() => window.__stageshow.clock.step(2))
await new Promise(r => setTimeout(r, 800))
const el = await p.$('.ss-stage')
const n = Math.round(Number(secs) * fps)
for (let i = 0; i < n; i++) {
  await p.evaluate(() => window.__stageshow.clock.step(1))
  await el.screenshot({ path: `${out}/f${String(i).padStart(4, '0')}.png`, animations: 'allow' })
}
await b.close()
console.log('frames', n)

// Screenshot a single element's bounding box via CDP.
// Usage: node shotel.mjs <selector> <out.png> [width] [dsf] [--reveal <sel>]
const sel = process.argv[2];
const OUT = process.argv[3];
const WIDTH = Number(process.argv[4] || 1280);
const DSF = Number(process.argv[5] || 2);
const revIdx = process.argv.indexOf("--reveal");
const REVEAL = revIdx >= 0 ? process.argv[revIdx + 1] : null;
const PORT = 9222;

import { writeFileSync } from "node:fs";

const list = await (await fetch(`http://localhost:${PORT}/json`)).json();
const page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
if (!page) { console.error("no page target"); process.exit(1); }

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await new Promise((r) => ws.addEventListener("open", r));
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: 1400, deviceScaleFactor: DSF, mobile: WIDTH < 700 });
await sleep(3000);
if (REVEAL) {
  await send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(REVEAL)})?.classList.add('is-open')` });
  await sleep(700);
}
await send("Runtime.evaluate", { expression: `document.querySelectorAll('.fig-stack > div').forEach(d => d.style.display='none')` });
await sleep(120);
const { result } = await send("Runtime.evaluate", {
  expression: `(()=>{const e=document.querySelector(${JSON.stringify(sel)});const r=e.getBoundingClientRect();return JSON.stringify({x:r.x+scrollX,y:r.y+scrollY,w:r.width,h:r.height});})()`,
  returnByValue: true,
});
const b = JSON.parse(result.value);
const shot = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: true,
  clip: { x: b.x, y: b.y, width: b.w, height: b.h, scale: 1 },
});
writeFileSync(OUT, Buffer.from(shot.data, "base64"));
console.log("wrote", OUT, Math.round(b.w) + "x" + Math.round(b.h));
process.exit(0);

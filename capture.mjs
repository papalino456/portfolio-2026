// Reliable viewport-accurate screenshots via CDP (bypasses --window-size clamp).
// Usage: node capture.mjs <width> <dsf> <out.png> [--reveal] [--reduced] [--port N]
const args = process.argv.slice(2);
const WIDTH = Number(args[0] || 1280);
const DSF = Number(args[1] || 1);
const OUT = args[2] || "shot.png";
const REVEAL = args.includes("--reveal");
const REDUCED = args.includes("--reduced");
const portIdx = args.indexOf("--port");
const PORT = portIdx >= 0 ? Number(args[portIdx + 1]) : 9222;

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
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH, height: 900, deviceScaleFactor: DSF, mobile: WIDTH < 700,
});
if (REDUCED) {
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await send("Page.reload");
  await sleep(1600);
}
await sleep(300);
if (REVEAL) {
  await send("Runtime.evaluate", {
    expression: `(() => { const s = document.createElement('style'); s.textContent = '.tile-detail{opacity:1 !important} .plate::before{opacity:.62 !important}'; document.head.appendChild(s); })()`,
  });
}
// let ResizeObserver re-warm figures, reveal failsafe fire, frames render
await sleep(3000);
// belt-and-suspenders: hide any flash overlay (the only plain div child of a fig-stack)
await send("Runtime.evaluate", {
  expression: `document.querySelectorAll('.fig-stack > div').forEach(d => { d.style.display = 'none'; });`,
});
await sleep(120);

const metrics = await send("Page.getLayoutMetrics");
const h = Math.ceil((metrics.cssContentSize || metrics.contentSize).height);
const shot = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: true,
  clip: { x: 0, y: 0, width: WIDTH, height: h, scale: 1 },
});
writeFileSync(OUT, Buffer.from(shot.data, "base64"));
console.log(`wrote ${OUT} ${WIDTH}x${h} dsf${DSF}${REVEAL ? " reveal" : ""}${REDUCED ? " reduced" : ""}`);
ws.close();

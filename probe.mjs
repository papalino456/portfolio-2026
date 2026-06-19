// Connect to a running headless Chrome (remote debugging) and report
// elements that overflow a given emulated viewport width.
const PORT = 9222;
const WIDTH = Number(process.argv[2] || 375);

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

await new Promise((r) => ws.addEventListener("open", r));
await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: 820, deviceScaleFactor: 2, mobile: true });
await new Promise((r) => setTimeout(r, 700));

const expr = `(() => {
  const vw = document.documentElement.clientWidth;
  const sw = document.documentElement.scrollWidth;
  const off = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    if (r.right > vw + 0.5 || r.left < -0.5) {
      off.push({ tag: el.tagName, cls: (el.className && el.className.toString ? el.className.toString() : '').slice(0,46), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) });
    }
  }
  off.sort((a,b)=>b.right-a.right);
  return JSON.stringify({ vw, sw, count: off.length, top: off.slice(0,18) }, null, 1);
})()`;

const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
console.log(r.result.value);
ws.close();

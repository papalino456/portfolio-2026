/**
 * Procedural figure scenes, each drawn from a domain Sebastian actually
 * works in. All coordinates are in dither-cell units; positions use
 * fractions of the canvas so overlays (drawn at full resolution) align.
 */

import type { Scene, SceneContext } from "./dither";

const SPOT_HEX = "#386bd4";
const SPOT_DEEP_HEX = "#2552ab";

/* ============================================================
   FIG. 02 · IK solution-density field
   ============================================================ */

export function ikField(): Scene {
  return {
    draw({ ctx, spot, w, h }: SceneContext) {
      const bx = 0.5 * w;
      const by = 0.9 * h;
      const Rmax = 0.78 * h;
      const Rmin = 0.2 * Rmax;

      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dx = x - bx;
          const dy = by - y;
          const r = Math.hypot(dx, dy);
          let v = 255;
          if (r > Rmin && r < Rmax && dy > -2) {
            const a = Math.atan2(dy, dx); // 0..PI over the workspace
            const ring =
              Math.exp(-(((r - 0.5 * Rmax) / (0.17 * Rmax)) ** 2)) * 0.62 +
              Math.exp(-(((r - 0.82 * Rmax) / (0.09 * Rmax)) ** 2)) * 0.3;
            const lobes =
              0.55 + 0.45 * Math.sin(5.2 * a + 0.9) * Math.cos(2.4 * a - 0.6);
            const dens = Math.max(0, Math.min(1, ring * lobes));
            v = 255 * (1 - dens * 0.92);
          }
          const i = (y * w + x) * 4;
          d[i] = d[i + 1] = d[i + 2] = v;
          d[i + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);

      // reach limits: dashed arcs
      ctx.strokeStyle = "#222";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      for (const r of [Rmin, Rmax]) {
        ctx.beginPath();
        ctx.arc(bx, by, r, Math.PI, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // radial ticks
      for (let k = 0; k <= 12; k++) {
        const a = Math.PI + (k / 12) * Math.PI;
        ctx.beginPath();
        ctx.moveTo(bx + Math.cos(a) * Rmax, by + Math.sin(a) * Rmax);
        ctx.lineTo(bx + Math.cos(a) * (Rmax + 4), by + Math.sin(a) * (Rmax + 4));
        ctx.stroke();
      }

      // arm skeleton: base, two links to a sample configuration
      const a1 = Math.PI * 1.28;
      const j1x = bx + Math.cos(a1) * Rmax * 0.42;
      const j1y = by + Math.sin(a1) * Rmax * 0.42;
      const a2 = Math.PI * 1.62;
      const eex = j1x + Math.cos(a2) * Rmax * 0.38;
      const eey = j1y + Math.sin(a2) * Rmax * 0.38;

      // links as hollow capsules
      ctx.lineCap = "round";
      const segs: [number, number, number, number, number][] = [
        [bx, by, j1x, j1y, 10.5],
        [j1x, j1y, eex, eey, 8.4],
      ];
      ctx.strokeStyle = "#111";
      for (const [ax, ay, zx, zy, lw] of segs) {
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(zx, zy);
        ctx.stroke();
      }
      ctx.strokeStyle = "#fff";
      for (const [ax, ay, zx, zy, lw] of segs) {
        ctx.lineWidth = lw - 3.6;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(zx, zy);
        ctx.stroke();
      }
      ctx.lineCap = "butt";

      // gripper: square-U parallel jaws facing along the last link
      {
        const dx = Math.cos(a2);
        const dy = Math.sin(a2);
        const px = -dy;
        const py = dx;
        const HALF = 4.5;
        const FING = 7.5;
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.8;
        ctx.lineJoin = "miter";
        ctx.beginPath();
        ctx.moveTo(eex + px * HALF + dx * FING, eey + py * HALF + dy * FING);
        ctx.lineTo(eex + px * HALF, eey + py * HALF);
        ctx.lineTo(eex - px * HALF, eey - py * HALF);
        ctx.lineTo(eex - px * HALF + dx * FING, eey - py * HALF + dy * FING);
        ctx.stroke();
      }

      // base plate
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.moveTo(bx - 9, by);
      ctx.lineTo(bx + 9, by);
      ctx.lineTo(bx + 5, by - 5);
      ctx.lineTo(bx - 5, by - 5);
      ctx.closePath();
      ctx.fill();

      for (const [jx, jy] of [
        [bx, by - 4],
        [j1x, j1y],
        [eex, eey],
      ] as const) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(jx, jy, 3.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // spot: crosses at density maxima
      spot.strokeStyle = "rgba(0,0,0,0.95)";
      spot.lineWidth = 1.6;
      const maxima = [
        [bx - Rmax * 0.46, by - Rmax * 0.28],
        [bx + Rmax * 0.18, by - Rmax * 0.5],
        [bx + Rmax * 0.55, by - Rmax * 0.6],
      ];
      for (const [mx, my] of maxima) {
        spot.beginPath();
        spot.moveTo(mx - 4, my);
        spot.lineTo(mx + 4, my);
        spot.moveTo(mx, my - 4);
        spot.lineTo(mx, my + 4);
        spot.stroke();
        spot.beginPath();
        spot.arc(mx, my, 6, 0, Math.PI * 2);
        spot.stroke();
      }
    },
  };
}

/* ============================================================
   FIG. 03 · Occupancy-grid SLAM + lidar
   ============================================================ */

export function slamGrid(): Scene {
  return {
    draw({ ctx, spot, w, h }: SceneContext) {
      type Rect = [number, number, number, number];
      const rooms: Rect[] = [
        [0.06 * w, 0.08 * h, 0.6 * w, 0.84 * h],
        [0.66 * w, 0.3 * h, 0.28 * w, 0.62 * h],
      ];
      const obstacles: Rect[] = [
        [0.14 * w, 0.18 * h, 0.1 * w, 0.16 * h],
        [0.4 * w, 0.12 * h, 0.14 * w, 0.08 * h],
        [0.18 * w, 0.62 * h, 0.08 * w, 0.2 * h],
        [0.44 * w, 0.5 * h, 0.09 * w, 0.12 * h],
        [0.74 * w, 0.42 * h, 0.07 * w, 0.1 * h],
        [0.78 * w, 0.72 * h, 0.1 * w, 0.09 * h],
      ];

      const inRect = (x: number, y: number, r: Rect) =>
        x >= r[0] && x <= r[0] + r[2] && y >= r[1] && y <= r[1] + r[3];
      const free = (x: number, y: number) =>
        rooms.some((r) => inRect(x, y, r)) &&
        !obstacles.some((r) => inRect(x, y, r));

      // unknown space: mid gray everywhere
      ctx.fillStyle = "#969696";
      ctx.fillRect(0, 0, w, h);

      // explored rooms: white
      ctx.fillStyle = "#fff";
      for (const r of rooms) ctx.fillRect(...r);

      // faint metric grid inside explored space
      ctx.strokeStyle = "rgba(0,0,0,0.07)";
      ctx.lineWidth = 1;
      for (const r of rooms) {
        for (let gx = r[0]; gx <= r[0] + r[2]; gx += 13) {
          ctx.beginPath();
          ctx.moveTo(gx, r[1]);
          ctx.lineTo(gx, r[1] + r[3]);
          ctx.stroke();
        }
        for (let gy = r[1]; gy <= r[1] + r[3]; gy += 13) {
          ctx.beginPath();
          ctx.moveTo(r[0], gy);
          ctx.lineTo(r[0] + r[2], gy);
          ctx.stroke();
        }
      }

      // walls + obstacles
      ctx.strokeStyle = "#161616";
      ctx.lineWidth = 2;
      for (const r of rooms) ctx.strokeRect(...r);
      ctx.fillStyle = "#161616";
      for (const r of obstacles) ctx.fillRect(...r);

      // sensor speckle in free space
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      let seeds = 0;
      while (seeds < 240) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        if (free(x, y)) {
          ctx.fillRect(x, y, 0.9, 0.9);
          seeds++;
        }
      }

      // robot pose + lidar scan
      const px = 0.52 * w;
      const py = 0.72 * h;
      const heading = -0.5;

      ctx.strokeStyle = "rgba(0,0,0,0.26)";
      ctx.lineWidth = 1;
      const hits: [number, number][] = [];
      for (let k = 0; k < 88; k++) {
        const a = (k / 88) * Math.PI * 2;
        let x = px;
        let y = py;
        for (let s = 0; s < 400; s++) {
          x += Math.cos(a) * 1.4;
          y += Math.sin(a) * 1.4;
          if (!free(x, y)) break;
        }
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
        hits.push([x, y]);
      }
      ctx.fillStyle = "#000";
      for (const [hx, hy] of hits) ctx.fillRect(hx - 0.8, hy - 0.8, 1.7, 1.7);

      // traversed path: spot-ink channel
      const path: [number, number][] = [
        [0.12 * w, 0.16 * h],
        [0.3 * w, 0.3 * h],
        [0.16 * w, 0.5 * h],
        [0.34 * w, 0.72 * h],
        [0.56 * w, 0.86 * h],
        [0.6 * w, 0.6 * h],
        [px, py],
      ];
      spot.strokeStyle = "rgba(0,0,0,0.95)";
      spot.lineWidth = 1.8;
      spot.beginPath();
      spot.moveTo(path[0][0], path[0][1]);
      for (let i = 1; i < path.length - 1; i++) {
        const mx = (path[i][0] + path[i + 1][0]) / 2;
        const my = (path[i][1] + path[i + 1][1]) / 2;
        spot.quadraticCurveTo(path[i][0], path[i][1], mx, my);
      }
      spot.lineTo(px, py);
      spot.stroke();
      for (const [wx, wy] of path) {
        spot.beginPath();
        spot.arc(wx, wy, 2.2, 0, Math.PI * 2);
        spot.fill();
      }

      // robot marker
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(heading);
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(7, 0);
      ctx.lineTo(-5, 4.5);
      ctx.lineTo(-5, -4.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    },
  };
}

/* ============================================================
   FIG. 04 · Single-line diagram + detection boxes
   ============================================================ */

/* symbol layout shared between the dithered base and the crisp overlay */
const SLD = {
  busY: 0.24,
  busX0: 0.08,
  busX1: 0.92,
  gen: { x: 0.2, y: 0.11, r: 0.052 },
  xfmr: { x: 0.42, y: 0.52, r: 0.045 },
  breaker: { x: 0.64, y: 0.44, s: 0.05 },
  ground: { x: 0.86, y: 0.66 },
  feeders: [0.2, 0.42, 0.64, 0.86],
};

export function sldDiagram(): Scene {
  return {
    draw({ ctx, w, h }: SceneContext) {
      const S = SLD;
      ctx.strokeStyle = "#1a1a1a";
      ctx.fillStyle = "#1a1a1a";

      // scanned-paper speckle
      for (let i = 0; i < 320; i++) {
        ctx.globalAlpha = 0.18;
        ctx.fillRect(Math.random() * w, Math.random() * h, 0.8, 0.8);
      }
      ctx.globalAlpha = 1;

      // main bus
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(S.busX0 * w, S.busY * h);
      ctx.lineTo(S.busX1 * w, S.busY * h);
      ctx.stroke();

      ctx.lineWidth = 1.4;

      // generator above the bus
      const g = S.gen;
      ctx.beginPath();
      ctx.moveTo(g.x * w, S.busY * h);
      ctx.lineTo(g.x * w, (g.y + g.r) * h);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(g.x * w, g.y * h, g.r * h, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath(); // sine inside
      for (let i = 0; i <= 16; i++) {
        const sx = g.x * w - g.r * h * 0.55 + (i / 16) * g.r * h * 1.1;
        const sy = g.y * h + Math.sin((i / 16) * Math.PI * 2) * g.r * h * 0.3;
        i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // feeders down from the bus
      for (const fx of S.feeders.slice(1)) {
        ctx.beginPath();
        ctx.moveTo(fx * w, S.busY * h);
        ctx.lineTo(fx * w, 0.88 * h);
        ctx.stroke();
      }
      // junction dots
      for (const fx of S.feeders) {
        ctx.beginPath();
        ctx.arc(fx * w, S.busY * h, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // transformer: two overlapping circles
      const t = S.xfmr;
      ctx.fillStyle = "#fff";
      for (const dy of [-0.55, 0.55]) {
        ctx.beginPath();
        ctx.arc(t.x * w, (t.y + dy * t.r) * h, t.r * h, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = "#1a1a1a";

      // breaker: open square on the feeder
      const b = S.breaker;
      ctx.fillStyle = "#fff";
      ctx.fillRect(
        b.x * w - (b.s * h) / 2,
        b.y * h - (b.s * h) / 2,
        b.s * h,
        b.s * h,
      );
      ctx.strokeRect(
        b.x * w - (b.s * h) / 2,
        b.y * h - (b.s * h) / 2,
        b.s * h,
        b.s * h,
      );
      ctx.fillStyle = "#1a1a1a";

      // ground symbol
      const gd = S.ground;
      for (let i = 0; i < 3; i++) {
        const gw = (0.05 - i * 0.014) * w;
        ctx.beginPath();
        ctx.moveTo(gd.x * w - gw, (gd.y + i * 0.035) * h);
        ctx.lineTo(gd.x * w + gw, (gd.y + i * 0.035) * h);
        ctx.stroke();
      }

      // load arrows at feeder ends
      for (const fx of [S.feeders[1], S.feeders[2]]) {
        ctx.beginPath();
        ctx.moveTo(fx * w - 4, 0.88 * h);
        ctx.lineTo(fx * w + 4, 0.88 * h);
        ctx.lineTo(fx * w, 0.93 * h);
        ctx.closePath();
        ctx.fill();
      }
    },

    overlay(ctx, w, h) {
      const S = SLD;
      ctx.font = "11px 'Fragment Mono', monospace";
      ctx.lineWidth = 1.5;

      const box = (
        x: number,
        y: number,
        bw: number,
        bh: number,
        label: string,
      ) => {
        const px = x * w - bw / 2;
        const py = y * h - bh / 2;
        ctx.strokeStyle = SPOT_HEX;
        ctx.strokeRect(px, py, bw, bh);
        // corner ticks
        ctx.lineWidth = 3;
        const tick = 7;
        ctx.beginPath();
        for (const [cx2, cy2, sx, sy] of [
          [px, py, 1, 1],
          [px + bw, py, -1, 1],
          [px, py + bh, 1, -1],
          [px + bw, py + bh, -1, -1],
        ]) {
          ctx.moveTo(cx2 + sx * tick, cy2);
          ctx.lineTo(cx2, cy2);
          ctx.lineTo(cx2, cy2 + sy * tick);
        }
        ctx.stroke();
        ctx.lineWidth = 1.5;
        ctx.fillStyle = SPOT_DEEP_HEX;
        ctx.fillText(label, px, py - 6);
      };

      const u = h; // symbol radii are h-relative
      box(S.gen.x, S.gen.y, S.gen.r * u * 2 + 26, S.gen.r * u * 2 + 26, "GEN 0.97");
      box(S.xfmr.x, S.xfmr.y, S.xfmr.r * u * 2 + 24, S.xfmr.r * u * 3.4 + 24, "XFMR 0.98");
      box(S.breaker.x, S.breaker.y, S.breaker.s * u + 26, S.breaker.s * u + 26, "CB 0.99");
      box(S.ground.x, S.ground.y + 0.035, 0.13 * w, 0.16 * h, "GND 0.96");
    },
  };
}

/* ============================================================
   FIG. 05 · 4-DoF linkage sweep
   ============================================================ */

export function linkageSweep(): Scene {
  return {
    draw({ ctx, spot, w, h }: SceneContext) {
      const bx = 0.3 * w;
      const by = 0.8 * h;
      const L1 = 0.34 * h;
      const L2 = 0.3 * h;
      const L3 = 0.16 * h;

      const pose = (u: number) => {
        const t1 = 1.95 - 0.95 * u;
        const t2 = t1 + (-0.85 + 0.55 * u);
        const t3 = t2 + (-0.7 + 0.45 * u);
        const j1: [number, number] = [
          bx + Math.cos(t1) * L1,
          by - Math.sin(t1) * L1,
        ];
        const j2: [number, number] = [
          j1[0] + Math.cos(t2) * L2,
          j1[1] - Math.sin(t2) * L2,
        ];
        const ee: [number, number] = [
          j2[0] + Math.cos(t3) * L3,
          j2[1] - Math.sin(t3) * L3,
        ];
        return { j1, j2, ee, t3 };
      };

      // floor
      ctx.strokeStyle = "#161616";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(0.08 * w, by);
      ctx.lineTo(0.92 * w, by);
      ctx.stroke();
      ctx.lineWidth = 1;
      for (let x = 0.08 * w; x < 0.92 * w; x += 7) {
        ctx.beginPath();
        ctx.moveTo(x, by);
        ctx.lineTo(x - 4, by + 5);
        ctx.stroke();
      }

      // ghost sweep
      const N = 8;
      const eePath: [number, number][] = [];
      ctx.lineCap = "round";
      for (let i = 0; i < N - 1; i++) {
        const u = i / (N - 1);
        const { j1, j2, ee } = pose(u);
        eePath.push(ee);
        const g = Math.round(216 - 150 * u);
        ctx.strokeStyle = `rgb(${g},${g},${g})`;
        ctx.lineWidth = 1.4 + u * 2.2;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(j1[0], j1[1]);
        ctx.lineTo(j2[0], j2[1]);
        ctx.lineTo(ee[0], ee[1]);
        ctx.stroke();
      }

      // final pose: links as hollow tapered capsules
      const last = pose(1);
      eePath.push(last.ee);
      const chain: [number, number][] = [[bx, by], last.j1, last.j2, last.ee];
      const linkW = [12, 10, 8];
      ctx.strokeStyle = "#111";
      for (let i = 0; i < 3; i++) {
        ctx.lineWidth = linkW[i];
        ctx.beginPath();
        ctx.moveTo(chain[i][0], chain[i][1]);
        ctx.lineTo(chain[i + 1][0], chain[i + 1][1]);
        ctx.stroke();
      }
      ctx.strokeStyle = "#fff";
      for (let i = 0; i < 3; i++) {
        ctx.lineWidth = linkW[i] - 4;
        ctx.beginPath();
        ctx.moveTo(chain[i][0], chain[i][1]);
        ctx.lineTo(chain[i + 1][0], chain[i + 1][1]);
        ctx.stroke();
      }
      ctx.lineCap = "butt";

      // final pose details
      const fin = pose(1);
      // gripper: square-U parallel jaws (y is flipped in this scene)
      {
        const ga = fin.t3;
        const dx = Math.cos(ga);
        const dy = -Math.sin(ga);
        const px = -dy;
        const py = dx;
        const HALF = 4.5;
        const FING = 7.5;
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.8;
        ctx.lineJoin = "miter";
        ctx.beginPath();
        ctx.moveTo(fin.ee[0] + px * HALF + dx * FING, fin.ee[1] + py * HALF + dy * FING);
        ctx.lineTo(fin.ee[0] + px * HALF, fin.ee[1] + py * HALF);
        ctx.lineTo(fin.ee[0] - px * HALF, fin.ee[1] - py * HALF);
        ctx.lineTo(fin.ee[0] - px * HALF + dx * FING, fin.ee[1] - py * HALF + dy * FING);
        ctx.stroke();
      }

      // joints
      for (const [jx, jy] of [[bx, by - 2], fin.j1, fin.j2] as const) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(jx, jy, 4.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // hatched base
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#111";
      ctx.beginPath();
      ctx.moveTo(bx - 13, by);
      ctx.lineTo(bx + 13, by);
      ctx.lineTo(bx + 8, by - 9);
      ctx.lineTo(bx - 8, by - 9);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.save();
      ctx.clip();
      ctx.lineWidth = 1;
      for (let x = bx - 16; x < bx + 16; x += 4) {
        ctx.beginPath();
        ctx.moveTo(x, by + 2);
        ctx.lineTo(x + 8, by - 12);
        ctx.stroke();
      }
      ctx.restore();

      // target object on the floor near the final EE
      const tx = fin.ee[0] + 2;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 1.4;
      ctx.strokeRect(tx - 5, by - 10, 10, 10);

      // spot: end-effector trace
      spot.strokeStyle = "rgba(0,0,0,0.95)";
      spot.lineWidth = 1.6;
      spot.beginPath();
      spot.moveTo(eePath[0][0], eePath[0][1]);
      for (let i = 1; i < eePath.length - 1; i++) {
        const mx = (eePath[i][0] + eePath[i + 1][0]) / 2;
        const my = (eePath[i][1] + eePath[i + 1][1]) / 2;
        spot.quadraticCurveTo(eePath[i][0], eePath[i][1], mx, my);
      }
      spot.stroke();
      for (const [ex, ey] of eePath) {
        spot.beginPath();
        spot.arc(ex, ey, 1.8, 0, Math.PI * 2);
        spot.fill();
      }
    },
  };
}

/* ============================================================
   FIG. 01 · Exploded assembly (wide banner)
   A horizontal exploded view: fastener stack arrayed along a
   dash-dot assembly axis, the way a CAD bill-of-materials reads.
   ============================================================ */

export function explodedAssembly(): Scene {
  return {
    draw({ ctx, spot, w, h }: SceneContext) {
      const cy = h * 0.5;
      const R = h * 0.21;
      ctx.lineJoin = "round";
      ctx.lineCap = "butt";

      const hexPath = (cx: number, cyy: number, r: number, rot = 0) => {
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = rot + (k / 6) * Math.PI * 2;
          k === 0
            ? ctx.moveTo(cx + Math.cos(a) * r, cyy + Math.sin(a) * r)
            : ctx.lineTo(cx + Math.cos(a) * r, cyy + Math.sin(a) * r);
        }
        ctx.closePath();
      };

      const hatchClip = (path: () => void, top: number, bot: number) => {
        ctx.save();
        path();
        ctx.clip();
        ctx.strokeStyle = "rgba(0,0,0,0.42)";
        ctx.lineWidth = 0.7;
        const span = bot - top;
        for (let x = -span; x < w; x += 4) {
          ctx.beginPath();
          ctx.moveTo(x, bot);
          ctx.lineTo(x + span, top);
          ctx.stroke();
        }
        ctx.restore();
      };

      const xs = [0.11, 0.27, 0.435, 0.595, 0.755, 0.905].map((f) => f * w);

      // --- assembly axis: dash-dot centerline in spot ink ---
      spot.strokeStyle = "rgba(0,0,0,0.92)";
      spot.lineWidth = 1.4;
      spot.setLineDash([11, 4, 2, 4]);
      spot.beginPath();
      spot.moveTo(0.035 * w, cy);
      spot.lineTo(0.965 * w, cy);
      spot.stroke();
      spot.setLineDash([]);
      spot.beginPath(); // direction arrowhead
      spot.moveTo(0.965 * w, cy);
      spot.lineTo(0.945 * w, cy - 4.5);
      spot.lineTo(0.945 * w, cy + 4.5);
      spot.closePath();
      spot.fill();

      // small assembly chevrons between stations, spot ink
      spot.strokeStyle = "rgba(0,0,0,0.7)";
      spot.lineWidth = 1.2;
      for (let i = 0; i < xs.length - 1; i++) {
        const mx = (xs[i] + xs[i + 1]) / 2;
        spot.beginPath();
        spot.moveTo(mx - 2.5, cy - 4);
        spot.lineTo(mx + 2.5, cy);
        spot.lineTo(mx - 2.5, cy + 4);
        spot.stroke();
      }

      ctx.strokeStyle = "#111";
      ctx.fillStyle = "#fff";

      // 1 · hex bolt head + shaft stub
      {
        const x = xs[0];
        ctx.lineWidth = 1.5;
        hexPath(x, cy, R * 0.66, Math.PI / 6);
        ctx.fill();
        ctx.stroke();
        hatchClip(() => hexPath(x, cy, R * 0.66, Math.PI / 6), cy - R * 0.66, cy + R * 0.66);
        // shaft stub to the right
        ctx.fillStyle = "#fff";
        ctx.fillRect(x + R * 0.5, cy - R * 0.16, R * 0.5, R * 0.32);
        ctx.strokeRect(x + R * 0.5, cy - R * 0.16, R * 0.5, R * 0.32);
        for (let tx = x + R * 0.58; tx < x + R * 1.0; tx += 3.2) {
          ctx.beginPath();
          ctx.moveTo(tx, cy - R * 0.16);
          ctx.lineTo(tx, cy + R * 0.16);
          ctx.stroke();
        }
      }

      // 2 · washer (annulus)
      {
        const x = xs[1];
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(x, cy, R * 0.34, R * 0.78, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(x, cy, R * 0.17, R * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3 · fastened plate (front face + isometric depth, two holes)
      {
        const x = xs[2];
        const pw = R * 0.52;
        const ph = R * 1.5;
        const dep = R * 0.34;
        ctx.lineWidth = 1.5;
        // depth (top + side parallelograms)
        ctx.beginPath();
        ctx.moveTo(x - pw / 2, cy - ph / 2);
        ctx.lineTo(x - pw / 2 + dep, cy - ph / 2 - dep * 0.7);
        ctx.lineTo(x + pw / 2 + dep, cy - ph / 2 - dep * 0.7);
        ctx.lineTo(x + pw / 2, cy - ph / 2);
        ctx.closePath();
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + pw / 2, cy - ph / 2);
        ctx.lineTo(x + pw / 2 + dep, cy - ph / 2 - dep * 0.7);
        ctx.lineTo(x + pw / 2 + dep, cy + ph / 2 - dep * 0.7);
        ctx.lineTo(x + pw / 2, cy + ph / 2);
        ctx.closePath();
        ctx.stroke();
        // front face
        ctx.fillStyle = "#fff";
        ctx.fillRect(x - pw / 2, cy - ph / 2, pw, ph);
        ctx.strokeRect(x - pw / 2, cy - ph / 2, pw, ph);
        for (const hy of [cy - ph * 0.26, cy + ph * 0.26]) {
          ctx.beginPath();
          ctx.arc(x, hy, R * 0.13, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 4 · spacer sleeve (short cylinder)
      {
        const x = xs[3];
        const sw = R * 0.6;
        const sh = R * 0.9;
        ctx.lineWidth = 1.4;
        ctx.fillStyle = "#fff";
        ctx.fillRect(x - sw / 2, cy - sh / 2, sw, sh);
        ctx.strokeRect(x - sw / 2, cy - sh / 2, sw, sh);
        ctx.beginPath();
        ctx.ellipse(x - sw / 2, cy, R * 0.12, sh / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(x + sw / 2, cy, R * 0.12, sh / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        hatchClip(
          () => ctx.rect(x - sw / 2, cy - sh / 2, sw, sh),
          cy - sh / 2,
          cy + sh / 2,
        );
      }

      // 5 · flange housing (circle flange with bolt circle)
      {
        const x = xs[4];
        ctx.lineWidth = 1.6;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, cy, R * 0.92, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, cy, R * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(x + Math.cos(a) * R * 0.76, cy + Math.sin(a) * R * 0.76, R * 0.08, 0, Math.PI * 2);
          ctx.fillStyle = "#111";
          ctx.fill();
        }
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, cy, R * 0.22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // 6 · hex nut
      {
        const x = xs[5];
        ctx.lineWidth = 1.5;
        ctx.fillStyle = "#fff";
        hexPath(x, cy, R * 0.6, Math.PI / 6);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, cy, R * 0.26, 0, Math.PI * 2);
        ctx.stroke();
      }
    },
  };
}

/* ============================================================
   FIG. 02 · Embedding space + clustering
   A 2-D projection of an embedding: gaussian point clusters with
   faint boundaries, one query node and its nearest neighbours in
   spot ink.
   ============================================================ */

export function embeddingClusters(): Scene {
  return {
    draw({ ctx, spot, w, h }: SceneContext) {
      // small seeded PRNG so the layout is stable across redraws
      let s = 0x2f6b1a3d;
      const rnd = () => {
        s |= 0;
        s = (s + 0x6d2b79f5) | 0;
        let x = Math.imul(s ^ (s >>> 15), 1 | s);
        x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
      };
      const gauss = () => (rnd() + rnd() + rnd() - 1.5) / 1.5;

      // plot frame ticks
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.lineWidth = 1;
      for (let k = 0; k <= 8; k++) {
        const gx = 0.08 * w + (k / 8) * 0.84 * w;
        ctx.beginPath();
        ctx.moveTo(gx, 0.94 * h);
        ctx.lineTo(gx, 0.94 * h + 3);
        ctx.stroke();
        const gy = 0.08 * h + (k / 8) * 0.84 * h;
        ctx.beginPath();
        ctx.moveTo(0.06 * w, gy);
        ctx.lineTo(0.06 * w - 3, gy);
        ctx.stroke();
      }

      const centers: [number, number, number][] = [
        [0.32 * w, 0.34 * h, 0.1],
        [0.7 * w, 0.3 * h, 0.085],
        [0.38 * w, 0.72 * h, 0.095],
        [0.74 * w, 0.68 * h, 0.08],
      ];

      const allPts: [number, number][] = [];
      for (const [cx, cyc, spread] of centers) {
        const pts: [number, number][] = [];
        const n = 16;
        for (let i = 0; i < n; i++) {
          const px = cx + gauss() * spread * w;
          const py = cyc + gauss() * spread * h * 1.4;
          pts.push([px, py]);
          allPts.push([px, py]);
        }
        // faint cluster boundary as a dashed ellipse around the spread
        ctx.strokeStyle = "rgba(0,0,0,0.22)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.ellipse(cx, cyc, spread * w * 1.9, spread * h * 2.5, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        // points
        ctx.fillStyle = "#111";
        for (const [px, py] of pts) {
          ctx.beginPath();
          ctx.arc(px, py, 1.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // query node + k nearest neighbours in spot ink
      const q: [number, number] = [0.52 * w, 0.5 * h];
      const dists = allPts
        .map((p) => [p, Math.hypot(p[0] - q[0], p[1] - q[1])] as [[number, number], number])
        .sort((a, b) => a[1] - b[1])
        .slice(0, 5);
      spot.strokeStyle = "rgba(0,0,0,0.85)";
      spot.lineWidth = 1.2;
      for (const [p] of dists) {
        spot.beginPath();
        spot.moveTo(q[0], q[1]);
        spot.lineTo(p[0], p[1]);
        spot.stroke();
        spot.beginPath();
        spot.arc(p[0], p[1], 2.4, 0, Math.PI * 2);
        spot.stroke();
      }
      spot.fillStyle = "rgba(0,0,0,0.95)";
      spot.beginPath();
      spot.arc(q[0], q[1], 3.4, 0, Math.PI * 2);
      spot.fill();
    },
  };
}

/**
 * Logo-cycle scene. Each "Awards" / "Experience" bento tile shows a sequence
 * of institution logos rendered in the same Bayer-dithered ink as the figures.
 * Logos are baked once to a high-contrast grayscale-on-white bitmap, then
 * crossfaded one into the next; because the crossfade passes mid-gray values
 * through the dither threshold, the transition reads as the logo dissolving
 * dot by dot rather than a flat fade.
 */

import type { Scene, SceneContext } from "./dither";

import ceneval from "../logos/CENEVAL.jpg";
import robocup from "../logos/RoboCup.jpg";
import google from "../logos/google.png";
import harvardx from "../logos/harvard_x.jpeg";
import siemens from "../logos/Siemens.png";
import dresden from "../logos/tu_dresden.jpeg";
import itesm from "../logos/ITESM.svg";
import rockwell from "../logos/Rockwell.svg";

/* resting logo first; the cycle starts on index 0 */
export const AWARD_LOGOS = [ceneval, robocup, google, harvardx];
export const EXPERIENCE_LOGOS = [siemens, dresden, itesm, rockwell];

const BOOST = 1.85; // push light marks (gold line-art, pastel fills) toward solid ink
const MAXDIM = 320; // cap baked bitmap size; the dither cells are far coarser anyway

function bake(img: HTMLImageElement): HTMLCanvasElement {
  const nw = img.naturalWidth || 256;
  const nh = img.naturalHeight || 256;
  const scale = Math.min(1, MAXDIM / Math.max(nw, nh));
  const w = Math.max(1, Math.round(nw * scale));
  const h = Math.max(1, Math.round(nh * scale));
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d", { willReadFrequently: true })!;
  x.drawImage(img, 0, 0, w, h);
  const id = x.getImageData(0, 0, w, h);
  const d = id.data;
  for (let i = 0; i < d.length; i += 4) {
    const a = d[i + 3] / 255;
    const lum = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
    const eff = lum * a + (1 - a); // composite onto white paper
    let darkness = (1 - eff) * BOOST;
    if (darkness > 1) darkness = 1;
    const g = Math.round(255 * (1 - darkness));
    d[i] = d[i + 1] = d[i + 2] = g;
    d[i + 3] = 255;
  }
  x.putImageData(id, 0, 0);
  return c;
}

export function logoCycle(urls: string[]): Scene {
  const imgs: (HTMLImageElement | null)[] = urls.map(() => null);
  const baked: (HTMLCanvasElement | null)[] = urls.map(() => null);

  urls.forEach((u, i) => {
    const im = new Image();
    im.decoding = "async";
    im.onload = () => {
      imgs[i] = im;
    };
    im.src = u;
  });

  const HOLD = 2.6;
  const TRANS = 0.55;
  const CYCLE = HOLD + TRANS;
  const n = urls.length;
  let t0 = -1;

  const getBaked = (i: number): HTMLCanvasElement | null => {
    if (baked[i]) return baked[i];
    const im = imgs[i];
    if (im && im.complete && im.naturalWidth) {
      baked[i] = bake(im);
      return baked[i];
    }
    return null;
  };

  const fitDraw = (
    ctx: CanvasRenderingContext2D,
    c: HTMLCanvasElement,
    w: number,
    h: number,
    alpha: number,
  ) => {
    const pad = 0.17;
    const bw = w * (1 - pad * 2);
    const bh = h * (1 - pad * 2);
    const ar = c.width / c.height;
    let dw = bw;
    let dh = bw / ar;
    if (dh > bh) {
      dh = bh;
      dw = bh * ar;
    }
    ctx.globalAlpha = alpha;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(c, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.globalAlpha = 1;
  };

  return {
    animated: true,
    draw({ ctx, spot, w, h }: SceneContext, t: number) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);
      spot.clearRect(0, 0, w, h);

      // wait for the first logo, then anchor the clock so index 0 shows first
      if (t0 < 0) {
        if (getBaked(0)) t0 = t;
        else return;
      }
      const tt = t - t0;
      const phase = tt % (CYCLE * n);
      const i = Math.floor(phase / CYCLE) % n;
      const within = phase - i * CYCLE;

      const cur = getBaked(i);
      if (cur) fitDraw(ctx, cur, w, h, 1);

      if (within >= HOLD) {
        const p = (within - HOLD) / TRANS;
        const nxt = getBaked((i + 1) % n);
        if (nxt) fitDraw(ctx, nxt, w, h, p);
      }
    },
  };
}

/**
 * Ordered-dither figure engine.
 *
 * A scene draws grayscale "ink" (and optionally a second "spot" channel)
 * onto low-resolution offscreen canvases, one pixel per dither cell. The
 * engine thresholds both channels against a Bayer 8x8 matrix and writes
 * the result to the visible canvas, which CSS upscales with
 * image-rendering: pixelated so every cell stays a crisp square dot.
 */

export interface SceneContext {
  ctx: CanvasRenderingContext2D;
  spot: CanvasRenderingContext2D;
  w: number;
  h: number;
  flash?(): void;
}

export interface Scene {
  /** Called once after (re)sizing, before the first render. */
  init?(s: SceneContext): void;
  /** Draw one frame. Static scenes draw once; animated scenes accumulate. */
  draw(s: SceneContext, t: number): void;
  /** Crisp full-resolution vector pass layered above the dither. Static only. */
  overlay?(ctx: CanvasRenderingContext2D, w: number, h: number): void;
  /** Like overlay but called every animation frame (for live indicators). */
  animatedOverlay?(ctx: CanvasRenderingContext2D, w: number, h: number): void;
  animated?: boolean;
}

const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

/* sRGB ink colors (match the OKLCH tokens in style.css) */
const INK: [number, number, number] = [38, 38, 38];
const SPOT: [number, number, number] = [56, 107, 212];

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)");

export class DitherFig {
  private canvas: HTMLCanvasElement;
  private overlayCanvas: HTMLCanvasElement | null = null;
  private flashEl: HTMLElement;
  private scene: Scene;
  private cellPx: number;

  private buf!: HTMLCanvasElement;
  private bufSpot!: HTMLCanvasElement;
  private out!: ImageData;
  private cw = 0;
  private ch = 0;

  private cssW = 0;
  private cssH = 0;
  private raf = 0;
  private t = 0;
  private running = false;
  private visible = false;
  private reducedTimers: number[] = [];

  constructor(container: HTMLElement, scene: Scene, cellPx = 3) {
    this.canvas = container.querySelector("canvas")!;
    this.scene = scene;
    this.cellPx = cellPx;

    this.flashEl = document.createElement("div");
    this.flashEl.style.cssText =
      "position:absolute;inset:0;pointer-events:none;background:rgba(56,107,212,0.48);opacity:0;z-index:5;";
    container.appendChild(this.flashEl);

    if (scene.overlay || scene.animatedOverlay) {
      this.overlayCanvas = document.createElement("canvas");
      this.overlayCanvas.className = "overlay";
      this.overlayCanvas.setAttribute("aria-hidden", "true");
      container.appendChild(this.overlayCanvas);
    }

    const ro = new ResizeObserver(() => this.setup());
    ro.observe(container);

    if (scene.animated) {
      const io = new IntersectionObserver(
        (entries) => {
          this.visible = entries[0].isIntersecting;
          this.syncLoop();
        },
        { rootMargin: "60px" },
      );
      io.observe(container);
      REDUCED.addEventListener("change", () => this.syncLoop());
    }

    this.setup();
  }

  private setup() {
    const rect = this.canvas.parentElement!.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;

    this.cssW = rect.width;
    this.cssH = rect.height;
    this.cw = Math.max(8, Math.round(rect.width / this.cellPx));
    this.ch = Math.max(8, Math.round(rect.height / this.cellPx));

    this.canvas.width = this.cw;
    this.canvas.height = this.ch;

    this.buf = document.createElement("canvas");
    this.buf.width = this.cw;
    this.buf.height = this.ch;
    this.bufSpot = document.createElement("canvas");
    this.bufSpot.width = this.cw;
    this.bufSpot.height = this.ch;
    this.out = new ImageData(this.cw, this.ch);

    if (this.overlayCanvas) {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      this.overlayCanvas.width = Math.round(rect.width * dpr);
      this.overlayCanvas.height = Math.round(rect.height * dpr);
      const octx = this.overlayCanvas.getContext("2d")!;
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    this.initScene(rect.width, rect.height);
  }

  /** Swap in a fresh scene at the current size (used by the hero switcher). */
  setScene(scene: Scene) {
    this.scene = scene;
    this.t = 0;
    if (this.cw > 1) {
      const rect = this.canvas.parentElement!.getBoundingClientRect();
      this.initScene(rect.width, rect.height);
    }
  }

  private initScene(cssW: number, cssH: number) {
    const s = this.sceneCtx();
    s.ctx.fillStyle = "#fff";
    s.ctx.fillRect(0, 0, this.cw, this.ch);
    s.spot.clearRect(0, 0, this.cw, this.ch);
    this.scene.init?.(s);

    if (this.scene.animated) {
      // Warm the accumulation buffer so the first visible frame is full.
      for (let i = 0; i < 160; i++) {
        this.t += 1 / 60;
        this.scene.draw(s, this.t);
      }
      this.composite();
      this.syncLoop();
    } else {
      this.scene.draw(s, 0);
      this.composite();
    }

    if (this.scene.overlay && this.overlayCanvas) {
      const octx = this.overlayCanvas.getContext("2d")!;
      const render = () => {
        octx.clearRect(0, 0, cssW, cssH);
        this.scene.overlay!(octx, cssW, cssH);
      };
      render();
      document.fonts.ready.then(render);
    }

    if (!this.scene.animatedOverlay && this.overlayCanvas) {
      const octx = this.overlayCanvas.getContext("2d")!;
      octx.clearRect(0, 0, cssW, cssH);
    }
  }

  private triggerFlash() {
    const el = this.flashEl;
    const show = () => { el.style.opacity = "1"; };
    const hide = () => { el.style.opacity = "0"; };
    show();
    setTimeout(hide, 40);
    setTimeout(show, 65);
    setTimeout(hide, 105);
  }

  private sceneCtx(): SceneContext {
    return {
      ctx: this.buf.getContext("2d", { willReadFrequently: true })!,
      spot: this.bufSpot.getContext("2d", { willReadFrequently: true })!,
      w: this.cw,
      h: this.ch,
      flash: () => this.triggerFlash(),
    };
  }

  private composite() {
    const ink = this.buf
      .getContext("2d", { willReadFrequently: true })!
      .getImageData(0, 0, this.cw, this.ch).data;
    const spot = this.bufSpot
      .getContext("2d", { willReadFrequently: true })!
      .getImageData(0, 0, this.cw, this.ch).data;
    const o = this.out.data;

    for (let y = 0; y < this.ch; y++) {
      const row = BAYER[y & 7];
      for (let x = 0; x < this.cw; x++) {
        const i = (y * this.cw + x) * 4;
        const thr = (row[x & 7] + 0.5) / 64;

        // darkness of the ink channel (drawn black on white)
        const dInk = 1 - (ink[i] + ink[i + 1] + ink[i + 2]) / 765;
        // spot channel uses alpha coverage (drawn black onto transparent)
        const dSpot = spot[i + 3] / 255;

        if (dInk > thr) {
          o[i] = INK[0];
          o[i + 1] = INK[1];
          o[i + 2] = INK[2];
          o[i + 3] = 255;
        } else if (dSpot > thr) {
          o[i] = SPOT[0];
          o[i + 1] = SPOT[1];
          o[i + 2] = SPOT[2];
          o[i + 3] = 255;
        } else {
          o[i + 3] = 0;
        }
      }
    }

    this.canvas.getContext("2d")!.putImageData(this.out, 0, 0);
  }

  private oneFrame() {
    this.t += 1 / 60;
    this.scene.draw(this.sceneCtx(), this.t);
    this.composite();
    if (this.scene.animatedOverlay && this.overlayCanvas) {
      const octx = this.overlayCanvas.getContext("2d")!;
      octx.clearRect(0, 0, this.cssW, this.cssH);
      this.scene.animatedOverlay(octx, this.cssW, this.cssH);
    }
  }

  private syncLoop() {
    const shouldRun = !!this.scene.animated && this.visible && !REDUCED.matches;
    if (shouldRun && !this.running) {
      this.running = true;
      const step = () => {
        if (!this.running) return;
        this.oneFrame();
        this.raf = requestAnimationFrame(step);
      };
      this.raf = requestAnimationFrame(step);
    } else if (!shouldRun && this.running) {
      this.running = false;
      cancelAnimationFrame(this.raf);
    }

    // Reduced motion: no continuous loop, but content that loads
    // asynchronously (logo bitmaps) still needs a resting frame, so do a
    // few staged one-shot renders instead of animating.
    if (this.scene.animated && this.visible && REDUCED.matches) {
      for (const id of this.reducedTimers) clearTimeout(id);
      this.reducedTimers = [0, 250, 700, 1500, 2600].map((ms) =>
        window.setTimeout(() => this.oneFrame(), ms),
      );
    }
  }
}

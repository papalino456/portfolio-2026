import "./style.css";
import gsap from "gsap";
import { DitherFig } from "./dither";
import {
  slamGrid,
  sldDiagram,
  linkageSweep,
  explodedAssembly,
  embeddingClusters,
} from "./scenes";
import { heroIK, heroRRT, heroSLAM, type PointerState } from "./hero";
import { logoCycle, AWARD_LOGOS, EXPERIENCE_LOGOS } from "./logos";

/* ---------------- bento figures ---------------- */

const figs: Record<string, () => ReturnType<typeof slamGrid>> = {
  exploded: explodedAssembly,
  embedding: embeddingClusters,
  slam: slamGrid,
  linkage: linkageSweep,
  diagram: sldDiagram,
};

for (const el of document.querySelectorAll<HTMLElement>('[data-fig]:not([data-fig="hero"])')) {
  const make = figs[el.dataset.fig!];
  if (make) new DitherFig(el, make());
}

for (const el of document.querySelectorAll<HTMLElement>("[data-logos]")) {
  const set = el.dataset.logos === "awards" ? AWARD_LOGOS : EXPERIENCE_LOGOS;
  new DitherFig(el, logoCycle(set), 2);
}

/* ---------------- bento tile reveal: tap + keyboard ---------------- */

const tiles = document.querySelectorAll<HTMLElement>(".tile");
for (const tile of tiles) {
  tile.addEventListener("click", () => {
    const open = tile.classList.contains("is-open");
    for (const t of tiles) t.classList.remove("is-open");
    if (!open) tile.classList.add("is-open");
  });
  tile.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      tile.click();
    }
  });
}
document.addEventListener("click", (e) => {
  if (!(e.target as HTMLElement).closest(".tile")) {
    for (const t of tiles) t.classList.remove("is-open");
  }
});

/* ---------------- hero: switchable live simulations ---------------- */

const heroContainer = document.querySelector<HTMLElement>('[data-fig="hero"]')!;
const heroSection = heroContainer.closest<HTMLElement>(".band-hero")!;
const pointer: PointerState = { x: 0.5, y: 0.4, active: false };

// The figure is a freeform layer sitting behind the title and copy, so track the
// cursor across the whole hero (not just the canvas) and map it into the figure's
// own box: the arm reaches toward the cursor even while it hovers the text.
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
heroSection.addEventListener("pointermove", (e) => {
  const rect = heroContainer.getBoundingClientRect();
  pointer.x = clamp01((e.clientX - rect.left) / rect.width);
  pointer.y = clamp01((e.clientY - rect.top) / rect.height);
  pointer.active = true;
});
heroSection.addEventListener("pointerleave", () => {
  pointer.active = false;
});

const heroScenes = {
  ik: {
    make: () => heroIK(pointer),
    label:
      "Live halftone simulation of a robot arm solving inverse kinematics toward a moving target",
  },
  rrt: {
    make: () => heroRRT(),
    label:
      "Live halftone simulation of a rapidly-exploring random tree growing through obstacles toward a goal",
  },
  slam: {
    make: () => heroSLAM(),
    label:
      "Live halftone simulation of a robot exploring a floor plan, revealing the occupancy map with lidar",
  },
} as const;

type HeroKey = keyof typeof heroScenes;

// freeform = organic, non-rectangular silhouette (hero only; bento tiles stay framed)
const heroFig = new DitherFig(heroContainer, heroScenes.ik.make(), 3, true);
const heroCanvas = heroContainer.querySelector("canvas")!;
const sceneButtons = document.querySelectorAll<HTMLButtonElement>(".fig-opt");

for (const btn of sceneButtons) {
  btn.addEventListener("click", () => {
    const key = btn.dataset.scene as HeroKey;
    if (btn.getAttribute("aria-pressed") === "true") return;
    for (const b of sceneButtons) {
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    }
    const def = heroScenes[key];
    heroFig.setScene(def.make());
    heroCanvas.setAttribute("aria-label", def.label);
  });
}

/* ---------------- headline hypertext scramble ---------------- */

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

const flipWrap = document.getElementById("flip-word");
if (flipWrap && !reduced) {
  const visual = flipWrap.querySelector<HTMLElement>(".flip-visual")!;
  const WORDS = ["vision", "planning", "control", "learning"];
  const ALPHA = "abcdefghijklmnopqrstuvwxyz";

  // hidden measurer inherits the headline font, so widths track clamp()
  const meas = document.createElement("span");
  meas.style.cssText =
    "position:fixed;left:0;top:0;visibility:hidden;white-space:nowrap;pointer-events:none;";
  meas.setAttribute("aria-hidden", "true");
  flipWrap.appendChild(meas);
  const widthOf = (t: string) => {
    meas.textContent = t;
    return meas.offsetWidth;
  };

  const HOLD_HOME = 2600;
  const HOLD_WORD = 1400;
  const HOLD_HOVER = 350;
  const MORPH_MS = 720;
  const TICK_MS = 45;

  let hovering = false;
  let morphing = false;
  let running = false;
  let holdTimer = 0;
  let pendingFn: (() => void) | null = null;

  /** magicui-style hyper-text: letters decode left to right through noise */
  const morphTo = (target: string, then: () => void) => {
    morphing = true;
    gsap.set(flipWrap, { width: flipWrap.offsetWidth });
    gsap.to(flipWrap, {
      width: widthOf(target),
      duration: MORPH_MS / 1000,
      ease: "power2.out",
    });
    const steps = Math.ceil(MORPH_MS / TICK_MS);
    let step = 0;
    const interval = window.setInterval(() => {
      step++;
      const reveal = Math.floor((step / steps) * target.length);
      if (step >= steps) {
        window.clearInterval(interval);
        visual.textContent = target;
        morphing = false;
        then();
        return;
      }
      let out = target.slice(0, reveal);
      for (let i = reveal; i < target.length; i++) {
        out += ALPHA[Math.floor(Math.random() * ALPHA.length)];
      }
      visual.textContent = out;
    }, TICK_MS);
  };

  const holdThen = (ms: number, fn: () => void) => {
    pendingFn = fn;
    holdTimer = window.setTimeout(
      () => {
        pendingFn = null;
        fn();
      },
      hovering ? HOLD_HOVER : ms,
    );
  };

  /** one pass: vision → planning → control → learning → intelligence,
      then stop; loops only while hovered */
  const SEQ = [...WORDS, "intelligence"];
  const runSequence = (i: number) => {
    running = true;
    morphTo(SEQ[i], () => {
      if (i < SEQ.length - 1) {
        holdThen(HOLD_WORD, () => runSequence(i + 1));
      } else {
        gsap.set(flipWrap, { width: "auto" });
        if (hovering) holdThen(HOLD_WORD, () => runSequence(0));
        else running = false;
      }
    });
  };

  // a single full pass on load, then rest until hovered
  holdThen(HOLD_HOME, () => runSequence(0));

  flipWrap.addEventListener("mouseenter", () => {
    hovering = true;
    if (pendingFn && !morphing) {
      // skip the current hold
      window.clearTimeout(holdTimer);
      const fn = pendingFn;
      pendingFn = null;
      fn();
    } else if (!running && !morphing) {
      runSequence(0);
    }
  });
  flipWrap.addEventListener("mouseleave", () => {
    hovering = false;
  });
}

/* ---------------- enter reveals ----------------
   Default state is visible (CSS). Only when motion is allowed do we add
   .anim (which hides .reveal) and then restore each element with .in as it
   scrolls into view, with a failsafe so nothing can stay hidden. */

if (!reduced) {
  document.documentElement.classList.add("anim");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  for (const el of document.querySelectorAll(".reveal")) io.observe(el);
  window.setTimeout(() => {
    for (const el of document.querySelectorAll(".reveal:not(.in)")) el.classList.add("in");
  }, 2600);
}

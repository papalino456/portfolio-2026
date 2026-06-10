import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DitherFig } from "./dither";
import { ikField, slamGrid, sldDiagram, linkageSweep } from "./scenes";
import { heroIK, heroRRT, heroSLAM, type PointerState } from "./hero";

/* ---------------- static dithered figures ---------------- */

const figs: Record<string, () => ReturnType<typeof ikField>> = {
  ikfield: ikField,
  slam: slamGrid,
  diagram: sldDiagram,
  linkage: linkageSweep,
};

for (const el of document.querySelectorAll<HTMLElement>("[data-fig]")) {
  const make = figs[el.dataset.fig!];
  if (make) new DitherFig(el, make());
}

/* ---------------- hero: switchable live simulations ---------------- */

const heroContainer = document.querySelector<HTMLElement>('[data-fig="hero"]')!;
const pointer: PointerState = { x: 0.5, y: 0.4, active: false };

heroContainer.addEventListener("pointermove", (e) => {
  const rect = heroContainer.getBoundingClientRect();
  pointer.x = (e.clientX - rect.left) / rect.width;
  pointer.y = (e.clientY - rect.top) / rect.height;
  pointer.active = true;
});
heroContainer.addEventListener("pointerleave", () => {
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

const heroFig = new DitherFig(heroContainer, heroScenes.ik.make());
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
  const HOME = "intelligence";
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
  const SEQ = [...WORDS, HOME];
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

/* ---------------- motion ---------------- */

if (!reduced) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".band-hero .hero-meta, #hero-title, .hero-copy > *", {
    y: 28,
    opacity: 0,
    duration: 0.9,
    ease: "expo.out",
    stagger: 0.09,
    delay: 0.1,
  });

  gsap.from(".fig-hero", {
    opacity: 0,
    duration: 1.1,
    ease: "expo.out",
    delay: 0.35,
  });

  for (const entry of document.querySelectorAll(".work-entry")) {
    gsap.from(entry.querySelectorAll(".work-text > *, figcaption"), {
      scrollTrigger: { trigger: entry, start: "top 78%" },
      y: 22,
      opacity: 0,
      duration: 0.8,
      ease: "expo.out",
      stagger: 0.07,
    });
  }

  for (const list of document.querySelectorAll(".index-list")) {
    gsap.from(list.querySelectorAll(".index-row"), {
      scrollTrigger: { trigger: list, start: "top 85%" },
      y: 16,
      opacity: 0,
      duration: 0.7,
      ease: "expo.out",
      stagger: 0.06,
    });
  }

  for (const row of document.querySelectorAll(".spec-table")) {
    gsap.from(row.querySelectorAll(".spec-row"), {
      scrollTrigger: { trigger: row, start: "top 88%" },
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.04,
    });
  }

  gsap.from("#contact-title, .contact-actions, .contact-fine", {
    scrollTrigger: { trigger: "#contact", start: "top 72%" },
    y: 24,
    opacity: 0,
    duration: 0.9,
    ease: "expo.out",
    stagger: 0.1,
  });
}

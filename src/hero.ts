/**
 * The three switchable hero scenes, each a live simulation from a domain
 * Sebastian works in: damped FABRIK inverse kinematics chasing the cursor,
 * an RRT path planner growing through obstacles, and a robot carving an
 * occupancy map out of unknown space with simulated lidar.
 */

import type { Scene, SceneContext } from "./dither";

export interface PointerState {
  /** normalized 0..1 over the figure */
  x: number;
  y: number;
  active: boolean;
}

/* ============================================================
   FIG. 01A · Inverse kinematics, live
   ============================================================ */

export function heroIK(ptr: PointerState): Scene {
  let bx = 0;
  let by = 0;
  let L: number[] = [];
  let joints: [number, number][] = [];
  let tgt = { x: 0, y: 0 };
  let prevEE: [number, number] | null = null;
  let prevTgt: [number, number] | null = null;

  const reticlePath = (c: CanvasRenderingContext2D, x: number, y: number) => {
    c.beginPath();
    c.arc(x, y, 5, 0, Math.PI * 2);
    c.moveTo(x - 8, y);
    c.lineTo(x - 3, y);
    c.moveTo(x + 3, y);
    c.lineTo(x + 8, y);
    c.moveTo(x, y - 8);
    c.lineTo(x, y - 3);
    c.moveTo(x, y + 3);
    c.lineTo(x, y + 8);
  };

  const fabrik = (tx: number, ty: number) => {
    const total = L.reduce((a, b) => a + b, 0);
    const d = Math.hypot(tx - bx, ty - by);
    if (d > total * 0.985) {
      const k = (total * 0.985) / d;
      tx = bx + (tx - bx) * k;
      ty = by + (ty - by) * k;
    }
    const p = joints.map((j) => [j[0], j[1]] as [number, number]);
    for (let iter = 0; iter < 8; iter++) {
      // backward: pin end effector to target
      p[3] = [tx, ty];
      for (let i = 2; i >= 0; i--) {
        const dist = Math.hypot(p[i][0] - p[i + 1][0], p[i][1] - p[i + 1][1]) || 1;
        const k = L[i] / dist;
        p[i] = [
          p[i + 1][0] + (p[i][0] - p[i + 1][0]) * k,
          p[i + 1][1] + (p[i][1] - p[i + 1][1]) * k,
        ];
      }
      // forward: pin base
      p[0] = [bx, by];
      for (let i = 0; i < 3; i++) {
        const dist = Math.hypot(p[i + 1][0] - p[i][0], p[i + 1][1] - p[i][1]) || 1;
        const k = L[i] / dist;
        p[i + 1] = [
          p[i][0] + (p[i + 1][0] - p[i][0]) * k,
          p[i][1] + (p[i + 1][1] - p[i][1]) * k,
        ];
      }
    }
    return p;
  };

  return {
    animated: true,
    init({ w, h }: SceneContext) {
      bx = w * 0.46;
      by = h * 0.9;
      L = [0.3, 0.26, 0.17].map((s) => s * h);
      joints = [
        [bx, by],
        [bx, by - L[0]],
        [bx, by - L[0] - L[1]],
        [bx, by - L[0] - L[1] - L[2]],
      ];
      tgt = { x: w * 0.5, y: h * 0.4 };
      prevEE = null;
      prevTgt = null;
    },
    draw({ ctx, spot, w, h }: SceneContext, t: number) {
      // ghost-trail fade for the arm, slower fade for the EE trace
      ctx.fillStyle = "rgba(255,255,255,0.085)";
      ctx.fillRect(0, 0, w, h);
      spot.globalCompositeOperation = "destination-out";
      spot.fillStyle = "rgba(0,0,0,0.028)";
      spot.fillRect(0, 0, w, h);
      spot.globalCompositeOperation = "source-over";

      // target: pointer when present, Lissajous otherwise
      const rawX = ptr.active ? ptr.x * w : w * 0.5 + w * 0.3 * Math.sin(t * 0.55);
      const rawY = ptr.active ? ptr.y * h : h * 0.4 + h * 0.24 * Math.sin(t * 0.92 + 1.2);
      tgt.x += (rawX - tgt.x) * 0.14;
      tgt.y += (rawY - tgt.y) * 0.14;

      // damped follow toward the FABRIK solution
      const solved = fabrik(tgt.x, tgt.y);
      for (let i = 0; i < 4; i++) {
        joints[i][0] += (solved[i][0] - joints[i][0]) * 0.32;
        joints[i][1] += (solved[i][1] - joints[i][1]) * 0.32;
      }

      // reach envelope, redrawn faint so it survives the fade
      const total = L.reduce((a, b) => a + b, 0);
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(bx, by, total * 0.985, Math.PI, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // arm: links as hollow tapered capsules, not bare lines
      const linkW = [14, 11, 8.5];
      ctx.lineCap = "round";
      ctx.strokeStyle = "#111";
      for (let i = 0; i < 3; i++) {
        ctx.lineWidth = linkW[i];
        ctx.beginPath();
        ctx.moveTo(joints[i][0], joints[i][1]);
        ctx.lineTo(joints[i + 1][0], joints[i + 1][1]);
        ctx.stroke();
      }
      ctx.strokeStyle = "#fff";
      for (let i = 0; i < 3; i++) {
        ctx.lineWidth = linkW[i] - 4;
        ctx.beginPath();
        ctx.moveTo(joints[i][0], joints[i][1]);
        ctx.lineTo(joints[i + 1][0], joints[i + 1][1]);
        ctx.stroke();
      }
      ctx.lineCap = "butt";

      // base plate
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.moveTo(bx - 12, by + 2);
      ctx.lineTo(bx + 12, by + 2);
      ctx.lineTo(bx + 7, by - 7);
      ctx.lineTo(bx - 7, by - 7);
      ctx.closePath();
      ctx.fill();

      // joint hubs
      for (const [jx, jy] of joints) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(jx, jy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.arc(jx, jy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // gripper: square-U parallel jaws facing along the last link
      const ga = Math.atan2(
        joints[3][1] - joints[2][1],
        joints[3][0] - joints[2][0],
      );
      const dx = Math.cos(ga);
      const dy = Math.sin(ga);
      const px = -dy;
      const py = dx;
      const ee3 = joints[3];
      const HALF = 6;
      const FING = 10;
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2.2;
      ctx.lineJoin = "miter";
      ctx.beginPath();
      ctx.moveTo(ee3[0] + px * HALF + dx * FING, ee3[1] + py * HALF + dy * FING);
      ctx.lineTo(ee3[0] + px * HALF, ee3[1] + py * HALF);
      ctx.lineTo(ee3[0] - px * HALF, ee3[1] - py * HALF);
      ctx.lineTo(ee3[0] - px * HALF + dx * FING, ee3[1] - py * HALF + dy * FING);
      ctx.stroke();

      // target reticle: spot ink, erased and redrawn so it stays crisp
      // while the slow-fading EE trace shares the channel
      if (prevTgt) {
        spot.globalCompositeOperation = "destination-out";
        spot.strokeStyle = "rgba(0,0,0,1)";
        spot.lineWidth = 3;
        reticlePath(spot, prevTgt[0], prevTgt[1]);
        spot.stroke();
        spot.globalCompositeOperation = "source-over";
      }
      spot.strokeStyle = "rgba(0,0,0,0.85)";
      spot.lineWidth = 1.2;
      reticlePath(spot, tgt.x, tgt.y);
      spot.stroke();
      prevTgt = [tgt.x, tgt.y];

      // end-effector trace in spot ink
      const ee = joints[3];
      if (prevEE) {
        spot.strokeStyle = "rgba(0,0,0,0.9)";
        spot.lineWidth = 1.6;
        spot.beginPath();
        spot.moveTo(prevEE[0], prevEE[1]);
        spot.lineTo(ee[0], ee[1]);
        spot.stroke();
      }
      prevEE = [ee[0], ee[1]];
    },
  };
}

/* ============================================================
   FIG. 01B · RRT path planner
   ============================================================ */

interface RrtNode {
  x: number;
  y: number;
  parent: number;
}

export function heroRRT(): Scene {
  type Circle = { x: number; y: number; r: number };
  type Box = { x: number; y: number; w: number; h: number };
  let circles: Circle[] = [];
  let boxes: Box[] = [];
  let nodes: RrtNode[] = [];
  let start = { x: 0, y: 0 };
  let goal = { x: 0, y: 0 };
  let phase: "grow" | "hold" = "grow";
  let holdLeft = 0;
  let growFrames = 0;
  let initialized = false;
  const STEP = 5.5;

  const blocked = (x: number, y: number) =>
    circles.some((c) => Math.hypot(x - c.x, y - c.y) < c.r) ||
    boxes.some((b) => x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.h);

  const segBlocked = (ax: number, ay: number, bx2: number, by2: number) => {
    for (let i = 1; i <= 6; i++) {
      const k = i / 6;
      if (blocked(ax + (bx2 - ax) * k, ay + (by2 - ay) * k)) return true;
    }
    return false;
  };

  const reset = (s: SceneContext) => {
    if (initialized) s.flash?.();
    initialized = true;
    const { ctx, spot, w, h } = s;
    nodes = [];
    phase = "grow";
    growFrames = 0;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    spot.clearRect(0, 0, w, h);

    // obstacles
    circles = Array.from({ length: 3 }, () => ({
      x: (0.25 + Math.random() * 0.5) * w,
      y: (0.15 + Math.random() * 0.7) * h,
      r: (0.09 + Math.random() * 0.08) * h,
    }));
    boxes = Array.from({ length: 2 }, () => ({
      x: (0.15 + Math.random() * 0.55) * w,
      y: (0.1 + Math.random() * 0.65) * h,
      w: (0.06 + Math.random() * 0.1) * w,
      h: (0.08 + Math.random() * 0.14) * h,
    }));

    start = { x: 0.08 * w, y: 0.86 * h };
    do {
      goal = {
        x: (0.72 + Math.random() * 0.2) * w,
        y: (0.1 + Math.random() * 0.35) * h,
      };
    } while (blocked(goal.x, goal.y));
    while (blocked(start.x, start.y)) start.y -= 2;

    nodes.push({ x: start.x, y: start.y, parent: -1 });

    // draw hatched obstacles once
    ctx.strokeStyle = "#161616";
    ctx.lineWidth = 1.5;
    for (const c of circles) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.save();
      ctx.clip();
      ctx.lineWidth = 0.8;
      for (let x = c.x - c.r; x < c.x + c.r; x += 4) {
        ctx.beginPath();
        ctx.moveTo(x, c.y + c.r + 2);
        ctx.lineTo(x + c.r, c.y - c.r - 2);
        ctx.stroke();
      }
      ctx.restore();
      ctx.lineWidth = 1.5;
    }
    for (const b of boxes) {
      ctx.strokeRect(b.x, b.y, b.w, b.h);
      ctx.save();
      ctx.beginPath();
      ctx.rect(b.x, b.y, b.w, b.h);
      ctx.clip();
      ctx.lineWidth = 0.8;
      for (let x = b.x - b.h; x < b.x + b.w; x += 4) {
        ctx.beginPath();
        ctx.moveTo(x, b.y + b.h + 1);
        ctx.lineTo(x + b.h + 2, b.y - 1);
        ctx.stroke();
      }
      ctx.restore();
      ctx.lineWidth = 1.5;
    }

    // start and goal markers
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(start.x, start.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(goal.x, goal.y, 5.5, 0, Math.PI * 2);
    ctx.moveTo(goal.x - 8, goal.y);
    ctx.lineTo(goal.x + 8, goal.y);
    ctx.moveTo(goal.x, goal.y - 8);
    ctx.lineTo(goal.x, goal.y + 8);
    ctx.stroke();
  };

  return {
    animated: true,
    init(s: SceneContext) {
      reset(s);
    },
    draw(s: SceneContext) {
      const { ctx, spot, w, h } = s;

      if (phase === "hold") {
        if (--holdLeft <= 0) reset(s);
        return;
      }

      growFrames++;
      ctx.strokeStyle = "rgba(0,0,0,0.62)";
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.lineWidth = 1;

      for (let k = 0; k < 6 && phase === "grow"; k++) {
        // sample, goal-biased
        const sx = Math.random() < 0.08 ? goal.x : Math.random() * w;
        const sy = Math.random() < 0.08 ? goal.y : Math.random() * h;
        // nearest node
        let best = 0;
        let bestD = Infinity;
        for (let i = 0; i < nodes.length; i++) {
          const d = (nodes[i].x - sx) ** 2 + (nodes[i].y - sy) ** 2;
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        const n = nodes[best];
        const d = Math.sqrt(bestD) || 1;
        const nx = n.x + ((sx - n.x) / d) * Math.min(STEP, d);
        const ny = n.y + ((sy - n.y) / d) * Math.min(STEP, d);
        if (nx < 2 || nx > w - 2 || ny < 2 || ny > h - 2) continue;
        if (blocked(nx, ny) || segBlocked(n.x, n.y, nx, ny)) continue;

        nodes.push({ x: nx, y: ny, parent: best });
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        ctx.fillRect(nx - 0.7, ny - 0.7, 1.4, 1.4);

        // reached the goal?
        if (Math.hypot(nx - goal.x, ny - goal.y) < 7) {
          spot.strokeStyle = "rgba(0,0,0,0.95)";
          spot.lineWidth = 2;
          spot.beginPath();
          spot.moveTo(goal.x, goal.y);
          let i = nodes.length - 1;
          while (i >= 0) {
            spot.lineTo(nodes[i].x, nodes[i].y);
            i = nodes[i].parent;
          }
          spot.stroke();
          phase = "hold";
          holdLeft = 240;
        }
      }

      // stuck or saturated: start a fresh scenario
      if (nodes.length > 1700 || growFrames > 1600) {
        phase = "hold";
        holdLeft = 60;
      }
    },
  };
}

/* ============================================================
   FIG. 01C · SLAM exploration
   ============================================================ */

export function heroSLAM(): Scene {
  type Box = { x: number; y: number; w: number; h: number };
  let room: Box = { x: 0, y: 0, w: 0, h: 0 };
  let obstacles: Box[] = [];
  let robot = { x: 0, y: 0, a: 0 };
  let wp = { x: 0, y: 0 };
  let path: [number, number][] = [];
  let spin = 0;
  let frames = 0;
  let pathTick = 0;
  let initialized = false;

  const free = (x: number, y: number) =>
    x > room.x &&
    x < room.x + room.w &&
    y > room.y &&
    y < room.y + room.h &&
    !obstacles.some((b) => x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.h);

  const randFree = (w: number, h: number): [number, number] => {
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      if (free(x, y)) return [x, y];
    }
    return [room.x + room.w / 2, room.y + room.h / 2];
  };

  const reset = (s: SceneContext) => {
    if (initialized) s.flash?.();
    initialized = true;
    const { ctx, spot, w, h } = s;
    frames = 0;
    path = [];
    room = { x: 0.05 * w, y: 0.06 * h, w: 0.9 * w, h: 0.88 * h };
    obstacles = Array.from({ length: 6 }, () => ({
      x: (0.1 + Math.random() * 0.66) * w,
      y: (0.1 + Math.random() * 0.62) * h,
      w: (0.05 + Math.random() * 0.13) * w,
      h: (0.06 + Math.random() * 0.16) * h,
    }));
    [robot.x, robot.y] = randFree(w, h);
    robot.a = Math.random() * Math.PI * 2;
    wp = { x: robot.x, y: robot.y };
    path = [[robot.x, robot.y]];

    // everything starts unknown — light enough to dither to a sparse stipple,
    // not a solid slab, so the figure sits on the paper instead of in a box
    ctx.fillStyle = "#bcbcbc";
    ctx.fillRect(0, 0, w, h);
    spot.clearRect(0, 0, w, h);
  };

  const newWaypoint = (w: number, h: number) => {
    [wp.x, wp.y] = randFree(w, h);
  };

  return {
    animated: true,
    init(s: SceneContext) {
      reset(s);
    },
    draw(s: SceneContext) {
      const { ctx, spot, w, h } = s;
      frames++;
      if (frames > 2800) reset(s);

      // steer toward waypoint
      const want = Math.atan2(wp.y - robot.y, wp.x - robot.x);
      let da = want - robot.a;
      while (da > Math.PI) da -= Math.PI * 2;
      while (da < -Math.PI) da += Math.PI * 2;
      robot.a += Math.max(-0.07, Math.min(0.07, da));

      const step = 0.72;
      const nx = robot.x + Math.cos(robot.a) * step;
      const ny = robot.y + Math.sin(robot.a) * step;
      const aheadX = robot.x + Math.cos(robot.a) * 6;
      const aheadY = robot.y + Math.sin(robot.a) * 6;
      if (free(nx, ny) && free(aheadX, aheadY)) {
        robot.x = nx;
        robot.y = ny;
      } else {
        newWaypoint(w, h);
      }
      if (Math.hypot(wp.x - robot.x, wp.y - robot.y) < 5) newWaypoint(w, h);

      if (++pathTick % 4 === 0) path.push([robot.x, robot.y]);
      if (path.length > 700) path.shift();

      // lidar: rotating fan carves explored space, plots walls
      spin += 0.02;
      const RAYS = 42;
      const RANGE = Math.min(w, h) * 0.36;
      for (let i = 0; i < RAYS; i++) {
        const a = spin + (i / RAYS) * Math.PI * 2;
        const ca = Math.cos(a);
        const sa = Math.sin(a);
        let x = robot.x;
        let y = robot.y;
        let hit = false;
        let dist = 0;
        while (dist < RANGE) {
          x += ca * 1.3;
          y += sa * 1.3;
          dist += 1.3;
          if (!free(x, y)) {
            hit = true;
            break;
          }
        }
        // carve free space out of the unknown
        ctx.strokeStyle = "rgba(255,255,255,0.42)";
        ctx.lineWidth = 1.9;
        ctx.beginPath();
        ctx.moveTo(robot.x, robot.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        // wall return
        if (hit) {
          ctx.fillStyle = "rgba(0,0,0,0.85)";
          ctx.fillRect(x - 0.8, y - 0.8, 1.6, 1.6);
        }
      }

      // spot layer: redraw trajectory + robot crisp every frame
      spot.clearRect(0, 0, w, h);
      if (path.length > 1) {
        spot.strokeStyle = "rgba(0,0,0,0.9)";
        spot.lineWidth = 1.5;
        spot.beginPath();
        spot.moveTo(path[0][0], path[0][1]);
        for (const [px, py] of path) spot.lineTo(px, py);
        spot.stroke();
      }
      spot.save();
      spot.translate(robot.x, robot.y);
      spot.rotate(robot.a);
      spot.fillStyle = "rgba(0,0,0,1)";
      spot.beginPath();
      spot.moveTo(7, 0);
      spot.lineTo(-5, 4.5);
      spot.lineTo(-5, -4.5);
      spot.closePath();
      spot.fill();
      spot.restore();
    },
  };
}

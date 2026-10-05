"use client";

import { useEffect, useRef } from "react";

const PETAL_LIGHT = "#aed9f5";
const PETAL_DARK = "#4a90c8";
const PETAL_EDGE = "#8fc7ec";

// fixed medium size, proportions tuned round-ish
const PETAL_W = 22;
const PETAL_H = 24;

// opacity envelope across the page:
// base -> very faint through the first 3/4 -> darker again near the right
const OPACITY_BASE = 0.25;
const OPACITY_FAINT = 0.1;
const OPACITY_DARK = 0.4;

// subtle edge wobble so no petal is a frozen perfect circle
const WOBBLE = 0.06;

function drawPetal(ctx, x, y, w, h, flip, shape) {
  // flutter: width pulses like laura's petals
  const scaleX = 0.6 + Math.abs(Math.cos(flip)) / 3;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(flip * 0.5);
  ctx.scale(scaleX, 1);

  //x-offset magnitudes breathe with the flip, using per-petal phase
  const wob = (m, phase) => m * (1 + WOBBLE * Math.sin(flip * 2.3 + phase));

  // organic blob petal: round-ish but lopsided, soft offset notch at the tip;
  // right/left bulges come from this petal's own random shape factors,
  // so every petal's edge is a little different
  const path = () => {
    ctx.beginPath();
    ctx.moveTo(wob(0.06, shape.phase) * w, -0.48 * h);
    ctx.bezierCurveTo(
      wob(shape.right, 0.7) * w, -0.45 * h,
      wob(shape.right + 0.05, 1.9) * w, 0.1 * h,
      wob(0.3, 3.1) * w, 0.45 * h
    );
    ctx.bezierCurveTo(
      wob(0.1, 4.2) * w, 0.56 * h,
      wob(-0.08, 2.6) * w, 0.44 * h,
      wob(-0.34, 0.9) * w, 0.35 * h
    );
    ctx.bezierCurveTo(
      wob(-shape.left, 5.0) * w, 0.18 * h,
      wob(-shape.left, 2.8) * w, -0.3 * h,
      wob(-0.25, 4.0) * w, -0.42 * h
    );
    ctx.bezierCurveTo(
      wob(-0.12, 3.7) * w, -0.33 * h,
      wob(-0.02, 5.3) * w, -0.56 * h,
      wob(0.06, shape.phase) * w, -0.48 * h
    );
    ctx.closePath();
  };

  path();
  ctx.fillStyle = PETAL_LIGHT;
  ctx.fill();

  // darker half: clip to the lengthwise half of the petal and refill
  path();
  ctx.fillStyle = PETAL_DARK;
  ctx.save();
  ctx.clip();
  ctx.beginPath();
  ctx.rect(0, -h, w, h * 2);
  ctx.fill();
  ctx.restore();

  // subtle edge outline over the whole petal
  path();
  ctx.strokeStyle = PETAL_EDGE;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
}

export default function FlowersCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const petals = [];
    let mouseX = 0;

    const onMouse = (e) => {
      const cx = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
      mouseX = cx / window.innerWidth;
    };
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onMouse);
    window.addEventListener("resize", onResize);

    class Petal {
      constructor() {
        this.reset();
      }
      reset() {
        // laura's spawn: half the petals pop in anywhere on screen,
        // half enter from above the top edge — full-width scatter
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 2 - canvas.height;
        this.w = PETAL_W;
        this.h = PETAL_H;
        this.flip = Math.random() * Math.PI * 2;
        this.xSpeed = 1.2 + 1.6 * Math.random();
        this.ySpeed = 0.9 + 0.8 * Math.random();
        this.flipSpeed = 0.03 * Math.random();
        // per-petal blob factors: no two petals share the same silhouette
        this.shape = {
          right: 0.72 + 0.28 * Math.random(),
          left: 0.6 + 0.3 * Math.random(),
          phase: Math.random() * Math.PI * 2,
        };
      }
      // fade with horizontal position: faint through the first 3/4,
      // then reappear darker approaching the right edge
      opacityAt(x) {
        const t = Math.min(1, x / canvas.width);
        if (t < 0.75) {
          return OPACITY_BASE + (OPACITY_FAINT - OPACITY_BASE) * (t / 0.75);
        }
        return OPACITY_FAINT + (OPACITY_DARK - OPACITY_FAINT) * ((t - 0.75) / 0.25);
      }
      draw() {
        if (this.y > canvas.height + 40 || this.x > canvas.width + 40) {
          this.reset();
        }
        ctx.globalAlpha = this.opacityAt(this.x);
        drawPetal(ctx, this.x, this.y, this.w, this.h, this.flip, this.shape);
      }
      animate() {
        // mouse is the accelerator, like laura's:
        // cursor left -> calm base pace; cursor right -> fast sweep off
        this.x += this.xSpeed + 5 * mouseX;
        this.y += this.ySpeed + 2 * mouseX;
        this.flip += this.flipSpeed;
        this.draw();
      }
    }

    for (let i = 0; i < 14; i++) petals.push(new Petal());

    (function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => p.animate());
      requestAnimationFrame(frame);
    })();

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="flowers-canvas" aria-hidden="true" />;
}

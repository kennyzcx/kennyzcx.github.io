"use client";

import { useEffect, useRef } from "react";

const PETAL_LIGHT = "#aed9f5";
const PETAL_DARK = "#4a90c8";
const PETAL_EDGE = "#8fc7ec";

// fixed medium size, near-circular proportions
const PETAL_W = 20;
const PETAL_H = 22;

// opacity envelope across the page:
// base -> very faint through the first 3/4 -> darker again near the right
const OPACITY_BASE = 0.25;
const OPACITY_FAINT = 0.1;
const OPACITY_DARK = 0.4;

function drawPetal(ctx, x, y, w, h, flip) {
  // flutter: width pulses like laura's petals
  const scaleX = 0.6 + Math.abs(Math.cos(flip)) / 3;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(flip * 0.5);
  ctx.scale(scaleX, 1);

  // organic blob petal: round-ish but lopsided, soft offset notch at the tip
  const path = () => {
    ctx.beginPath();
    ctx.moveTo(w * 0.06, -h * 0.48);
    ctx.bezierCurveTo(w * 0.85, -h * 0.45, w * 0.9, h * 0.1, w * 0.3, h * 0.45);
    ctx.bezierCurveTo(w * 0.1, h * 0.56, -w * 0.08, h * 0.44, -w * 0.34, h * 0.35);
    ctx.bezierCurveTo(-w * 0.78, h * 0.2, -w * 0.66, -h * 0.3, -w * 0.25, -h * 0.42);
    ctx.bezierCurveTo(-w * 0.12, -h * 0.34, -w * 0.02, -h * 0.56, w * 0.06, -h * 0.48);
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
        drawPetal(ctx, this.x, this.y, this.w, this.h, this.flip);
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

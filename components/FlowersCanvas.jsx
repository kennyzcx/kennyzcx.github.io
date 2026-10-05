"use client";

import { useEffect, useRef } from "react";

// fixed medium size, proportions tuned round-ish
const PETAL_W = 22;
const PETAL_H = 24;

// opacity envelope across the page:
// base -> very faint through the first 3/4 -> darker again near the right
const OPACITY_BASE = 0.25;
const OPACITY_FAINT = 0.1;
const OPACITY_DARK = 0.4;

// watercolor sprite: diagonal gradient (light upper-left -> deep lower-right),
// feathered edges baked in, no hard outline or half-split
const GRAD_LIGHT = "#d3ebf9";
const GRAD_MID = "#a9d5f1";
const GRAD_DEEP = "#7fbfe8";
const SPRITE_BLUR = 1.5;

// sprite canvas: logical draw size + baked resolution multiplier
const SPRITE_W = 48;
const SPRITE_H = 36;
const SPRITE_SCALE = 2;

function makePetalSprite() {
  // per-sprite blob jitter: no two variants share the same silhouette
  const s = {
    r1: 0.82 + 0.16 * Math.random(),
    r2: 0.9 + 0.1 * Math.random(),
    l1: 0.72 + 0.14 * Math.random(),
    l2: 0.6 + 0.14 * Math.random(),
    squash: 0.92 + 0.16 * Math.random(),
    mirror: Math.random() < 0.5 ? -1 : 1,
  };

  const canvas = document.createElement("canvas");
  canvas.width = SPRITE_W * SPRITE_SCALE;
  canvas.height = SPRITE_H * SPRITE_SCALE;
  const c = canvas.getContext("2d");
  c.scale(SPRITE_SCALE, SPRITE_SCALE);
  c.translate(SPRITE_W / 2, SPRITE_H / 2);
  c.scale(s.mirror, 1);

  const w = PETAL_W;
  const h = PETAL_H * s.squash;

  c.filter = `blur(${SPRITE_BLUR}px)`;
  const grad = c.createLinearGradient(-0.6 * w, -0.6 * h, 0.7 * w, 0.8 * h);
  grad.addColorStop(0, GRAD_LIGHT);
  grad.addColorStop(0.55, GRAD_MID);
  grad.addColorStop(1, GRAD_DEEP);

  // organic blob petal: round-ish but lopsided, soft offset notch at the tip
  c.beginPath();
  c.moveTo(0.06 * w, -0.48 * h);
  c.bezierCurveTo(s.r1 * w, -0.44 * h, s.r2 * w, 0.1 * h, 0.3 * w, 0.45 * h);
  c.bezierCurveTo(0.1 * w, 0.54 * h, -0.08 * w, 0.42 * h, -0.34 * w, 0.35 * h);
  c.bezierCurveTo(-s.l1 * w, 0.2 * h, -s.l2 * w, -0.3 * h, -0.25 * w, -0.42 * h);
  c.bezierCurveTo(-0.12 * w, -0.32 * h, -0.02 * w, -0.56 * h, 0.06 * w, -0.48 * h);
  c.closePath();

  c.fillStyle = grad;
  c.fill();
  return canvas;
}

export default function FlowersCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    // bake four petal variants once — every petal just stamps one of these
    const sprites = Array.from({ length: 4 }, makePetalSprite);

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
        this.flip = Math.random() * Math.PI * 2;
        this.sprite = sprites[Math.floor(Math.random() * sprites.length)];
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
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.flip * 0.5);
        // flutter: width pulses like laura's petals
        const scaleX = 0.6 + Math.abs(Math.cos(this.flip)) / 3;
        ctx.scale(scaleX, 1);
        ctx.drawImage(
          this.sprite,
          -SPRITE_W / 2,
          -SPRITE_H / 2,
          SPRITE_W,
          SPRITE_H
        );
        ctx.restore();
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

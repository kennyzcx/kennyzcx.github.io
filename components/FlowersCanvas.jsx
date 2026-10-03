"use client";

import { useEffect, useRef } from "react";

const PETAL_LIGHT = "#aed9f5";
const PETAL_DARK = "#4a90c8";
const PETAL_EDGE = "#8fc7ec";

function drawPetal(ctx, x, y, w, h, flip) {
  // flutter: width pulses like laura's petals
  const scaleX = 0.6 + Math.abs(Math.cos(flip)) / 3;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(flip * 0.5);
  ctx.scale(scaleX, 1);

  // sakura-style petal: rounded body, soft notch at the tip
  const path = () => {
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.bezierCurveTo(w * 0.55, -h * 0.35, w * 0.5, h * 0.25, 0, h * 0.5);
    ctx.bezierCurveTo(-w * 0.5, h * 0.25, -w * 0.55, -h * 0.35, -w * 0.08, -h * 0.42);
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
        // spawn across the whole width, entering from above the top edge
        this.x = Math.random() * canvas.width;
        this.y = -30 - Math.random() * canvas.height * 0.3;
        this.w = 14 + 14 * Math.random();
        this.h = this.w * (1.3 + 0.3 * Math.random());
        this.opacity = 0.25 + ((this.w - 14) / 14) * 0.2;
        this.flip = Math.random() * Math.PI * 2;
        this.xSpeed = 0.6 + 0.8 * Math.random();
        this.ySpeed = 0.8 + 0.8 * Math.random();
        this.flipSpeed = 0.03 * Math.random();
      }
      // horizontal speed ramps up as the petal approaches the right edge
      speedAt(x) {
        const t = Math.min(1, x / canvas.width);
        return this.xSpeed * (0.4 + t * 4.1);
      }
      draw() {
        if (this.y > canvas.height + 40 || this.x > canvas.width + 40) {
          this.reset();
        }
        ctx.globalAlpha = this.opacity;
        drawPetal(ctx, this.x, this.y, this.w, this.h, this.flip);
      }
      animate() {
        this.x += this.speedAt(this.x) + 4 * mouseX;
        this.y += this.ySpeed + 1.5 * mouseX;
        this.flip += this.flipSpeed;
        this.draw();
      }
    }

    for (let i = 0; i < 20; i++) petals.push(new Petal());

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

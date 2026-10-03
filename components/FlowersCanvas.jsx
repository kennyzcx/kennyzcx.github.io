"use client";

import { useEffect, useRef } from "react";

const PETAL = "#6fb9e8";
const CENTER = "#3d7ea6";

function drawFlower(ctx, x, y, size, flip) {
  const flipScale = 0.6 + Math.abs(Math.cos(flip)) / 3;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(flip * 0.5);
  ctx.scale(flipScale, 1);

  const petal = size / 2;
  ctx.fillStyle = PETAL;
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const px = Math.cos(angle) * petal * 0.55;
    const py = Math.sin(angle) * petal * 0.55;
    ctx.beginPath();
    ctx.ellipse(px, py, petal * 0.42, petal * 0.62, angle, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = CENTER;
  ctx.beginPath();
  ctx.arc(0, 0, petal * 0.28, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export default function FlowersCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const flowers = [];
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

    class Flower {
      constructor() {
        this.reset();
      }
      reset() {
        // spawn in the top-left band of the screen
        this.x = Math.random() * canvas.width * 0.45;
        this.y = -30 - Math.random() * canvas.height * 0.3;
        this.size = 18 + 18 * Math.random();
        this.opacity = Math.max(0.5, this.size / 45);
        this.flip = Math.random() * Math.PI * 2;
        this.xSpeed = 1.2 + 1.6 * Math.random();
        this.ySpeed = 0.8 + 0.8 * Math.random();
        this.flipSpeed = 0.03 * Math.random();
      }
      draw() {
        if (this.y > canvas.height + 40 || this.x > canvas.width + 40) {
          this.reset();
        }
        ctx.globalAlpha = this.opacity;
        drawFlower(ctx, this.x, this.y, this.size, this.flip);
      }
      animate() {
        this.x += this.xSpeed + 4 * mouseX;
        this.y += this.ySpeed + 1.5 * mouseX;
        this.flip += this.flipSpeed;
        this.draw();
      }
    }

    for (let i = 0; i < 22; i++) flowers.push(new Flower());

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // reduced motion: draw one static scattering instead of animating
      flowers.forEach((f) => {
        f.x = Math.random() * canvas.width;
        f.y = Math.random() * canvas.height * 0.9;
        f.draw();
      });
      ctx.globalAlpha = 1;
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    (function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flowers.forEach((f) => f.animate());
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

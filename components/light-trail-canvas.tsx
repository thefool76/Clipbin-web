"use client";

import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
  bornAt: number;
};

const MAX_AGE_MS = 950;
const BASE_WIDTH = 22;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function LightTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const isReducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotionRef.current = mediaQuery.matches;

    const handleMedia = (event: MediaQueryListEvent) => {
      isReducedMotionRef.current = event.matches;
    };

    mediaQuery.addEventListener("change", handleMedia);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (canvas.dataset.mode !== "aura") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, rect.width, rect.height);
      } else {
        ctx.clearRect(0, 0, rect.width, rect.height);
      }
    };

    const pushPoint = (x: number, y: number) => {
      const now = performance.now();
      const last = lastPointRef.current;

      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const distance = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.floor(distance / 12));

        for (let i = 1; i <= steps; i += 1) {
          const t = i / steps;
          pointsRef.current.push({
            x: last.x + dx * t,
            y: last.y + dy * t,
            bornAt: now
          });
        }
      } else {
        pointsRef.current.push({ x, y, bornAt: now });
      }

      lastPointRef.current = { x, y };
      if (pointsRef.current.length > 800) {
        pointsRef.current.splice(0, pointsRef.current.length - 800);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = clamp(event.clientX - rect.left, 0, rect.width);
      const y = clamp(event.clientY - rect.top, 0, rect.height);
      pushPoint(x, y);
    };

    const handlePointerLeave = () => {
      lastPointRef.current = null;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    let rafId = 0;

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();

      if (canvas.dataset.mode === "aura") {
        ctx.fillStyle = isReducedMotionRef.current ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 130, 180, 0.08)";
      } else {
        ctx.fillStyle = isReducedMotionRef.current ? "#ffffff" : "rgba(255, 255, 255, 0.14)";
      }
      ctx.fillRect(0, 0, rect.width, rect.height);

      const valid = pointsRef.current.filter((point) => time - point.bornAt < MAX_AGE_MS);
      pointsRef.current = valid;

      for (let i = 1; i < valid.length; i += 1) {
        const prev = valid[i - 1];
        const curr = valid[i];
        const age = time - curr.bornAt;
        const life = 1 - age / MAX_AGE_MS;

        const hue = 338 - life * 110 + Math.sin((time + i * 7) * 0.004) * 20;
        const alpha = clamp(life * 0.95, 0, 1);
        const width = 2 + life * BASE_WIDTH;

        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.strokeStyle = `hsla(${hue}, 95%, 57%, ${alpha})`;
        ctx.shadowColor = `hsla(${hue + 18}, 100%, 62%, ${alpha * 0.9})`;
        ctx.shadowBlur = 28 * life;
        ctx.lineWidth = width;
        ctx.stroke();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      mediaQuery.removeEventListener("change", handleMedia);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-mode="aura"
      className="trail-canvas"
      aria-label="Interactive light trail canvas"
    />
  );
}

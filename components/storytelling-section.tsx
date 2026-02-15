"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

const beats = [
  {
    title: "A pause before reaction",
    body: "Interlude begins by slowing your hand. As you draw, motion becomes intention instead of noise."
  },
  {
    title: "A pattern in the drift",
    body: "As you scroll, the visual layer holds position while your thoughts move. Friction becomes perspective."
  },
  {
    title: "A trace you can revisit",
    body: "Every trail fades just enough to make room for the next one, preserving clarity without clinging."
  }
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function StorytellingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId = 0;

    const sample = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const scrolled = clamp(-rect.top, 0, travel);
      target = scrolled / travel;
    };

    const tick = () => {
      current += (target - current) * 0.11;
      if (Math.abs(target - current) < 0.001) {
        current = target;
      }
      setProgress(current);
      rafId = requestAnimationFrame(tick);
    };

    sample();
    window.addEventListener("scroll", sample, { passive: true });
    window.addEventListener("resize", sample);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", sample);
      window.removeEventListener("resize", sample);
    };
  }, []);

  const activeIndex = useMemo(() => {
    if (progress < 0.33) return 0;
    if (progress < 0.66) return 1;
    return 2;
  }, [progress]);

  return (
    <section ref={sectionRef} id="manifesto" className="story-shell" aria-label="Storytelling sequence">
      <div className="story-grid">
        <div className="story-copy">
          {beats.map((beat, index) => (
            <article key={beat.title} className={index === activeIndex ? "story-beat active" : "story-beat"}>
              <p className="beat-count">0{index + 1}</p>
              <h3>{beat.title}</h3>
              <p>{beat.body}</p>
            </article>
          ))}
        </div>

        <div className="story-pin">
          <div className="device-frame" style={{ "--progress": progress } as CSSProperties}>
            <div className="device-notch" />
            <div className="device-screen">
              <div className="orb" />
              <p>Present Mode</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

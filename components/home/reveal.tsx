"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-reveal");
    const pending = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let frame = 0;

    const revealVisible = () => {
      frame = 0;
      for (const item of pending) {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
          item.classList.add("is-visible");
          pending.delete(item);
        }
      }
      if (pending.size === 0) {
        window.removeEventListener("scroll", scheduleReveal);
        window.removeEventListener("resize", scheduleReveal);
      }
    };

    const scheduleReveal = () => {
      if (!frame) frame = window.requestAnimationFrame(revealVisible);
    };

    window.addEventListener("scroll", scheduleReveal, { passive: true });
    window.addEventListener("resize", scheduleReveal);
    scheduleReveal();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleReveal);
      window.removeEventListener("resize", scheduleReveal);
      document.documentElement.classList.remove("has-reveal");
    };
  }, []);
  return null;
}

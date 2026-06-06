"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Lenis-driven inertial scroll. Bails out entirely when the user prefers
 * reduced motion or is using Firefox (due to WebRender composite bottlenecks
 * with heavy CSS blurs), so accessibility + performance aren't sacrificed.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isFirefox, setIsFirefox] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isFF = navigator.userAgent.toLowerCase().includes("firefox");
    setIsFirefox(isFF);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || isFF) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Anchor links → smooth scroll via Lenis.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {isFirefox && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-[999] max-w-sm border border-red-300/40 bg-ink/95 p-5 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-teal">
                  Notice
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ash/80">
                  Firefox detected. For the best performance and visual
                  experience, we recommend a Chromium-based browser (Chrome,
                  Edge, Brave). Smooth scrolling has been disabled.
                </p>
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="text-ash/50 transition-colors hover:text-ash"
                aria-label="Dismiss warning"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

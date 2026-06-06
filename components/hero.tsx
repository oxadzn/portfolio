"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import { Magnetic } from "@/components/magnetic";

const SERIAL = "SN·2024·OX·001";

const rise = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: 0,
    transition: {
      duration: 1.1,
      delay: 0.28 + i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Technical target reticle — the visual anchor in the hero's right panel. */
function HeroMark() {
  const r = (n: number) => Math.round(n * 1000) / 1000;
  const ticks = Array.from({ length: 48 });
  const rays  = Array.from({ length: 24 });
  return (
    <svg viewBox="-210 -210 420 420" aria-hidden>
      {/* Outer ring + measurement ticks */}
      <circle r="185" fill="none" stroke="#729b79" strokeWidth="1.2" />
      {ticks.map((_, i) => {
        const a    = (i / 48) * Math.PI * 2;
        const big  = i % 12 === 0;
        const med  = i % 4 === 0;
        const len  = big ? 16 : med ? 10 : 5;
        return (
          <line
            key={i}
            x1={r(Math.cos(a) * 185)} y1={r(Math.sin(a) * 185)}
            x2={r(Math.cos(a) * (185 + len))} y2={r(Math.sin(a) * (185 + len))}
            stroke="#bacdb0"
            strokeWidth={big ? 1 : 0.7}
            opacity={big ? 0.8 : 0.5}
          />
        );
      })}
      {/* Inner concentric rings */}
      <circle r="140" fill="none" stroke="#475b63" strokeWidth="1" />
      <circle r="100" fill="none" stroke="#729b79" strokeWidth="1" strokeDasharray="3 7" />
      <circle r="55"  fill="none" stroke="#475b63" strokeWidth="0.8" />
      {/* Four-point crosshair */}
      <line x1="-205" y1="0" x2="-190" y2="0" stroke="#729b79" strokeWidth="1.5" />
      <line x1="190"  y1="0" x2="205"  y2="0" stroke="#729b79" strokeWidth="1.5" />
      <line x1="0" y1="-205" x2="0" y2="-190" stroke="#729b79" strokeWidth="1.5" />
      <line x1="0" y1="190"  x2="0" y2="205"  stroke="#729b79" strokeWidth="1.5" />
      {/* Radial rays inner→middle */}
      {rays.map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={r(Math.cos(a) * 55)} y1={r(Math.sin(a) * 55)}
            x2={r(Math.cos(a) * 135)} y2={r(Math.sin(a) * 135)}
            stroke="#bacdb0" strokeWidth="0.5" opacity="0.38"
          />
        );
      })}
      {/* Center */}
      <circle r="6"  fill="#729b79" />
      <circle r="14" fill="none" stroke="#729b79" strokeWidth="1" opacity="0.6" />
      {/* Organic leaf paths — the forest touch */}
      <path
        d="M0 -100 C 60 -45 60 45 0 100 C -60 45 -60 -45 0 -100 Z"
        fill="none" stroke="#f3e8ee" strokeWidth="1.2" opacity="0.5"
      />
      <path
        d="M-100 0 C -45 -60 45 -60 100 0 C 45 60 -45 60 -100 0 Z"
        fill="none" stroke="#f3e8ee" strokeWidth="1.2" opacity="0.32"
      />
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const Line = ({ children, i }: { children: React.ReactNode; i: number }) => (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span variants={rise} custom={i} initial="hidden" animate="show" className="block">
        {children}
      </motion.span>
    </span>
  );

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">

      {/* ── Top HUD bar ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.7 }}
        className="gutter relative z-10 flex items-center justify-between border-b border-ash/10 py-3.5"
      >
        <div className="flex items-center gap-5 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-slate">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
            {site.role}
          </span>
          <span className="hidden text-slate/30 sm:block">·</span>
          <span className="hidden sm:block">Available</span>
        </div>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-slate/50">
          {SERIAL}
        </span>
      </motion.div>

      {/* ── Crosshair rule ──────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 h-px origin-left bg-ash/8"
      >
        <span className="absolute left-[12%]  -top-1.5 h-3 w-px bg-teal/55" />
        <span className="absolute left-[38%]  -top-1   h-2 w-px bg-ash/20" />
        <span className="absolute left-[65%]  -top-1.5 h-3 w-px bg-teal/35" />
        <span className="absolute right-[9%]  -top-1   h-2 w-px bg-ash/20" />
      </motion.div>

      {/* ── Main body — 2-column on desktop ─────────────────── */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-1 flex-col">
        <div className="gutter flex flex-1 flex-col lg:flex-row">

          {/* Left: type + CTAs */}
          <div className="relative flex flex-1 flex-col justify-center pb-[5vh] pt-16 lg:pr-12">
            {/* Ghost background word */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-end overflow-hidden select-none"
            >
              <span
                className="block font-display font-semibold leading-none text-blush text-ghost"
                style={{
                  fontSize: "clamp(6rem, 22vw, 20rem)",
                  letterSpacing: "-0.04em",
                  opacity: 0.052,
                  lineHeight: 0.82,
                  marginBottom: "-0.06em",
                }}
              >
                OXADZN
              </span>
            </div>

            {/* Portfolio label */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative mb-8 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-teal"
            >
              ◈ Portfolio · {new Date().getFullYear()}
            </motion.div>

            {/* Headline */}
            <h1 className="text-hero relative font-display font-medium text-blush">
              <Line i={0}>Design</Line>
              <Line i={1}>
                that{" "}
                <span className="italic-serif font-normal" style={{ color: "var(--color-teal)", fontSize: "0.9em" }}>
                  earns
                </span>
              </Line>
              <Line i={2}>
                the{" "}
                <span className="italic-serif font-normal text-ash">second</span>
              </Line>
              <Line i={3}>look.</Line>
            </h1>

            {/* Thesis + CTAs */}
            <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="relative max-w-sm text-pretty text-base leading-relaxed text-ash/80"
              >
                {site.thesis}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.8 }}
                className="relative flex shrink-0 items-center gap-3"
              >
                <Magnetic>
                  <Link
                    href="/work"
                    data-cursor
                    className="group flex items-center gap-3 rounded-full bg-blush px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-teal"
                  >
                    Selected Work
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/#contact"
                    data-cursor
                    className="rounded-full border border-ash/25 px-7 py-3.5 text-sm text-blush transition-colors hover:border-blush"
                  >
                    Start a project
                  </Link>
                </Magnetic>
              </motion.div>
            </div>
          </div>

          {/* Right: decorative reticle (desktop only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.4 }}
            className="relative hidden w-[38%] shrink-0 flex-col items-center justify-center lg:flex"
            aria-hidden
          >
            {/* The mark */}
            <div className="w-[78%] max-w-[360px] opacity-[0.22]">
              <HeroMark />
            </div>

            {/* Scattered coordinate metadata */}
            <span className="absolute top-[20%] right-[10%] font-mono text-[0.52rem] uppercase tracking-[0.25em] text-teal/45">
              N 12°58′
            </span>
            <span className="absolute top-[24%] right-[10%] font-mono text-[0.52rem] uppercase tracking-[0.22em] text-slate/35">
              E 077°33′
            </span>
            <span className="absolute bottom-[26%] left-[8%] font-mono text-[0.5rem] uppercase tracking-[0.2em] text-slate/30">
              GD · 2024
            </span>
            <span className="absolute top-[38%] left-[4%] font-mono text-[0.5rem] uppercase tracking-[0.2em] text-teal/25">
              OX·001
            </span>

            {/* Vertical side label */}
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[0.46rem] uppercase tracking-[0.4em] text-slate/20"
              style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
            >
              Identity · Mark · Print
            </span>

            {/* Corner bracket on the right panel */}
            <span className="absolute top-[15%] left-[8%] h-5 w-5 border-l border-t border-teal/20" />
            <span className="absolute bottom-[15%] right-[8%] h-5 w-5 border-r border-b border-teal/20" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom HUD bar ──────────────────────────────────── */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="gutter relative z-10 flex items-center justify-between border-t border-ash/10 py-3.5"
      >
        <div className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-slate">
          <motion.span
            className="inline-block h-5 w-px bg-slate"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          Scroll to explore
        </div>
        <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate/40 sm:block">
          {site.location}
        </span>
      </motion.div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

/**
 * The argument, made visual: drag from a dense, technical mark to a single
 * clean line. Same hand. The complexity is the proof; the restraint is the
 * service. Accessible (range input), touch + keyboard, zero deps.
 */
export function RangeProof() {
  const [pos, setPos] = useState(50);

  return (
    <section className="gutter py-28 md:py-40">
      <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1fr]">
        <Reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-teal">
              Think it&rsquo;s too much?
            </p>
            <h2 className="mt-6 text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.02] text-blush">
              Complex is the flex.{" "}
              <span className="italic-serif font-normal text-ash">
                Simple is the service.
              </span>
            </h2>
            <p className="mt-7 max-w-md text-ash/80">
              The dense, technical work proves the range. Which is exactly why I can
              strip it back to one inevitable line the moment that&rsquo;s what the
              brief needs. Same hand, dialled to taste.
            </p>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-slate">
              ← drag to dial the complexity →
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[5/4] w-full select-none overflow-hidden rounded-2xl border border-ash/15 bg-shadow/60">
            {/* COMPLEX layer */}
            <div className="absolute inset-0 grid place-items-center">
              <ComplexMark />
              <Tag className="left-4 top-4" active={pos < 60}>
                Complex
              </Tag>
            </div>

            {/* SIMPLE layer, revealed from the right */}
            <div
              className="absolute inset-0 grid place-items-center bg-shadow"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <SimpleMark />
              <Tag className="right-4 top-4" active={pos > 40}>
                Simple
              </Tag>
            </div>

            {/* Divider */}
            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-px bg-blush/70"
              style={{ left: `${pos}%` }}
            >
              <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blush/70 bg-ink/70 text-blush backdrop-blur">
                ⇄
              </span>
            </div>

            {/* Accessible control spanning the whole frame */}
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Dial the design from complex to simple"
              data-cursor
              className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Tag({
  children,
  className,
  active,
}: {
  children: React.ReactNode;
  className?: string;
  active: boolean;
}) {
  return (
    <span
      className={`absolute rounded-full border border-ash/20 bg-ink/50 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] backdrop-blur transition-opacity duration-300 ${
        active ? "text-blush opacity-100" : "text-slate opacity-40"
      } ${className}`}
    >
      {children}
    </span>
  );
}

function ComplexMark() {
  // Dense, layered, "technical" — the receipt.
  const rays = Array.from({ length: 36 });
  return (
    <svg viewBox="-200 -200 400 400" className="h-[68%] w-[68%]" aria-hidden>
      <g fill="none" stroke="#bacdb0" strokeWidth="0.75" opacity="0.55">
        {rays.map((_, i) => {
          const a = (i / rays.length) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 40}
              y1={Math.sin(a) * 40}
              x2={Math.cos(a) * 185}
              y2={Math.sin(a) * 185}
            />
          );
        })}
      </g>
      {[170, 140, 110, 80, 50].map((r, i) => (
        <circle
          key={r}
          r={r}
          fill="none"
          stroke="#729b79"
          strokeWidth={i === 0 ? 1.5 : 1}
          opacity={0.7 - i * 0.08}
        />
      ))}
      <path
        d="M0 -150 C 95 -70 95 70 0 150 C -95 70 -95 -70 0 -150 Z"
        fill="none"
        stroke="#f3e8ee"
        strokeWidth="1.5"
      />
      <path
        d="M-150 0 C -70 -95 70 -95 150 0 C 70 95 -70 95 -150 0 Z"
        fill="none"
        stroke="#f3e8ee"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <circle r="6" fill="#729b79" />
    </svg>
  );
}

function SimpleMark() {
  // One ring, one dot. Echoes the brand mark.
  return (
    <svg viewBox="-200 -200 400 400" className="h-[58%] w-[58%]" aria-hidden>
      <circle r="120" fill="none" stroke="#f3e8ee" strokeWidth="6" />
      <circle cx="108" cy="-108" r="22" fill="#729b79" />
    </svg>
  );
}

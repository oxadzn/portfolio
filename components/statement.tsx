import Link from "next/link";
import { Reveal } from "@/components/reveal";

const cards = [
  {
    n: "01",
    t: "Idea first",
    d: "Every mark starts as a concept, not a shape. If it can't be explained in a sentence, it isn't done.",
  },
  {
    n: "02",
    t: "Built to scale",
    d: "Tested at 16px and on a billboard. A logo that survives both is a logo that works.",
  },
  {
    n: "03",
    t: "Simple on purpose",
    d: "The complex projects prove the range. The restraint is a choice — and the choice is what clients buy.",
  },
];

/** The same complex mark from range-proof, repurposed as a visible decorative element. */
function StatementMark() {
  const rays = Array.from({ length: 36 });
  return (
    <svg viewBox="-200 -200 400 400" aria-hidden className="w-full h-full">
      <g fill="none" stroke="#bacdb0" strokeWidth="0.75" opacity="0.55">
        {rays.map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 40} y1={Math.sin(a) * 40}
              x2={Math.cos(a) * 185} y2={Math.sin(a) * 185}
            />
          );
        })}
      </g>
      {[170, 140, 110, 80, 50].map((r, i) => (
        <circle
          key={r} r={r} fill="none" stroke="#729b79"
          strokeWidth={i === 0 ? 1.5 : 1}
          opacity={0.7 - i * 0.08}
        />
      ))}
      <path
        d="M0 -150 C 95 -70 95 70 0 150 C -95 70 -95 -70 0 -150 Z"
        fill="none" stroke="#f3e8ee" strokeWidth="1.5"
      />
      <path
        d="M-150 0 C -70 -95 70 -95 150 0 C 70 95 -70 95 -150 0 Z"
        fill="none" stroke="#f3e8ee" strokeWidth="1.5" opacity="0.7"
      />
      <circle r="6" fill="#729b79" />
    </svg>
  );
}

/**
 * The thesis section. Static headline so the space never looks empty.
 * Right column holds a visible decorative SVG to fill the dead space.
 */
export function Statement() {
  return (
    <section className="gutter relative overflow-hidden py-16 md:py-24">
      {/* Label + rule */}
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-teal">
        Why work with me
      </p>
      <div className="relative mt-3 h-px bg-ash/10">
        <span className="absolute left-0 -top-1.5 h-3 w-px bg-teal/50" />
        <span className="absolute left-[25%] -top-1 h-2 w-px bg-ash/20" />
      </div>

      {/* 2-column: headline left, SVG mark right */}
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Static headline — never hidden, no empty-space animation */}
        <h2 className="font-display text-[clamp(1.75rem,4.2vw,3.5rem)] font-medium leading-[1.07] text-blush">
          Anyone can decorate.{" "}
          <span className="italic-serif font-normal text-ash/90">
            I untangle the hard briefs —
          </span>
          <br />
          <span className="italic-serif font-normal text-ash/70">
            then make the answer look effortless.
          </span>
        </h2>

        {/* Visible decorative SVG — fills the empty right space */}
        <Reveal delay={0.1}>
          <div
            className="relative mx-auto aspect-square w-full max-w-[280px] opacity-[0.28] lg:max-w-[320px]"
            aria-hidden
          >
            <StatementMark />

            {/* Corner brackets on the SVG container */}
            <span className="absolute top-0 left-0 h-5 w-5 border-l border-t border-teal/40" />
            <span className="absolute bottom-0 right-0 h-5 w-5 border-r border-b border-teal/40" />

            {/* Mini metadata labels */}
            <span className="absolute -bottom-6 left-0 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-teal/40">
              Complexity · Proof
            </span>
          </div>
        </Reveal>
      </div>

      {/* Divider */}
      <div className="relative mt-16 h-px bg-ash/10">
        <span className="absolute left-0      -top-1.5 h-3 w-px bg-teal/50" />
        <span className="absolute left-[33%]  -top-1   h-2 w-px bg-ash/20" />
        <span className="absolute left-[66%]  -top-1   h-2 w-px bg-ash/20" />
      </div>

      {/* Numbered cards */}
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.07}>
            <div className="border-t border-ash/10 pt-6">
              {/* Large ghost ordinal */}
              <span
                aria-hidden
                className="block font-display font-semibold leading-none text-ghost text-teal"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.03em",
                  opacity: 0.28,
                }}
              >
                {c.n}
              </span>
              <h3 className="mt-3 font-display text-xl text-blush">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash/75">{c.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal delay={0.1}>
        <Link
          href="/about"
          className="link-underline mt-12 inline-block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ash hover:text-blush"
        >
          More about the approach ↗
        </Link>
      </Reveal>
    </section>
  );
}

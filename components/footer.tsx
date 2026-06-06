import Link from "next/link";
import { site } from "@/content/site";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";

/** Simple SVG barcode decoration — purely aesthetic. */
function Barcode() {
  const bars = [
    60, 100, 80, 40, 100, 70, 100, 50, 30, 100, 80, 60,
    100, 40, 70, 100, 50, 80, 30, 100, 60, 100, 40, 80,
    100, 50, 70, 60, 40, 90, 60, 100, 80, 50, 30, 70,
  ];
  return (
    <svg
      width={bars.length * 4}
      height="28"
      aria-hidden
      className="text-ash/20"
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 4}
          y={28 - (28 * h) / 100}
          width={i % 3 === 0 ? 2 : 1}
          height={(28 * h) / 100}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 mt-24 overflow-hidden border-t border-ash/10 pt-24"
    >
      <div className="gutter">
        {/* Available label */}
        <Reveal>
          <div className="flex items-center gap-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-teal">
              Available for select work
            </p>
            <Barcode />
          </div>
        </Reveal>

        {/* CTA headline */}
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,7vw,6rem)] font-medium leading-[0.97] text-blush">
            Let&rsquo;s build the thing{" "}
            <span className="italic-serif font-normal text-ash">
              they said was impossible.
            </span>
          </h2>
        </Reveal>

        {/* Email CTA */}
        <Reveal delay={0.1}>
          <Magnetic strength={0.2} className="mt-12 inline-block">
            <a
              href={`mailto:${site.email}`}
              data-cursor
              className="group inline-flex items-center gap-4 rounded-full bg-blush px-8 py-4 text-base font-medium text-ink transition-colors hover:bg-teal"
            >
              {site.email}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
        </Reveal>

        {/* Bottom row */}
        <div className="mt-20 flex flex-wrap items-end justify-between gap-10 border-t border-ash/10 pt-10">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {site.socials.map((s, i) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-2 text-sm text-ash/70 transition-colors hover:text-blush"
              >
                <span className="font-mono text-[0.52rem] text-teal/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="link-underline pb-0.5">{s.label}</span>
                <span className="font-mono text-xs text-slate/50 group-hover:text-teal">↗</span>
              </a>
            ))}
          </div>

          <a
            href="#top"
            className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-ash/50 hover:text-blush"
          >
            Back to top ↑
          </a>
        </div>

        {/* Legal row */}
        <div className="flex flex-col gap-2 py-8 font-mono text-[0.58rem] uppercase tracking-[0.15em] text-slate/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>{site.location}</span>
          <Link href="/work" className="hover:text-blush">
            View all work →
          </Link>
        </div>
      </div>

      {/* Oversized watermark */}
      <div
        aria-hidden
        className="pointer-events-none -mb-[3vw] select-none px-2 text-center font-display text-[clamp(5rem,21vw,20rem)] font-semibold leading-none text-ash/[0.035]"
      >
        {site.name}
      </div>
    </footer>
  );
}

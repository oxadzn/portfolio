import Link from "next/link";
import { site } from "@/content/site";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 mt-24 overflow-hidden border-t border-ash/10 pt-24"
    >
      <div className="gutter">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-teal">
            Available for select work
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.25rem,7vw,6rem)] font-medium leading-[0.98] text-blush">
            Let&rsquo;s build the thing{" "}
            <span className="italic-serif font-normal text-ash">they said was impossible.</span>
          </h2>
        </Reveal>

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

        <div className="mt-20 flex flex-wrap items-end justify-between gap-10 border-t border-ash/10 pt-10">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {site.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-2 text-sm text-ash transition-colors hover:text-blush"
              >
                <span className="link-underline pb-0.5">{s.label}</span>
                <span className="font-mono text-xs text-slate group-hover:text-teal">↗</span>
              </a>
            ))}
          </div>

          <a
            href="#top"
            className="font-mono text-xs uppercase tracking-[0.25em] text-ash hover:text-blush"
          >
            Back to top ↑
          </a>
        </div>

        <div className="flex flex-col gap-2 py-10 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="font-mono">{site.location}</span>
          <Link href="/work" className="hover:text-blush">
            View all work →
          </Link>
        </div>
      </div>

      {/* Oversized watermark, clipped */}
      <div
        aria-hidden
        className="pointer-events-none -mb-[3vw] select-none px-2 text-center font-display text-[clamp(5rem,21vw,20rem)] font-semibold leading-none text-ash/[0.04]"
      >
        {site.name}
      </div>
    </footer>
  );
}

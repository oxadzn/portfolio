import Link from "next/link";
import { site } from "@/content/site";
import { Magnetic } from "@/components/magnetic";
import { Reveal } from "@/components/reveal";

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-ash/10 pt-24">
      <div className="gutter">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal">
            Let&rsquo;s make something
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <a
            href={`mailto:${site.email}`}
            className="link-underline mt-6 block w-fit font-display text-[clamp(2.5rem,11vw,11rem)] leading-[0.9] text-blush"
          >
            {site.email}
          </a>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-10 border-t border-ash/10 pt-10">
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {site.socials.map((s) => (
              <Magnetic key={s.href} strength={0.25}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-2 text-ash transition-colors hover:text-blush"
                >
                  <span className="text-sm">{s.label}</span>
                  <span className="font-mono text-xs text-slate group-hover:text-teal">
                    ↗
                  </span>
                </a>
              </Magnetic>
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

      {/* Oversized watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none px-2 text-center font-display text-[26vw] leading-none text-ash/[0.04]"
      >
        {site.name}
      </div>
    </footer>
  );
}

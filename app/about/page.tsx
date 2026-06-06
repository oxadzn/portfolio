import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Reveal, RevealLines } from "@/components/reveal";
import { Marquee } from "@/components/marquee";

export const metadata: Metadata = {
  title: "About",
  description: site.intro,
};

const designProcess = [
  { n: "01", t: "Listen", d: "Brief, audience, constraints. The problem before the pixels." },
  { n: "02", t: "Concept", d: "Sketches, references, and one defensible idea to build on." },
  { n: "03", t: "Craft", d: "Type, grid, color, balance — refined until it feels inevitable." },
  { n: "04", t: "Systemise", d: "Rules, files, and a kit so the work survives without me in the room." },
];

const services = [
  "Brand Identity Systems",
  "Logo & Monogram Design",
  "Poster & Print",
  "Art Direction",
  "Packaging",
  "Typography & Lettering",
];

export default function AboutPage() {
  return (
    <div className="pt-36 md:pt-44">
      <section className="gutter">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-teal">About</p>
        {/* Crosshair rule */}
        <div className="relative mt-4 mb-6 h-px bg-ash/10">
          <span className="absolute left-0 -top-1.5 h-3 w-px bg-teal/50" />
          <span className="absolute left-[25%] -top-1 h-2 w-px bg-ash/20" />
        </div>
        <h1
          className="max-w-5xl font-display font-medium text-blush"
          style={{ fontSize: "clamp(2.75rem, 8vw, 7rem)", lineHeight: 0.92, letterSpacing: "-0.025em" }}
        >
          <RevealLines
            lines={[
              "I design identities",
              "that think — then get",
              "out of their own way.",
            ]}
          />
        </h1>
      </section>

      <section className="gutter grid gap-12 py-24 md:grid-cols-[1.2fr_1fr] md:py-32">
        <Reveal>
          <p className="max-w-xl text-xl leading-relaxed text-ash/90">
            I&rsquo;m {site.name}, a graphic designer working across brand identity,
            logos, and poster art. My favourite briefs are the knotted ones —
            the projects with too many requirements and no obvious answer.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-ash/75">
            {site.thesis} The complicated work on this site isn&rsquo;t showing
            off — it&rsquo;s the receipt. If a mark can hold up under that much
            pressure, the clean, simple stuff is the easy part.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-t border-ash/15 pt-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-teal">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-3 text-ash/90">
                  <span className="h-px w-5 bg-teal" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <Marquee />

      <section className="gutter py-24 md:py-32">
        <p className="mb-12 font-mono text-xs uppercase tracking-[0.3em] text-teal">
          How it goes
        </p>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {designProcess.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.07}>
              <div className="border-t border-ash/15 pt-5">
                <span className="font-mono text-xs text-teal">{p.n}</span>
                <h3 className="mt-3 font-display text-2xl text-blush">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ash/80">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="gutter pb-32">
        <Reveal>
          <div className="rounded-2xl border border-ash/15 bg-shadow/40 p-10 text-center md:p-20">
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-tight text-blush">
              Got a brief that scares people off?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-ash/80">
              That&rsquo;s the fun one. Tell me what you&rsquo;re building.
            </p>
            <Link
              href="/#contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-blush px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-teal"
            >
              Start a project →
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

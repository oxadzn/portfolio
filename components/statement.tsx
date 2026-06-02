import Link from "next/link";
import { Reveal, RevealLines } from "@/components/reveal";

/**
 * The thesis, said plainly: complexity is the proof, simplicity is the point.
 * This is the section that does the selling.
 */
export function Statement() {
  return (
    <section className="gutter py-28 md:py-40">
      <p className="mb-12 font-mono text-xs uppercase tracking-[0.3em] text-teal">
        Why work with me
      </p>

      <h2 className="max-w-5xl font-display text-[clamp(1.6rem,4vw,3.4rem)] font-medium leading-[1.08] text-blush">
        <RevealLines
          lines={[
            "Anyone can decorate.",
            "I untangle the hard briefs —",
            "then make the answer",
            "look effortless.",
          ]}
        />
      </h2>

      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {[
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
        ].map((c, i) => (
          <Reveal key={c.n} delay={i * 0.08}>
            <div className="border-t border-ash/15 pt-5">
              <span className="font-mono text-xs text-teal">{c.n}</span>
              <h3 className="mt-3 font-display text-2xl text-blush">{c.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash/80">{c.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <Link
          href="/about"
          className="link-underline mt-16 inline-block text-sm text-ash hover:text-blush"
        >
          More about the approach ↗
        </Link>
      </Reveal>
    </section>
  );
}

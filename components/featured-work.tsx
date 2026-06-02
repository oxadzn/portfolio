import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export function FeaturedWork() {
  const featured = featuredProjects().slice(0, 4);
  return (
    <section id="work" className="gutter py-24 md:py-36">
      <div className="mb-16 flex items-end justify-between gap-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal">
            Selected Work
          </p>
          <h2 className="text-section mt-4 font-display text-blush">
            Range, on the record.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/work"
            className="link-underline hidden whitespace-nowrap pb-1 text-sm text-ash hover:text-blush md:block"
          >
            All projects ↗
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className={i % 2 === 1 ? "md:mt-20" : ""}>
            <ProjectCard project={p} index={i} priority={i < 2} />
          </Reveal>
        ))}
      </div>

      <div className="mt-16 md:hidden">
        <Link href="/work" className="link-underline text-sm text-ash">
          All projects ↗
        </Link>
      </div>
    </section>
  );
}

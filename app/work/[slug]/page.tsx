import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  allSlugs,
  categories,
  getProject,
  projects,
} from "@/content/projects";
import { Gallery } from "@/components/lightbox";
import { Reveal } from "@/components/reveal";
import { CoverImage } from "@/components/cover-image";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — ${categories[project.category].label}`,
    description: project.blurb,
    openGraph: {
      title: project.title,
      description: project.blurb,
      images: [{ url: project.cover.src }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const meta = [
    project.client && { label: "Client", value: project.client },
    { label: "Category", value: categories[project.category].label },
    project.role && { label: "Role", value: project.role },
    { label: "Year", value: String(project.year) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article className="pt-36 md:pt-44">
      {/* Title block */}
      <header className="gutter">
        <Link
          href="/work"
          className="link-underline mb-8 inline-block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ash hover:text-blush"
        >
          ← All work
        </Link>

        {/* Rule with ticks */}
        <div className="relative mb-8 h-px bg-ash/10">
          <span className="absolute left-0 -top-1.5 h-3 w-px bg-teal/55" />
          <span className="absolute left-[30%] -top-1 h-2 w-px bg-ash/20" />
          <span className="absolute left-[60%] -top-1 h-2 w-px bg-ash/20" />
        </div>

        {/* Category + year */}
        <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.3em]">
          <span className="text-teal">{categories[project.category].label}</span>
          <span className="text-slate/40">·</span>
          <span className="text-slate/60">{project.year}</span>
        </div>

        {/* Title */}
        <h1
          className="mt-4 font-display font-medium text-blush"
          style={{ fontSize: "clamp(2.5rem, 7.5vw, 7.5rem)", lineHeight: 0.92, letterSpacing: "-0.025em" }}
        >
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ash/80">{project.blurb}</p>

        {/* Meta strip */}
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-ash/10 pt-7">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-[0.55rem] uppercase tracking-widest text-slate">
                {m.label}
              </dt>
              <dd className="mt-1 text-sm text-blush/90">{m.value}</dd>
            </div>
          ))}
        </dl>

        {project.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="border border-ash/15 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.15em] text-ash/60"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cover */}
      <div className="gutter mt-16">
        <CoverImage cover={project.cover} />
      </div>

      {/* Narrative */}
      {(project.overview || project.challenge || project.approach || project.result) && (
        <section className="gutter py-24 md:py-32">
          {project.overview && (
            <Reveal>
              <p className="w-full text-balance text-center font-display text-[clamp(1.5rem,4vw,3.5rem)] leading-[1.1] text-blush">
                {project.overview}
              </p>
            </Reveal>
          )}

          <div className="mt-20 grid gap-12 md:grid-cols-3">
            {(
              [
                ["Challenge", project.challenge],
                ["Approach", project.approach],
                ["Result", project.result],
              ] as const
            )
              .filter(([, v]) => v)
              .map(([label, value], i) => (
                <Reveal key={label} delay={i * 0.08}>
                  <div className="border-t border-ash/15 pt-5">
                    <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-teal">
                      {label}
                    </h2>
                    <p className="mt-4 leading-relaxed text-ash/85">{value}</p>
                  </div>
                </Reveal>
              ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="gutter pb-24">
          <Gallery items={project.gallery} />
        </section>
      )}

      {/* Next project */}
      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-ash/10 py-20 text-center transition-colors hover:bg-shadow/40"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate">
          Next project
        </p>
        <p className="mt-4 font-display text-[clamp(2rem,6vw,5rem)] font-medium leading-[1.02] text-blush transition-colors group-hover:text-teal">
          {next.title}
        </p>
      </Link>
    </article>
  );
}

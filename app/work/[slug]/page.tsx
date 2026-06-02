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
          className="link-underline mb-10 inline-block text-sm text-ash hover:text-blush"
        >
          ← All work
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal">
          {categories[project.category].label}
        </p>
        <h1 className="text-display mt-4 font-display text-blush">{project.title}</h1>
        <p className="mt-6 max-w-2xl text-xl text-ash/90">{project.blurb}</p>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ash/10 pt-8 sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-xs uppercase tracking-widest text-slate">
                {m.label}
              </dt>
              <dd className="mt-1 text-blush">{m.value}</dd>
            </div>
          ))}
        </dl>

        {project.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-ash/20 px-3 py-1 text-xs text-ash"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cover */}
      <div className="gutter mt-16">
        <div
          className="relative overflow-hidden rounded-2xl bg-shadow"
          style={{ aspectRatio: `${project.cover.width} / ${project.cover.height}` }}
        >
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Narrative */}
      {(project.overview || project.challenge || project.approach || project.result) && (
        <section className="gutter py-24 md:py-32">
          {project.overview && (
            <Reveal>
              <p className="mx-auto max-w-3xl text-balance text-center font-display text-[clamp(1.5rem,3.5vw,2.75rem)] leading-tight text-blush">
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
        <p className="mt-4 font-display text-[clamp(2.5rem,8vw,7rem)] leading-none text-blush transition-colors group-hover:text-teal">
          {next.title}
        </p>
      </Link>
    </article>
  );
}

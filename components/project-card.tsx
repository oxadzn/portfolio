import Link from "next/link";
import Image from "next/image";
import { categories, type Project } from "@/content/projects";

/**
 * Work thumbnail. Pure CSS hover (no JS) so it stays cheap in big grids.
 * Aspect ratio comes from the real image dims → zero layout shift.
 */
export function ProjectCard({
  project,
  priority = false,
  index = 0,
}: {
  project: Project;
  priority?: boolean;
  index?: number;
}) {
  const { cover } = project;
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor
      className="group block"
      aria-label={`${project.title} — ${categories[project.category].label}`}
    >
      <div
        className="relative overflow-hidden rounded-xl bg-shadow"
        style={{ aspectRatio: `${cover.width} / ${cover.height}` }}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-full bg-blush px-4 py-1.5 text-xs font-medium text-ink">
            View project →
          </span>
        </div>
        <span className="absolute right-4 top-4 font-mono text-xs text-blush/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl text-blush">{project.title}</h3>
          <p className="mt-1 text-sm text-ash/70">{project.blurb}</p>
        </div>
        <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-slate">
          {categories[project.category].label} · {project.year}
        </span>
      </div>
    </Link>
  );
}

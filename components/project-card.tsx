import Link from "next/link";
import Image from "next/image";
import { categories, type Project } from "@/content/projects";

const CATEGORY_CODE: Record<string, string> = {
  identity: "ID",
  logo: "LG",
  poster: "PS",
};

/**
 * Work thumbnail. Corner brackets + teal scanline sweep on hover.
 * Aspect ratio comes from real image dims → zero layout shift.
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
  const code = CATEGORY_CODE[project.category] ?? "WK";
  const serial = `${code}·${String(index + 1).padStart(2, "0")}`;

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor
      className="group block"
      aria-label={`${project.title} — ${categories[project.category].label}`}
    >
      {/* Image — bracket-corners + scanline */}
      <div
        className="bracket-corners relative overflow-hidden bg-shadow"
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

        {/* Teal scanline sweep on hover */}
        <div className="scan-line" aria-hidden />

        {/* Bottom gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* View pill */}
        <div className="absolute bottom-4 left-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-full bg-blush px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-ink">
            View →
          </span>
        </div>

        {/* Serial */}
        <span className="absolute right-3 top-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-blush/35">
          {serial}
        </span>
      </div>

      {/* Meta */}
      <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-ash/10 pb-4">
        <div>
          <h3 className="font-display text-2xl text-blush">{project.title}</h3>
          <p className="mt-1 text-sm text-ash/60">{project.blurb}</p>
        </div>
        <div className="shrink-0 text-right font-mono text-[0.58rem] uppercase tracking-widest text-slate">
          <span className="block">{categories[project.category].label}</span>
          <span className="block text-slate/60">{project.year}</span>
        </div>
      </div>
    </Link>
  );
}

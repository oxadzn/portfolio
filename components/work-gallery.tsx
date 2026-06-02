"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, type Category, type Project } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";

type Filter = "all" | Category;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "identity", label: "Identities" },
  { key: "logo", label: "Logos" },
  { key: "poster", label: "Posters" },
];

export function WorkGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Sticky filter bar — always reachable, never in the way. */}
      <div className="sticky top-0 z-[60] -mx-2 mb-12 flex flex-wrap gap-2 bg-[var(--bg)]/80 px-2 py-4 backdrop-blur-md">
        {filters.map((f) => {
          const active = filter === f.key;
          const count =
            f.key === "all"
              ? projects.length
              : projects.filter((p) => p.category === f.key).length;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              data-cursor
              className={`relative rounded-full px-5 py-2 text-sm transition-colors ${
                active ? "text-ink" : "text-ash hover:text-blush"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-blush"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {f.label}
                <sup className="ml-1 font-mono text-[0.6rem] opacity-60">{count}</sup>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={i % 3 === 0 ? "md:mt-0" : "md:mt-16"}
            >
              <ProjectCard project={p} index={i} priority={i < 2} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <p className="py-20 text-center text-ash/60">
          Nothing here yet — {categories[filter as Category]?.label} work coming soon.
        </p>
      )}
    </div>
  );
}

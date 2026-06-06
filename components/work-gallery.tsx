"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, type Category, type Project } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";

type Filter = "all" | Category;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "event", label: "Events" },
  { key: "illustration", label: "Illustration" },
  { key: "social", label: "Social" },
  { key: "identity", label: "Identity" },
  { key: "logo", label: "Logos" },
  { key: "poster", label: "Posters" },
];

export function WorkGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="sticky top-0 z-[60] -mx-2 mb-14 flex flex-wrap gap-0 border-b border-ash/15 bg-bg/95 px-2 pt-5 backdrop-blur-md">
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
              className={`relative px-5 pb-3.5 pt-1 font-mono text-[0.75rem] uppercase tracking-[0.2em] transition-colors ${
                active ? "text-blush" : "text-ash/50 hover:text-ash"
              }`}
            >
              {f.label}
              <sup className={`ml-1 text-[0.6rem] ${active ? "opacity-60" : "opacity-40"}`}>{count}</sup>
              {/* Underline indicator */}
              {active && (
                <motion.span
                  layoutId="filter-line"
                  className="absolute inset-x-0 bottom-0 h-[1.5px] bg-teal"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              key={p.slug}
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
      </div>

      {shown.length === 0 && (
        <p className="py-20 text-center text-ash/60">
          Nothing here yet — {categories[filter as Category]?.label} work coming soon.
        </p>
      )}
    </div>
  );
}

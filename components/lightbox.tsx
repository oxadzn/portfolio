"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaItem } from "@/content/projects";

/**
 * Click any gallery image to view it full-bleed. Keyboard: ← → to move,
 * Esc to close. Touch-friendly. Locks scroll while open.
 */
export function Gallery({ items }: { items: MediaItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => ((i ?? 0) + 1) % items.length);
      if (e.key === "ArrowLeft")
        setOpen((i) => ((i ?? 0) - 1 + items.length) % items.length);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, items.length]);

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10">
        {items.map((m, i) => (
          <motion.button
            key={i}
            onClick={() => setOpen(i)}
            data-cursor
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative block w-full overflow-hidden rounded-xl bg-shadow"
            style={{ aspectRatio: `${m.width} / ${m.height}` }}
          >
            <Image
              src={m.src}
              alt={m.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {m.caption && (
              <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 text-xs text-blush backdrop-blur">
                {m.caption}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md md:p-12"
          >
            <button
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ash/30 text-blush"
              aria-label="Close"
            >
              ✕
            </button>
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-auto"
              style={{ aspectRatio: `${items[open].width} / ${items[open].height}` }}
            >
              <Image
                src={items[open].src}
                alt={items[open].alt}
                width={items[open].width}
                height={items[open].height}
                className="max-h-[88vh] w-auto rounded-lg object-contain"
              />
            </motion.div>

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-ash">
              {open + 1} / {items.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

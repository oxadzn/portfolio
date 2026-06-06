"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaItem } from "@/content/projects";

/**
 * Gallery with two-tier image loading:
 *  - Thumbnail  (max 1600px WebP, tiny file)  → shown in the grid
 *  - Full source (original master)             → loaded only on lightbox open
 *
 * Thumb derivation: /work/foo/bar.png  →  /thumbs/work/foo/bar.webp
 *
 * Layout logic:
 *  - Portrait images (h > w) show 2-per-row so posters stay readable.
 *  - Landscape / square images span full width.
 *  - Each item shows a shimmer skeleton while the thumb loads, then fades in.
 */

/** Derive the compressed thumbnail URL from the original src. */
function thumbSrc(src: string): string {
  // src = "/work/gamecon/gc.png"  →  "/thumbs/work/gamecon/gc.webp"
  const withoutLeading = src.replace(/^\//, ""); // "work/gamecon/gc.png"
  const lastDot = withoutLeading.lastIndexOf(".");
  const noExt = lastDot !== -1 ? withoutLeading.slice(0, lastDot) : withoutLeading;
  return `/thumbs/${noExt}.webp`;
}

type LayoutGroup =
  | { type: "portrait-pair"; items: [MediaItem, number, MediaItem, number] }
  | { type: "portrait-solo"; item: MediaItem; index: number }
  | { type: "landscape"; item: MediaItem; index: number };

function buildLayout(items: MediaItem[]): LayoutGroup[] {
  const groups: LayoutGroup[] = [];
  let i = 0;
  while (i < items.length) {
    const m = items[i];
    const isPortrait = m.height > m.width;
    if (isPortrait) {
      const next = items[i + 1];
      if (next && next.height > next.width) {
        groups.push({ type: "portrait-pair", items: [m, i, next, i + 1] });
        i += 2;
      } else {
        groups.push({ type: "portrait-solo", item: m, index: i });
        i += 1;
      }
    } else {
      groups.push({ type: "landscape", item: m, index: i });
      i += 1;
    }
  }
  return groups;
}

function GalleryItem({
  item,
  index,
  onOpen,
  priority = false,
}: {
  item: MediaItem;
  index: number;
  onOpen: (i: number) => void;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const aspectPct = (item.height / item.width) * 100;
  const thumb = thumbSrc(item.src);

  return (
    <motion.button
      onClick={() => onOpen(index)}
      data-cursor
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block w-full overflow-hidden rounded-xl"
    >
      {/* Aspect-ratio spacer + shimmer skeleton while thumbnail fetches */}
      <div
        className={`w-full transition-opacity duration-500 ${
          loaded ? "opacity-0" : "img-shimmer opacity-100"
        }`}
        style={{ paddingBottom: `${aspectPct}%` }}
        aria-hidden
      />

      {/* Compressed thumbnail — fades in once loaded */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={thumb}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1400px) 80vw, 1400px"
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => {
            // Thumb not generated yet? Fall back to original.
            setLoaded(true);
          }}
          className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      {item.caption && (
        <span className="absolute bottom-4 left-4 z-10 rounded-full bg-ink/70 px-3 py-1 text-xs text-blush backdrop-blur">
          {item.caption}
        </span>
      )}
    </motion.button>
  );
}

export function Gallery({ items }: { items: MediaItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const layout = buildLayout(items);

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

  let flatIdx = 0;

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10">
        {layout.map((group, gi) => {
          if (group.type === "portrait-pair") {
            const [a, ai, b, bi] = group.items;
            const pA = flatIdx++ < 3;
            const pB = flatIdx++ < 3;
            return (
              <div key={gi} className="grid grid-cols-2 gap-4 md:gap-6">
                <GalleryItem item={a} index={ai} onOpen={setOpen} priority={pA} />
                <GalleryItem item={b} index={bi} onOpen={setOpen} priority={pB} />
              </div>
            );
          }
          if (group.type === "portrait-solo") {
            const p = flatIdx++ < 3;
            return (
              <div key={gi} className="grid grid-cols-2 gap-4 md:gap-6">
                <GalleryItem item={group.item} index={group.index} onOpen={setOpen} priority={p} />
                <div />
              </div>
            );
          }
          const p = flatIdx++ < 3;
          return (
            <GalleryItem
              key={gi}
              item={group.item}
              index={group.index}
              onOpen={setOpen}
              priority={p}
            />
          );
        })}
      </div>

      {/* Lightbox — loads the FULL resolution original on demand */}
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
              className="relative max-h-[88vh] w-auto max-w-[90vw]"
            >
              {/* Full-res original — only fetched when lightbox opens */}
              <Image
                src={items[open].src}
                alt={items[open].alt}
                width={items[open].width}
                height={items[open].height}
                className="max-h-[88vh] w-auto max-w-[90vw] rounded-lg object-contain"
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

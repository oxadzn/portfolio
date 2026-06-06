"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItem } from "@/content/projects";

/** Derive the compressed thumbnail URL from the original src. */
function thumbSrc(src: string): string {
  const withoutLeading = src.replace(/^\//, "");
  const lastDot = withoutLeading.lastIndexOf(".");
  const noExt = lastDot !== -1 ? withoutLeading.slice(0, lastDot) : withoutLeading;
  return `/thumbs/${noExt}.webp`;
}

/**
 * Project cover image:
 *  - Shows a shimmer skeleton immediately
 *  - Loads the compressed thumbnail (fast) for the visible preview
 *  - Full-res original is NOT loaded here (only if user opens lightbox)
 */
export function CoverImage({ cover }: { cover: MediaItem }) {
  const [loaded, setLoaded] = useState(false);
  const aspectPct = (cover.height / cover.width) * 100;
  const thumb = thumbSrc(cover.src);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* Shimmer spacer — reserves exact aspect ratio space instantly */}
      <div
        className={`w-full transition-opacity duration-500 ${
          loaded ? "opacity-0" : "img-shimmer opacity-100"
        }`}
        style={{ paddingBottom: `${aspectPct}%` }}
        aria-hidden
      />
      {/* Compressed thumbnail — fast load, full quality appearance */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={thumb}
          alt={cover.alt}
          fill
          priority
          sizes="100vw"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)} // graceful fallback
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}

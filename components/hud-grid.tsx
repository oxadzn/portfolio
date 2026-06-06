"use client";

/**
 * Fixed full-screen grid overlay — the engineering-paper backdrop that runs
 * behind every page. Gives the site its HUD / techwear editorial structure.
 * Hidden on mobile (md+) to avoid cluttering small screens.
 */
export function HudGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{
        backgroundImage: [
          "linear-gradient(rgba(186,205,176,0.025) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(186,205,176,0.025) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "120px 120px",
        contain: "strict",
      }}
    />
  );
}

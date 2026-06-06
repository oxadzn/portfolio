import { site } from "@/content/site";

/** CSS-only infinite marquee of capabilities. Pauses for reduced-motion. */
export function Marquee() {
  const items = site.capabilities;
  return (
    <div className="relative border-y border-ash/10">
      {/* Pinned label — sits outside the scroll track */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 hidden select-none items-center md:flex"
      >
        <span
          className="font-mono text-[0.5rem] uppercase tracking-[0.3em] text-slate/35"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", paddingLeft: 4 }}
        >
          Capabilities /
        </span>
      </span>

      <div className="relative flex overflow-hidden py-5 select-none">
        <div className="flex shrink-0 animate-[marquee_42s_linear_infinite] items-center gap-8 pr-8 motion-reduce:animate-none">
          {items.map((c, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-xl text-blush/85 md:text-2xl">{c}</span>
              <span className="font-mono text-xs text-teal/60">+</span>
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-[marquee_42s_linear_infinite] items-center gap-8 pr-8 motion-reduce:hidden"
        >
          {items.map((c, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-xl text-blush/85 md:text-2xl">{c}</span>
              <span className="font-mono text-xs text-teal/60">+</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

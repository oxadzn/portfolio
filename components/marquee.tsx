import { site } from "@/content/site";

/** CSS-only infinite marquee of capabilities. Cheap; pauses for reduced-motion. */
export function Marquee() {
  const items = [...site.capabilities, ...site.capabilities];
  return (
    <div className="relative flex overflow-hidden border-y border-ash/10 py-6 select-none">
      <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-10 pr-10 motion-reduce:animate-none">
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-2xl text-blush/90 md:text-3xl">{c}</span>
            <span className="text-teal">✳</span>
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center gap-10 pr-10 motion-reduce:hidden"
      >
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-2xl text-blush/90 md:text-3xl">{c}</span>
            <span className="text-teal">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

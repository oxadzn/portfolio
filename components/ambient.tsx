"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Heavy bit (tsParticles) is code-split + client-only → off the critical path.
const AmbientParticles = dynamic(() => import("./ambient-particles"), {
  ssr: false,
});

/**
 * Site-wide atmosphere: soft radial "glade light" glows (cheap CSS) plus a
 * lazy drifting-dust field. Fixed behind everything, never interactive.
 */
export function Ambient() {
  const [motes, setMotes] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Save the particle work for desktops that haven't asked for calm.
    if (fine && !reduce) setMotes(true);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Glade-light glows */}
      <div className="glow glow-teal absolute -left-[10%] top-[8%] h-[42vw] w-[42vw] animate-[float_14s_ease-in-out_infinite]" />
      <div className="glow glow-slate absolute right-[-12%] top-[36%] h-[48vw] w-[48vw] animate-[float_19s_ease-in-out_infinite]" />
      <div className="glow glow-ash absolute bottom-[-10%] left-[28%] h-[38vw] w-[38vw] animate-[float_17s_ease-in-out_infinite]" />

      {/* Vignette to keep edges grounded */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_55%,rgba(20,19,21,0.7)_100%)]" />

      {motes && <AmbientParticles />}
    </div>
  );
}

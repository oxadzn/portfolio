"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

/**
 * Drifting forest dust / pollen. Loaded only on capable, motion-OK clients
 * via next/dynamic, so its bundle never touches first paint or mobile.
 * Particle count is deliberately low — ambiance, not a screensaver.
 */
export default function AmbientParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      particles: {
        number: { value: 46, density: { enable: true, width: 1200, height: 800 } },
        color: { value: ["#f3e8ee", "#bacdb0", "#729b79"] },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.06, max: 0.4 },
          animation: { enable: true, speed: 0.5, sync: false },
        },
        size: { value: { min: 0.5, max: 2.6 } },
        move: {
          enable: true,
          speed: { min: 0.15, max: 0.55 },
          direction: "top",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        links: { enable: false },
      },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
    }),
    []
  );

  if (!ready) return null;

  return (
    <Particles
      id="forest-dust"
      options={options}
      className="absolute inset-0 h-full w-full"
    />
  );
}

"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import { Magnetic } from "@/components/magnetic";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const line = (text: string, delay: number) => (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-end pb-[8vh] pt-32">
      <motion.div style={{ y, opacity }} className="gutter">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-ash"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
          {site.role}
        </motion.div>

        <h1 className="text-display font-display text-blush">
          {line("Design that earns", 0.25)}
          <span className="text-ash">{line("the second look.", 0.35)}</span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-md text-balance text-lg text-ash/90"
          >
            {site.thesis}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <Magnetic>
              <Link
                href="/work"
                className="group flex items-center gap-3 rounded-full bg-blush px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-teal"
              >
                Selected Work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/#contact"
                className="rounded-full border border-ash/25 px-7 py-3.5 text-sm text-blush transition-colors hover:border-blush"
              >
                Start a project
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="gutter mt-[6vh] flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-slate"
      >
        <span className="inline-block h-8 w-px bg-slate" />
        Scroll
      </motion.div>
    </section>
  );
}

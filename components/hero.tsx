"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import { Magnetic } from "@/components/magnetic";

const rise = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 1, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const Line = ({ children, i }: { children: React.ReactNode; i: number }) => (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span variants={rise} custom={i} initial="hidden" animate="show" className="block">
        {children}
      </motion.span>
    </span>
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end pb-[7vh] pt-32"
    >
      <motion.div style={{ y, opacity }} className="gutter">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.3em] text-ash"
        >
          <span className="flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
            {site.role}
          </span>
          <span className="hidden text-slate sm:inline">/</span>
          <span className="text-slate">{site.location}</span>
        </motion.div>

        <h1 className="text-display font-display font-medium text-blush">
          <Line i={0}>Design that</Line>
          <Line i={1}>
            earns the{" "}
            <span className="italic-serif font-normal text-teal">second</span>
          </Line>
          <Line i={2}>
            <span className="italic-serif font-normal text-ash">look.</span>
          </Line>
        </h1>

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="max-w-md text-pretty text-lg leading-relaxed text-ash/90"
          >
            {site.thesis}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/work"
                data-cursor
                className="group flex items-center gap-3 rounded-full bg-blush px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-teal"
              >
                Selected Work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/#contact"
                data-cursor
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="gutter mt-[6vh] flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-slate"
      >
        <motion.span
          className="inline-block h-8 w-px bg-slate"
          animate={{ scaleY: [1, 0.4, 1], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        Scroll to explore
      </motion.div>
    </section>
  );
}

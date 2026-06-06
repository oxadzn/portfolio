"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { site } from "@/content/site";
import { Magnetic } from "@/components/magnetic";

const links = [
  { label: "Work",    href: "/work",     index: "01" },
  { label: "About",   href: "/about",    index: "02" },
  { label: "Contact", href: "/#contact", index: "03" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen]     = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
  });

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[120]"
      >
        <nav className="gutter flex items-center justify-between border-b border-ash/10 bg-ink/92 py-4 backdrop-blur-sm">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 font-display text-xl tracking-tight text-blush"
            aria-label={`${site.name} — home`}
          >
            <span className="font-mono text-[0.55rem] text-teal opacity-60 transition-opacity group-hover:opacity-100">
              ◈
            </span>
            {site.name}
            <span className="text-teal">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center md:flex">
            {links.map((l) => (
              <Magnetic key={l.href} strength={0.2}>
                <Link
                  href={l.href}
                  className="group flex items-baseline gap-1.5 px-5 py-2 text-sm text-ash/80 transition-colors hover:text-blush"
                >
                  <span className="font-mono text-[0.52rem] text-teal opacity-40 transition-opacity group-hover:opacity-100">
                    {l.index}
                  </span>
                  {l.label}
                </Link>
              </Magnetic>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center border border-ash/20 text-blush md:hidden"
            aria-label="Open menu"
          >
            <span className="relative block h-3 w-4">
              <span className="absolute inset-x-0 top-0 h-px bg-current" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
            </span>
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex flex-col bg-ink/97 backdrop-blur-xl md:hidden"
          >
            {/* Drawer top bar */}
            <div className="gutter flex items-center justify-between border-b border-ash/10 py-4">
              <span className="font-display text-xl text-blush">
                {site.name}
                <span className="text-teal">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-ash/20 font-mono text-xs text-blush"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Drawer links */}
            <div className="gutter flex flex-1 flex-col justify-center">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 * i + 0.1 }}
                  className="border-b border-ash/10 py-7"
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5"
                  >
                    <span className="font-mono text-xs text-teal">{l.index}</span>
                    <span className="font-display text-5xl text-blush transition-colors group-hover:text-teal">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Drawer bottom */}
            <div className="gutter border-t border-ash/10 py-4">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-slate">
                {site.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

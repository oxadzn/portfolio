"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { site } from "@/content/site";
import { Magnetic } from "@/components/magnetic";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    // Hide when scrolling down past the hero; reveal on any upward intent.
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
        <nav className="gutter flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-display text-2xl tracking-tight text-blush"
            aria-label={`${site.name} — home`}
          >
            {site.name}
            <span className="text-teal">.</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-ash/15 bg-shadow/40 px-2 py-1.5 backdrop-blur-md md:flex">
            {links.map((l) => (
              <Magnetic key={l.href} strength={0.2}>
                <Link
                  href={l.href}
                  className="rounded-full px-4 py-1.5 text-sm text-ash transition-colors hover:bg-blush hover:text-ink"
                >
                  {l.label}
                </Link>
              </Magnetic>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ash/20 text-blush md:hidden"
            aria-label="Open menu"
          >
            <span className="relative block h-3 w-5">
              <span className="absolute inset-x-0 top-0 h-px bg-current" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex flex-col bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="gutter flex items-center justify-between py-5">
              <span className="font-display text-2xl text-blush">{site.name}</span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ash/20 text-blush"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="gutter flex flex-1 flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-6xl text-blush"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { Unbounded, Fraunces, Space_Grotesk } from "next/font/google";
// import localFont from "next/font/local";

/* ------------------------------------------------------------------ *
 *  TYPE SYSTEM
 *
 *  display → big statement headlines (awe)
 *  serif   → expressive italic accents (Fraunces — variable optical-size serif)
 *  sans    → UI / body
 *
 *  ── Want Reiswar as the display face? ──────────────────────────────
 *  Reiswar is FREE FOR PERSONAL USE ONLY. A client-facing portfolio is
 *  commercial use, so email Sentype.studio@gmail.com for a licence first.
 *  Then:
 *    1. drop Reiswar.otf (or .ttf) into /fonts
 *    2. uncomment the block below
 *    3. swap `display` to export `reiswar` instead of `unbounded`
 *
 *  export const reiswar = localFont({
 *    src: "../fonts/Reiswar.otf",
 *    variable: "--ff-display",
 *    display: "swap",
 *  });
 * ------------------------------------------------------------------ */

export const display = Unbounded({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const serif = Fraunces({
  subsets: ["latin"],
  variable: "--ff-serif",
  display: "swap",
  // Fraunces is variable — weight range covers light accents through display-weight italics.
  // optical-size axis ('opsz') gives it ink-trap details at display sizes automatically.
  style: ["normal", "italic"],
});

export const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

export const fontVars = `${display.variable} ${serif.variable} ${sans.variable}`;

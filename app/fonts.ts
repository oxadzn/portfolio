import { Unbounded, Instrument_Serif, Space_Grotesk } from "next/font/google";
// import localFont from "next/font/local";

/* ------------------------------------------------------------------ *
 *  TYPE SYSTEM
 *
 *  display → big statement headlines (awe)
 *  serif   → elegant italic accents
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

export const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--ff-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

export const fontVars = `${display.variable} ${serif.variable} ${sans.variable}`;

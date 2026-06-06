/**
 * Global site config. Edit this to change name, taglines, socials, contact.
 * No backend required — everything renders statically.
 */
export const site = {
  name: "oxadzn",
  // Shown big on the hero. Keep it sharp.
  role: "Graphic Designer & Visual Identity",
  location: "Available worldwide · Remote",
  email: "oxacreativebz@gmail.com",
  // The thesis of the whole site: complex proves capability, simple proves taste.
  thesis:
    "I build the complicated stuff most people can't. Which is exactly why the simple stuff lands.",
  intro:
    "Identity systems, posters, and logos with intent. I design from the idea out — so a mark works as hard at 16px as it does on a billboard.",
  socials: [
    { label: "Twitter / X", handle: "@oxadzn", href: "https://twitter.com/oxadzn" },
    { label: "Behance", handle: "oxadzn", href: "https://www.behance.net/oxadzn" },
    { label: "Instagram", handle: "@oxadzn", href: "https://instagram.com/oxadzn" },
    { label: "Email", handle: "oxacreativebz@gmail.com", href: "mailto:oxacreativebz@gmail.com" },
  ],
  // Marquee of capabilities / selected client types — swap freely.
  capabilities: [
    "Brand Identity",
    "Logo Design",
    "Poster Art",
    "Art Direction",
    "Typography",
    "Visual Systems",
    "Packaging",
    "Editorial",
  ],
} as const;

export type Site = typeof site;

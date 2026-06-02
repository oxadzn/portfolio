/* =================================================================== *
 *  PROJECTS — the only file you (or the agent) edit to manage work.
 *
 *  TO ADD A PROJECT:
 *    1. Drop images in /public/work/<category>/your-project/
 *    2. Copy a block below, change the fields, point images at your files.
 *    3. Set `featured: true` to surface it on the homepage.
 *    4. width/height = the image's real pixel size (keeps layout from
 *       jumping and lets next/image reserve space → no lag).
 *
 *  TO REMOVE: delete its block. That's it.
 * =================================================================== */

export type Category = "identity" | "logo" | "poster";

export interface MediaItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: Category;
  year: number;
  client?: string;
  role?: string;
  /** One-line hook for cards/listings. */
  blurb: string;
  tags: string[];
  /** Grid thumbnail. */
  cover: MediaItem;
  featured?: boolean;
  /** Optional per-project accent (defaults to teal). */
  accent?: string;

  /* --- Case study (identities especially). All optional. --- */
  overview?: string;
  challenge?: string;
  approach?: string;
  result?: string;
  gallery?: MediaItem[];
}

export const categories: Record<
  Category,
  { label: string; plural: string; description: string }
> = {
  identity: {
    label: "Identity",
    plural: "Brand Identities",
    description:
      "End-to-end systems — strategy, mark, type, color, and the rules that hold it together.",
  },
  logo: {
    label: "Logo",
    plural: "Logos & Marks",
    description: "Single marks engineered to work everywhere, from favicon to facade.",
  },
  poster: {
    label: "Poster",
    plural: "Posters",
    description: "Composition, type, and tension. Where I let the work get loud.",
  },
};

/* ------------------------------------------------------------------ *
 *  SEED DATA — placeholder imagery. Replace with your real work.
 * ------------------------------------------------------------------ */
export const projects: Project[] = [
  {
    slug: "solene-botanical",
    title: "Solène",
    category: "identity",
    year: 2024,
    client: "Solène Botanical Skincare",
    role: "Identity · Art Direction · Packaging",
    blurb: "A botanical skincare identity that breathes — restraint as luxury.",
    tags: ["Identity", "Packaging", "Typography"],
    featured: true,
    cover: {
      src: "/work/identities/ph-identity-1.svg",
      alt: "Solène botanical skincare identity — placeholder",
      width: 1600,
      height: 1200,
    },
    overview:
      "Solène needed an identity that felt clinical enough to trust and soft enough to crave. The complexity was hidden in the restraint.",
    challenge:
      "The category is loud — gradients, claims, noise. Solène wanted to win on calm without disappearing on a crowded shelf.",
    approach:
      "A single botanical mark reduced to its essential line, paired with a high-contrast serif and a palette borrowed from pressed flora. The system scales from a 14px ingredient list to a full storefront.",
    result:
      "A flexible identity that reads as premium at every size — proof that a simple surface can sit on a deeply considered structure.",
    gallery: [
      { src: "/work/identities/ph-identity-1.svg", alt: "Solène logo lockup", width: 1600, height: 1200 },
      { src: "/work/identities/ph-identity-2.svg", alt: "Solène packaging system", width: 1200, height: 1500 },
      { src: "/work/identities/ph-identity-3.svg", alt: "Solène type specimen", width: 1600, height: 900 },
    ],
  },
  {
    slug: "hollow-oak",
    title: "Hollow & Oak",
    category: "identity",
    year: 2023,
    client: "Hollow & Oak Roasters",
    role: "Identity · Packaging · Signage",
    blurb: "Specialty coffee identity with a hand-cut woodblock soul.",
    tags: ["Identity", "Illustration", "Packaging"],
    featured: true,
    cover: {
      src: "/work/identities/ph-identity-2.svg",
      alt: "Hollow & Oak roasters identity — placeholder",
      width: 1200,
      height: 1500,
    },
    overview:
      "A roaster that cups like a lab but pours like a porch. The identity had to hold both.",
    challenge: "Craft warmth without sliding into rustic cliché.",
    approach:
      "A custom woodcut monogram digitised and tightened, sitting on a strict grid. Warm soul, cold precision.",
    result: "A mark that stamps as well on a bag as it embosses on glass.",
    gallery: [
      { src: "/work/identities/ph-identity-2.svg", alt: "Hollow & Oak monogram", width: 1200, height: 1500 },
      { src: "/work/identities/ph-identity-3.svg", alt: "Hollow & Oak bag system", width: 1600, height: 900 },
    ],
  },
  {
    slug: "vega-mark",
    title: "Vega",
    category: "logo",
    year: 2024,
    client: "Vega Analytics",
    role: "Logo · Mark",
    blurb: "A star-chart wordmark that resolves to a single point.",
    tags: ["Logo", "Wordmark"],
    featured: true,
    cover: {
      src: "/work/logos/ph-logo-1.svg",
      alt: "Vega wordmark — placeholder",
      width: 1400,
      height: 1400,
    },
  },
  {
    slug: "northwind",
    title: "Northwind",
    category: "logo",
    year: 2023,
    client: "Northwind Sailing Co.",
    role: "Logo · Mark",
    blurb: "A compass and a sail compressed into one continuous stroke.",
    tags: ["Logo", "Monogram"],
    cover: {
      src: "/work/logos/ph-logo-2.svg",
      alt: "Northwind mark — placeholder",
      width: 1400,
      height: 1400,
    },
  },
  {
    slug: "pulse-fm",
    title: "Pulse FM",
    category: "logo",
    year: 2024,
    client: "Pulse FM",
    role: "Logo · Identity",
    blurb: "A waveform that doubles as a P. Loud at any size.",
    tags: ["Logo", "Sound"],
    featured: true,
    cover: {
      src: "/work/logos/ph-logo-3.svg",
      alt: "Pulse FM mark — placeholder",
      width: 1400,
      height: 1400,
    },
  },
  {
    slug: "echo-chamber",
    title: "Echo Chamber",
    category: "poster",
    year: 2024,
    role: "Poster · Type",
    blurb: "Type that repeats until it means something else.",
    tags: ["Poster", "Typography"],
    featured: true,
    cover: {
      src: "/work/posters/ph-poster-1.svg",
      alt: "Echo Chamber poster — placeholder",
      width: 1000,
      height: 1414,
    },
  },
  {
    slug: "nocturne",
    title: "Nocturne Series",
    category: "poster",
    year: 2023,
    role: "Poster Series",
    blurb: "A three-part poster set built on a single grid, broken three ways.",
    tags: ["Poster", "Series"],
    cover: {
      src: "/work/posters/ph-poster-2.svg",
      alt: "Nocturne poster series — placeholder",
      width: 1000,
      height: 1414,
    },
  },
];

/* ------------------------------------------------------------------ *
 *  Helpers
 * ------------------------------------------------------------------ */
export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectsByCategory = (category: Category) =>
  projects.filter((p) => p.category === category);

export const featuredProjects = () => projects.filter((p) => p.featured);

export const allSlugs = () => projects.map((p) => p.slug);

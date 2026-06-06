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

export type Category = "identity" | "logo" | "poster" | "event" | "illustration" | "social";

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
  event: {
    label: "Event",
    plural: "Event Design",
    description: "Large-format print, stage graphics, and everything that surrounds a live experience.",
  },
  illustration: {
    label: "Illustration",
    plural: "Illustrations",
    description: "Digital painting and character work — where the pen meets the screen.",
  },
  social: {
    label: "Social",
    plural: "Social Media",
    description: "Scroll-stopping headers, banners, and branded assets built for the feed.",
  },
};

/* ------------------------------------------------------------------ *
 *  PROJECTS
 * ------------------------------------------------------------------ */
export const projects: Project[] = [
  /* ── AEON ────────────────────────────────────────────────────────── */
  {
    slug: "aeon",
    title: "Aeon",
    category: "event",
    year: 2026,
    role: "Event Design · Print · Posters",
    blurb: "Visual identity and print campaign for Aeon — posters, slides, and large-format event graphics.",
    tags: ["Event", "Print", "Poster", "Large Format"],
    featured: true,
    cover: {
      src: "/work/event/aeon26/Untitled28_20260310152344.webp",
      alt: "Aeon 2026 — cover",
      width: 2560,
      height: 1138,
    },
    overview:
      "Aeon is the premier annual tech fest at Mahindra University. As the Design Head for the event, I established the core visual identity and developed comprehensive design templates for the junior design team to build upon.",
    challenge:
      "Designing a cohesive, futuristic aesthetic that could scale flawlessly across a massive range of deliverables—from social media campaigns and presentation slides to large-format physical banners.",
    approach:
      "I developed a high-contrast, structural design system combining bold typography, technical wireframe elements, and a deep palette. Every asset was meticulously crafted to feel like part of a unified, premium tech experience.",
    result:
      "A complete visual takeover of the campus that elevated the festival's production value, providing a consistent, immersive atmosphere that resonated with attendees.",
    gallery: [
      {
        src: "/work/event/aeon26/post1.webp",
        alt: "Aeon — poster 1",
        width: 2123,
        height: 2560,
      },
      {
        src: "/work/event/aeon26/Untitled28_20260310152344.webp",
        alt: "Aeon — wide graphic",
        width: 2560,
        height: 1138,
      },
      {
        src: "/work/event/aeon26/Untitled32_20260304231906.webp",
        alt: "Aeon — poster 2",
        width: 1280,
        height: 2560,
      },
      {
        src: "/work/event/aeon26/Untitled33_20260316190017.webp",
        alt: "Aeon — poster 3",
        width: 1810,
        height: 2560,
      },
      {
        src: "/work/event/aeon26/Untitled36_20260316185306.webp",
        alt: "Aeon — poster 4",
        width: 1920,
        height: 2560,
      },
      {
        src: "/work/event/aeon26/Untitled48_20260328012008.webp",
        alt: "Aeon — poster 5",
        width: 1920,
        height: 2560,
      },
      {
        src: "/work/event/aeon26/Untitled50_20260407154742.webp",
        alt: "Aeon — poster 6",
        width: 1810,
        height: 2560,
      },
      {
        src: "/work/event/aeon26/Untitled61_20260420105609.webp",
        alt: "Aeon — poster 7",
        width: 1280,
        height: 2560,
      },
      {
        src: "/work/event/aeon26/aeon26slide2.webp",
        alt: "Aeon — slide 2",
        width: 1920,
        height: 2560,
      },
    ],
  },

  /* ── EVENT ──────────────────────────────────────────────────────── */
  {

    slug: "gamecon",
    title: "GameCon",
    category: "event",
    year: 2026,
    role: "Event Design · Print · Posters",
    blurb: "Full event branding for a campus gaming convention — posters, standees, and stage graphics.",
    tags: ["Event", "Print", "Poster", "Large Format"],
    featured: true,
    cover: {
      src: "/work/event/gamecon/gc.webp",
      alt: "GameCon event branding — cover",
      width: 2560,
      height: 1422,
    },
    overview:
      "GameCon needed a visual system that felt cinematic and high-energy without losing legibility on a 16×8ft banner from 30 metres away.",
    challenge:
      "Designing across formats ranging from a 3×5 standee to a 330 MB courtyard banner — every element had to hold its weight at any scale.",
    approach:
      "A dark, high-contrast palette with bold display type and layered depth effects. Each piece was built as a self-contained poster that also reads as part of a cohesive campaign.",
    result:
      "A unified event identity that covered every surface of the venue — digital, print, and large-format — without a single asset feeling out of place.",
    gallery: [
      {
        src: "/work/event/gamecon/Untitled109_20251103154544.webp",
        alt: "GameCon poster — variant 1",
        width: 1810,
        height: 2560,
      },
      {
        src: "/work/event/gamecon/Untitled111_20251104000358.webp",
        alt: "GameCon poster — variant 2",
        width: 1810,
        height: 2560,
      },
      {
        src: "/work/event/gamecon/Untitled112_20251104003940.webp",
        alt: "GameCon poster — variant 3",
        width: 1810,
        height: 2560,
      },
      {
        src: "/work/event/gamecon/Untitled114_20251104015620.webp",
        alt: "GameCon poster — variant 4",
        width: 1810,
        height: 2560,
      },
      {
        src: "/work/event/gamecon/Untitled118_20251104175709.webp",
        alt: "GameCon standee — front",
        width: 1280,
        height: 2560,
      },
      {
        src: "/work/event/gamecon/Untitled118_20251104190425.webp",
        alt: "GameCon standee — alternate",
        width: 1280,
        height: 2560,
      },
      {
        src: "/work/event/gamecon/Untitled119_20251105001624.webp",
        alt: "GameCon poster — final",
        width: 1810,
        height: 2560,
      },
      {
        src: "/work/event/gamecon/pbuildingworkshop poster.webp",
        alt: "GameCon workshop poster",
        width: 1810,
        height: 2560,
      },
      {
        src: "/work/event/gamecon/imgonline-com-ua-CompressToSize-DmSMN2vKyINvj.webp",
        alt: "GameCon banner mockup",
        width: 1497,
        height: 2560,
      },
    ],
  },


  /* ── ILLUSTRATION ────────────────────────────────────────────────── */
  {
    slug: "illustrations",
    title: "Illustrations",
    category: "illustration",
    year: 2024,
    role: "Digital Illustration",
    blurb: "A collection of digital paintings and portrait studies — technique, texture, and character.",
    tags: ["Illustration", "Digital Painting", "Portrait"],
    featured: true,
    cover: {
      src: "/work/illustration/illustrations/wemby.webp",
      alt: "Wemby — digital portrait illustration",
      width: 1920,
      height: 2560,
    },
    gallery: [
      {
        src: "/work/illustration/illustrations/port1.webp",
        alt: "Illustration — port 1",
        width: 2560,
        height: 1707,
      },
      {
        src: "/work/illustration/illustrations/port2.webp",
        alt: "Illustration — port 2",
        width: 2560,
        height: 1707,
      },
      {
        src: "/work/illustration/illustrations/port3.webp",
        alt: "Illustration — port 3",
        width: 2560,
        height: 1707,
      },

      {
        src: "/work/illustration/illustrations/port6.webp",
        alt: "Illustration — port 6",
        width: 2560,
        height: 1707,
      },
    ],
  },

  /* ── SOCIAL MEDIA BANNERS ────────────────────────────────────────── */
  {
    slug: "social-media-banners",
    title: "Social Banners",
    category: "social",
    year: 2024,
    role: "Social Media Design · Brand Assets",
    blurb: "A body of social headers, banners, and profile assets — each built around a distinct brand voice.",
    tags: ["Social Media", "Banner", "Branding", "Digital"],
    featured: true,
    cover: {
      src: "/work/social/social media banners/showboating.webp",
      alt: "Showboating — social media banner",
      width: 2560,
      height: 1280,
    },
    gallery: [
      {
        src: "/work/social/social media banners/memors'.webp",
        alt: "Memors — social banner",
        width: 2560,
        height: 853,
        caption: "Memors'",
      },
      {
        src: "/work/social/social media banners/velt.webp",
        alt: "Velt — social banner",
        width: 2560,
        height: 853,
        caption: "Velt",
      },
      {
        src: "/work/social/social media banners/solar.webp",
        alt: "Solar — social banner",
        width: 2560,
        height: 853,
        caption: "Solar",
      },
      {
        src: "/work/social/social media banners/requitheader.webp",
        alt: "Requit — social header",
        width: 2560,
        height: 853,
        caption: "Requit",
      },
      {
        src: "/work/social/social media banners/comboheader.webp",
        alt: "Combo — social header",
        width: 2560,
        height: 853,
        caption: "Combo",
      },
      {
        src: "/work/social/social media banners/masonfiled.webp",
        alt: "Mason Filed — social banner",
        width: 2560,
        height: 853,
        caption: "Mason Filed",
      },
      {
        src: "/work/social/social media banners/NoXpost.webp",
        alt: "NoXpost — social banner",
        width: 2560,
        height: 853,
        caption: "NoXpost",
      },
      {
        src: "/work/social/social media banners/shelboating.webp",
        alt: "Shelboating — social banner",
        width: 2560,
        height: 1440,
        caption: "Shelboating",
      },
      {
        src: "/work/social/social media banners/Untitled146_20230617192617.webp",
        alt: "Social banner — early work",
        width: 2560,
        height: 853,
      },
      {
        src: "/work/social/social media banners/Untitled254_20240208093217.webp",
        alt: "Social banner — 2024",
        width: 2560,
        height: 1440,
      },
    ],
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

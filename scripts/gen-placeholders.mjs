// Generates seed placeholder SVGs in palette colors so the site renders
// before real work is added. Safe to delete once you've uploaded designs.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const C = {
  ink: "#201f22",
  shadow: "#2e2c2f",
  slate: "#475b63",
  teal: "#729b79",
  ash: "#bacdb0",
  blush: "#f3e8ee",
};

function svg({ w, h, a, b, mark, label, sub }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="${C.blush}" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <g transform="translate(${w / 2} ${h / 2})" fill="none" stroke="${C.blush}" stroke-opacity="0.85">
    ${mark}
  </g>
  <text x="${w / 2}" y="${h - 64}" text-anchor="middle" fill="${C.blush}" fill-opacity="0.85"
    font-family="Georgia, serif" font-size="${Math.round(w * 0.045)}" font-style="italic">${label}</text>
  <text x="${w / 2}" y="${h - 28}" text-anchor="middle" fill="${C.blush}" fill-opacity="0.45"
    font-family="ui-monospace, monospace" font-size="${Math.round(w * 0.016)}" letter-spacing="3">${sub}</text>
</svg>`;
}

const r = (n) => Math.round(n);

const files = [
  {
    p: "public/work/identities/ph-identity-1.svg",
    w: 1600, h: 1200, a: C.slate, b: C.ink, label: "Solène",
    sub: "IDENTITY · PLACEHOLDER",
    mark: `<circle r="150" stroke-width="2"/><path d="M0 -150 C 90 -60 90 60 0 150 C -90 60 -90 -60 0 -150 Z" stroke-width="2"/>`,
  },
  {
    p: "public/work/identities/ph-identity-2.svg",
    w: 1200, h: 1500, a: C.teal, b: C.slate, label: "Hollow & Oak",
    sub: "IDENTITY · PLACEHOLDER",
    mark: `<rect x="-120" y="-120" width="240" height="240" stroke-width="2"/><path d="M-120 0 H120 M0 -120 V120" stroke-width="2"/>`,
  },
  {
    p: "public/work/identities/ph-identity-3.svg",
    w: 1600, h: 900, a: C.ash, b: C.slate, label: "System",
    sub: "SPECIMEN · PLACEHOLDER",
    mark: `<path d="M-220 0 H220" stroke-width="2"/><circle r="80" stroke-width="2"/>`,
  },
  {
    p: "public/work/logos/ph-logo-1.svg",
    w: 1400, h: 1400, a: C.ink, b: C.slate, label: "Vega",
    sub: "LOGO · PLACEHOLDER",
    mark: `<path d="M0 -180 L52 -52 L180 0 L52 52 L0 180 L-52 52 L-180 0 L-52 -52 Z" stroke-width="2"/>`,
  },
  {
    p: "public/work/logos/ph-logo-2.svg",
    w: 1400, h: 1400, a: C.slate, b: C.ink, label: "Northwind",
    sub: "LOGO · PLACEHOLDER",
    mark: `<circle r="170" stroke-width="2"/><path d="M0 -170 L60 60 L0 20 L-60 60 Z" stroke-width="2"/>`,
  },
  {
    p: "public/work/logos/ph-logo-3.svg",
    w: 1400, h: 1400, a: C.teal, b: C.ink, label: "Pulse FM",
    sub: "LOGO · PLACEHOLDER",
    mark: `<path d="M-200 0 H-120 L-80 -120 L-20 140 L40 -80 L80 40 L120 0 H200" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`,
  },
  {
    p: "public/work/posters/ph-poster-1.svg",
    w: 1000, h: 1414, a: C.shadow, b: C.slate, label: "Echo Chamber",
    sub: "POSTER · PLACEHOLDER",
    mark: `<circle r="90" stroke-width="2"/><circle r="150" stroke-width="2" stroke-opacity="0.6"/><circle r="210" stroke-width="2" stroke-opacity="0.35"/>`,
  },
  {
    p: "public/work/posters/ph-poster-2.svg",
    w: 1000, h: 1414, a: C.ink, b: C.teal, label: "Nocturne",
    sub: "POSTER · PLACEHOLDER",
    mark: `<path d="M-160 -200 V200 M0 -200 V200 M160 -200 V200" stroke-width="2"/>`,
  },
];

for (const f of files) {
  const out = join(process.cwd(), f.p);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, svg({ ...f, w: r(f.w), h: r(f.h) }));
  console.log("wrote", f.p);
}

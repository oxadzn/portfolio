/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root — a stray lockfile in the home dir confuses inference.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    // Portfolio source files are very large (some >50 MB) — bypass Next.js's
    // image optimisation pipeline entirely so the 50 MB body-size limit is
    // never hit.  The browser receives the raw file; quality is preserved and
    // ERR_MAX_BODY_SIZE_EXCEEDED is eliminated.
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;


import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/content/site";
import { fontVars } from "./fonts";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Ambient } from "@/components/ambient";
import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const url = "https://oxadzn.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.intro,
  keywords: [
    "graphic design",
    "brand identity",
    "logo design",
    "poster design",
    "art direction",
    site.name,
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.intro,
    url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.intro,
    creator: "@oxadzn",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1b1a1c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars}>
      <body className="grain antialiased">
        <Ambient />
        <SmoothScroll>
          <Cursor />
          <Nav />
          <main id="top" className="relative z-10">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

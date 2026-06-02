import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { FeaturedWork } from "@/components/featured-work";
import { RangeProof } from "@/components/range-proof";
import { Statement } from "@/components/statement";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedWork />
      <RangeProof />
      <Statement />
    </>
  );
}

import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { WorkGallery } from "@/components/work-gallery";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected identities, logos, and posters — from the deeply complex to the deliberately simple.",
};

export default function WorkPage() {
  return (
    <div className="gutter pb-24 pt-36 md:pt-44">
      <header className="mb-16 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal">
          The Archive
        </p>
        <h1 className="text-section mt-5 font-display text-blush">
          Everything, filterable.
        </h1>
        <p className="mt-6 max-w-xl text-ash/80">
          Identities, logos, and posters. Filter by what you need — the range is
          the point.
        </p>
      </header>

      <WorkGallery projects={projects} />
    </div>
  );
}

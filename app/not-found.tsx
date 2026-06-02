import Link from "next/link";

export default function NotFound() {
  return (
    <div className="gutter flex min-h-[80svh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal">404</p>
      <h1 className="text-display mt-4 font-display text-blush">Lost the thread.</h1>
      <p className="mt-6 max-w-sm text-ash/80">
        This page doesn&rsquo;t exist — but the work does.
      </p>
      <Link
        href="/work"
        className="mt-10 rounded-full bg-blush px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-teal"
      >
        See the work →
      </Link>
    </div>
  );
}

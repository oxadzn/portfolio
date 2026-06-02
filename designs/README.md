# Where to put your real work

⚠️ Images dropped **here** (`/designs`) will **not** show on the site — a web
server can only serve files from **`/public`**.

## Do this instead

1. Put image files in **`/public/work/<category>/<project>/`**
   where `<category>` is `identities`, `logos`, or `posters`.
   e.g. `public/work/identities/acme/cover.jpg`, `.../01.jpg`, `.../02.jpg`

2. Register the project in **`/content/projects.ts`** (copy an existing block).

That's the whole flow — see the root `README.md` for the field reference.

> Prefer JPG/PNG/WebP at ~2000px on the long edge. `next/image` then serves
> AVIF/WebP at the right size automatically, so big files never lag the page.
> Put the real pixel `width`/`height` in the project block (stops layout shift).

If you'd rather just dump everything in this folder and have me sort, name,
and wire it up — push the files and say so, and I'll move + register them.

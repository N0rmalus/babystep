# design-sync notes

This repo is a Next.js app, not a published package. The sync bundles `components/ui` from source.

## How the build is wired

- Run `node .design-sync/prepare.mjs` (`cfg.buildCmd`) before every converter or driver run. It:
  - emits `.d.ts` files with `tsc -p .design-sync/tsconfig.dts.json` into `build/ts/` (gitignored via `/build`). The converter only looks for types in fixed dirs such as `build/ts`.
  - writes a root `index.d.ts` re-exporting `build/ts/.design-sync/entry` (gitignored). The converter resolves exports from `<pkgDir>/index.d.ts`.
  - compiles Tailwind v4 from `.design-sync/tailwind.css` (imports `app/globals.css` and safelists the semantic-token utilities) into `.design-sync/.cache/tailwind.out.css` (`cfg.cssEntry`). The repo is auto-scanned, so classes used anywhere in the app or in `.design-sync/previews/` compile.
- `node .design-sync/prepare.mjs --clean` removes `build/ts/` and `index.d.ts` after a sync. They are inside the repo's `tsconfig` `include`, so leftover copies get picked up by `npm run typescript`.
- `.design-sync/entry.ts` is the bundle entry (`cfg.entry`). It names every export, because several components are default exports. Add new `components/ui` primitives there and to `componentSrcMap`.
- `.design-sync/icons.ts` re-exports the lucide icons the app imports, as `Babystep.Icons`. `componentSrcMap.Icons: null` keeps it from becoming a card. Regenerate the list when the app starts using new icons.
- `next/link`, `next/image` and `next/navigation` are swapped for browser shims in `.design-sync/shims/` through `paths` in `.design-sync/tsconfig.json` (`cfg.tsconfig`).
- `cfg.dtsPropsFor` hand-writes `Button` (the union type collapsed and dropped `disabled`/`loading`/`type`), `ProductCard` and `Billboard` (their `Product`/`Billboard` types don't resolve in emitted `.d.ts`). Update them when `actions/types.ts` or the Button props change.
- Fonts: `next/font` doesn't exist outside Next, so `.design-sync/fonts/` holds the Urbanist and Bricolage Grotesque woff2 files (latin and latin-ext, downloaded from Google Fonts) wired through `cfg.extraFonts`. A remote Google `@import` doesn't work: the converter appends the CSS into the middle of `_ds_bundle.css`, where browsers ignore `@import`.
- Groups come from `.design-sync/docs/<Name>.md` category stubs (`cfg.docsMap`). ProductCard stays in `product-card` because its source directory name outranks a doc category.

## Preview gotchas

- Data-URI SVGs used as CSS `background-image` must be base64. `encodeURIComponent` leaves `(`/`)` unescaped, which breaks an unquoted `url()` (see `previews/Billboard.tsx`).
- Preview images are inline SVG data URIs, so cards never depend on Cloudinary or network access.

## Known render warns

- `[RENDER_THIN]` Modal: the open dialog renders through a fixed-position portal, so the measured root height is 0. The screenshot shows it fully. Benign.

## Re-sync risks

- `dtsPropsFor` bodies are copies of `actions/types.ts` and the Button props. They go stale silently when those change.
- `icons.ts` is a snapshot of the app's lucide imports. When diffing it, scan `app`, `components`, `hooks`, `providers` and `lib` (`lib/consts.ts` imports `Facebook`/`Instagram`), and handle multi-line `import { … } from 'lucide-react'`.
- Renamed or removed `components/ui` files break `prepare.mjs` at the `tsc` step (`Cannot find module` in `entry.ts`). Update `entry.ts`, `componentSrcMap`, `docsMap`, `overrides`, the preview and doc stub file names, and `conventions.md` together (as for `Container` → `PageContainer` on 2026-10-28).
- Font files are a snapshot of Google Fonts as of 2026-10-27, with only the weights the app uses (Urbanist 400–800, Bricolage 600/700).
- Playwright for the render check: Chromium build 1248 is cached locally and matches `playwright@1.64.1` (installed into `.ds-sync/`).
- The Next.js shims make `Link`, `Image`, `useRouter` and `usePathname` inert in designs. Navigation and image optimization are not exercised.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Babystep storefront: a Next.js 16 (App Router, React 19, Tailwind v4) shop for baby sleep products. It is a headless frontend only. All catalog data, checkout and the database live in a separate admin/API service reached through `NEXT_PUBLIC_API_URL`. User-facing copy and most route slugs are in Lithuanian (e.g. `akcijos` = sale, `pristatymo-informacija` = delivery info); keep new UI text in Lithuanian.

## Commands

npm is the package manager (`package-lock.json`).

- `npm run dev`: dev server on :3000 (needs `.env`; see `.env.example`)
- `npm run build`: production build (wrapped by Sentry's `withSentryConfig`)
- `npm run lint`: ESLint (next core-web-vitals + typescript + prettier)
- `npm run typescript`: `next typegen && tsc --noEmit`; use this as the type check
- `npx prettier --write <files>`: format. `.prettierrc` wins over `prettier.config.js`: 120 cols, single quotes, Tailwind class sorting.
- There are no tests.

## Architecture

**Data fetching.** Server components fetch through `actions/get-*.tsx`. These are plain async functions, not Server Actions, despite the folder name. Each one wraps `apiGet` in `lib/api-client.ts`, which builds the URL from `NEXT_PUBLIC_API_URL`, defaults to `cache: 'no-store'`, and throws `ApiGetError` on non-2xx responses. Single-entity actions such as `get-category` and `get-product` catch 404s with `isApiNotFoundError` and return `null`, and the page then calls `notFound()`. Pages also set `export const revalidate = 0`, so everything renders dynamically. API response shapes are in `actions/types.ts`. Prices arrive as strings.

**Catalog filtering is server-side.** Category, subcategory and `akcijos` pages read filters from URL search params: `lib/product-filters.ts` parses them (`parseProductFilters`, `parseProductPage`), and `getProductCatalog` sends them to `/products?includeCatalog=true`. The API does the filtering, sorting, pagination, price range and per-subcategory counts. The client filter components (`components/product-filters`, `components/product-catalog-toolbar`) only rewrite the URL. Filter containers are keyed on the serialized filters so they remount whenever the URL changes.

**Cart and wishlist store only product IDs.** `hooks/use-cart.ts` and `hooks/use-wishlist.ts` are zustand stores persisted to localStorage (versioned, with a `migrate` that normalizes older formats that stored whole objects). Client pages turn the IDs back into products with `hooks/use-resolved-products.ts`. That hook calls `/products/:id` directly from the browser and sorts IDs into found, missing (404) and failed. `hooks/use-focus-refresh.ts` refetches when the window regains focus or visibility, and `components/route-focus-refresh.tsx` calls `router.refresh()` for server pages. This keeps stock and prices fresh. Checkout (`hooks/use-cart-summary.ts`) POSTs the IDs to `${API}/checkout` and redirects to the URL it returns.

**Pricing logic lives in `business/`.** `getProductPricing` in `business/product-pricing.ts` is the single source of truth for whether a sale is active: the sale price must be below the regular price, and the current time must fall inside the optional `saleStartsAt`/`saleEndsAt` window. It also computes the effective price and discount percent. Use it rather than reading `salePrice` directly. Format money with `business/to-currency.ts`. Shipping constants (`FREE_SHIPPING_THRESHOLD`, etc.) are in `lib/consts.ts`.

**Other integrations.**
- The Instagram feed (`actions/get-instagram-posts.tsx`) calls the Graph API directly using `INSTAGRAM_USER_ID` and `INSTAGRAM_ACCESS_TOKEN`.
- The home page billboard comes from `INDEX_BILLBOARD_ID`.
- Sentry is configured in `instrumentation*.ts`, `sentry.*.config.ts` and `next.config.js`, with tunnel route `/x9f4k2`.
- Remote image hosts must be allowlisted in `next.config.js` `images.remotePatterns`. Use `lib/image-url.ts` to fall back to the placeholder image.

**UI.** Shared primitives are in `components/ui`. Global modals (the product preview) use `providers/modal-provider.tsx` together with `hooks/use-preview-modal.ts`. Route-local components sit next to their route under `app/(routes)/<route>/components`. Combine classes with `cn` from `lib/utils.ts` (clsx + tailwind-merge).

## Agent skills

### Issue tracker

Issues live in GitHub Issues for N0rmalus/babystep, accessed through the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the default label names: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root, created only when first needed. See `docs/agents/domain.md`.

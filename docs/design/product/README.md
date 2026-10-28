# Product page handoff

Source: the "Babystep Home Redesign" Design canvas in Claude Design (https://claude.ai/artifact/K5KGSvfdDdZU5usuAv1p2A), section "Product page" (direction C).

## Files

| File | What |
| --- | --- |
| `product-desktop.dc.html` | Product page at 1440px |
| `product-mobile.dc.html` | Product page at 390px |
| `buy-box-states.dc.html` | Buy box: normal, on sale (low stock), sold out |
| `quick-view-desktop.dc.html` | Quick-view modal from product cards. **Desktop only**: on mobile, tapping a card opens the product page |
| `size-guide-desktop.dc.html`, `size-guide-mobile.dc.html` | Size guide: centered modal on desktop, bottom sheet on mobile |

How to read `.dc.html` files: see `docs/design/home/README.md` ("How to read"). `/_blob/...` images are placeholder photos; use real product images. The sample data in each file's script block (sizes, colors, prices, stock, reviews) is fake.

## Header changes

The header in these designs (and in the updated `docs/design/home/` files) changed since the home page was built. Apply them too:

- **Logo:** the rocking horse next to the "Babystep" wordmark. Use `public/logo.png` (see `components/navbar/brand-link.tsx`).
- **Desktop navigation:** real categories from the API. A category with subcategories gets a chevron and a hover/focus dropdown (`docs/design/home/nav-dropdown.dc.html`): its subcategories, a "Visos prekės: <category>" link, and the category's billboard image. Categories without subcategories are plain links. Keyboard accessible.
- **Mobile menu:** logo plus wordmark, real categories with subcategory chips (`mobile-menu-guest.dc.html`).

## What exists now vs. mocks

Build everything in the design. Parts whose data doesn't exist in the API yet are visible **mocks**, so we can see the page as designed. Keep all mock data in one place (e.g. `lib/mocks/product.ts`), mark each use with a `// MOCK:` comment, and make each part easy to switch to real data later.

| Part | Now |
| --- | --- |
| Gallery, name, breadcrumbs, price, sale price and badge, description, similar products | Real data |
| Quantity selector | Real. Cart lines become `{ productId, variantId?, quantity }` now (with a store `migrate`), so the format won't change again for variants. Checkout keeps sending repeated product IDs, which the API already counts as quantity |
| Stock text ("Yra sandėlyje" / "Liko X vnt.") | Real, from `amountInStock` |
| Sold-out state | Real |
| Size chips, color swatches | Mock until "Product variants" (TODO.md) |
| "Papildoma informacija" (specs) | Mock until "Product specifications" |
| Rating summary and reviews | Mock until "Customer accounts" (reviews) |
| Size guide | Mock (the `[..]` values are placeholders) until variants and specs exist |
| Wishlist button | Real (existing wishlist store) |

## Decisions

- Quick view replaces the current preview modal (`providers/modal-provider.tsx`, `hooks/use-preview-modal.ts`), desktop only.
- "Nemokamas pristatymas nuo [SUMA] €" uses `FREE_SHIPPING_THRESHOLD` with `to-currency`.
- Product `h1` uses Bricolage (Title role in DESIGN.md).
- Follow DESIGN.md and CLAUDE.md; Lithuanian copy in the "tu" form.

# TODO

Ranked by impact on a shop taking real orders. `npm run lint` and `npm run typescript` both pass, so nothing here is a lint or type error.

## Orders and money

Payments are moving from Stripe to Montonio (see the admin repo's TODO). The API keeps the `{ productIds }` in, `{ url }` out contract, so the items below work with either provider.

- [ ] **Add delivery method selection and make shipping prices agree.** The API currently charges no shipping at all. The cart shows a flat 4,99 € (`STANDARD_SHIPPING_PRICE` in `lib/consts.ts`), and the delivery page promises 3,49 € (parcel locker) and 6,49 € (courier). Once the API charges shipping, let the customer pick a delivery method, send it with the checkout request, and show the same prices in the cart and on the delivery page. Blocked on the admin side.
- [ ] **Allow buying more than one of a product.** (If "Product variants" is close, do this together with its cart change, so the cart format changes once.) `hooks/use-cart.ts` stores each ID once and turns away a second add. The API already counts repeated IDs in `{ productIds }` as quantity and checks stock per quantity, so this is a storefront-only change: store a quantity per ID (with a store `migrate`) and repeat the ID that many times at checkout.
- [ ] **Add per-route `error.tsx` boundaries.** Right now any API error falls through to `app/global-error.tsx`, which shows Next's plain error screen without the layout. On the home page, any one of its five parallel fetches failing takes the whole page down.
- [ ] **Add a proper order confirmation.** `cart/components/summary.tsx` empties the cart and says payment succeeded whenever the URL has `?success`. There is no confirmation page or order number. `?canceled` shows "Kažkas nepavyko", which reads like an error when the customer simply cancelled. Build a confirmation page keyed on our own order ID (which the API will put in the return URL) that asks the API for the order's status, so it doesn't depend on the provider.
- [x] **Check the checkout reply before redirecting.** `hooks/use-cart-summary.ts` does `window.location.href = response.data.url` without checking that `url` exists, so a malformed reply sends the customer to `/cart/undefined`.

## Legal and trust

- [ ] **Rewrite the privacy policy.** It is WordPress template text about comments and login cookies. It should cover the data the shop actually handles: name, phone, address, payment (Montonio), Sentry and Instagram.
- [ ] **Connect the newsletter form.** The home page form is a mock (see "Mocks to replace before launch"). Connect it to the signup endpoint once the admin's "Newsletter" tasks are done, with a real confirmation message and an error state.

## Unfinished pages

- [ ] **Fill the blog section** ("Patarimai tėvams"). It is hidden from the home page until there are posts.
- [ ] **Fix links that go nowhere.** In the footer, "Naujienos" goes to `#`.
- [x] **Fix the 404 page's broken desktop image.** `app/not-found.tsx` loads `/page-not-founds.png`, which doesn't exist. Only `page-not-found.png` does.
- [ ] **Show category product counts** on the home page category tiles once the API provides them.
- [ ] **Give the home page category tiles real images.** `/categories` returns no `billboard`, so the tiles in `app/(routes)/components/category-showcase.tsx` show the placeholder.

## SEO and quality

- [ ] **Add `generateMetadata` to product and category pages.** Every page currently has the title "Babystep".
- [x] **Set `<html lang="lt">`.** It is `lang="en"` in `app/layout.tsx` and `app/global-error.tsx`.

## Dead code

- [x] **Delete the unused files** `actions/get-subcategory.tsx` and `components/ui/product-card/product-card-image.tsx`.
- [x] **Replace `axios` with `fetch`** in `use-cart-summary.ts` and remove the dependency. It's only used for that one call.

## Customer accounts (after the Montonio migration)

Storefront side of optional customer accounts. The API, data model and Clerk setup are planned in the admin repo's TODO under "Customer accounts"; do those first. Design the account pages in Claude Design after the main pages.

- [ ] **Add Clerk for customers.** Install `@clerk/nextjs` with the customer Clerk app's keys (not the admin's), set up `proxy.ts`, and add sign-in and sign-up pages in the brand style with Lithuanian text.
- [ ] **Account entry in the header.** A sign-in link when signed out, an account menu when signed in. Accounts stay optional: nothing in browsing or checkout requires signing in.
- [ ] **Call the API as the customer.** A small helper that adds the Clerk session token (`getToken()`) as an `Authorization: Bearer` header for the customer endpoints. No custom refresh logic: Clerk handles that.
- [ ] **Account pages.** Order history, an order detail page (reuse the order confirmation page's layout), and saved addresses (add, edit, delete, set default).
- [ ] **Checkout when signed in.** Prefill delivery details from the default address and send the session token so the order is attached to the account.
- [ ] **Reviews on the product page.** Show approved reviews with a rating summary and the "verified purchase" label, plus a short note on how reviews are checked. Show the review form only to signed-in customers who bought the product. Consider review structured data for search results.
- [ ] **Privacy policy.** Extend the rewrite (see "Legal and trust") to cover accounts, saved addresses and reviews, including how to delete an account.

## Customizable billboards

Storefront side of the billboard upgrade in the admin's TODO ("Customizable billboards"). Do it after the admin side and after the layouts are designed in Claude Design.

- [ ] **Billboard layouts.** Implement the designed variants in `components/ui/billboard.tsx`: text over the image (left or centered), split image/text, image only. Eyebrow, title, subtitle, optional button, light or dark text, focus point (`object-position`) and an optional mobile image.
- [ ] **Home page carousel.** Fetch the active home banners from the new endpoint instead of `INDEX_BILLBOARD_ID`. With one banner show it alone; with several, a manual carousel: arrows, dots, swipe on mobile, keyboard accessible, no autoplay. Then remove `INDEX_BILLBOARD_ID` from `.env.example`.
- [ ] **Category pages** use the same `Billboard` component with their category's billboard.
- [ ] **Update `.design-sync/previews/Billboard.tsx`** and run `/design-sync` so Claude Design shows the new variants.

## Mocks to replace before launch

The site isn't public yet, so some home page parts are built as visible mocks to judge the design. Mark each in code with a `// MOCK:` comment so they are easy to find. Before launch, every item here must be real or removed.

- [ ] **"Pagal amžių" section.** Tabs and product rail are a mock until the admin's "Product age range" tasks exist. Then fetch products with `?age=<group>`.
- [ ] **Newsletter form.** Accepts an email but sends nothing. Connect it (see "Legal and trust").
- [ ] **Account icon in the header and the sign-in card in the mobile menu.** Non-functional until customer accounts exist.
- [ ] **Header search.** The search field accepts text but submitting does nothing; there is no store-wide search page yet.
- [ ] **Product page: size chips and color swatches.** Mock until "Product variants".
- [ ] **Product page: "Papildoma informacija".** Mock until "Product specifications".
- [ ] **Product page: rating summary and reviews.** Mock until reviews exist ("Customer accounts").
- [ ] **Size guide.** Mock values until variants and specifications exist.
- [ ] **Header search.** Submitting does nothing until there is a store-wide search page (`components/navbar/header-search.tsx`).
- [ ] **Wishlist sharing.** The "Pasidalinti" button and popover are a mock (see "Wishlist sharing").
- [ ] **Wishlist sign-in note.** The "Prisijunk" link does nothing until customer accounts exist.
- [ ] **Checkout data layer.** Delivery options, pickup points, bank list, order creation and status are mock data until the admin endpoints exist.
- [ ] **Confirmation page account card and checkout sign-in note.** Mocks until customer accounts exist.
- [ ] **Billboard carousel controls**, if shown with fewer than two real banners. Replace with the "Customizable billboards" work.

## Product variants

Storefront side of "Product variants" in the admin's TODO. Do it after the admin side.

- [ ] **Variant selection** on the product page and in the quick-view modal: size as pill chips, color as swatches, unavailable options crossed out. Price, stock and photos follow the chosen variant.
- [ ] **Cart lines per variant.** The cart already stores `{ productId, variantId?, quantity }`, but `hooks/use-cart.ts` matches lines by `productId` only (add, set quantity, remove). Match by `productId` + `variantId`, so two sizes of one product are separate lines. Show the chosen options in the cart and send line items to checkout.
- [ ] **Product cards for products with variants.** The button says "Pasirinkti savybes" instead of "Į krepšelį" and opens the quick view on desktop (the product page on mobile), since an option must be chosen first. If variant prices differ, the card shows a price range, e.g. "22,50 € – 25,00 €", using effective (sale) prices; one price if they're all the same. If some variants are on sale, show the sale badge as "iki -X%".

## Product specifications

- [ ] **"Papildoma informacija"** on the product page: a specs table (Matmenys, Medžiaga, Sudėtis, Priežiūra) next to the description, as tabs or accordions, following the product page design. Values change with the chosen variant where they differ.

## Wishlist sharing

The wishlist's "Pasidalinti" is a mock. Parents share it so relatives know what to buy.

- [ ] **Shareable link without accounts.** Encode the wishlist's product IDs in the URL (e.g. `/norai/bendrinti?p=<ids>`), so no backend is needed. The link opens a read-only page with those products, an "Į krepšelį" per item, and no remove actions.
- [ ] **Later, with customer accounts:** a saved, named wishlist with a short link that stays up to date. Revisit when accounts are planned.

## Checkout (design in docs/design/checkout/)

Cart, checkout (`/apmokejimas`) and order confirmation (`/uzsakymas/[orderId]`). Decisions: `../babystep-admin/docs/montonio-research.md`, "Decisions".

- [ ] **Build the UI against a mock data layer** (`lib/checkout-api.ts` + `lib/mocks/checkout.ts`): delivery options, pickup points, payment methods, create order, order status. Can be done before the admin side.
- [ ] **Switch the data layer to the real admin endpoints** once the admin's Montonio work is done. Test the full flow in Montonio's sandbox.
- [ ] **Payment and carrier logos.** Visa, Mastercard, Apple Pay, Google Pay, Omniva, Unisend and SmartPosti as official SVGs in `public/logos/`, following each brand's usage rules (no recoloring, minimum size). Bank logos come from Montonio's `logoUrl`.
- [ ] **Delivery page** (`pristatymo-informacija`): Omniva and Unisend lockers 3,49 €, SmartPosti courier 6,49 €, free from 80 €. Remove LP Express and the flat 4,99 € (`STANDARD_SHIPPING_PRICE`).

## Migration from WordPress (babystep.lt)

The new site replaces the live WordPress/WooCommerce shop at babystep.lt. Most of this happens near launch, but plan it early.

- [ ] **Owner: list the WordPress setup.** Which plugins the shop uses (WooCommerce, Montonio plugin, newsletter, reviews, SEO, others), and what data lives where. Then make the items below specific.
- [ ] **URL redirects.** Map old WooCommerce URLs (`/product/...`, `/product-category/...`, pages) to the new ones and serve 301 redirects, so search rankings and bookmarks keep working. Export the old URL list (sitemap) first.
- [ ] **Products and images.** Check that every live product, category and image exists in the new admin; import what's missing.
- [ ] **Product reviews.** Export existing WooCommerce reviews and import them, so the reviews section starts with real reviews (mark them as imported; the "verified purchase" label only where it was verified).
- [ ] **Newsletter subscribers.** Move the list to the new email service with their consent records.
- [ ] **Customers and order history.** Decide whether to import WordPress customer accounts and past orders, or start fresh (affects "Customer accounts" and GDPR).
- [ ] **Shipping prices.** Compare what WordPress charges today with the new decisions, so any change is on purpose.
- [ ] **SEO and analytics.** Page titles and descriptions, sitemap, Google Search Console (submit the new sitemap after the switch), analytics.
- [ ] **Switch-over day plan.** DNS/domain to Vercel, Montonio production keys into Vercel, turn off the WordPress Montonio plugin, handle orders that are paid but not yet shipped in WordPress, keep a backup of the WordPress site and database.

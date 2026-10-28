# TODO

Ranked by impact on a shop taking real orders. `npm run lint` and `npm run typescript` both pass, so nothing here is a lint or type error.

## Orders and money

Payments are moving from Stripe to Montonio (see the admin repo's TODO). The API keeps the `{ productIds }` in, `{ url }` out contract, so the items below work with either provider.

- [ ] **Add delivery method selection and make shipping prices agree.** The API currently charges no shipping at all. The cart shows a flat 4,99 € (`STANDARD_SHIPPING_PRICE` in `lib/consts.ts`), and the delivery page promises 3,49 € (parcel locker) and 6,49 € (courier). Once the API charges shipping, let the customer pick a delivery method, send it with the checkout request, and show the same prices in the cart and on the delivery page. Blocked on the admin side.
- [ ] **Allow buying more than one of a product.** `hooks/use-cart.ts` stores each ID once and turns away a second add. The API already counts repeated IDs in `{ productIds }` as quantity and checks stock per quantity, so this is a storefront-only change: store a quantity per ID (with a store `migrate`) and repeat the ID that many times at checkout.
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
- [ ] **Billboard carousel controls**, if shown with fewer than two real banners. Replace with the "Customizable billboards" work.

# TODO

Ranked by impact on a shop taking real orders. `npm run lint` and `npm run typescript` both pass, so nothing here is a lint or type error.

## Orders and money

Payments are moving from Stripe to Montonio (see the admin repo's TODO). The API keeps the `{ productIds }` in, `{ url }` out contract, so the items below work with either provider.

- [ ] **Add delivery method selection and make shipping prices agree.** The API currently charges no shipping at all. The cart shows a flat 4,99 € (`STANDARD_SHIPPING_PRICE` in `lib/consts.ts`), and the delivery page promises 3,49 € (parcel locker) and 6,49 € (courier). Once the API charges shipping, let the customer pick a delivery method, send it with the checkout request, and show the same prices in the cart and on the delivery page. Blocked on the admin side.
- [ ] **Allow buying more than one of a product.** `hooks/use-cart.ts` stores each ID once and turns away a second add. The API already counts repeated IDs in `{ productIds }` as quantity and checks stock per quantity, so this is a storefront-only change: store a quantity per ID (with a store `migrate`) and repeat the ID that many times at checkout.
- [ ] **Add per-route `error.tsx` boundaries.** Right now any API error falls through to `app/global-error.tsx`, which shows Next's plain error screen without the layout. On the home page, any one of its five parallel fetches failing takes the whole page down.
- [ ] **Add a proper order confirmation.** `cart/components/summary.tsx` empties the cart and says payment succeeded whenever the URL has `?success`. There is no confirmation page or order number. `?canceled` shows "Kažkas nepavyko", which reads like an error when the customer simply cancelled. Build a confirmation page keyed on our own order ID (which the API will put in the return URL) that asks the API for the order's status, so it doesn't depend on the provider.
- [ ] **Check the checkout reply before redirecting.** `hooks/use-cart-summary.ts` does `window.location.href = response.data.url` without checking that `url` exists, so a malformed reply sends the customer to `/cart/undefined`.

## Legal and trust

- [ ] **Rewrite the privacy policy.** It is WordPress template text about comments and login cookies. It should cover the data the shop actually handles: name, phone, address, payment (Montonio), Sentry and Instagram.
- [ ] **Fix the newsletter block.** It promises a discount email but has no signup form. Either add a form or remove the promise.

## Unfinished pages

- [ ] **Fill or remove the empty blog section** ("Patarimai tėvams") on the home page.
- [ ] **Fix links that go nowhere.** On the home page, "Žiūrėti įrašus" and "Žiūrėti rekomendacijas" go to `/`. In the footer, "Naujienos" goes to `#`. In the mobile menu, "Tinklaraštis" and "Apie mus" go to `#`.
- [ ] **Fix the 404 page's broken desktop image.** `app/not-found.tsx` loads `/page-not-founds.png`, which doesn't exist. Only `page-not-found.png` does.
- [ ] **Show category product counts** once the API provides them. See the TODO in `app/(routes)/components/category-mosaic.tsx`.

## SEO and quality

- [ ] **Add `generateMetadata` to product and category pages.** Every page currently has the title "Babystep".
- [ ] **Set `<html lang="lt">`.** It is `lang="en"` in `app/layout.tsx` and `app/global-error.tsx`.
- [ ] **Add an e2e test for checkout.** The mock server already has a `/checkout` endpoint. Update the mock when the delivery method and confirmation endpoints are added.

## Dead code

- [x] **Delete the unused files** `actions/get-subcategory.tsx` and `components/ui/product-card/product-card-image.tsx`.
- [x] **Replace `axios` with `fetch`** in `use-cart-summary.ts` and remove the dependency. It's only used for that one call.

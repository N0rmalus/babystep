# TODO

Ranked by impact on a shop taking real orders. `npm run lint` and `npm run typescript` both pass, so nothing here is a lint or type error.

## Orders and money

Payments are moving from Stripe to Montonio (see the admin repo's TODO). The cart, checkout (`/apmokejimas`) and confirmation (`/uzsakymas/[orderId]`) now run on a mock data layer (`lib/checkout-api.ts`); see "Checkout" below for what's left.

- [x] **Add delivery method selection and make shipping prices agree.** The checkout lets the customer pick a parcel locker or courier, and the cart shows "nuo 3,49 €" from the same delivery config. The flat `STANDARD_SHIPPING_PRICE` is gone. Still open: the delivery page (see "Checkout") and the real endpoint.
- [ ] **Allow buying more than one of a product.** (If "Product variants" is close, do this together with its cart change, so the cart format changes once.) `hooks/use-cart.ts` stores each ID once and turns away a second add. The API already counts repeated IDs in `{ productIds }` as quantity and checks stock per quantity, so this is a storefront-only change: store a quantity per ID (with a store `migrate`) and repeat the ID that many times at checkout.
- [ ] **Add per-route `error.tsx` boundaries.** Right now any API error falls through to `app/global-error.tsx`, which shows Next's plain error screen without the layout. On the home page, any one of its five parallel fetches failing takes the whole page down.
- [x] **Add a proper order confirmation.** `/uzsakymas/[orderId]` reads the order status from the data layer and shows paid, waiting (polls) or not paid. The `?success` / `?canceled` handling is gone. Runs on mock data until the admin's order status endpoint exists.
- [x] **Check the checkout reply before redirecting.** `hooks/use-cart-summary.ts` does `window.location.href = response.data.url` without checking that `url` exists, so a malformed reply sends the customer to `/cart/undefined`.

## Legal and trust

- [ ] **Rewrite the privacy policy.** It is WordPress template text about comments and login cookies. It should cover the data the shop actually handles: name, phone, address, payment (Montonio), Sentry and Instagram.
- [ ] **Connect the newsletter form.** The home page form is a mock (see "Mocks to replace before launch"). Connect it to the signup endpoint once the admin's "Newsletter" tasks are done, with a real confirmation message and an error state.
- [ ] **Price reductions (EU Omnibus rules).** When a discount is shown (sale price, "-X%", "iki -X%"), the "before" price should be the lowest price in the 30 days before the discount. Check the exact requirement for Lithuania (with the privacy policy review), then show the sale price and badge accordingly. Needs price history from the admin (see its TODO), which must start recording before launch; until 30 days of history exist, the current regular price is the reference.

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
- [ ] **Cart promo code field.** One demo code (`BABYSTEP10`, 10 %) in `cart/components/promo-code-field.tsx`; the discount isn't carried into checkout. Replace once the admin supports promo codes.
- [ ] **Confirmation status switcher.** `uzsakymas/[orderId]/components/mock-status-switcher.tsx` (development builds only) switches paid / waiting / failed. Delete it with the mock data layer.
- [ ] **Size and color in cart, checkout and confirmation lines.** `MOCK_CART_VARIANT_META` until "Product variants".
- [ ] **Billboard carousel controls**, if shown with fewer than two real banners. Replace with the "Customizable billboards" work.

## Product variants

Step 2 of the plan in `../babystep-admin/docs/product-variants.md` ("Storefront" and "Public API" there have the details). Do it after the admin's step 1. Checkout with variants comes with the Montonio checkout (step 3).

- [ ] **One generic option picker** on the product page, quick view and mobile buy bar, replacing `size-picker`, `color-picker` and the mock state in `product-purchase-provider`. Chips or swatches per group, no preselection when there's a real choice, unavailable values crossed out, `?variantId=` in the URL. Price range until a full selection, then the variant's price; photos follow the image tags.
- [ ] **Cart lines per variant.** Match lines by `productId` + `variantId` (bump the storage version, `migrate` keeps lines), show `name – label` from the API, cap quantity at the variant's `stockCount`. A line missing its option or with a variant no longer available blocks checkout until fixed ("Pasirink savybes" / "Šis pasirinkimas nebegalimas").
- [ ] **Product cards for products with variants.** "Pasirinkti savybes" instead of "Į krepšelį" (quick view on desktop, product page on mobile), a range of effective prices when they differ, the badge "-X%" only when every variant has the same discount and "iki -X%" otherwise, and the product's first image.
- [ ] **Wishlist.** Products with variants get "Pasirinkti savybes"; "Viską į krepšelį" adds only products without variants and lists the ones that need a choice.
- [ ] **Size guide** from the API (Dydis height and weight ranges plus specification rows that vary by Dydis), shown only when there's data. Comes with "Product specifications".

## Product specifications

- [ ] **"Papildoma informacija"** on the product page: a specs table (Matmenys, Medžiaga, Sudėtis, Priežiūra) next to the description, as tabs or accordions, following the product page design. Rows that vary by an option group (e.g. Matmenys per Dydis) show the value for the chosen option, and the product-level value before a choice.

## Wishlist sharing

The wishlist's "Pasidalinti" is a mock. Parents share it so relatives know what to buy.

- [ ] **Shareable link without accounts.** Encode the wishlist's product IDs in the URL (e.g. `/norai/bendrinti?p=<ids>`), so no backend is needed. The link opens a read-only page with those products, an "Į krepšelį" per item, and no remove actions.
- [ ] **Later, with customer accounts:** a saved, named wishlist with a short link that stays up to date. Revisit when accounts are planned.

## Checkout (design in docs/design/checkout/)

Cart, checkout (`/apmokejimas`) and order confirmation (`/uzsakymas/[orderId]`). Decisions: `../babystep-admin/docs/montonio-research.md`, "Decisions".

- [x] **Build the UI against a mock data layer** (`lib/checkout-api.ts` + `lib/mocks/checkout.ts`): delivery options, pickup points, payment methods, create order, order status. Can be done before the admin side.
- [ ] **Switch the data layer to the real admin endpoints** once the admin's Montonio work is done. Test the full flow in Montonio's sandbox.
- [ ] **Payment and carrier logos.** Visa, Mastercard, Apple Pay, Google Pay, Omniva, Unisend and SmartPosti as official SVGs in `public/logos/`, following each brand's usage rules (no recoloring, minimum size). Bank logos come from Montonio's `logoUrl`. Unisend is still missing, so it shows as a text chip.
- [ ] **Delivery page** (`pristatymo-informacija`): Omniva and Unisend lockers 3,49 €, SmartPosti courier 6,49 €, free from 80 €. Remove LP Express and the flat 4,99 € (`STANDARD_SHIPPING_PRICE`).

## Migration from WordPress (babystep.lt)

The new site replaces the live WordPress/WooCommerce shop at babystep.lt. Most of this happens near launch, but plan it early.

- [x] **Owner: list the WordPress setup.** Theme Flatsome on Hostinger. Plugins: WooCommerce, Variation Swatches for WooCommerce, Checkout Field Editor, Montonio for WooCommerce (payments), MultiParcels (shipping), Facebook for WooCommerce, Site Kit by Google, Header Footer Code Manager, WPConsent + WP Consent API, Yoast SEO, Newsletter, Contact Form 7, Smash Balloon Instagram Feed, YITH WooCommerce Wishlist, Max Mega Menu, Jetpack, LiteSpeed Cache, Wordfence, Hostinger tools, WPvivid Backup.
- [ ] **Variable products.** The shop already sells products with variants (Variation Swatches). Enter them by hand in the new admin's variant editor (no importer), and update stock numbers from WooCommerce on switch-over day.
- [ ] **Checkout custom fields.** Check what Checkout Field Editor adds (e.g. company and VAT details for invoices, order comments) and add what's needed to the new checkout.
- [ ] **Facebook and Instagram shop.** Replace Facebook for WooCommerce: a product feed (catalog) for Meta Commerce Manager, and the Meta pixel (and possibly the Conversions API).
- [ ] **Analytics and tracking.** Re-add Google Analytics (Site Kit) and verify Google Search Console for the new site. Check Header Footer Code Manager for other tracking snippets and re-add those still needed.
- [ ] **Cookie consent.** Replace WPConsent with a cookie banner that blocks analytics and the pixel until consent (GDPR).
- [ ] **SEO data.** Export Yoast titles and meta descriptions for products, categories and pages, and the Yoast sitemap (for the redirect list).
- [ ] **Contact form.** Replace Contact Form 7 on the contact page (a form that emails the shop, or a clear email link).
- [ ] **Not migrated:** Max Mega Menu and Flatsome (replaced by the redesign), Smash Balloon (the new site has its own Instagram feed), YITH wishlists (guest wishlists are local; revisit with customer accounts), Jetpack, LiteSpeed Cache, Wordfence and Hostinger tools (not needed on Vercel). Retire MultiParcels after the switch.
- [ ] **Until the switch:** keep WordPress plugins updated (about 25 pending, incl. Wordfence and Montonio), with a WPvivid backup first. Take a full WPvivid backup right before switch-over day.
- [ ] **URL redirects.** Map old WooCommerce URLs (`/product/...`, `/product-category/...`, pages) to the new ones and serve 301 redirects, so search rankings and bookmarks keep working. Export the old URL list (sitemap) first.
- [ ] **Products and images.** Enter every live product, category and image by hand in the new admin, then check nothing is missing. Update stock numbers from WooCommerce on switch-over day.
- [ ] **Product reviews.** Export existing WooCommerce reviews and import them, so the reviews section starts with real reviews (mark them as imported; the "verified purchase" label only where it was verified).
- [ ] **Newsletter subscribers.** Move the list to the new email service with their consent records.
- [ ] **Customers and order history.** Decide whether to import WordPress customer accounts and past orders, or start fresh (affects "Customer accounts" and GDPR).
- [ ] **Shipping prices.** Compare what WordPress charges today with the new decisions, so any change is on purpose.
- [ ] **SEO and analytics.** Page titles and descriptions, sitemap, Google Search Console (submit the new sitemap after the switch), analytics.
- [ ] **Hosting: try Hostinger first.** The current Business Web Hosting plan (€12,99/month) includes 5 Node.js apps, and Hostinger confirmed it runs Next.js with SSR and API routes, plus cron jobs every 5 minutes.
    1. Test-deploy the store and admin as Node.js apps (Node 22) on subdomains (e.g. `new.babystep.lt`, `admin.babystep.lt`), with env variables and the Neon connection. Check speed and memory.
    2. If it works: add a staging setup (store and admin from a `staging` branch, replacing Vercel previews), and a Hostinger cron job every 5 minutes (UTC) calling the reservation cleanup endpoint with a secret token.
    3. If it doesn't: fall back to Vercel Pro ($20/month; Hobby is non-commercial only) or Cloudflare Workers.
- [ ] **Hostinger: domain and DNS stay.** babystep.lt is registered at Hostinger (auto-renews, valid until 2027-08-24) and its DNS is Hostinger's (`ns1/ns2.dns-parking.com`). Keep both. On switch-over day change only the website records (A/CNAME, as Vercel shows when adding the domain). Never change the nameservers or the mail (MX) records.
- [ ] **Hostinger: email.** info@babystep.lt is on "Free Business Email", shown as expired on 2025-11-15 but still active. Ask Hostinger support whether it's tied to the web hosting and what happens if the hosting is cancelled. If needed, move the mailbox to a standalone paid plan (Hostinger Business Email, Google Workspace or Zoho Mail) before cancelling hosting. Back up the mailbox (~295 MB) first.
- [ ] **Hostinger: web hosting.** Check its renewal date so it doesn't auto-renew for a long period right before the switch. Keep WordPress running for a few weeks after switch-over as a fallback (with a full WPvivid backup), then cancel the hosting.
- [ ] **Email sending for the new site.** When the order confirmation email is built, add the email service's SPF and DKIM records to Hostinger's DNS for babystep.lt, so confirmations from info@babystep.lt don't land in spam.
- [ ] **Switch-over day plan.** Website DNS records to the chosen host, Montonio production keys into the host's environment variables, turn off the WordPress Montonio plugin, handle orders that are paid but not yet shipped in WordPress, keep a backup of the WordPress site and database.

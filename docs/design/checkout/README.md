# Cart, checkout and order confirmation handoff

Source: the "Babystep Home Redesign" Design canvas (https://claude.ai/artifact/K5KGSvfdDdZU5usuAv1p2A), sections "Cart", "Checkout" and "Order confirmation". How to read `.dc.html` files: `docs/design/home/README.md`. Header and footer are already built: don't change them.

Payment and delivery decisions (carriers, prices, free shipping, payment methods, reservation) are in `../babystep-admin/docs/montonio-research.md`, section "Decisions". Read it first.

## Files

| File | What |
| --- | --- |
| `cart-desktop.dc.html`, `cart-mobile.dc.html` | Cart with items |
| `cart-empty-desktop.dc.html`, `cart-empty-mobile.dc.html` | Empty cart (reference only: we keep the current empty state) |
| `checkout-desktop.dc.html`, `checkout-mobile.dc.html` | Checkout: contact, delivery, payment, review and pay (sticky pay button on mobile) |
| `confirm-{paid,waiting,failed}-{desktop,mobile}.dc.html` | Order confirmation: paid, waiting for the bank, not paid |

## Routes (suggested)

- Cart: the existing `/cart`.
- Checkout: `/apmokejimas`.
- Confirmation: `/uzsakymas/[orderId]`. Montonio's `returnUrl` points here. The page reads the order status from our API (it never trusts the URL alone) and shows paid, waiting (keep polling for a short while) or not paid.

## Where the data comes from

The admin API endpoints for checkout don't exist yet (see the admin TODO: variants, stock reservation, Montonio). Build the storefront against a small data layer (e.g. `lib/checkout-api.ts` with `getDeliveryOptions()`, `getPickupPoints()`, `getPaymentMethods()`, `createOrder()`, `getOrderStatus()`) that returns **mock data** for now (`lib/mocks/checkout.ts`, marked `// MOCK:`). When the admin endpoints exist, only that file changes.

| Part | Real source (later) |
| --- | --- |
| Delivery options and prices, free-shipping threshold | Admin API, one shared config (Omniva and Unisend lockers 3,49 €, SmartPosti courier 6,49 €, all free from 80 €) |
| Pickup points (Omniva + Unisend lockers in one list, searchable by city or address) | Admin endpoint that proxies Montonio Shipping `GET /shipping-methods/pickup-points` (keys stay in the admin), cached |
| Bank list with logos | Admin endpoint that proxies Montonio `GET /stores/payment-methods`. Use each bank's `logoUrl` and `code`. Only Lithuanian banks are needed, so no country dropdown. The design's bank names are samples: show what Montonio returns |
| "Kortelė, Apple Pay, Google Pay" | One option. Montonio's hosted page handles it (no Apple/Google Pay integration on our side) |
| Pay button | `createOrder()` returns Montonio's `paymentUrl`; redirect there. Selected bank goes along as its `code`, so the customer lands directly in their bank |
| Order status on the confirmation page | Admin endpoint by our order ID |

## Decisions (these override the design)

- **Logos:** placeholders in the design. Bank logos from Montonio's `logoUrl`. Visa, Mastercard, Apple Pay, Google Pay, Omniva, Unisend, SmartPosti from official brand sources as SVGs in `public/logos/` (see "Payment and carrier logos" in TODO.md). Never redraw or recolor them.
- **Empty cart: keep the current empty state exactly as it is.** Don't implement `cart-empty-desktop.dc.html` / `cart-empty-mobile.dc.html`; they're included for reference only.
- **Delivery-specific text** on the confirmation page ("Atsiimsi paštomate", "Kodą atsiųs Omniva") follows the order's actual delivery method and carrier.
- **Confirmation email and tracking:** the copy says we email the confirmation and tracking. Tracking emails come from Montonio's branded emails; the order confirmation email is ours (TODO).
- **Mocks** (mark `// MOCK:`, add to "Mocks to replace before launch" in TODO.md): the whole data layer above until the admin endpoints exist; the "Susikurti paskyrą" card on the confirmation page and the guest sign-in note until customer accounts exist.
- Cart lines already support `variantId` (show chosen size and color once variants exist; mock until then, like the product page).
- No countdown timer anywhere.
- Follow DESIGN.md and CLAUDE.md; Lithuanian copy in the "tu" form; `[el. paštas]` is the real contact email.

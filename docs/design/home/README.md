# Home page handoff

Source: the "Babystep Home Redesign" Design canvas in Claude Design (https://claude.ai/artifact/K5KGSvfdDdZU5usuAv1p2A), direction **D · Combined**.

## Files

| File | What |
| --- | --- |
| `home-desktop.dc.html`, `home-desktop.png` | Home page at 1440px |
| `home-mobile.dc.html`, `home-mobile.png` | Home page at 390px |
| `mobile-menu-guest.dc.html` | Mobile menu when signed out (use this one now) |
| `mobile-menu-signed-in.dc.html` | Mobile menu when signed in (for customer accounts later) |

## How to read the `.dc.html` files

They are design specs, not code to copy. They don't run outside Claude Design.

- `<x-import component-from-global-scope="Babystep.Button" …>` is our real component from `components/ui` (`Babystep.Icons.X` = the lucide icon `X`). Use the component, with the props shown.
- `var(--color-…)` and `var(--font-…)` are our tokens from `app/globals.css`; `bg-ink`, `text-ink-soft` and similar are our Tailwind token classes.
- `<sc-for>` is a loop over the data in the script block at the bottom. That data is sample content: use real data from the API.
- Inline `style="…"` values (spacing, sizes, radii) are the design's layout: translate them to Tailwind classes, preferring the built-in scale.
- The PNGs show how it looks. Where the PNG and the markup disagree, ask.

## Decisions (these override the design)

- **Billboard:** the API gives one billboard (`label`, `imageUrl` via `INDEX_BILLBOARD_ID`). Build the "text over image" layout with that data. Carousel controls are a mock. Real variants and carousel come with "Customizable billboards" in TODO.md.
- **Announcement line:** amount from `FREE_SHIPPING_THRESHOLD`, formatted with `to-currency`.
- **Sales heading:** "Akcijos iki -X%", X = the biggest current discount, computed with `getProductPricing`.
- **"Pagal amžių":** a mock with working tabs and real products, but no real age filtering.
- **Newsletter:** a mock form that validates the email and shows a thank-you message, sending nothing.
- **Account:** the header icon and the mobile menu's sign-in card are non-functional mocks.
- **Mobile menu categories:** real categories and subcategories from the API, not the sample list.
- **Footer:** keep our current link structure (Pagalba, Kontaktai), not the design's links.
- **Copy:** "tavo mažyliui", not "jūsų mažyliui".
- Mark every mock with a `// MOCK:` comment (see "Mocks to replace before launch" in TODO.md).
- Hide the blog section. Remove the marquee and "Pagaminta Lietuvoje".

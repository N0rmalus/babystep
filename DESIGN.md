# Design

## Brand

### Positioning

Babystep helps new parents get calmer nights with gentle, well-made sleep products at a fair price, from a shop that feels like a calm friend, not a marketplace.

### Customers

- **Primary:** first-time parents, often tired and anxious about their baby's sleep.
- **Secondary:** gift buyers (grandparents, friends, baby-shower guests). The shop should look good enough to buy a gift from.

### Price level

Mid-range: fairly priced, decent quality. The design should feel considered and trustworthy, not luxury or exclusive.

### Feeling

Calm, warm, trustworthy and modern, with a natural undertone. Avoid anything loud or hyperactive; this is a shop about sleep.

### References

- **Like:** Ergobaby, for its rounded, soft shapes.
- **Not like:** crowded marketplace sites such as [pigu.lt](https://pigu.lt/lt/) and [vaikubaze.lt](https://www.vaikubaze.lt/), which have dense grids, stacked banners and promotions everywhere.

### What carries over

The rocking-horse logo and the 3D wooden-toy illustration style stay. The rest of the design is open to change.

### Typography

- **Headings:** Bricolage Grotesque (`font-accent`), only for headings at `text-2xl` and up, in two weights: bold (700) and semibold (600). Never `font-black` or light weights.
- **Everything else:** Urbanist, the body font: prices, labels, chips, badges, breadcrumbs, footer titles, navigation and panel titles.
- **Exception:** the "Babystep" logo wordmark in the navbar and footer keeps its own Bricolage styling.
- Sizes come from Tailwind's default steps `text-xs` to `text-5xl`. Use an arbitrary size only when no step fits, and list it here. Nothing below 12px, except these deliberate exceptions:
  - Badges: 10px on phones, 11px from `sm` up (`text-[10px]` / `sm:text-[11px]`). 12px was too large for these compact labels.
- Prices and other figures (counts, page numbers, section numbers) use `tabular-nums`, so digits line up and don't jump when they change.

| Role            | Size (mobile → larger)                 | Weight         | Font      | Tracking               | Used for                                                                                      |
| --------------- | -------------------------------------- | -------------- | --------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| Display         | `text-4xl` → `lg:text-5xl` (36 → 48px) | bold           | Bricolage | `tracking-tight`       | Home banners, billboard label, 404, empty cart and wishlist                                   |
| Title           | `text-3xl` → `sm:text-4xl` (30 → 36px) | bold           | Bricolage | normal                 | Page `h1` (`PageHeader`, `PageSection`), product name, "Panašios prekės"                      |
| Heading         | `text-2xl` → `sm:text-3xl` (24 → 30px) | semibold       | Bricolage | normal                 | Section `h2` on info and legal pages, category tiles (`lg:text-4xl` large)                    |
| Subheading      | `text-xl` (20px)                       | semibold       | Urbanist  | normal                 | Legal subsections, cart popover title, mobile menu links                                      |
| Panel title     | `text-lg` (18px)                       | semibold       | Urbanist  | normal                 | Cart summary and progress panels, delivery option cards                                       |
| Body            | `text-base` (16px), `text-sm` in UI    | regular        | Urbanist  | normal                 | Paragraphs (`text-lg` for page intros), descriptions, controls                                |
| Meta            | `text-xs` (12px)                       | regular/medium | Urbanist  | normal                 | Product card category line, struck-through small prices, counts                               |
| Eyebrow / label | `text-xs` (12px), uppercase            | semibold       | Urbanist  | `tracking-eyebrow`     | Eyebrows, filter chips, filter and footer titles, form labels (badges are smaller, see Badge) |
| Price           | `text-base`–`text-3xl` by context      | bold           | Urbanist  | normal, `tabular-nums` | Product page `text-3xl`, cart row `text-2xl`, cards `text-base sm:text-lg`                    |

- **Eyebrow utility:** `eyebrow` in `app/globals.css` sets the label role (`text-xs`, semibold, uppercase, `tracking-eyebrow` = 0.14em). Add only a color class. It is the only letter-spacing for uppercase text; don't use `tracking-wide`/`wider`/`widest` or arbitrary values.
- Headings get `text-balance`.
- The decorative "404" numerals behind the 404 page are an ornament, not a text role, and stay outside the scale.

### Color

Colors are semantic tokens in `app/globals.css` (`@theme`), used as Tailwind utilities such as `bg-canvas`, `text-ink` and `text-sale-strong`. Use the tokens, not Tailwind's `neutral`, `gray`, `black`, `rose` or `emerald` palettes.

- **Brand color:** terracotta (`tumbleweed-*` in `app/globals.css`) is the single brand color.
  - Terracotta 500 (`#c76e48`) for large elements, fills, icons and accents.
  - Terracotta 700 (`#9a4734`, token `link`) for links and small colored text, because 500 is too light for body-size text.

| Role                       | Token                         | Hex                   | Use                                                                        |
| -------------------------- | ----------------------------- | --------------------- | -------------------------------------------------------------------------- |
| Page background            | `canvas`                      | `#f8f4ee`             | Flat cream behind everything. No pattern.                                  |
| Cards and panels           | `white`                       | `#ffffff`             | Cards, popovers, inputs on the cream page.                                 |
| Subtle fill                | `muted` / `muted-soft`        | `#f1ebe3` / `#faf7f3` | Hover rows, image placeholders, inactive chips.                            |
| Borders                    | `line` / `line-strong`        | `#e9e1d8` / `#d4c8bc` | Default borders (also the global default) / hovered or emphasized borders. |
| Text                       | `ink`                         | `#2b2421`             | Headings, body text and **primary buttons** (warm near-black).             |
| Secondary text             | `ink-soft`                    | `#433934`             | Body copy in long text, button hover.                                      |
| Muted text                 | `ink-muted`                   | `#6e625a`             | Captions, meta text, labels.                                               |
| Faint                      | `ink-faint`                   | `#968a81`             | Icons, struck-through old prices, control borders. Not for body text.      |
| Link                       | `link`                        | `#9a4734`             | Links, eyebrows and small terracotta text.                                 |
| Sale                       | `sale`                        | `#f39f9d`             | Salmon. Large sale fills only.                                             |
| Sale background            | `sale-soft`                   | `#fef1f0`             | Sale badge and sale banner background.                                     |
| Sale text                  | `sale-strong`                 | `#a8435c`             | Sale prices, sale badge text, the Akcijos link.                            |
| Danger                     | `danger`                      | `#a12f33`             | Error text, destructive buttons, delete hover.                             |
| Danger hover               | `danger-strong`               | `#86241f`             | Hover on filled danger buttons.                                            |
| Danger background / border | `danger-soft` / `danger-line` | `#fbeceb` / `#f0cbc8` | Error boxes and out-of-stock cart rows.                                    |
| Success                    | `success`                     | `#4d6b47`             | Sage green text and icons: "in stock", "free shipping reached".            |
| Success background         | `success-soft`                | `#e6eee1`             | In-stock badge background.                                                 |

Contrast (WCAG AA): `ink-muted`, `link`, `sale-strong`, `danger` and `success` all reach at least 4.5:1 on white, `canvas` and their own soft background. `ink-faint` is about 3.1–3.4:1, so use it only for icons, borders and decorative text.

- **Salmon, sales only:** sale badges, sale prices, the home sale banner and the Akcijos link. Use `sale-strong` for any sale text. Nowhere else, so the palette stays gender-neutral.
- **Danger:** a muted warm red (hue clearly redder than terracotta), for errors and destructive confirmations. Always pair it with an icon or text, never color alone.
- **Success:** a soft sage green for "in stock" and "free shipping reached".
- **Out of stock** is a neutral badge (`muted` / `ink-muted`), not danger. The cart only turns danger when out-of-stock items block checkout, and it says why in text.
- **Delete buttons** in the cart and wishlist are quiet icons (`ink-muted` or `ink-faint`) that turn `danger` only on hover.
- No red or yellow "sale" colors.

### Shape

Everything is rounded: pill-shaped buttons and inputs, and a large radius (about 16–24px) on cards and images. No sharp corners.

- **Exception, icon buttons:** `IconButton` is deliberately `rounded-lg` (8px), not a pill, everywhere it appears, including the mobile nav buttons. The squarer shape marks it as a tool (preview, remove, menu) rather than an action, and keeps a row of them from reading as a row of chips.
- **Exception, checkboxes:** the compact filter checkbox is `rounded-md` (6px). A pill or circle would read as a radio button.
- Shape belongs to the component. Call sites never pass a radius class; `Button` applies `rounded-full` after `className`, so an override has no effect.

See [Components](#components) for each primitive.

### Density and promotions

Generous whitespace and fewer products per row. The shop should never feel crowded.

Banners are allowed, under these rules. They are provisional until we see them in the redesign:

- At most one large banner per page (e.g. the home page billboard), plus one slim announcement line at the top.
- Banners use the brand palette, rounded corners and real photos. No countdown timers.
- No auto-rotating carousels and no stacked banners. If there are several promotions, show one at a time in a fixed spot, or move them to the Akcijos page.
- Sale badges on product cards are small and use the sale color (salmon).

### Imagery

- **Products:** natural-light photos in warm, neutral settings, plus clean product shots on a cream background.
- **Illustrations:** the 3D wooden-toy illustrations are for empty states, errors and small brand moments, not in place of product photos.

### Tone of voice

- Informal Lithuanian: **tu**, not jūs (e.g. "Išsirink", not "Išsirinkite").
- Warm, short and reassuring, like a calm friend who has been through it.
- Reassure first, sell second. No hard-sell and no exclamation-mark spam.
- Occasional gentle humor is welcome, as in the 404 page's "Šis takelis niekur neveda".
- Make no "made in Lithuania" claims.

#### Examples

These show the tone only. They are not real product or policy claims.

- **Product page:** "Švelnus prie odos ir paprastas prižiūrėti, kad naktys būtų ramesnės jums abiem."
- **Empty cart:** "Krepšelis kol kas tuščias. Neskubėk, apsidairyk, o kai rasi tai, kas tinka, viskas lauks čia."
- **Near checkout:** "Apmokėjimas saugus. Jei kas nors nepavyks, krepšelis niekur nedings."
- **Not like this:** "NEPRALEISK!!! Tik šiandien -50 %, skubėk!"

### Avoid

- Gradients.
- Generic stock photos.
- Identical cards everywhere. Vary the layout so pages don't read as one long grid.
- Exclamation-mark spam and hard-sell copy.
- Marketplace density: dense grids, stacked banners, promotions everywhere.
- Auto-rotating carousels and countdown timers.
- Red or yellow "sale" colors.
- Sharp corners.
- Formal "jūs".

## Components

Shared primitives live in `components/ui`. Shape, elevation and size are fixed inside each component; call sites only add layout (margins, width, height) or, rarely, colors.

### Button

`components/ui/button.tsx`. Always a pill (`rounded-full`), `font-semibold`.

| Variant           | Look                                          | Use                                                                |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| `primary`         | `ink` fill, white text, `ink-soft` on hover   | The one main action: add to cart, checkout, empty-state CTAs       |
| `secondary`       | White, `line-strong` border, `muted` on hover | Secondary actions: wishlist toggle, coupon, navbar Norai/Krepšelis |
| `danger`          | `danger` fill, white text                     | Destructive confirmations                                          |
| `danger-outlined` | White, `danger-line` border, `danger` text    | Retry after an error                                               |

| Size | Padding / text                     |
| ---- | ---------------------------------- |
| `sm` | `px-3 py-1.5`, `text-sm`           |
| `md` | `px-5 py-3`, `text-base` (default) |
| `lg` | `px-7 py-4`, `text-lg`             |
| `xl` | `px-9 py-5`, `text-xl`             |

- **Links:** pass `href` and `Button` renders a Next.js `<Link>` (a real `<a>`), so it works with the keyboard, middle-click and "open in new tab". Use it for anything that navigates; never `onClick={() => router.push(...)}`. There is no separate `LinkButton`.
- **States:** `disabled` and `loading` (spinner over the hidden label) on the `<button>` form only. Disabled is 50% opacity.
- `elementBefore` / `elementAfter` hold icons or a count. `fullWidth` stretches it.
- The navbar Norai and Krepšelis buttons are `secondary` `sm` links at `h-11` (44px), so they meet the touch-target minimum.

### IconButton

`components/ui/icon-button.tsx`. A single icon in a **34×34px** box (`size-8.5`), **`rounded-lg`** (see Shape). An invisible `::before` (`before:-inset-1.5`, 6px from inside the 1px border) extends the hit area to **44×44px**, the minimum touch target, without making the button look heavy on cards. Keep at least `gap-2.5` (10px) between icon buttons, so their hit areas barely overlap. `label` is required and becomes both `aria-label` and the tooltip.

| Variant     | Look                                                                   | Use                                                                   |
| ----------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `primary`   | White, `line` border, `muted` on hover (default)                       | Quick view, wishlist, close, zoom, mobile menu and cart, social links |
| `secondary` | `ink` fill, white icon                                                 | No current use                                                        |
| `danger`    | White, `ink-muted` icon; `danger` icon and `danger-soft` fill on hover | Remove from cart or wishlist                                          |

- `href` renders a real link (mobile cart, social links); otherwise it is a `<button>` that stops the click from reaching a clickable card behind it.
- `badge` puts a count in the top-right corner (the mobile cart count).
- When it controls a menu, `aria-expanded="true"` gives it the open state (`tumbleweed-50` fill, `tumbleweed-300` border) without extra classes.
- Icons are 16px inside cards and 18–20px in the navbar and on images.

### Inputs

- Text inputs are pills (`rounded-full`) with a `line` border on white, or a `tumbleweed-50` fill for the catalog search. The sort dropdown trigger is a pill too.
- Filter checkboxes: compact is a 16px `rounded-md` box; the touch variant in the mobile drawer is a `rounded-2xl` row at least 48px tall with a round check.

### Badge

`components/ui/badge.tsx`. Always a compact pill (`rounded-full`) with eyebrow lettering (uppercase, semibold, `tracking-eyebrow`) at a smaller size: `px-2 py-0.5` and 10px text on phones, `px-2.5` and 11px text from `sm` up. With `onClick` it renders a `<button>` (the category breadcrumbs on the product page and in the cart); otherwise a static label.

| Color                 | Use                                    |
| --------------------- | -------------------------------------- |
| `sale`                | Discount: "-20%", "Akcija -20%"        |
| `neutral`             | Out of stock ("Išparduota")            |
| `success`             | In stock ("Yra sandėlyje")             |
| `tumbleweed-outlined` | Category breadcrumbs, "Rekomenduojama" |
| `tumbleweed`          | Brand-tinted label; no current use     |

### Cards and elevation

- **One card shadow:** `shadow-card` (token `--shadow-card` in `app/globals.css`, a soft 1–2px warm shadow), always with a 1px `line` border on white. Product, cart and wishlist cards, `PaperWrapper` panels, the product info panel, the promo strip, category tiles and gallery images all use it. No `shadow-md`/`xl` on cards, and no extra shadow on hover.
- Clickable cards (product, wishlist) respond on hover with a 2px lift and a `line-strong` border, not a bigger shadow.
- Card radius is 16–24px: `rounded-3xl` for cards and panels, `rounded-2xl` for product cards on mobile, the product info panel and gallery images.
- `PaperWrapper` (`components/ui/paper-wrapper.tsx`) is the standard panel: `rounded-3xl`, border, `shadow-card`, `p-5 sm:p-6`.
- Overlays (cart popover, dropdown menus, modal, filter drawer) float above the page and keep their own heavier shadows. They are not cards.

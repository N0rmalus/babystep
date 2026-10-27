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

- **Headings:** Bricolage Grotesque, for large headings only, at one or two weights.
- **Everything else:** Urbanist.
- Remove the unused `Proxima Nova` font declaration from `app/globals.css`.

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

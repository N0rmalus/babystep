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

- **Brand color:** terracotta (`tumbleweed` in `app/globals.css`) is the single brand color.
  - Terracotta 500 (`#c76e48`) for large elements, fills, icons and accents.
  - Terracotta 700 (`#9a4734`) for links and small colored text, because 500 is too light for body-size text.
- **Backgrounds:** warm off-white/cream.
- **Text:** warm near-black.
- **Primary buttons:** warm near-black, so the main action is always clear.
- **Salmon pink:** a rare accent only. The palette stays gender-neutral.
- No red or yellow "sale" colors.

### Shape

Everything is rounded: pill-shaped buttons and inputs, and a large radius (about 16–24px) on cards and images. No sharp corners.

### Density and promotions

Generous whitespace and fewer products per row. The shop should never feel crowded.

Banners are allowed, under these rules. They are provisional until we see them in the redesign:

- At most one large banner per page (e.g. the home page billboard), plus one slim announcement line at the top.
- Banners use the brand palette, rounded corners and real photos. No countdown timers.
- No auto-rotating carousels and no stacked banners. If there are several promotions, show one at a time in a fixed spot, or move them to the Akcijos page.
- Sale badges on product cards are small and use the brand color.

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

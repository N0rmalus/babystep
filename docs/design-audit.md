# Design audit against the DESIGN.md brand brief

Audit date: 2026-10-27. Scope: the storefront as it is on `master` (`b7c2412`), measured against the **Brand** section of `DESIGN.md`. No code was changed.

## How this was done

- **Code inventory.** A script scanned every `className` token and every hex/`rgba()` literal in `app/`, `components/`, `providers/`, `hooks/` and `lib/`. Counts are occurrences in source, not rendered instances. Strings built at runtime may be missed, and props named `rounded` were filtered out by hand.
- **Rendered review.** `next dev` ran on :3002 against the local admin API, which serves 19 products and 3 categories. Every route was checked at 1440×900 and at 375×812 (mobile emulation): home, category, subcategory (shares the category template), product, akcijos, cart (empty and with 2 items), wishlist, pristatymo-informacija, privatumo-politika and the 404 page. Grąžinimo-informacija and taisyklės-ir-sąlygos were read in source only. Contrast ratios were computed from the token hex values. Touch targets were measured in the DOM at 375px.
- **Detector.** `impeccable detect` was run over `app` and `components`. It reported one finding, a side-tab border (see Shadows and borders).
- **Data caveats.** Several products have no images (white tiles), the Instagram feed is empty and the blog section has no content. Problems that only come from this local data are labelled as data, not design.

---

## 1. Brief compliance at a glance

| Brief rule | Status | Evidence |
|---|---|---|
| Bricolage only for large headings, 1–2 weights | ❌ | Bricolage appears in 57 places with 5 weights (black 11, bold 18, semibold 24, medium 2, extralight 1). At least 15 uses are `text-xs`/`text-sm`/`text-base`: footer column titles, filter chips, prices, "Rodoma X iš Y" |
| Urbanist for everything else | ⚠️ | Correct in the root layout, but the product `h1` (`components/info.tsx:83`) and "Panašios Prekės" (`components/product-list.tsx:23`) are large headings set in Urbanist |
| Remove `Proxima Nova` | ❌ | Still declared at `app/globals.css:5`, with no usages |
| Terracotta is the single brand color | ⚠️ | 116 tumbleweed uses vs 27 salmon, 31 rose and 9 emerald. Salmon and rose take on brand and sale roles |
| Terracotta 700 for links and small text | ⚠️ | `tumbleweed-600` is used as text 12 times (4.61:1, below the brief's 700). Hover link colors switch between 600 and 700 |
| Warm off-white / cream background | ⚠️ | The body is `bg-white` with a 3px terracotta dot pattern (`app/layout.tsx:27`), so it reads as cream only from a distance. 47 surfaces are pure `bg-white`. There is no cream token |
| Warm near-black text | ❌ | Text uses cool `neutral-900/950` (79 uses) and pure `text-black` (23). There is no warm near-black token |
| Primary buttons warm near-black | ❌ | `bg-black` (`components/ui/button.tsx:67`, `link-button.tsx:42`), pure #000 |
| Salmon is a rare accent | ❌ | Salmon carries the home sale band, headline accents, the promo-strip icons, filter chips, sale badges, the sale price color and the mobile "Akcijos" nav item |
| No red or yellow sale colors | ❌ | The wishlist sale badge is `rose` (`app/(routes)/wishlist/components/wishlist-item.tsx:61`). Danger buttons are hot `rose-500/600` (cart delete) |
| Pill buttons and inputs | ⚠️ | The base `Button` is a pill, but it is overridden to `rounded-xl`/`rounded-lg` on the product page, the cart checkout and the coupon. `IconButton` and the mobile nav buttons are `rounded-lg` (8px). The coupon input is `rounded-lg` |
| 16–24px radius on cards and images | ⚠️ | Cards are mostly 24px (`rounded-3xl`). The billboard is 12px (`components/ui/billboard.tsx:11`), gallery thumbs 8px, the badge "square" variant 2px and filter checkboxes 4px |
| Generous whitespace, fewer products per row | ⚠️ | 2 per row on mobile, and on desktop catalog an auto-fill grid with `minmax(15rem)` that fits 3 per row next to the filters and 5 per row in "Panašios Prekės". Every card shows a stock count |
| ≤1 large banner per page + 1 slim announcement line | ❌ | The home page has a billboard, a promo strip, a gradient sale band and a gradient newsletter band, plus the marquee |
| Banners on brand palette, real photos | ❌ | Both home bands are gradients with no photo (`app/(routes)/page.tsx:46`, `:98`) |
| No auto-rotating carousels | ❌ | The site-wide `PromoMarquee` scrolls continuously (`components/promo-marquee.tsx:29`, 60s linear infinite) |
| No gradients | ❌ | 7 gradient uses (see §2.7) |
| 3D wooden-toy illustrations for empty/error states | ✅ | Empty cart, empty wishlist and 404 all use them well |
| Informal tu | ⚠️ | Mostly tu, but there is jūs in the home section titles, the footer, the delivery and returns pages, and all legal copy (§5) |
| No "made in Lithuania" claims | ❌ | "Pagaminta Lietuvoje" in the marquee (`components/promo-marquee.tsx:7`) |
| No exclamation spam / hard sell | ⚠️ | Mostly calm. "Puiku!" (`cart-progress.tsx:31`), the "Prekė išparduota :(" button label and a discount code in the marquee |

---

## 2. Token inventory

### 2.1 Colors

**Defined tokens** (`app/globals.css:7–29`): `tumbleweed-50…950` (terracotta, 11 steps) and `salmon-50…950` (11 steps). There are no semantic tokens (background, text, primary, border) and no cream or warm-black token.

**Usage by family** (occurrences / distinct utilities):

| Family | Uses | Distinct | On brief? |
|---|---|---|---|
| neutral (Tailwind) | 253 | 22 | Cool grey, not warm |
| tumbleweed | 116 | 39 | ✅ brand |
| white | 77 | 8 | Should be cream on most surfaces |
| black | 39 | 9 | Should be warm near-black |
| rose (Tailwind) | 31 | 14 | ❌ red, used for danger, errors, out of stock and one sale badge |
| salmon | 27 | 15 | Overused accent |
| gray (Tailwind) | 14 | 4 | ❌ duplicates neutral (`bg-gray-100` skeletons, `hover:bg-gray-100` buttons) |
| emerald (Tailwind) | 9 | 4 | Off palette (stock badge, free-shipping truck icon) |

**Most used:** `bg-white` 47, `text-neutral-900` 46, `border-neutral-200` 35, `text-neutral-950` 33, `text-neutral-500` 29, `text-black` 23, `text-neutral-600` 22, `text-neutral-700` 22, `text-neutral-400` 20, `text-white` 18, `text-tumbleweed-700` 17.

**Overlap:** body text uses 8 near-identical darks (`neutral-950`, `neutral-900`, `neutral-800`, `neutral-700`, `black`, `gray-800`, `tumbleweed-950`, `tumbleweed-900`). Borders use `neutral-200/300/400/500`, `gray-300`, `tumbleweed-100/200/300/400/500`, `salmon-100/200` and `rose-200/300`.

**Hard-coded literals outside the token file** (all one-offs):

| Value | Where |
|---|---|
| `rgba(199,110,72,0.1)` dot pattern (the page "cream") | `app/layout.tsx:27` |
| `rgba(199,110,72,0.18)` dot pattern | `app/(routes)/cart/components/cart-empty-state.tsx:9`, `app/(routes)/wishlist/components/empty-wishlist-state.tsx:10` |
| `rgba(199,110,72,0.45)`, `rgba(217,163,127,0.5)` glow shadows | `components/product-catalog/empty-filtered-products-state.tsx:18`, `:22` |
| `rgba(0,0,0,0.08)` inset shadow | `app/(routes)/product/[productId]/page.tsx:44` |
| `rgba(0,0,0,0.45)` modal shadow | `components/ui/modal.tsx:57` |
| `rgba(0,0,0,0.55)` drawer shadow | `components/product-filters/mobile-product-filters-drawer.tsx:72` |
| `rgba(12,12,14,0.94)` lightbox | `components/ui/image-lightbox.tsx:50` |
| `black` scrollbar thumb | `app/globals.css:146–163` |

**Single-use color utilities (one-offs), selected:** `bg-tumbleweed-400` (`cart-progress.tsx:24`) and `bg-tumbleweed-500` (`cart-popover.tsx:193`) are the same progress bar in two colors. `text-salmon-600` (`mobile-navbar.tsx:167`), `text-salmon-900` (`filter-chip-button.tsx:9`), `text-rose-500` (`cart-popover.tsx:290`), `border-neutral-500` (`pagination.tsx:122`), `bg-neutral-950/45` vs `/55` (drawer vs modal overlay), `text-tumbleweed-300` (`info.tsx:123`) and `outline-tumbleweed-500` (the only focus outline, `footer.tsx:55`). In total 61 of the 124 distinct color utilities are used exactly once.

**Contrast problems found:**

| Pair | Ratio | Where |
|---|---|---|
| `text-neutral-400` on white | 2.58:1 ❌ | 20 uses: strikethrough prices, "Rodoma", placeholders, pagination ellipsis |
| `text-salmon-700` on `salmon-100` at 9px | 3.26:1 ❌ | Sale badge on every product card |
| `text-salmon-700` on `salmon-200` | 2.88:1 ❌ | Hover state of the salmon badge and the end of the home sale-band gradient |
| `text-tumbleweed-500` on white | 3.65:1 | Fine for icons as the brief intends, but also used for list markers |
| Billboard label | n/a | `opacity-70` dark text on an arbitrary photo with no scrim (`components/ui/billboard.tsx:17`). It reads as grey on grey on the category page |

### 2.2 Font families

| Family | Declared | Uses |
|---|---|---|
| Urbanist | `next/font` body (`app/layout.tsx:12`) | Default |
| Bricolage Grotesque | `--font-accent` (`app/layout.tsx:13`, `globals.css:34`) | `font-accent` × 57 |
| Proxima Nova | `--font-fak` (`globals.css:5`) | 0 (dead, remove per brief) |

### 2.3 Font sizes

| Size | Uses | Note |
|---|---|---|
| `text-sm` | 74 | |
| `text-base` | 38 | |
| `text-xs` | 30 | |
| `text-lg` | 23 | |
| `text-2xl` | 19 | |
| `text-3xl` | 17 | |
| `text-xl` | 16 | |
| `text-4xl` | 11 | |
| `text-5xl` | 5 | |
| `text-7xl` | 2 | `not-found.tsx:26`, `billboard.tsx:17` |
| `text-6xl` | 1 | one-off, `not-found.tsx:26` |
| `text-[11px]` | 3 | one-off arbitrary: `product-card.tsx:120`, `mobile-product-filters-drawer.tsx:42`, `button.tsx:66` (below 400px) |
| `text-[9px]` | 2 | one-off arbitrary, **every badge** (`badge.tsx:72`, `:94`), too small for uppercase tracked text |
| `text-[14rem]`/`text-[20rem]` | 1 | decorative "404", `not-found.tsx:18` |

### 2.4 Font weights

`font-semibold` 65, `font-bold` 38, `font-black` 11, `font-medium` 9, `font-extralight` 1 (one-off, marquee `promo-marquee.tsx:17`). Heading weights vary from component to component: `PageSection` uses black (`page-section.tsx:33`), `PageHeader` bold (`page-header.tsx:10`), category tiles semibold (`category-mosaic.tsx:84`) and the cart popover title black (`cart-popover.tsx:165`).

### 2.5 Letter-spacing and leading

Eyebrow and label tracking takes five values: `tracking-widest` (overridden to 0.22em) × 8, `tracking-[0.16em]` × 6 plus the badges, `tracking-[0.18em]` × 2, `tracking-wider` × 2 and `tracking-wide` × 4. The arbitrary ones are one-offs, and `tracking-[-0.08em]` appears once (`not-found.tsx:18`). Leading takes 11 values, including `leading-[0.95]` (one-off, `not-found.tsx:26`).

### 2.6 Spacing

138 distinct spacing utilities. The core scale is healthy: `gap-2` 53, `gap-4` 50, `gap-3` 29, `mt-4` 22, `mt-3` 17, `px-3` 17, `px-5` 15. The long tail is noisy: **72 values are used once**, for example `py-18` and `p-20` (`page.tsx:46`, `:98`), `py-9`, `gap-14`, `pt-14`, `px-14`, `px-12`, `px-16`, `mt-16`, `space-y-10` and `gap-x-12`.

Spacing values that cause problems:
- `p-20` on the newsletter band (`app/(routes)/page.tsx:98`) has no responsive variant. At 375px it leaves the copy a **183px** column inside a 343px box.
- Card padding varies: product card `p-3/sm:p-4`, `PaperWrapper` `p-5/sm:p-6`, product info card `p-4/md:p-8`, cart popover `px-5`.
- Section gaps vary: the home page uses `gap-8` between sections while `PageSection` also uses `gap-8` internally, so sections are no further apart from each other than a title is from its content. This hurts "generous whitespace".

### 2.7 Border radius

| Radius | Uses | Note |
|---|---|---|
| `rounded-full` | 71 | ✅ pills |
| `rounded-xl` (12px) | 30 | Below the 16–24px card range. Used on the billboard, dropdown menus, checkout and product buttons, popover thumbnails and promo-strip icons |
| `rounded-3xl` (24px) | 18 | ✅ cards |
| `rounded-2xl` (16px) | 15 | ✅ |
| `rounded-lg` (8px) | 15 | ❌ IconButton, mobile nav buttons, coupon input and button, gallery thumbs, menu items |
| `rounded-sm` (4px) | 6 | ❌ filter checkboxes, subcategory skeletons |
| `rounded-xs` (2px) | 2 | ❌ the badge "square" variant (`badge.tsx:67`, `:89`) |
| `rounded-md` | 1 | one-off, `skeleton.tsx:4` |
| `rounded-r-2xl` | 1 | blockquote, `globals.css:114` |
| `rounded-t-3xl` | 1 | mobile drawer |
| `rounded-[100%]` | 1 | one-off, `not-found.tsx:21` |

Note: the non-clickable `Badge` with `variant="rounded"` applies both `rounded-full` and `rounded-xl` (`badge.tsx:87–89`). tailwind-merge keeps the last one, so static badges render at 12px, not as pills.

### 2.8 Shadows and borders

| Shadow | Uses | Note |
|---|---|---|
| `shadow-xs` | 12 | cards, ✅ calm |
| `shadow-md` | 7 | card hover, promo strip, product CTA |
| `shadow-sm` | 5 | |
| `shadow-xl` | 5 | Heavy for a calm brand: product info panel (`product/[productId]/page.tsx:37`), promo strip (`promo-strip.tsx:29`), cart popover, dropdowns |
| `drop-shadow-2xl` / `drop-shadow-xl` | 4 / 1 | Wooden-toy illustrations |
| `shadow-[…]` arbitrary | 4 | all one-offs (§2.1) |

Detector: `border-l-4` side-tab accent on `.rich-text-content blockquote` (`app/globals.css:114`). It is minor, but it is the only one-sided thick border in the system.

### 2.9 Gradients and motion

Gradients (the brief bans them):

| Where | What |
|---|---|
| `app/(routes)/page.tsx:46` | salmon-100 → salmon-200 sale band |
| `app/(routes)/page.tsx:98` | tumbleweed-100 → salmon-100 newsletter band |
| `components/product-catalog/empty-filtered-products-state.tsx:7`, `:11` | tumbleweed glow and rule |
| `app/(routes)/components/category-mosaic.tsx:80` | black scrim (functional, keep as a flat scrim) |
| `app/(routes)/components/instagram-feed.tsx:31` | black scrim |
| `components/ui/modal.tsx:58` | neutral fade |
| `app/globals.css:31–32` | unused `gradient-radial`/`gradient-conic` theme helpers |

Motion: the marquee runs constantly and keeps `will-change-transform` on permanently. The empty-state, wishlist and 404 illustrations float in loops. All of it respects `prefers-reduced-motion` (`globals.css:249–260`) ✅.

---

## 3. Component variants

### Buttons

| Variant | Definition | Used in |
|---|---|---|
| `Button` primary (black pill) | `components/ui/button.tsx:67` | Product card CTA, cart popover checkout, cart checkout (overridden to `rounded-xl`, `summary.tsx:59`), product page add to cart (overridden to `rounded-xl shadow-md`, `info.tsx:113`), wishlist toolbar and items (`wishlist-toolbar.tsx:51`, `wishlist-item.tsx:102`) |
| `Button` secondary (white, `gray-300` border) | `button.tsx:68` | Product page wishlist button (`rounded-xl`, `info.tsx:123`), coupon "Taikyti" (`rounded-lg`, `price-container.tsx:104`), navbar Norai/Krepšelis (restyled with `actionButtonClasses`, `navbar-actions.tsx:28`) |
| `Button` danger (`rose-600`) | `button.tsx:69` | Defined. No `Button` call site passes it. Red delete actions go through `IconButton` danger or a raw `text-rose-500` icon (`cart-popover.tsx:290`) |
| `Button` danger-outlined | `button.tsx:70` | Named "outlined" but filled `rose-500`. Misnamed |
| `LinkButton` primary / secondary / danger | `components/ui/link-button.tsx:42–44` | Empty states and 404 CTA. A duplicate of `Button` with no `tap-strong` and a `<p>` inside a link |
| `IconButton` primary / secondary / danger | `components/ui/icon-button.tsx:23–25` | Card quick view and wishlist (34×34px, `rounded-lg`), cart item delete (`cart-item.tsx:127`) and wishlist remove (`wishlist-item.tsx:70`) in `rose-500`, hot pink on screen |
| Navbar compact icon buttons | `navbar-actions.tsx:52`, `mobile-navbar.tsx:100`, `:139`, `:216` | Hand-rolled, `rounded-lg`, 38×38px |
| Section text links | `page-section.tsx:55`, `page.tsx:58` | Two copies of one "→" link, one hovering to tumbleweed and one to salmon |
| Pagination buttons | `components/product-catalog/pagination.tsx:69–125` | Hand-rolled pills: active `bg-black`, 4 border variants (`neutral-200`, default `gray-200`, `neutral-300`) |
| View toggle | `product-catalog-toolbar/view-button.tsx` | Pill segment ✅ |
| Filter chip | `product-catalog-toolbar/filter-chip-button.tsx` | Salmon pill, uppercase Bricolage `text-xs` |
| Cart popover "Peržiūrėti" | `cart-popover.tsx:175` | tumbleweed-50 pill, one-off |
| 404 / empty quick links | `app/not-found.tsx:56`, `mobile-navbar.tsx:255` | White pill with tumbleweed border ✅ (closest to the brief) |

That makes **13 distinct button treatments**, with 4 different radii on primary-weight actions (full, xl, lg, and the pill via `LinkButton`).

### Cards

| Card | Radius / shadow | Used in |
|---|---|---|
| `ProductCard` | `rounded-2xl sm:rounded-3xl`, `shadow-xs` → `hover:shadow-md`, lift on hover | Home rails, catalog grids, akcijos, similar products |
| `PaperWrapper` | `rounded-3xl`, `shadow-xs` | Catalog toolbar, cart summary, help box, cart progress |
| Cart item | `rounded-3xl`, `shadow-xs`, tumbleweed/rose border states (`cart-item.tsx:42–45`) | Cart |
| Wishlist item | `rounded-3xl`, `shadow-md` (`wishlist-item.tsx:48`) | Wishlist |
| Product info panel | `rounded-2xl`, **`shadow-xl`** (`product/[productId]/page.tsx:37`) | Product |
| Description box | `rounded-2xl`, border, no shadow (`info.tsx:98`) | Product |
| Category mosaic tile | `rounded-3xl`, photo + black gradient scrim | Home |
| Instagram tile | `rounded-3xl` | Home |
| Delivery price cards / info cards | `rounded-3xl`, tumbleweed-100 border | Pristatymo, grąžinimo |
| Cart popover | `rounded-3xl`, `shadow-xl` | Navbar |
| Dropdown menus | `rounded-xl`, `shadow-xl` (`main-nav.tsx:152`, `sort-dropdown.tsx:108`) | Nav, sort |

Cards are visually close but are **not one component**: four shadow strengths (xs, md, xl and none) on content of the same kind.

### Inputs

| Input | Shape | Where |
|---|---|---|
| Catalog search | Pill, tumbleweed-50 fill ✅ | `product-catalog-toolbar.tsx:202` |
| Sort dropdown trigger | Pill ✅ | `sort-dropdown.tsx:90` |
| Coupon code | **`rounded-lg`**, white, neutral border ❌ | `cart/components/price-container.tsx:90` |
| Filter checkbox (compact) | **`rounded-sm`**, black fill ❌ | `product-filters/filter-checkbox.tsx:36` |
| Filter checkbox (touch) | `rounded-2xl` row, black when checked | Mobile drawer |
| Price range slider | Native range, tumbleweed track | `product-filters/price-range-slider.tsx:38`, `:49` |
| Newsletter | **Missing.** The newsletter band has no input (`app/(routes)/page.tsx:98–110`) | Home |

### Badges

`components/ui/badge.tsx` has 5 colors × 2 shapes, all uppercase 9px:

| Color | Used for | On brief? |
|---|---|---|
| `salmon` | Sale % on product cards, product page and cart (`product-card.tsx:104`, `info.tsx:79`, `cart-item.tsx:96`) | ⚠️ brief wants brand terracotta |
| `rose` | Out of stock (cards, product, wishlist) **and wishlist sale badge** (`wishlist-item.tsx:61`) | ❌ red sale color |
| `green` (emerald) | "Yra sandėlyje" stock (`info.tsx:76`, cart item) | Off palette |
| `tumbleweed` | Defined. No current call site found | |
| `tumbleweed-outlined` | Category/subcategory breadcrumb pills, "Rekomenduojama" | ✅ |

Other badge-like elements that don't use `Badge`: cart/wishlist count bubbles (`bg-black`, `navbar-actions.tsx:31`), the mobile nav "Iki -X%" pill (`mobile-navbar.tsx:172`, salmon), filter chips, the gallery "1/3" counter (`gallery/index.tsx:39`) and the emerald "nemokamas" text in the returns page (`grazinimo-informacija/page.tsx:51`).

### Banners

| Banner | Where | Rule check |
|---|---|---|
| `PromoMarquee`, dark terracotta, auto-scrolling | Every page (`app/layout.tsx:29`) | Slim line ✅, but it moves continuously ❌, carries a discount code and "Pagaminta Lietuvoje" ❌ |
| `Billboard` (photo + label) | Home, every category/subcategory | One per page ✅, but 12px radius, no scrim and a square aspect on mobile that fills the first viewport |
| `PromoStrip` (4 USP tiles) | Home, directly under the billboard | A second banner-weight block with `shadow-xl`, full width |
| Sale band (salmon gradient + product rail) | Home | Planned section to keep. Styled as a banner ❌, gradient ❌. Restyle it as a plain section |
| Newsletter band (gradient, no form) | Home | Planned section, form not built yet. Styled as a banner ❌, gradient ❌. Restyle it as a plain section |
| Free shipping callout (tumbleweed-950 block) | Pristatymo-informacija (`page.tsx:59`) | ✅ brand palette, single |
| Free-shipping progress | Cart page and cart popover | Calm, but two different bar colors |

---

## 4. Site-wide chrome (affects every page)

- **Marquee:** constant motion at the top of a shop about sleep. Messages include a promo code, "Pagaminta Lietuvoje" (banned claim) and "Naujiena — Pavasario kolekcija" in October. `font-extralight` Bricolage is the only extralight in the codebase.
- **Navbar:** clean, sticky, `bg-white/95`. The desktop Norai/Krepšelis pills are on brief. At mobile width the menu and cart buttons are `rounded-lg` 38×38px squares (below 44px), and the count bubble is pure black.
- **Footer:** "atrastumėte" (jūs, `footer.tsx:47`) and an ellipsis ending to the brand line. Link targets are 17px tall on mobile. "Naujienos" links to `#`.
- **Background:** `bg-white` with a 3px dot pattern. On some displays it shimmers or moirés behind text, and every panel on it is pure white, so the "cream" is texture rather than color.

---

## 5. Copy and tone findings

| Issue | Where |
|---|---|
| Find-and-replace bug: "Nemokamas **pristatymo-informacija**" | `app/(routes)/components/promo-strip.tsx:6`, `app/(routes)/cart/components/cart-progress.tsx:31` |
| "Pagaminta Lietuvoje" (banned claim) | `components/promo-marquee.tsx:7` |
| jūs: "jūsų mažyliui" | `app/(routes)/page.tsx:71` |
| jūs: "Pirmieji sužinokite" (it also contradicts the tu body text below it) | `app/(routes)/page.tsx:102` |
| jūs: "atrastumėte" | `components/footer.tsx:47` |
| jūs: "gausite", "matysite" | `app/(routes)/pristatymo-informacija/page.tsx:34`, `:91` |
| jūs: "Norėdami… susisiekite" | `app/(routes)/grazinimo-informacija/page.tsx:33` |
| jūs throughout (Jūsų, parašykite, turite) | `privatumo-politika/page.tsx`, `taisykles-ir-salygos/page.tsx:600` |
| "Puiku!" exclamation | `cart-progress.tsx:31` |
| "Prekė išparduota :(" on a disabled button | `components/info.tsx:112` |
| "Panašios Prekės" title-cased | `product/[productId]/page.tsx:46` |
| Newsletter promises "Nuolaida atkeliaus…" but there is no form | `app/(routes)/page.tsx:105` |

Not a design issue, but noticed in passing: the privacy policy describes comments, user accounts and a login page (`privatumo-politika/page.tsx:40–72`), which looks like WordPress boilerplate that the store doesn't have. It needs a content review, not a design one.

Legal pages: whether legal text should also switch to tu is a decision for you. The brief doesn't exempt it.

---

## 6. Pages ranked by deviation from the brief

Most deviant first. Site-wide chrome (§4) applies to every page and is not counted again below.

### 1. Home (`/`): furthest from the brief in its current state

**Planned sections (product decision, 2026-10-27).** The home page keeps the billboard, the sales section, a blog section and a newsletter section. The blog and newsletter are not finished yet. None of these conflict with the brief. The brief limits *banners*, not sections, so the findings below are about how the sections are styled, not about whether they should exist.

- **Sections styled as banners.** Below the marquee come the billboard, the `PromoStrip` (`shadow-xl`), the sales section in a gradient band, a second product rail and the newsletter in a gradient band. The brief allows one large banner, which should be the billboard. The sales and newsletter sections should sit on the page background as ordinary sections. Treated as banners, the page reads as the stacked-promotions pattern the brief names as the anti-reference.
- **Two gradients** in large brand-moment areas (`page.tsx:46`, `:98`).
- **Salmon as the lead color.** The sale band, both headline accents (`text-salmon-700`) and the salmon promo-strip icons make salmon read as the brand on this page, not terracotta.
- **Unfinished sections are visible.** The blog section renders a title and link with nothing under it (`page.tsx:80–88`). Hide it until it has posts. The newsletter band has no form yet, and its padding squeezes the copy to 183px on mobile. The mosaic leaves a 7-column hole when there are only 3 categories (seen at 1440px).
- **Billboard legibility.** The label is `opacity-70` dark grey on a photo with no scrim.
- **Hierarchy.** There are 10 `<h1>` elements, including the four USP titles in the promo strip, and two section headings are in jūs.
- **Copy:** "pristatymo-informacija" bug, "jūsų mažyliui", "Pirmieji sužinokite".
- **Mobile:** the square billboard plus the 4 USP tiles fill about 1.3 screens before any product or category appears.

### 2. Product page (`/product/[id]`)

- The primary action is a pure-black **`rounded-xl` rectangle with `shadow-md`** (`info.tsx:113`), not a pill. The secondary is `rounded-xl` too.
- The info panel uses `shadow-xl` (`page.tsx:37`), the heaviest shadow in the system, on the page that should feel calmest. The "similar products" band below uses an inset shadow (`page.tsx:44`).
- The product name `h1` is Urbanist bold, while Bricolage is spent on prices and breadcrumbs.
- There are 3–4 badges at 9px in different color systems: outlined tumbleweed breadcrumbs, an emerald stock badge and a salmon sale badge.
- Copy: "Prekė išparduota :(" and "Panašios Prekės".
- Gallery thumbnails are `rounded-lg` (8px). Images without photos render as blank white tiles (data).
- Similar products show **5 cards per row** at 1440px, denser than the "fewer products per row" brief.

### 3. Cart (`/cart`)

- **Hot pink `rose-500` delete button** (`IconButton` danger) on every line item. It is the loudest color on the page.
- Checkout is `rounded-xl` and black. The coupon input and its button are `rounded-lg`. The page mixes three radii for its form controls.
- An emerald stock badge sits next to tumbleweed breadcrumbs, and out-of-stock warnings are rose text.
- The free-shipping progress bar is `tumbleweed-400` here but `tumbleweed-500` in the popover.
- "Puiku!" and the "pristatymo-informacija" bug both appear in the progress message.
- What works: the 24px `PaperWrapper` cards, the reassuring "Mokėjimo duomenys perduodami saugiu kanalu", and the empty state, which uses the wooden toy and calm tu copy and is on brief.

### 4. Category and subcategory (`/category/[id]`, `/category/[id]/[sub]`)

- The billboard is 12px radius with a low-contrast label. On mobile it is **square and fills the first viewport**, so no product is visible until the second screen.
- Filters use black square-ish checkboxes (`rounded-sm`) and cool neutral greys.
- Pagination has a black active pill and three different border greys.
- Every card shows "Likutis: N", and every card is identical, which goes against the brief's "identical cards everywhere" avoid.
- The "Rodoma 5 iš 5" count appears twice (toolbar and pagination).
- What works: the pill search and sort inputs on a tumbleweed-50 fill are the best-aligned controls in the codebase.

### 5. Wishlist (`/wishlist`)

- The **sale badge uses `rose`**, the only explicit red sale badge (`wishlist-item.tsx:61`), so the same discount is salmon on one page and red on another.
- The wishlist card uses `shadow-md` where `ProductCard` uses `shadow-xs`.
- The remove action is the same hot-pink `rose-500` `IconButton` as in the cart (`wishlist-item.tsx:70`). The toolbar's primary pill renders as flat grey when disabled.
- What works: the empty state (wooden toy, tu copy).

### 6. Akcijos (`/akcijos`)

- The same template and issues as category (black controls, neutral greys, identical dense cards), but there is no billboard, so it avoids the worst mobile problem.
- Sale badges are salmon rather than brand terracotta, which is the brief's explicit instruction for sale badges.
- The header ("Švelnūs atradimai geresne kaina") is calm and on tone. This is where the brief wants promotions to live, and it is already quiet.

### 7. Legal (`/privatumo-politika`, `/taisykles-ir-salygos`)

- Visually close: a calm sidebar ToC, `rich-text-content` with tumbleweed markers, and generous line length.
- The deviation is **tone**: formal jūs throughout. It also has the detector's side-tab blockquote and boilerplate content (§5).

### 8. Delivery and returns (`/pristatymo-informacija`, `/grazinimo-informacija`)

- Mostly on brief: pill carrier chips, 24px cards with tumbleweed borders, and a single tumbleweed-950 callout block.
- Deviations: jūs in a few sentences ("gausite", "matysite", "Norėdami… susisiekite"), an emerald "nemokamas" highlight on returns, and 4 different tracking values for small labels.

### 9. 404 and empty states (`not-found`, empty cart, empty wishlist): closest to the brief

- They show the wooden-toy illustration, the brief's own example of gentle humor ("Šis takelis niekur neveda"), tu copy, pill quick links with tumbleweed borders and real whitespace.
- Remaining gaps: the primary is pure black rather than warm near-black, the "404" uses a huge arbitrary `text-[20rem]`, the float animations loop, and the empty states use a `rgba()` dot pattern instead of a token.
- These pages are the best available reference for the redesign.

---

## 7. Technical health (impeccable audit dimensions)

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 2 | **Product cards are `<div onClick>`** (`product-card.tsx:86`), so they can't be reached or opened by keyboard. `neutral-400` text at 2.58:1 (20 uses). 9px badges at 3.26:1. 10 `h1`s on home |
| 2 | Performance | 3 | `loading="eager"` on every card image (`product-card.tsx:97`), including off-screen rails. The marquee keeps `will-change` on permanently |
| 3 | Theming | 2 | Brand ramps exist but there are no semantic tokens (bg, text, primary, border). neutral, gray and black are mixed. Cream and warm-black don't exist as tokens |
| 4 | Responsive | 3 | No horizontal overflow at 375px. Newsletter `p-20` squeeze. Square billboard. 34px and 38px touch targets (card icon buttons, nav buttons) |
| 5 | Implementation integrity | 2 | 13 button treatments, 4 card shadow levels, duplicated `Button`/`LinkButton`, a misnamed `danger-outlined`, a badge radius conflict, and 72 single-use spacing values |
| **Total** | | **12/20** | **Acceptable: significant work needed** |

**Integrity verdict: fail, but recoverable.** The pieces of a coherent system are present: the terracotta ramp, pill search and sort, 24px cards and the wooden-toy moments. But the system isn't enforced. Primary actions, sale signals and radii change from page to page, and the home page reads as a marketplace.

### Systemic patterns

1. **No semantic color layer.** Every component picks raw `neutral-*`, `black`, `rose-*` or `emerald-*`. This is the root cause of the cool greys, pure black and red/green signals.
2. **Shape overrides at the call site.** `Button` is a pill, but call sites pass `rounded-xl`/`rounded-lg`, so the primitive doesn't guarantee the brief.
3. **Bricolage used as a general emphasis font** (prices, labels, chips, footer titles) instead of for large headings only.
4. **Promotions in many places at once:** the marquee, the promo strip, the home sale band, salmon chips and the mobile nav "Iki -X%" pill.

### Recommended order

1. **[P1] `$impeccable layout` home:** (will be done through Claude Design) keep the billboard, sales, blog and newsletter sections. Leave the billboard as the only banner and restyle sales and newsletter as plain sections on the page background, with no gradients. Hide the blog section until it has posts. Give the newsletter a pill input when the form is built. Make the marquee static and remove "Pagaminta Lietuvoje".
2. **[P1] `$impeccable harden`:** make product cards real links, fix `neutral-400` and badge contrast, raise touch targets to 44px, and fix the h1 hierarchy.
3. ✅ **Done 2026-10-27.** **[P1] `$impeccable colorize`:** add semantic tokens (cream bg, warm near-black text and primary, terracotta-700 link, one sale color), retire `gray`, `emerald` and `rose` for sale, and push salmon back to a rare accent.
4. ✅ **Done 2026-10-27.** **[P2] `$impeccable polish` primitives:** pill-only `Button`/`IconButton`/inputs with no radius overrides, one card shadow, merge `LinkButton` into `Button`, and fix the badge radius conflict and its 9px size.
5. ✅ **Done 2026-10-27.** **[P2] `$impeccable typeset`:** Bricolage for large headings only at 1–2 weights, the product `h1` in Bricolage, one eyebrow tracking value, and delete Proxima Nova.
6. **[P2] `$impeccable clarify`:** the tu sweep (§5), the "pristatymo-informacija" bug, "Puiku!" and ":(".
7. **[P2] `$impeccable layout`:** (will be done through Claude Design) fewer cards per row (similar products, desktop catalog), drop the per-card stock count, add more space between home sections, a mobile billboard aspect and the mosaic layout for 3 categories.
8. **[P3] `$impeccable polish`:** final pass.

You can ask me to run these one at a time, all at once, or in any order you prefer. Re-run `$impeccable audit` after fixes to see your score improve.

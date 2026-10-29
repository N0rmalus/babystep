# Babystep: how to build with this library

Babystep is a calm, warm shop for baby sleep products. UI copy is **Lithuanian**, informal ("tu": *Pridėk*, not *Pridėkite*). Read `guidelines/DESIGN.md` before designing: brand, type scale and color roles live there.

## Setup

- Components are on `window.Babystep` (`Button`, `IconButton`, `Badge`, `ProductCard`, `Modal`, `PaperWrapper`, `PageContainer`, `Skeleton`, `LoadingSpinner`, `NoResults`, `RichTextContent`, `Billboard`, `BottomSheet`, `QuantitySelector`, `StarRating`), plus `Babystep.cn` (clsx + tailwind-merge) and `Babystep.Icons` (lucide icons the shop uses: `ShoppingCart`, `Heart`, `Trash2`, `Search`, `Menu`, `X`, `Expand`, `ArrowRight`, `ChevronLeft`, `ChevronRight`, `ChevronDown`, `Truck`, `Lock`, `Check`, `Mail`, `Phone`, `MapPin`, `SlidersHorizontal`, …). Use `Icons.*` at `size={16}`; there is no other icon set.
- No provider is needed. `styles.css` carries the tokens, fonts and the compiled utility classes. Put pages on `bg-canvas text-ink`, like the shop root.
- `Button` and `IconButton` without `href` need `onClick`. With `href` they render links.

## Styling idiom: Tailwind v4 utilities with semantic tokens

Style your own layout with Tailwind classes. Only classes compiled into `_ds_bundle.css` resolve. Stick to standard spacing/sizing/flex/grid utilities and the tokens below, and never use raw hex or Tailwind's gray/neutral/rose palettes.

| Role | Classes |
|---|---|
| Surfaces | `bg-canvas` (page), `bg-white` (cards), `bg-muted`, `bg-muted-soft` |
| Text | `text-ink`, `text-ink-soft` (body), `text-ink-muted` (meta), `text-ink-faint`, `text-link` |
| Lines | `border-line`, `border-line-strong` |
| Sale only | `text-sale-strong`, `bg-sale-soft`, `bg-sale` |
| Status | `text-success` / `bg-success-soft`; `text-danger` / `bg-danger-soft` / `border-danger-line` |
| Brand ramp | `tumbleweed-50…950` (accent, e.g. `text-tumbleweed-700`), `salmon-50…950` |
| Type | Body is Urbanist. `font-accent` (Bricolage Grotesque) only for headings `text-2xl`+, `font-bold`/`font-semibold`. `eyebrow` = uppercase label. `tabular-nums` on prices. |
| Shape | `rounded-full` buttons/chips, `rounded-2xl`/`rounded-3xl` cards, `shadow-card`, `border` |

Prices: format as `39,99 €` (comma decimal, `€` after). Sale price `text-sale-strong`, old price `text-ink-faint line-through`.

## Where the truth lives

`styles.css` → `_ds_bundle.css` (the `@theme` block lists every token), `guidelines/DESIGN.md`, and each `components/<group>/<Name>/<Name>.prompt.md` + `.d.ts`.

## Example

```jsx
const { PaperWrapper, Button, Badge, Icons } = window.Babystep;

<div className="bg-canvas text-ink p-8">
  <PaperWrapper className="flex max-w-sm flex-col gap-4">
    <Badge color="success" label="Yra sandėlyje" />
    <h2 className="font-accent text-2xl font-semibold">Muslino miegmaišis</h2>
    <p className="text-ink-muted text-sm">Lengvas, kvėpuojantis, 0–6 mėn.</p>
    <span className="text-lg font-bold tabular-nums">39,99 €</span>
    <Button fullWidth label="Į krepšelį" onClick={() => {}} elementBefore={<Icons.ShoppingCart size={16} />} />
  </PaperWrapper>
</div>
```

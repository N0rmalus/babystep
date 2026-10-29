# Category banner + wishlist handoff

Source: the "Babystep Home Redesign" Design canvas (https://claude.ai/artifact/K5KGSvfdDdZU5usuAv1p2A), sections "Category page" and "Wishlist". How to read `.dc.html` files: `docs/design/home/README.md`. Header and footer in these files are already built: don't change them.

The scope is deliberately small. Read it carefully: most of what these files show is **not** to be built.

## 1. Category, subcategory and Akcijos: only the banner

Keep the current pages exactly as they are (layout, filters, toolbar, grid, pagination). The only change: **make the category billboard shorter**, as in `category-desktop.dc.html` / `category-mobile.dc.html`:

- Desktop: the billboard image is **320px tall** (no fixed aspect ratio).
- Mobile: **148px tall**, with the billboard label at 30px.
- The rest of the Billboard stays as it is. Do it with a size option on our `Billboard` component (e.g. `size="compact"`), not by overriding styles at the call site, so the home page billboard is untouched.
- Subcategory pages use the same compact billboard. Akcijos has no billboard.

Everything else in the category files (filters sidebar, list/grid toggle, filter sheet) is **not** part of this task.

## 2. Wishlist with items: build as designed

Build `wishlist-desktop.dc.html` / `wishlist-mobile.dc.html`:

- Breadcrumbs, "Norai" title, and the count line ("4 išsaugotos prekės. Jos palauks čia, kol apsispręsi.").
- "Viską į krepšelį": adds every in-stock item using the cart's quantity logic. Afterwards show the success status line from the design, naming any sold-out items that stayed in the wishlist. Real.
- Product grid: our `ProductCard` with the remove action, 4 per row on desktop (3 below 1100px, 2 below 800px), 2 on mobile. "Tęsti apsipirkimą" link at the bottom.
- **"Pasidalinti" (share):** a **mock**. The button and popover are shown, but the link isn't real yet (see "Wishlist sharing" in TODO.md).
- **Guest sign-in note** ("Kol kas norai saugomi tik šiame įrenginyje. Prisijunk…"): shown, with the "Prisijunk" link as a **mock** until customer accounts exist.

## 3. Empty wishlist: keep the current design + the sign-in note

**Do not** use `wishlist-empty-desktop.dc.html` as the design. Keep the current empty state exactly as it is, and add only the **same guest sign-in note** as on the wishlist with items (the tumbleweed box in section 2), below it. The empty-state file is included only so the note's wording can be compared.

## Rules

- Mark every mock with `// MOCK:` (see "Mocks to replace before launch" in TODO.md).
- Follow DESIGN.md and CLAUDE.md; Lithuanian copy in the "tu" form.

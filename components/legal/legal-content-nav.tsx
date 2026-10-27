type LegalContentNavItem = {
  id: string;
  number: string;
  title: string;
  subitems?: LegalContentNavItem[];
};

type Props = {
  ariaLabel: string;
  items: LegalContentNavItem[];
};

export const LegalContentNav = ({ ariaLabel, items }: Props) => (
  <aside className="lg:sticky lg:top-28 lg:self-start">
    <p className="eyebrow text-link">Turinys</p>
    <nav aria-label={ariaLabel} className="mt-5">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="group hover:text-link text-ink-soft grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-2 text-sm font-semibold transition sm:text-base"
            >
              <span className="group-hover:text-link text-ink-muted pt-0.5 text-xs font-medium tabular-nums transition">
                {item.number}
              </span>
              <span>{item.title}</span>
            </a>

            {item.subitems && (
              <ol className="mt-2 grid gap-2 pb-1 pl-8">
                {item.subitems.map((subitem) => (
                  <li key={subitem.id}>
                    <a
                      href={`#${subitem.id}`}
                      className="group hover:text-link text-ink-muted grid grid-cols-[3.25rem_minmax(0,1fr)] items-start gap-2 text-xs leading-5 font-medium transition sm:text-sm"
                    >
                      <span className="group-hover:text-link tabular-nums transition">{subitem.number}</span>
                      <span>{subitem.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  </aside>
);

export type { LegalContentNavItem };

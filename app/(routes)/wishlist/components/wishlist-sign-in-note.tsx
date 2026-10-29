import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

// MOCK: the "Prisijunk" link does nothing until customer accounts exist.
export const WishlistSignInNote = ({ className }: Props) => (
  <aside
    aria-label="Prisijungimas"
    className={cn(
      'border-tumbleweed-200 bg-tumbleweed-100 text-ink-soft rounded-2xl border px-4 py-3 text-sm leading-normal sm:px-5 sm:py-3.5 sm:text-base',
      className,
    )}
  >
    <p>
      Kol kas norai saugomi tik šiame įrenginyje.{' '}
      <span className="whitespace-nowrap">
        <button type="button" className="text-link hover:text-ink font-semibold underline underline-offset-3">
          Prisijunk
        </button>
        ,
      </span>{' '}
      ir jie lauks tavęs bet kuriame įrenginyje.
    </p>
  </aside>
);

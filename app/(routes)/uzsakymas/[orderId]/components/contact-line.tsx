import { CONTACT_EMAIL } from '@/lib/consts';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export const ContactLine = ({ className }: Props) => (
  <p className={cn('text-ink-muted text-center text-sm', className)}>
    Kyla klausimų? Parašyk mums:{' '}
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-link hover:text-tumbleweed-800 font-semibold">
      {CONTACT_EMAIL}
    </a>
  </p>
);

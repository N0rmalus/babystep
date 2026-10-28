import { cn } from '@/lib/utils';

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: 'default' | 'sale';
  align?: 'start' | 'center';
};

export const SectionHeading = ({ id, eyebrow, title, description, tone = 'default', align = 'start' }: Props) => {
  return (
    <div className={cn('flex flex-col gap-1 lg:gap-2', align === 'center' ? 'items-center text-center' : '')}>
      <p className={cn('eyebrow', tone === 'sale' ? 'text-sale-strong' : 'text-link')}>{eyebrow}</p>
      <h2 id={id} className="font-accent text-2xl leading-tight font-bold text-balance lg:text-4xl">
        {title}
      </h2>
      {description && <p className="text-ink-muted mt-1 text-base lg:mt-0">{description}</p>}
    </div>
  );
};

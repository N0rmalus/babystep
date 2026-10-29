import { Billboard as BillboardType } from '@/actions/types';
import { Bird } from 'lucide-react';
import { getImageUrl } from '@/lib/image-url';
import { cn } from '@/lib/utils';

type Props = {
  data: BillboardType;
  size?: 'default' | 'compact';
};

export const Billboard = ({ data, size = 'default' }: Props) => {
  const isCompact = size === 'compact';

  return (
    <div className="overflow-hidden rounded-xl">
      <div
        style={{ backgroundImage: `url(${getImageUrl(data.imageUrl)})`, backgroundPosition: 'center' }}
        className={cn(
          'relative overflow-hidden rounded-xl bg-cover',
          isCompact ? 'h-37 md:h-80' : 'aspect-square md:aspect-[2.4/1]',
        )}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
          <div
            className={cn(
              'font-accent max-w-xs font-bold tracking-tight text-balance opacity-70 sm:max-w-xl lg:text-5xl',
              isCompact ? 'text-3xl md:text-4xl' : 'text-4xl',
            )}
          >
            {data.label || <Bird className={isCompact ? 'size-24 md:size-56' : 'h-56 w-56'} />}
          </div>
        </div>
      </div>
    </div>
  );
};

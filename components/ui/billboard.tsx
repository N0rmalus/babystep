import { Billboard as BillboardType } from '@/actions/types';
import { Bird } from 'lucide-react';
import { getImageUrl } from '@/lib/image-url';

type Props = {
  data: BillboardType;
};

export const Billboard = ({ data }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl">
      <div
        style={{ backgroundImage: `url(${getImageUrl(data.imageUrl)})`, backgroundPosition: 'center' }}
        className="relative aspect-square overflow-hidden rounded-xl bg-cover md:aspect-[2.4/1]"
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
          <div className="font-accent max-w-xs text-4xl font-bold tracking-tight text-balance opacity-70 sm:max-w-xl lg:text-5xl">
            {data.label || <Bird className="h-56 w-56" />}
          </div>
        </div>
      </div>
    </div>
  );
};

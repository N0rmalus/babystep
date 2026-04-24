import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { ArrowRight, HeartOff, PackageX } from 'lucide-react';
import { LinkButton } from '@/components/ui/link-button';

type Props = {
  variant: 'cart' | 'wishlist';
};

export const ProductListEmptyBox = ({ variant }: Props) => {
  return (
    <PaperWrapper className="border-dashed py-14! text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
        {variant === 'cart' ? <PackageX size={24} /> : <HeartOff size={24} />}
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-neutral-900">
        {variant === 'cart' ? 'Krepšelis tuščias' : 'Norų sąrašas tuščias'}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
        {variant === 'cart'
          ? 'Susikurk savo rinkinį ir sugrįžk čia, kai būsi pasiruošęs atsiskaitymui.'
          : 'Išsisaugok patikusias prekes vienu paspaudimu ir sugrįžk prie jų bet kada.'}
      </p>

      <div className="mt-7 flex justify-center">
        <LinkButton label="Tęsti apsipirkimą" elementAfter={<ArrowRight size={16} />} href="/" />
      </div>
    </PaperWrapper>
  );
};

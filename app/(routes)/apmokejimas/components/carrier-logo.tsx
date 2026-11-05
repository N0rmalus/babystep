import Image from 'next/image';

import { CARRIER_NAMES } from '@/lib/carriers';
import type { Carrier } from '@/lib/checkout-api';
import { cn } from '@/lib/utils';

type Props = {
  carrier: Carrier;
  size?: 'sm' | 'md';
};

export const CarrierLogo = ({ carrier, size = 'sm' }: Props) => {
  if (carrier === 'omniva') {
    return (
      <span
        className={cn(
          'bg-omniva inline-flex shrink-0 items-center justify-center rounded-md',
          size === 'sm' ? 'h-5.5 px-2' : 'h-7.5 w-16',
        )}
      >
        <Image
          src="/logos/omniva-mark.svg"
          alt={CARRIER_NAMES.omniva}
          width={1512}
          height={532}
          className={cn('w-auto', size === 'sm' ? 'h-3' : 'h-4')}
        />
      </span>
    );
  }

  if (carrier === 'smartposti') {
    return (
      <Image
        src="/logos/smartposti-mark.svg"
        alt={CARRIER_NAMES.smartposti}
        width={434}
        height={95}
        className="h-4.5 w-auto"
      />
    );
  }

  return (
    <span
      className={cn(
        'bg-muted text-ink-soft inline-flex shrink-0 items-center justify-center rounded-md text-xs font-bold',
        size === 'sm' ? 'h-5.5 px-2' : 'h-7.5 w-16',
      )}
    >
      {CARRIER_NAMES.unisend}
    </span>
  );
};

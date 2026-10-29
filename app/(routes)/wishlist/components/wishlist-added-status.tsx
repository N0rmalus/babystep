import { Check } from 'lucide-react';
import Link from 'next/link';

import { pluralize } from '@/lib/plural';

type Props = {
  addedCount: number;
  soldOutNames: string[];
};

export const WishlistAddedStatus = ({ addedCount, soldOutNames }: Props) => (
  <p
    role="status"
    className="bg-success-soft text-success flex items-start gap-2.5 rounded-2xl px-3.5 py-3 text-sm leading-snug font-semibold sm:items-center sm:px-4.5 sm:py-3.5 sm:text-base"
  >
    <Check size={18} aria-hidden="true" className="mt-px shrink-0 sm:mt-0" />
    <span>
      {getAddedText(addedCount)}
      {soldOutNames.length > 0 && ` ${getSoldOutText(soldOutNames)}`}
    </span>
    <Link href="/cart" className="text-success ml-auto hidden whitespace-nowrap underline underline-offset-3 sm:inline">
      Į krepšelį
    </Link>
  </p>
);

const getAddedText = (count: number) =>
  `${count} ${pluralize(count, { one: 'prekė', few: 'prekės', many: 'prekių' })} jau krepšelyje.`;

const getSoldOutText = (names: string[]) => {
  const listedNames = names.length === 1 ? names.join('') : `${names.slice(0, -1).join(', ')} ir ${names.at(-1)}`;

  return `${listedNames} šiuo metu nėra sandėlyje, todėl palikome noruose.`;
};

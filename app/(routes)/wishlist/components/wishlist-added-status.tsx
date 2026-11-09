import { Check } from 'lucide-react';
import Link from 'next/link';

import type { Product } from '@/actions/types';
import { getListSeparator } from '@/lib/list-separator';
import { pluralize } from '@/lib/plural';
import { NeedsChoiceLinks } from './needs-choice-links';

type Props = {
  addedCount: number;
  soldOutNames: string[];
  needsChoiceProducts: Pick<Product, 'id' | 'name'>[];
};

export const WishlistAddedStatus = ({ addedCount, soldOutNames, needsChoiceProducts }: Props) => (
  <p
    role="status"
    className="bg-success-soft text-success flex items-start gap-2.5 rounded-2xl px-3.5 py-3 text-sm leading-snug font-semibold sm:items-center sm:px-4.5 sm:py-3.5 sm:text-base"
  >
    <Check size={18} aria-hidden="true" className="mt-px shrink-0 sm:mt-0" />
    <span>
      {getAddedText(addedCount)}
      {soldOutNames.length > 0 && ` ${getSoldOutText(soldOutNames)}`}
      {needsChoiceProducts.length > 0 && (
        <>
          {' '}
          <NeedsChoiceLinks products={needsChoiceProducts} /> {getNeedsChoiceText(needsChoiceProducts.length)}
        </>
      )}
    </span>
    <Link href="/cart" className="text-success ml-auto hidden whitespace-nowrap underline underline-offset-3 sm:inline">
      Į krepšelį
    </Link>
  </p>
);

const getAddedText = (count: number) =>
  `${count} ${pluralize(count, { one: 'prekė', few: 'prekės', many: 'prekių' })} jau krepšelyje.`;

const getSoldOutText = (names: string[]) => {
  const listedNames = names.map((name, index) => `${getListSeparator({ index, count: names.length })}${name}`).join('');

  return `${listedNames} šiuo metu nėra sandėlyje, todėl palikome noruose.`;
};

const getNeedsChoiceText = (count: number) =>
  count === 1 ? 'turi kelis variantus, tad pasirink savybes.' : 'turi kelis variantus, tad pasirink jų savybes.';

'use client';

import { BadgeCheck, Star } from 'lucide-react';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { ReviewStarRow } from '@/app/(routes)/product/[productId]/components/ReviewStarRow';

const PRODUCT_REVIEW_SUMMARY = [
  { stars: 5, count: 23 },
  { stars: 4, count: 4 },
  { stars: 3, count: 1 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
] satisfies { stars: number; count: number }[];

const PRODUCT_REVIEWS = [
  {
    id: 'ieva',
    name: 'Ieva',
    initials: 'IV',
    rating: 5,
    date: '2026-05-12',
    variant: '80 x 100 cm · Pieno baltumo',
    body: 'Labai švelnus pledukas, po skalbimo forma liko tvarkinga. Spalva šilta, gražiai dera prie lopšio.',
  },
  {
    id: 'monika',
    name: 'Monika',
    initials: 'MO',
    rating: 5,
    date: '2026-04-28',
    variant: '100 x 140 cm · Smėlio',
    body: 'Pirkome dovanai. Atrodo prabangiai, bet nėra sunkus. Patiko, kad mažylis neprakaituoja miegodamas.',
  },
  {
    id: 'rasa',
    name: 'Rasa',
    initials: 'RA',
    rating: 4,
    date: '2026-03-19',
    variant: '80 x 100 cm · Šalavijo',
    body: 'Graži tekstūra ir labai malonus prisilietimas. Norėtųsi daugiau spalvų, bet kokybė tikrai gera.',
  },
] satisfies {
  id: string;
  name: string;
  initials: string;
  rating: number;
  date: string;
  variant: string;
  body: string;
}[];

const REVIEW_COUNT = PRODUCT_REVIEW_SUMMARY.reduce((total, row) => total + row.count, 0);
const REVIEW_SCORE = 4.4;

export const ProductReviews = () => {
  return (
    <div id="atsiliepimai">
      <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
        <PaperWrapper variant="tumbleweed" className="h-fit">
          <div className="font-accent text-6xl leading-none font-bold text-neutral-950">
            {REVIEW_SCORE}
            <span className="text-2xl text-neutral-400">/5</span>
          </div>
          <ReviewStarRow rating={REVIEW_SCORE} className="mt-4" />
          <p className="mt-2 text-sm text-neutral-500">{REVIEW_COUNT} pirkėjų atsiliepimai</p>

          <div className="mt-6 space-y-2">
            {PRODUCT_REVIEW_SUMMARY.map((row) => (
              <div
                key={row.stars}
                className="grid grid-cols-[2rem_minmax(0,1fr)_2rem] items-center gap-3 text-xs text-neutral-500"
              >
                <span className="inline-flex items-center gap-1">
                  {row.stars}
                  <Star size={12} className="fill-tumbleweed-400 text-tumbleweed-400" />
                </span>
                <span className="bg-tumbleweed-100 h-2 overflow-hidden rounded-full">
                  <span
                    className="bg-tumbleweed-400 block h-full rounded-full"
                    style={{ width: `${(row.count / REVIEW_COUNT) * 100}%` }}
                  />
                </span>
                <span className="text-right tabular-nums">{row.count}</span>
              </div>
            ))}
          </div>
        </PaperWrapper>

        <div className="divide-y divide-neutral-200">
          {PRODUCT_REVIEWS.map((review) => (
            <article key={review.id} className="py-6 first:pt-0">
              <div className="flex items-start gap-4">
                <div className="bg-tumbleweed-100 font-accent text-tumbleweed-800 flex size-11 shrink-0 items-center justify-center rounded-full font-bold">
                  {review.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-accent font-semibold text-neutral-950">{review.name}</h3>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 uppercase">
                      <BadgeCheck size={13} />
                      Patvirtintas pirkimas
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                    <ReviewStarRow rating={review.rating} size={14} />
                    <span>{review.variant}</span>
                    <span>{review.date}</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">{review.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

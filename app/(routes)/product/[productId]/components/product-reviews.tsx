'use client';

import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

import { formatRating } from '@/components/product/product-rating-summary';
import Button from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import { MOCK_PRODUCT_RATING, MOCK_PRODUCT_REVIEWS } from '@/lib/mocks/product';

// MOCK: rating summary and reviews until "Customer accounts" (reviews).
const { average, count, distribution } = MOCK_PRODUCT_RATING;

export const ProductReviews = () => {
  // MOCK: review actions until "Customer accounts" (reviews).
  const handleMockAction = () => {
    toast('Atsiliepimai jau netrukus.');
  };

  return (
    <section
      id="atsiliepimai"
      aria-labelledby="reviews-title"
      className="border-line mt-8 scroll-mt-40 pt-0 lg:mt-10 lg:border-t lg:pt-10"
    >
      <div className="mb-4 flex flex-col gap-2 lg:mb-6">
        <span className="eyebrow text-link hidden lg:block">Atsiliepimai</span>
        <h2 id="reviews-title" className="font-accent text-3xl leading-tight font-bold text-balance sm:text-4xl">
          <span className="lg:hidden">Atsiliepimai</span>
          <span className="hidden lg:inline">Ką sako kiti tėvai</span>
        </h2>
      </div>

      <div className="grid gap-2 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="border-line shadow-card flex items-center gap-4 rounded-3xl border bg-white p-4.5 lg:col-span-4 lg:flex-col lg:items-stretch lg:p-7">
          <div className="flex items-baseline gap-2.5">
            <span className="text-4xl leading-none font-bold tabular-nums lg:text-5xl">{formatRating(average)}</span>
            <span className="text-ink-muted hidden lg:inline">iš 5</span>
          </div>
          <div className="flex flex-col gap-1 lg:gap-4">
            <StarRating rating={average} size={20} label={`Įvertinimas ${formatRating(average)} iš 5`} />
            <span className="text-ink-muted text-sm lg:text-base">Pagal {count} atsiliepimus</span>
          </div>
          <ul className="hidden flex-col gap-2 lg:flex">
            {distribution.map((row) => (
              <li
                key={row.stars}
                className="text-ink-muted grid grid-cols-[1rem_1fr_1.5rem] items-center gap-2.5 text-sm tabular-nums"
              >
                <span>{row.stars}</span>
                <span className="bg-muted h-2 overflow-hidden rounded-full">
                  <span
                    className="bg-tumbleweed-400 block h-full rounded-full"
                    style={{ width: `${count > 0 ? (row.count / count) * 100 : 0}%` }}
                  />
                </span>
                <span className="text-right">{row.count}</span>
              </li>
            ))}
          </ul>
          <div className="hidden lg:block">
            <Button variant="secondary" label="Parašyk atsiliepimą" onClick={handleMockAction} fullWidth />
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul>
            {MOCK_PRODUCT_REVIEWS.map((review) => (
              <li
                key={review.id}
                className="border-line flex flex-col gap-2 border-b py-5 lg:mb-7 lg:gap-2.5 lg:pt-0 lg:pb-7"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-bold">{review.name}</span>
                  <span className="text-ink-muted text-xs tabular-nums sm:text-sm">{review.date}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 lg:gap-3">
                  <StarRating rating={review.rating} size={14} label={`Įvertinimas ${review.rating} iš 5`} />
                  <span className="text-success flex items-center gap-1.5 text-xs font-semibold sm:text-sm">
                    <Check size={14} aria-hidden="true" />
                    Patvirtintas pirkimas
                  </span>
                  <span className="text-ink-muted hidden text-sm lg:inline">{review.variant}</span>
                </div>
                <p className="text-ink-soft max-w-2xl text-sm leading-relaxed sm:text-base">{review.text}</p>
              </li>
            ))}
          </ul>
          <div className="pt-5 lg:w-fit lg:pt-0">
            <Button variant="secondary" label={`Visi ${count} atsiliepimai`} onClick={handleMockAction} fullWidth />
          </div>
        </div>
      </div>
    </section>
  );
};

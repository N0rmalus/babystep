import { StarRating } from 'babysteps-store';

export const Default = () => <StarRating rating={4} label="Įvertinimas 4 iš 5" />;

export const Sizes = () => (
  <div className="flex flex-col gap-3">
    <StarRating rating={5} size={14} label="Įvertinimas 5 iš 5" />
    <StarRating rating={5} size={16} label="Įvertinimas 5 iš 5" />
    <StarRating rating={5} size={20} label="Įvertinimas 5 iš 5" />
  </div>
);

export const RatingSummary = () => (
  <div className="border-line shadow-card flex w-fit items-center gap-4 rounded-3xl border bg-white p-4.5">
    <span className="text-ink text-4xl leading-none font-bold tabular-nums">4,7</span>
    <div className="flex flex-col gap-1">
      <StarRating rating={4.7} size={20} label="Įvertinimas 4,7 iš 5" />
      <span className="text-ink-muted text-sm">Pagal 38 atsiliepimus</span>
    </div>
  </div>
);

export const ReviewHeader = () => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center gap-2">
      <StarRating rating={3} size={14} label="Įvertinimas 3 iš 5" />
      <span className="text-ink-muted text-xs">2026-10-12</span>
    </div>
    <p className="text-ink font-bold">Gera kokybė, bet dydis šiek tiek mažesnis</p>
  </div>
);

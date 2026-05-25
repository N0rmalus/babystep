import { Sparkle } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/consts';

const marqueeMessages = [
  '-10% pirmam užsakymui su kodu BABYSTEP10',
  '30 dienų grąžinimas be klausimų',
  'Pagaminta Lietuvoje',
  `Nemokamas pristatymas nuo ${FREE_SHIPPING_THRESHOLD}€`,
  'Naujiena — Pavasario kolekcija',
];

const MessageRow = () => (
  <div className="flex shrink-0 items-center gap-8 pr-8">
    {marqueeMessages.map((message) => (
      <span
        key={message}
        className="font-accent flex items-center gap-2 text-sm font-extralight whitespace-nowrap sm:text-base"
      >
        <Sparkle size={13} className="shrink-0 fill-current" />
        {message}
      </span>
    ))}
  </div>
);

export const PromoMarquee = () => {
  return (
    <div className="bg-tumbleweed-950 text-tumbleweed-50 overflow-hidden py-2.5">
      <div className="animate-promo-conveyor flex w-max items-center will-change-transform">
        <MessageRow />
        <MessageRow />
      </div>
    </div>
  );
};

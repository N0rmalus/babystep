import { Award, HeartHandshake, RotateCcw, Truck } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/consts';

const promoItems = [
  {
    title: 'Nemokamas pristatymo-informacija',
    description: `Užsakymams nuo ${FREE_SHIPPING_THRESHOLD}€`,
    icon: Truck,
  },
  {
    title: '30 dienų grąžinimas',
    description: 'Be jokių klausimų',
    icon: RotateCcw,
  },
  {
    title: 'Aukštos kokybės audiniai',
    description: `Sertifikuota OEKO-TEX\u00AE medžiaga`,
    icon: Award,
  },
  {
    title: 'Kruopščiai atrinkta',
    description: 'Supakuota su meile',
    icon: HeartHandshake,
  },
];

export const PromoStrip = () => {
  return (
    <div className="border-tumbleweed-100 bg-white shadow-md sm:shadow-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-3 gap-y-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-6 lg:grid-cols-4 lg:px-8 lg:py-8">
        {promoItems.map(({ title, description, icon: Icon }) => (
          <div key={title} className="flex items-center gap-2.5 sm:gap-4">
            <span className="bg-tumbleweed-50 text-tumbleweed-500 inline-flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-14 sm:rounded-2xl">
              <Icon className="size-5 sm:size-6" />
            </span>
            <div className="min-w-0">
              <h1 className="text-ink text-sm leading-tight font-semibold sm:text-base">{title}</h1>
              <p className="text-ink-muted mt-0.5 text-xs leading-snug sm:mt-1 sm:text-sm">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

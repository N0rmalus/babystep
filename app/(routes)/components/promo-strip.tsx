import { Award, HeartHandshake, RotateCcw, Truck } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/consts';

const promoItems = [
  {
    title: 'Nemokamas pristatymas',
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
    <div className="border-salmon-100 bg-white shadow-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-8">
        {promoItems.map(({ title, description, icon: Icon }) => (
          <div key={title} className="flex items-center gap-4">
            <span className="bg-salmon-50 text-salmon-700 inline-flex size-14 shrink-0 items-center justify-center rounded-2xl">
              <Icon size={23} strokeWidth={1.7} />
            </span>
            <div className="min-w-0">
              <h1 className="font-accent text-sm font-bold text-neutral-900 sm:text-base">{title}</h1>
              <p className="mt-1 text-sm text-neutral-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

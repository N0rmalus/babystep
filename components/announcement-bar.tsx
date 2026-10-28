import { toCurrencyRounded } from '@/business/to-currency';
import { FREE_SHIPPING_THRESHOLD, RETURN_PERIOD_DAYS } from '@/lib/consts';

export const AnnouncementBar = () => {
  return (
    <div className="bg-ink text-canvas flex h-8 items-center justify-center px-4 text-center text-xs sm:text-sm lg:h-9">
      <p>
        Nemokamas pristatymas <span className="hidden lg:inline">užsakymams </span>nuo{' '}
        {toCurrencyRounded(FREE_SHIPPING_THRESHOLD)}
        <span className="hidden lg:inline"> · Grąžinti gali per {RETURN_PERIOD_DAYS} dienų</span>
      </p>
    </div>
  );
};

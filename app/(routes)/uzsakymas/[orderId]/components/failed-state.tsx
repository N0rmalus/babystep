import Image from 'next/image';
import { Mail, RotateCcw } from 'lucide-react';

import { toCurrency } from '@/business/to-currency';
import Button from '@/components/ui/button';
import type { Order } from '@/lib/checkout-api';
import { CONTACT_EMAIL } from '@/lib/consts';
import { getImageUrl } from '@/lib/image-url';
import { getDeliverySentence, joinNames } from './order-details';

type Props = {
  order: Order;
};

const THUMBNAIL_COUNT = 3;

export const FailedState = ({ order }: Props) => (
  <div className="mx-auto w-full max-w-180 px-4 pt-12 pb-16 sm:px-10 sm:pt-20 sm:pb-28">
    <section aria-labelledby="order-failed" className="flex flex-col items-center gap-3.5 text-center">
      <span
        aria-hidden="true"
        className="bg-muted text-ink-soft flex size-16 items-center justify-center rounded-full sm:size-18"
      >
        <RotateCcw size={28} />
      </span>
      <span className="eyebrow text-ink-muted">Neapmokėta</span>
      <h1
        id="order-failed"
        className="font-accent text-ink text-4xl leading-none font-bold tracking-tight text-balance sm:text-5xl"
      >
        Mokėjimas neįvyko
      </h1>
      <p className="text-ink-muted max-w-135 text-base leading-relaxed sm:text-lg">
        Nieko baisaus, taip kartais nutinka. Užsakymas lieka neapmokėtas, o tavo krepšelis išsaugotas toks pat, kaip
        buvo.
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        <Button
          href="/apmokejimas"
          label="Bandyti dar kartą"
          elementBefore={<RotateCcw size={16} aria-hidden="true" />}
        />
        <Button href="/cart" variant="secondary" label="Grįžti į krepšelį" />
      </div>
      <p className="text-ink-muted mt-1 text-sm">Jei bankas nepraleido mokėjimo, pabandyk kitą banką arba kortelę.</p>
    </section>

    <section
      aria-labelledby="order-failed-cart"
      className="border-line shadow-card mt-12 flex flex-col gap-3.5 rounded-3xl border bg-white px-5 py-5 sm:mt-14 sm:px-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="order-failed-cart" className="text-ink text-base font-semibold">
          Tavo krepšelis laukia
        </h2>
        <span className="text-ink text-base font-bold tabular-nums">{toCurrency(order.total)}</span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2.5">
        <div className="flex gap-2.5">
          {order.lines.slice(0, THUMBNAIL_COUNT).map((line) => (
            <span key={line.productId} className="bg-muted relative size-14 shrink-0 overflow-hidden rounded-xl">
              <Image fill src={getImageUrl(line.imageUrl)} alt="" sizes="56px" className="object-cover" />
            </span>
          ))}
        </div>
        <p className="text-ink-muted text-sm leading-normal sm:ml-1.5">
          {joinNames(order.lines.map((line) => line.name))}.
          <br />
          {getDeliverySentence(order.delivery)}
        </p>
      </div>
      <p className="border-line text-ink-soft flex gap-2.5 border-t pt-3 text-sm leading-normal">
        <Mail size={16} className="text-ink-muted mt-0.5 shrink-0" aria-hidden="true" />
        <span>
          Jei pinigai vis dėlto buvo nuskaičiuoti, parašyk mums:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-link font-semibold">
            {CONTACT_EMAIL}
          </a>
          . Išsiaiškinsime ir viską sutvarkysime.
        </span>
      </p>
    </section>
  </div>
);

import type { ReactNode } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, Mail } from 'lucide-react';

import { toCurrency } from '@/business/to-currency';
import Button from '@/components/ui/button';
import type { Order } from '@/lib/checkout-api';
import { CARRIER_NAMES } from '@/lib/carriers';
import { getImageUrl } from '@/lib/image-url';
import { MOCK_CART_VARIANT_META } from '@/lib/mocks/product';
import { formatPhone } from '@/lib/phone';
import { cn } from '@/lib/utils';
import { ContactLine } from './contact-line';
import { getDeliveryMethodName, getDeliveryProgressStep, getPaymentLabel } from './order-details';

type Props = {
  order: Order;
};

export const PaidState = ({ order }: Props) => {
  const lastStep = getDeliveryProgressStep(order.delivery);
  const progressSteps = [
    { title: 'Užsakymas apmokėtas', text: 'Šiandien', isDone: true },
    { title: 'Ruošiame siuntą', text: 'Supakuosime su rūpesčiu', isDone: false },
    { title: 'Siunta pakeliui', text: 'Sekimą gausi el. paštu', isDone: false },
    { ...lastStep, isDone: false },
  ];

  return (
    <div className="mx-auto w-full max-w-240 px-4 pt-10 pb-16 sm:px-10 sm:pt-16 sm:pb-28">
      <section aria-labelledby="order-paid" className="flex flex-col items-center gap-3.5 text-center">
        <span
          aria-hidden="true"
          className="bg-success-soft text-success flex size-16 items-center justify-center rounded-full sm:size-18"
        >
          <Check size={32} />
        </span>
        <span className="eyebrow text-success tabular-nums">Užsakymo nr. {order.number}</span>
        <h1
          id="order-paid"
          className="font-accent text-ink text-4xl leading-none font-bold tracking-tight text-balance sm:text-5xl"
        >
          Ačiū, užsakymas priimtas
        </h1>
        <p className="text-ink-muted max-w-140 text-base leading-relaxed sm:text-lg">
          Patvirtinimą išsiuntėme į <strong className="text-ink-soft">{order.email}</strong>. Kai siunta iškeliaus,
          atsiųsime ir sekimo nuorodą.
        </p>
      </section>

      <ol aria-label="Užsakymo eiga" className="mt-10 grid grid-cols-2 gap-x-3 gap-y-5 sm:mt-12 sm:grid-cols-4">
        {progressSteps.map((step) => (
          <li key={step.title} className="flex flex-col gap-2.5">
            <span className={cn('h-1.5 rounded-full', step.isDone ? 'bg-success' : 'bg-muted')} />
            <span className={cn('text-sm font-semibold', step.isDone ? 'text-ink' : 'text-ink-soft')}>
              {step.title}
            </span>
            <span className="text-ink-muted text-sm">{step.text}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid items-start gap-4 sm:mt-10 lg:grid-cols-[6fr_5fr] lg:gap-5">
        <section
          aria-labelledby="order-items"
          className="border-line shadow-card flex flex-col gap-3.5 rounded-3xl border bg-white p-5 sm:p-6"
        >
          <h2 id="order-items" className="text-ink text-lg font-semibold">
            Ką užsakei
          </h2>
          <ul className="flex flex-col gap-3">
            {order.lines.map((line) => (
              <li key={line.productId} className="flex items-center gap-3">
                <span className="bg-muted relative size-14 shrink-0 overflow-hidden rounded-xl">
                  <Image fill src={getImageUrl(line.imageUrl)} alt="" sizes="56px" className="object-cover" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-ink text-base font-semibold">{line.name}</span>
                  {/* MOCK: size and color until "Product variants". */}
                  <span className="text-ink-muted text-sm">
                    {MOCK_CART_VARIANT_META} · {line.quantity} vnt.
                  </span>
                </span>
                <span className="text-ink text-base font-semibold tabular-nums">{toCurrency(line.total)}</span>
              </li>
            ))}
          </ul>
          <div className="bg-line h-px" />
          <SummaryRow label="Prekės" value={toCurrency(order.subtotal)} />
          <SummaryRow
            label={`Pristatymas · ${getDeliveryMethodName(order.delivery)}`}
            value={order.deliveryPrice === 0 ? 'Nemokamai' : toCurrency(order.deliveryPrice)}
          />
          <div className="flex items-baseline justify-between">
            <span className="text-ink font-semibold">Sumokėta</span>
            <span className="text-ink text-2xl font-bold tabular-nums">{toCurrency(order.total)}</span>
          </div>
        </section>

        <div className="flex flex-col gap-4 lg:gap-5">
          <section
            aria-labelledby="order-delivery"
            className="border-line shadow-card flex flex-col gap-3.5 rounded-3xl border bg-white p-5 sm:p-6"
          >
            <h2 id="order-delivery" className="text-ink text-lg font-semibold">
              Pristatymas
            </h2>
            <dl className="flex flex-col gap-3 text-base">
              <DeliveryDetail order={order} />
              <Detail label="Gavėjas">
                {order.recipient.name}
                <br />
                {formatPhone(order.recipient.phone)}
              </Detail>
              <Detail label="Mokėjimas">{getPaymentLabel(order.payment)}</Detail>
            </dl>
            <p className="bg-muted-soft text-ink-soft flex gap-2.5 rounded-2xl px-3.5 py-3 text-sm leading-normal">
              <Mail size={16} className="text-link mt-0.5 shrink-0" aria-hidden="true" />
              Siuntos sekimo nuorodą atsiųsime el. paštu, kai tik siunta iškeliaus.
            </p>
          </section>

          {/* MOCK: account creation until customer accounts exist. */}
          <section
            aria-labelledby="order-account"
            className="border-tumbleweed-100 bg-tumbleweed-50 flex flex-col items-start gap-2.5 rounded-3xl border px-5 py-5 sm:px-6"
          >
            <h2 id="order-account" className="text-ink text-base font-semibold">
              Nori matyti užsakymą bet kada?
            </h2>
            <p className="text-ink-soft text-sm leading-normal">
              Susikurk paskyrą su tuo pačiu el. paštu. Šis užsakymas atsiras joje, o kitą kartą duomenis užpildysime už
              tave.
            </p>
            <Button variant="secondary" size="sm" label="Susikurti paskyrą" onClick={() => {}} className="h-11" />
          </section>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button href="/" label="Grįžti į parduotuvę" elementAfter={<ArrowRight size={18} aria-hidden="true" />} />
      </div>
      <ContactLine className="mt-5" />
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="text-ink-soft flex justify-between text-base">
    <span>{label}</span>
    <span className="tabular-nums">{value}</span>
  </div>
);

const Detail = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-0.5">
    <dt className="eyebrow text-ink-muted">{label}</dt>
    <dd className="text-ink-soft leading-normal">{children}</dd>
  </div>
);

const DeliveryDetail = ({ order }: { order: Order }) => {
  const { delivery } = order;

  if (delivery.method === 'locker') {
    return (
      <Detail label="Paštomatas">
        {CARRIER_NAMES[delivery.carrier]} · {delivery.pickupPoint.name}
        <br />
        {delivery.pickupPoint.address}
      </Detail>
    );
  }

  const { street, apartment, postalCode, city } = delivery.address;

  return (
    <Detail label={`Kurjeris · ${CARRIER_NAMES[delivery.carrier]}`}>
      {apartment ? `${street}-${apartment}` : street}
      <br />
      {postalCode} {city}
    </Detail>
  );
};

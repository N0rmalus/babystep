import type { ReactNode } from 'react';
import { Check, Lock, Mail, Phone, RotateCcw } from 'lucide-react';

import Button from '@/components/ui/button';
import type { Order } from '@/lib/checkout-api';
import { CONTACT_EMAIL } from '@/lib/consts';

type Props = {
  order: Order;
  isRefreshing: boolean;
  onRefresh: () => void;
};

export const WaitingState = ({ order, isRefreshing, onRefresh }: Props) => (
  <div className="mx-auto w-full max-w-180 px-4 pt-12 pb-16 sm:px-10 sm:pt-20 sm:pb-28">
    <section
      aria-labelledby="order-waiting"
      aria-live="polite"
      className="flex flex-col items-center gap-3.5 text-center"
    >
      <span
        aria-hidden="true"
        className="bg-tumbleweed-50 relative flex size-16 items-center justify-center rounded-full sm:size-18"
      >
        <span className="border-tumbleweed-100 border-t-tumbleweed-500 absolute inset-1.5 animate-spin rounded-full border-3 motion-reduce:animate-none" />
        <Lock size={20} className="text-link" />
      </span>
      <span className="eyebrow text-link tabular-nums">Užsakymo nr. {order.number}</span>
      <h1
        id="order-waiting"
        className="font-accent text-ink text-4xl leading-none font-bold tracking-tight text-balance sm:text-5xl"
      >
        Laukiame mokėjimo patvirtinimo
      </h1>
      <p className="text-ink-muted max-w-135 text-base leading-relaxed sm:text-lg">
        Kartais bankui prireikia kelių minučių. Šis puslapis atsinaujins pats, o kai tik bankas patvirtins, patvirtinimą
        atsiųsime į <strong className="text-ink-soft">{order.email}</strong>.
      </p>
      <p className="text-ink-soft text-base font-semibold">Nieko daryti nereikia, ir mokėti dar kartą nereikia.</p>
      <div className="mt-3">
        <Button
          variant="secondary"
          label="Atnaujinti dabar"
          elementBefore={<RotateCcw size={16} aria-hidden="true" />}
          loading={isRefreshing}
          onClick={onRefresh}
        />
      </div>
    </section>

    <section
      aria-labelledby="order-waiting-help"
      className="border-line shadow-card mt-12 flex flex-col gap-3 rounded-3xl border bg-white px-5 py-5 sm:mt-14 sm:px-6"
    >
      <h2 id="order-waiting-help" className="text-ink text-base font-semibold">
        Jei laukti tenka ilgiau nei įprastai
      </h2>
      <ul className="text-ink-soft flex flex-col gap-2.5 text-base leading-normal">
        <HelpItem icon={<Check size={16} />}>Užsakymas išsaugotas, niekas nedings.</HelpItem>
        <HelpItem icon={<Mail size={16} />}>
          Gali uždaryti šį langą. Kai tik bankas patvirtins, laišką gausi el. paštu.
        </HelpItem>
        <HelpItem icon={<Phone size={16} />}>
          Neramu? Parašyk mums:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-link font-semibold">
            {CONTACT_EMAIL}
          </a>
          . Pažiūrėsime kartu.
        </HelpItem>
      </ul>
    </section>
  </div>
);

const HelpItem = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <li className="flex gap-2.5">
    <span aria-hidden="true" className="text-ink-muted mt-1 flex shrink-0">
      {icon}
    </span>
    <span>{children}</span>
  </li>
);

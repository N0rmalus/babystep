import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

import Button from '@/components/ui/button';

export const StockProblemNotice = () => (
  <section
    role="alert"
    className="border-danger-line shadow-card flex flex-col items-start gap-3 rounded-3xl border bg-white p-5 sm:p-6"
  >
    <h2 className="text-ink text-lg font-semibold">Krepšelyje kai kas pasikeitė</h2>
    <p className="text-ink-soft text-base leading-relaxed">
      Kai kurių prekių nebeliko arba liko mažiau, nei pasirinkai. Pakoreguok krepšelį ir grįžk čia. Tavo įvesti duomenys
      išliks.
    </p>
    <Button href="/cart" label="Grįžti į krepšelį" variant="secondary" />
  </section>
);

export const StockProblemNote = () => (
  <p role="alert" className="text-danger flex items-start gap-1.5 text-sm">
    <AlertTriangle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
    <span>
      Kai kurių prekių nebeliko.{' '}
      <Link href="/cart" className="font-semibold underline underline-offset-3">
        Pakoreguok krepšelį
      </Link>
      , ir galėsi apmokėti.
    </span>
  </p>
);

import { ArrowRight } from 'lucide-react';

import Button from '@/components/ui/button';
import { ContactLine } from './contact-line';

type Props = {
  title: string;
  text: string;
};

export const ConfirmationMessage = ({ title, text }: Props) => (
  <section className="mx-auto flex w-full max-w-180 flex-col items-center gap-3.5 px-4 pt-14 pb-20 text-center sm:px-10 sm:pt-20 sm:pb-28">
    <h1 className="font-accent text-ink text-3xl leading-tight font-bold text-balance sm:text-5xl">{title}</h1>
    <p className="text-ink-muted max-w-135 text-base leading-relaxed sm:text-lg">{text}</p>
    <div className="mt-3">
      <Button href="/" label="Grįžti į parduotuvę" elementAfter={<ArrowRight size={18} aria-hidden="true" />} />
    </div>
    <ContactLine className="mt-2" />
  </section>
);

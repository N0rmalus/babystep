import Link from 'next/link';

import { HomeSection } from '@/app/(routes)/components/home-section';
import { NewsletterForm } from '@/app/(routes)/components/newsletter-form';

export const NewsletterSection = () => {
  return (
    <HomeSection labelledBy="home-newsletter" className="pt-16 pb-18 lg:pt-28 lg:pb-30">
      <div className="border-line border-t pt-14 lg:pt-24">
        <div className="mx-auto flex max-w-140 flex-col items-center gap-2.5 text-center lg:gap-3">
          <p className="eyebrow text-link">Naujienlaiškis</p>
          <h2 id="home-newsletter" className="font-accent text-3xl leading-tight font-bold text-balance lg:text-4xl">
            Ramūs laiškai, kartą per mėnesį
          </h2>
          <p className="text-ink-muted text-base leading-normal lg:text-lg">
            Miego patarimai, naujienos ir akcijos pirmiausia tau. Jokio šlamšto.
          </p>
          <NewsletterForm />
          <p className="text-ink-muted mt-0.5 text-xs lg:mt-1">
            Atsisakyti gali bet kada.{' '}
            <Link href="/privatumo-politika" className="text-link underline">
              Privatumo politika
            </Link>
          </p>
        </div>
      </div>
    </HomeSection>
  );
};

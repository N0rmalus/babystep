import { Lock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

import IconButton from '@/components/ui/icon-button';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/lib/consts';
import { cn } from '@/lib/utils';

type FooterColumnProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

const shopLinks = [
  {
    label: 'Naujienos',
    href: '#',
  },
  {
    label: 'Akcijos',
    href: '/akcijos',
  },
];

const supportLinks = [
  {
    label: 'Pristatymo informacija',
    href: '/pristatymo-informacija',
  },
  {
    label: 'Grąžinimo informacija',
    href: '/grazinimo-informacija',
  },
  {
    label: 'Taisyklės ir sąlygos',
    href: '/taisykles-ir-salygos',
  },
  {
    label: 'Privatumo politika',
    href: '/privatumo-politika',
  },
];

const FOOTER_LINK_CLASSES = 'text-ink-soft hover:text-link transition-colors';

export const Footer = () => {
  return (
    <footer className="border-line bg-muted-soft border-t">
      <div className="px-gutter mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-10 pt-10 pb-8 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-10 lg:pt-16 lg:pb-10">
        <div className="col-span-2 flex flex-col items-start gap-4 lg:col-span-1">
          <Link href="/" className="font-accent text-ink text-2xl font-bold tracking-tight">
            Babystep
          </Link>
          <p className="text-ink-muted max-w-75 text-sm leading-relaxed">
            Švelnios miego prekės ramesnėms naktims. Kaip draugas, kuris tai jau išgyveno.
          </p>
          <div className="flex gap-2.5">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <IconButton key={label} href={href} icon={<Icon size={16} />} label={label} />
            ))}
          </div>
        </div>

        <FooterColumn title="Parduotuvė">
          {shopLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(FOOTER_LINK_CLASSES, link.href === '/akcijos' ? 'text-sale-strong' : '')}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Pagalba">
          {supportLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={FOOTER_LINK_CLASSES}>
                {link.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Kontaktai" className="col-span-2 lg:col-span-1">
          <li className="flex items-start gap-2.5">
            <Mail className="text-ink-faint mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <a href={`mailto:${CONTACT_EMAIL}`} className={FOOTER_LINK_CLASSES}>
              {CONTACT_EMAIL}
            </a>
          </li>
          <li className="flex items-start gap-2.5">
            <Phone className="text-ink-faint mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <a href="tel:+37061717992" className={FOOTER_LINK_CLASSES}>
              +370 617 17 992
            </a>
          </li>
          <li className="text-ink-soft flex items-start gap-2.5">
            <MapPin className="text-ink-faint mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              Pušyno g. 3, Dėdeliškių k., <br /> LT-21401 Trakų r.
            </span>
          </li>
        </FooterColumn>
      </div>

      <div className="border-line text-ink-muted px-gutter mx-auto flex max-w-7xl justify-between gap-4 border-t pt-4 pb-7 text-xs lg:pt-5 lg:pb-8">
        <span>&copy; 2026 Babystep</span>
        <span className="flex items-center gap-1.5">
          <Lock size={14} aria-hidden="true" />
          Saugus apmokėjimas
        </span>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children, className }: FooterColumnProps) => {
  return (
    <nav aria-label={title} className={cn('flex flex-col gap-3', className)}>
      <h2 className="eyebrow text-ink-muted">{title}</h2>
      <ul className="flex flex-col gap-3 text-base">{children}</ul>
    </nav>
  );
};

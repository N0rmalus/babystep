import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/babystep.lt',
    icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100093058595396',
    icon: Facebook,
  },
];

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
const supportLinks = ['Pristatymas', 'Grąžinimai', 'Taisyklės ir sąlygos', 'Privatumo politika'];

export const Footer = () => {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-0 pb-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 pt-8 pb-2 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1.15fr]">
          <div className="col-span-2 max-w-sm md:col-span-1">
            <div className="inline-flex items-center gap-2">
              <Link href="/" className="font-accent text-tumbleweed-700 inline-flex text-2xl font-bold transition">
                Babystep
              </Link>
            </div>
            <p className="mt-3 text-sm leading-6 text-neutral-600 sm:mt-4">
              Mūsų tikslas, kad atrastumėte kokybę, švelnumą ir grožį kiekviename produkte...
            </p>
            <div className="mt-4 flex items-center gap-2 sm:mt-5">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="border-tumbleweed-100 bg-tumbleweed-50 hover:border-tumbleweed-300 hover:text-tumbleweed-600 focus-visible:outline-tumbleweed-500 inline-flex size-10 items-center justify-center rounded-full border text-neutral-700 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <Icon className="size-4.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-accent text-sm font-semibold tracking-wide text-neutral-950 uppercase">Parduotuvė</h2>
            <ul className="mt-3 space-y-2.5 text-sm text-neutral-600 sm:mt-4 sm:space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-tumbleweed-600 transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-accent text-sm font-semibold tracking-wide text-neutral-950 uppercase">Pagalba</h2>
            <ul className="mt-3 space-y-2.5 text-sm text-neutral-600 sm:mt-4 sm:space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-tumbleweed-600 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h2 className="font-accent text-sm font-semibold tracking-wide text-neutral-950 uppercase">Kontaktai</h2>
            <ul className="mt-3 grid gap-3 text-sm text-neutral-600 sm:mt-4">
              <li className="flex items-start gap-3">
                <Mail className="text-tumbleweed-500 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <a href="mailto:info@babystep.lt" className="hover:text-tumbleweed-600 transition">
                  info@babystep.lt
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-tumbleweed-500 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <a href="tel:+37061717992" className="hover:text-tumbleweed-600 transition">
                  +370 617 17 992
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-tumbleweed-500 mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  Pušyno g. 3, Dėdeliškių k., <br /> LT-21401 Trakų r.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-tumbleweed-100 border-t" />

        <div className="text-center text-xs text-neutral-500">
          <p>&copy; 2026 Babystep. Visos teisės saugomos.</p>
        </div>
      </div>
    </div>
  );
};

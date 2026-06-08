import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

import Container from '@/components/ui/container';
import { LinkButton } from '@/components/ui/link-button';

const quickLinks = [
  { href: '/akcijos', label: 'Akcijos' },
  { href: '/wishlist', label: 'Norai' },
  { href: '/cart', label: 'Krepšelis' },
] satisfies { href: string; label: string }[];

const NotFound = () => {
  return (
    <Container>
      <div className="relative isolate overflow-hidden px-5 py-8 sm:px-8 sm:py-10 lg:min-h-136 lg:px-14 lg:py-12">
        <div className="font-accent text-salmon-400/10 absolute top-8 right-8 -z-10 leading-none font-black tracking-[-0.08em] sm:text-[14rem] lg:top-2 lg:right-12 lg:text-[20rem]">
          404
        </div>
        <div className="absolute -bottom-24 left-1/2 -z-10 h-56 w-[120%] -translate-x-1/2 rounded-[100%] bg-white/70 blur-2xl" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(22rem,1fr)] lg:items-center">
          <div className="relative z-10 max-w-xl">
            <div className="grid grid-cols-[minmax(0,1fr)_7.25rem] items-start gap-3 sm:block">
              <h1 className="font-accent mt-4 text-4xl leading-[0.95] font-black tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
                Šis takelis niekur neveda
              </h1>

              <div className="relative mt-1 h-40 sm:hidden">
                <div className="bg-tumbleweed-300/25 absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" />
                <Image
                  src="/page-not-found.png"
                  alt=""
                  width={320}
                  height={320}
                  priority
                  className="animate-page-not-found-sign relative h-auto w-32 drop-shadow-xl"
                />
              </div>
            </div>

            <p className="mt-5 max-w-md text-base leading-7 text-neutral-600 sm:text-lg">
              Puslapis pasimetė tarp mažų žingsnelių. Grįžk į pradžią arba užsuk ten, kur dabar vyksta atradimai.
            </p>

            <div className="mt-7">
              <LinkButton label="Grįžti į pradžią" href="/" elementBefore={<Home size={17} />} />
            </div>

            <div className="border-tumbleweed-200 mt-8 flex flex-wrap gap-2.5 border-t border-dashed pt-5">
              {quickLinks.map((quickLink) => (
                <Link
                  key={quickLink.href}
                  href={quickLink.href}
                  className="tap-surface group border-tumbleweed-100 hover:border-tumbleweed-300 inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:text-neutral-950"
                >
                  {quickLink.label}
                  <ArrowRight
                    size={14}
                    className="text-tumbleweed-500 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mx-auto hidden min-h-72 w-full max-w-lg items-center justify-center sm:flex sm:min-h-96 lg:min-h-120">
            <div className="bg-tumbleweed-300/25 absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-72 sm:w-72" />
            <div className="bg-tumbleweed-800/10 absolute bottom-6 left-1/2 h-10 w-72 -translate-x-1/2 rounded-full blur-2xl" />

            <Image
              src="/page-not-founds.png"
              alt=""
              width={760}
              height={760}
              priority
              className="animate-page-not-found-sign relative h-auto w-72 drop-shadow-2xl sm:w-96 lg:w-120"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;

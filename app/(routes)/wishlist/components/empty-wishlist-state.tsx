import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { LinkButton } from '@/components/ui/link-button';
import { PaperWrapper } from '@/components/ui/paper-wrapper';

export const EmptyWishlistState = () => {
  return (
    <PaperWrapper className="relative overflow-hidden border-0 bg-white/10 p-0 shadow-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,110,72,0.18)_1px,transparent_1.5px)] bg-size-[14px_14px] opacity-45" />

      <div className="relative grid min-h-96 items-center gap-8 px-6 py-10 sm:px-10 lg:min-h-104 lg:grid-cols-[minmax(20rem,1fr)_minmax(0,0.85fr)] lg:px-14 lg:py-10">
        <div className="relative order-2 mx-auto h-56 w-full max-w-xl overflow-hidden lg:order-1 lg:flex lg:h-auto lg:items-end lg:justify-start lg:pt-4">
          <div className="bg-tumbleweed-300/20 absolute right-8 bottom-5 left-8 h-10 rounded-full blur-2xl" />
          <div className="absolute -top-12 left-1/2 w-64 -translate-x-1/2 sm:-top-20 sm:w-100 lg:static lg:w-120 lg:translate-x-0">
            <Image
              src="/empty-state-wishlist.png"
              alt=""
              width={720}
              height={720}
              className="animate-empty-state-wishlist-heart relative h-auto w-full drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <div className="order-1 mx-auto max-w-xl text-center lg:order-2 lg:mx-0 lg:text-left">
          <h2 className="font-accent mt-4 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
            Širdutė dar laukia savo norų
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-600">
            Išsisaugok patikusias prekes vienu paspaudimu ir sugrįžk prie jų tada, kai norėsi nuspręsti.
          </p>

          <div className="mt-7 flex justify-center lg:justify-start">
            <LinkButton label="Tęsti apsipirkimą" elementAfter={<ArrowRight size={16} />} href="/" />
          </div>
        </div>
      </div>
    </PaperWrapper>
  );
};

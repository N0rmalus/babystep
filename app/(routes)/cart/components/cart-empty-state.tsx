import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { LinkButton } from '@/components/ui/link-button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const CartEmptyState = () => {
  return (
    <PaperWrapper className="relative overflow-hidden border-0 bg-white/10 p-0 shadow-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,110,72,0.18)_1px,transparent_1.5px)] bg-size-[14px_14px] opacity-45" />

      <div className="relative grid min-h-96 items-center gap-8 px-6 py-10 sm:px-10 lg:min-h-104 lg:grid-cols-[minmax(0,0.85fr)_minmax(20rem,1fr)] lg:px-14 lg:py-10">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <h2 className="font-accent mt-4 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
            Mažasis vežimėlis dar laukia atradimų
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-600">
            Išsirink kelis švelnius radinius ir sugrįžk čia, kai būsi pasiruošęs atsiskaitymui.
          </p>

          <div className="mt-7 flex justify-center lg:justify-start">
            <LinkButton label="Tęsti apsipirkimą" elementAfter={<ArrowRight size={16} />} href="/" />
          </div>
        </div>

        <div className="relative mx-auto h-56 w-full max-w-xl overflow-hidden lg:flex lg:h-auto lg:items-end lg:justify-end lg:pt-4">
          <div className="bg-tumbleweed-300/20 absolute right-8 bottom-5 left-8 h-10 rounded-full blur-2xl" />
          <div className="absolute -top-20 left-1/2 w-64 -translate-x-1/2 sm:-top-28 sm:w-100 lg:static lg:w-120 lg:translate-x-0">
            <Image
              src="/empty-state-cart.png"
              alt=""
              width={700}
              height={700}
              className="animate-empty-state-cart-roll relative h-auto w-full drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </PaperWrapper>
  );
};

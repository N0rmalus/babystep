import Link from 'next/link';
import { ArrowRight, PackageX } from 'lucide-react';

const CartEmptyState = () => {
  return (
    <section className="mt-8 rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
      <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
        <PackageX size={24} />
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-neutral-900">Krepšelis tuščias</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
        Susikurk savo rinkinį ir sugrįžk čia, kai būsi pasiruošęs atsiskaitymui.
      </p>

      <div className="mt-7">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-80"
        >
          Tęsti apsipirkimą
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default CartEmptyState;

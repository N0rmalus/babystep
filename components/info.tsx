'use client';

import { Heart, ShoppingCart } from 'lucide-react';

import { Product } from '@/types';
import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import Link from 'next/link';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const wishlist = useWishlist();
  const onAddToCart = () => {
    cart.addItem(data);
  };
  const onAddToWishlist = () => {
    wishlist.addItem(data);
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
        {data?.subcategory?.category?.name && (
          <Link
            href={`/category/${data.subcategory.category.id}`}
            className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 transition hover:bg-blue-200"
          >
            {data.subcategory.category.name}
          </Link>
        )}
      </div>
      <h1 className="mb-2 text-4xl font-extrabold leading-tight text-gray-900">{data.name}</h1>
      <div className="mb-4 flex items-center gap-4">
        <p className="text-3xl font-bold text-gray-900">
          <Currency value={data?.price} />
        </p>
        {data.amountInStock > 0 ? (
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Yra sandėlyje ({data.amountInStock} vnt.)
          </span>
        ) : (
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Išparduota
          </span>
        )}
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div>
          <h3 className="font-semibold text-gray-700">Aprašymas:</h3>
          <div className="text-gray-800">
            {data?.description.length ? (
              <div className="mt-2 whitespace-pre-wrap text-justify text-base leading-relaxed">{data?.description}</div>
            ) : (
              <p className="mt-2 flex h-full w-full text-neutral-500">Aprašymo nėra.</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-stretch justify-between gap-3 text-white sm:flex-row sm:items-center">
        <Button
          size="lg"
          onClick={onAddToCart}
          className="flex items-center gap-x-2 bg-gradient-to-r from-black to-gray-800 text-lg shadow-lg hover:from-gray-900 hover:to-black"
          disabled={data.amountInStock === 0}
        >
          Pridėti į krepšelį
          <ShoppingCart size="20" />
        </Button>
        <Button
          size="lg"
          onClick={onAddToWishlist}
          className="hover:text-blackshadow flex items-center border border-gray-300 bg-white text-lg text-black hover:bg-gray-100"
          type="button"
        >
          <Heart size="20" />
        </Button>
      </div>
    </div>
  );
};

export default Info;

'use client';

import Image from 'next/image';
import { Expand, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Product } from '@/actions/types';
import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import Button from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Props = {
  data: Product;
};

export const WishlistItem = ({ data }: Props) => {
  const cart = useCart();
  const wishlist = useWishlist();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const isInStock = data.amountInStock > 0;
  const isInCart = cart.items.some((item) => item === data.id);
  const imageUrl = data.images[0]?.url ?? '/placeholder.webp';

  const onPreview = () => {
    previewModal.onOpen(data);
  };

  const onAddToCart = () => {
    cart.addItem(data.id);
  };

  const onRemoveFromWishlist = () => {
    wishlist.removeItem(data.id);
  };

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-52 overflow-hidden bg-neutral-100">
        <Image
          src={imageUrl}
          fill
          alt={data.name}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          loading="eager"
        />

        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          {!isInStock && <Badge label="Išparduota" variant="rounded" color="rose" />}
          {data.isFeatured && <Badge label="Rekomenduojama" variant="rounded" color="tumbleweed-outlined" />}
        </div>

        <div className="absolute bottom-0 right-3 top-3 flex flex-col gap-2">
          <IconButton onClick={onPreview} variant="primary" icon={<Expand size={16} />} title="Greita peržiūra" />
          <IconButton
            onClick={onRemoveFromWishlist}
            variant="danger"
            icon={<Trash2 size={16} />}
            title="Pašalinti iš norų sąrašo"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex min-h-[88px] flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold leading-tight text-neutral-900">{data.name}</h3>
            <p className="mt-2 text-xs text-neutral-500">
              {data.subcategory.category.name} • {data.subcategory.name}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="text-lg font-bold text-neutral-900">
              <Currency value={data.price} />
            </div>
            <p className="text-xs text-neutral-500">Likutis: {Math.max(data.amountInStock, 0)}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <Button
            size="sm"
            label={isInCart ? 'Jau krepšelyje' : 'Perkelti į krepšelį'}
            onClick={onAddToCart}
            elementBefore={<ShoppingCart size={15} />}
            disabled={!isInStock || isInCart}
            fullWidth
          />
          <Button
            size="sm"
            variant="secondary"
            label={<Heart size={14} className="fill-tumbleweed-300" />}
            onClick={onRemoveFromWishlist}
          />
        </div>
      </div>
    </div>
  );
};

"use client";

import Image from "next/image";
import { Expand, Heart, ShoppingCart } from 'lucide-react';

import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import useWishlist from "@/hooks/use-wishlist";

interface ProductCard {
    data: Product;
}

const ProductCardImage: React.FC<{
    imageUrl: string;
    onPreview: MouseEventHandler<HTMLButtonElement>;
    onAddToCart: MouseEventHandler<HTMLButtonElement>;
    onAddToWishlist: MouseEventHandler<HTMLButtonElement>;
}> = ({ imageUrl, onPreview, onAddToCart, onAddToWishlist }) => (
    <div className="aspect-square rounded-xl bg-gray-100 relative overflow-hidden shadow-sm">
        <Image
            src={imageUrl}
            fill
            alt="Image"
            className="aspect-square object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-4 justify-center">
                <IconButton onClick={onPreview} icon={<Expand size={20} className="text-gray-700" />} title="Quick preview" />
                <IconButton onClick={onAddToCart} icon={<ShoppingCart size={20} className="text-gray-700" />} title="Add to cart" />
                <IconButton onClick={onAddToWishlist} icon={<Heart size={20} className="text-gray-700" />} title="Add to wishlist" />
            </div>
        </div>
    </div>
);

const ProductCard: React.FC<ProductCard> = ({
    data
}) => {
    const cart = useCart();
    const wishlist = useWishlist();
    const previewModal = usePreviewModal();
    const router = useRouter();
    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    }

    const onAddToWishlist: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        wishlist.addItem(data);
    }

    return (
        <div
            onClick={handleClick}
            className="bg-white group cursor-pointer rounded-2xl border border-gray-200 p-4 space-y-3 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
            <ProductCardImage
                imageUrl={data?.images?.[0]?.url}
                onPreview={onPreview}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
            />
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <p className="font-semibold text-base text-gray-900 truncate">{data.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{data.subcategory.category.name}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <Currency value={data?.price} />
                    {/* Optionally, add a badge for new/featured products here */}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
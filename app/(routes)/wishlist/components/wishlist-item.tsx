"use client";

import Image from "next/image";
import {Expand, ShoppingCart, X} from 'lucide-react';

import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import useWishlist from "@/hooks/use-wishlist";
import {ProductCardImage} from "@/components/ui/product-card";

interface ProductCard {
    data: Product;
}

const WishlistCard: React.FC<ProductCard> = ({
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

    const onRemoveFromWishlist: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        wishlist.removeItem(data.id);
    }

    return (
        <div
            onClick={handleClick}
            className="bg-white group cursor-pointer rounded-2xl border border-gray-200 p-4 space-y-3 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
            {/* Images and Actions */}
            <ProductCardImage
                imageUrl={data?.images?.[0]?.url}
                onAddToCart={onAddToCart}
                onRemoveFromWishlist={onRemoveFromWishlist}
            />
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <p className="font-semibold text-base text-gray-900">{data.name}</p>
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-xs text-gray-500 mt-1">{data.subcategory.category.name}</p>
                        <div className="w-[4px] h-[4px] mt-[4px] bg-tumbleweed-400 rounded-full" />
                        <p className="text-xs text-gray-500 mt-1">{data.subcategory.name}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <Currency value={data?.price} />
                    {/* TODO: add a badge for new/featured products here */}
                </div>
            </div>
        </div>
    );
}

export default WishlistCard;
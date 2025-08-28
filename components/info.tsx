"use client";

import {Heart, ShoppingCart} from "lucide-react";

import { Product } from "@/types";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import useWishlist from "@/hooks/use-wishlist";
import Link from "next/link";

interface InfoProps {
    data: Product;
}

const Info:React.FC<InfoProps> = ({
    data
}) => {
    const cart = useCart();
    const wishlist = useWishlist();
    const onAddToCart = () => {
        cart.addItem(data);
    }
    const onAddToWishlist = () => {
        wishlist.addItem(data);
    }

    return (
        <div>
            <div className="flex items-center gap-3 mb-2">
                {data?.subcategory?.category?.name && (
                    <Link href={`/category/${data.subcategory.category.id}`} className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold  px-3 py-1 rounded-full uppercase tracking-wide hover:bg-blue-200 transition">
                        {data.subcategory.category.name}
                    </Link>
                )}
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">{data.name}</h1>
            <div className="flex items-center gap-4 mb-4">
                <p className="text-3xl font-bold text-gray-900">
                    <Currency value={data?.price} />
                </p>
                {data.amountInStock > 0 ? (
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Yra sandėlyje
                    </span>
                ) : (
                    <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Išparduota
                    </span>
                )}
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-gray-700">Kiekis sandėlyje:</h3>
                    <div className="text-gray-900 font-medium">
                        {data?.amountInStock}
                    </div>
                </div>
                <hr />
                <div>
                    <h3 className="font-semibold text-gray-700">Aprašymas:</h3>
                    <div className="text-gray-800">
                        {data?.description.length ? (
                            <div className="mt-2 text-justify whitespace-pre-wrap leading-relaxed text-base">
                                {data?.description}
                            </div>
                        ) : (
                            <p className="flex mt-2 h-full w-full text-neutral-500">Aprašymo nėra.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-10 flex flex-col justify-between sm:flex-row items-stretch sm:items-center gap-3 text-white">
                <Button
                    size="lg"
                    onClick={onAddToCart}
                    className="flex items-center gap-x-2 bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-lg shadow-lg"
                    disabled={data.amountInStock === 0}
                >
                    Pridėti į krepšelį
                    <ShoppingCart size="20" />
                </Button>
                <Button
                    size="lg"
                    onClick={onAddToWishlist}
                    className="flex items-center bg-white border border-gray-300 text-black hover:bg-gray-100 text-lg hover:text-blackshadow"
                    type="button"
                >
                    <Heart size="20" />
                </Button>
            </div>
        </div>
    );
}

export default Info;
"use client";

import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Image as ImageType } from "@/types";
import GalleryTab from "@/components/gallery/gallery-tab";
import ImageLightbox from "@/components/ui/image-lightbox";

interface GalleryProps {
    images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Tab.Group as="div" selectedIndex={selectedIndex} onChange={setSelectedIndex} className="flex flex-col-reverse">
            {/* Image List */}
            <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-4">
                    {images.map((image) => (
                        <GalleryTab key={image.id} image={image} />
                    ))}
                </Tab.List>
            </div>

            {/* Main Image */}
            <Tab.Panels className="aspect-square w-full">
                {images.map((image) => (
                    <Tab.Panel key={image.id}>
                        <div className="aspect-square relative h-full w-full rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
                            <ImageLightbox
                                images={images.map((img) => ({ src: img.url }))}
                                alt="Gallery Image"
                                className="object-cover object-center"
                                startIndex={selectedIndex}
                            />
                        </div>
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
};

export default Gallery;
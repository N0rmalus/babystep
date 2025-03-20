"use client";

import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Maximize2 } from "lucide-react";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface ImageLightboxProps {
    images: { src: string }[];
    alt: string;
    className?: string;
    startIndex?: number;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
     images,
     alt,
     className,
     startIndex = 0
}) => {
    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    return (
        <div>
            {/* Thumbnail Image */}
            <Image fill src={images[currentIndex].src} alt={alt} className={className} onClick={() => setOpen(true)} />
            <button onClick={() => setOpen(true)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md transition-transform transform hover:scale-110"
                    title="Maximize"
            >
                <Maximize2 size="18" />
            </button>

            {/* Lightbox */}
            {open && (
                <Lightbox
                    slides={images}
                    open={open}
                    close={() => setOpen(false)}
                    index={currentIndex}
                    on={{ view: ({ index }) => setCurrentIndex(index) }}
                    plugins={[Fullscreen, Zoom]}
                />
            )}
        </div>
    );
};

export default ImageLightbox;

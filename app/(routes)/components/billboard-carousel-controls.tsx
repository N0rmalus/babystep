'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import IconButton from '@/components/ui/icon-button';
import { cn } from '@/lib/utils';

const MOCK_SLIDE_COUNT = 3;

// MOCK: the API gives one billboard, so these controls only move the dots (TODO.md "Customizable billboards").
export const BillboardCarouselControls = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (index: number) => {
    setActiveIndex((index + MOCK_SLIDE_COUNT) % MOCK_SLIDE_COUNT);
  };

  return (
    <div className="flex items-center pt-1 lg:pt-3.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: MOCK_SLIDE_COUNT }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Rodyti ${index + 1} skaidrę`}
            aria-current={index === activeIndex}
            onClick={() => handleSelect(index)}
            className="flex h-8 w-7.5 items-center justify-center lg:w-8"
          >
            <span
              className={cn(
                'block h-2 rounded-full transition-all duration-300',
                index === activeIndex ? 'bg-ink w-6' : 'bg-line-strong w-2',
              )}
            />
          </button>
        ))}
      </div>
      <div className="ml-auto hidden gap-2.5 lg:flex">
        <IconButton icon={<ChevronLeft size={18} />} label="Ankstesnis" onClick={() => handleSelect(activeIndex - 1)} />
        <IconButton icon={<ChevronRight size={18} />} label="Kitas" onClick={() => handleSelect(activeIndex + 1)} />
      </div>
    </div>
  );
};

'use client';

import { Share2, X } from 'lucide-react';
import { useId, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';

const PLACEHOLDER_LINK = 'babystep.lt/norai/[nuoroda]';

// MOCK: sharing is not real until "Wishlist sharing" in TODO.md; the link is a placeholder and nothing is copied.
export const WishlistShare = () => {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const inputId = useId();

  const handleToggle = () => {
    setIsOpen((current) => !current);
  };

  const handleCopy = () => {
    toast.success('Nuoroda nukopijuota.');
  };

  return (
    <>
      <div className="sm:hidden">
        <IconButton
          label="Pasidalinti norais"
          icon={<Share2 size={16} />}
          onClick={handleToggle}
          aria-expanded={isOpen}
        />
      </div>
      <Button
        variant="secondary"
        label="Pasidalinti"
        elementBefore={<Share2 size={16} />}
        onClick={handleToggle}
        aria-expanded={isOpen}
        className="hidden sm:inline-flex"
      />

      {isOpen && (
        <div
          role="dialog"
          aria-labelledby={titleId}
          className="border-line shadow-card order-last flex basis-full flex-col gap-2.5 rounded-3xl border bg-white p-4 sm:absolute sm:top-full sm:right-0 sm:z-20 sm:mt-2.5 sm:w-95 sm:gap-3 sm:p-5 sm:shadow-xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <h2 id={titleId} className="text-ink text-base font-semibold sm:text-lg">
                Pasidalink norais
              </h2>
              <p className="text-ink-muted text-sm leading-normal">
                Patogu, kai artimieji klausia, ko reikia mažyliui.
              </p>
            </div>
            <IconButton label="Uždaryti" icon={<X size={16} />} onClick={handleToggle} />
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <label htmlFor={inputId} className="sr-only">
              Nuoroda į norų sąrašą
            </label>
            <input
              id={inputId}
              type="text"
              readOnly
              value={PLACEHOLDER_LINK}
              className="border-line-strong bg-muted-soft text-ink-soft h-11 min-w-0 flex-1 rounded-full border px-4 text-sm"
            />
            <Button size="sm" label="Kopijuoti" onClick={handleCopy} className="h-11" />
          </div>

          <Button
            variant="secondary"
            size="sm"
            label="Kopijuoti"
            onClick={handleCopy}
            fullWidth
            className="h-11 sm:hidden"
          />
        </div>
      )}
    </>
  );
};

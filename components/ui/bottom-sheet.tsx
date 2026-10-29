'use client';

import { ReactNode } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

import { cn } from '@/lib/utils';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};

export const BottomSheet = ({ open, onClose, children, className }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} className={cn('relative z-50', className)}>
      <DialogBackdrop
        transition
        className="bg-ink/45 fixed inset-0 backdrop-blur-xs transition duration-200 ease-out data-closed:opacity-0 data-leave:duration-150 data-leave:ease-in"
      />

      <div className="fixed inset-x-0 bottom-0">
        <DialogPanel
          transition
          className="border-line flex max-h-[82vh] flex-col overflow-hidden rounded-t-3xl border bg-white shadow-[0_-24px_80px_-28px_rgba(0,0,0,0.55)] transition duration-300 ease-out data-closed:translate-y-full data-leave:duration-200 data-leave:ease-in"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Uždaryti"
            className="flex w-full shrink-0 justify-center px-4 pt-4 pb-2"
          >
            <span className="bg-line h-1.5 w-12 rounded-full" />
          </button>

          <div className="overflow-y-auto px-4 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))]">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

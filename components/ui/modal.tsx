'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

import IconButton from '@/components/ui/icon-button';
import { cn } from '@/lib/utils';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'md' | 'lg';
  closeLabel?: string;
};

const sizeClasses = {
  md: 'sm:max-w-2xl',
  lg: 'sm:max-w-5xl',
} as const;

export const Modal = ({ open, onClose, children, size = 'lg', closeLabel = 'Uždaryti' }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const previousRouteKeyRef = useRef(routeKey);

  useEffect(() => {
    const previousRouteKey = previousRouteKeyRef.current;

    if (previousRouteKey !== routeKey && open) {
      onClose();
    }

    previousRouteKeyRef.current = routeKey;
  }, [open, onClose, routeKey]);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="bg-ink/40 fixed inset-0 transition duration-200 ease-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex items-end justify-center sm:items-center sm:p-6">
        <DialogPanel
          transition
          className={cn(
            'border-line relative flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-3xl border-t bg-white shadow-xl transition duration-200 ease-out data-closed:translate-y-6 data-closed:opacity-0 sm:max-h-full sm:rounded-3xl sm:border sm:data-closed:translate-y-0 sm:data-closed:scale-95',
            sizeClasses[size],
          )}
        >
          <div className="flex shrink-0 justify-center pt-2.5 sm:hidden" aria-hidden="true">
            <span className="bg-line-strong h-1 w-10 rounded-full" />
          </div>
          <div className="absolute top-4 right-4 z-10 sm:top-5 sm:right-5">
            <IconButton onClick={onClose} icon={<X size={18} />} label={closeLabel} />
          </div>
          <div className="overflow-y-auto p-4 pt-3 sm:p-7">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

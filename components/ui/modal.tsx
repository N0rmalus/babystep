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
  md: 'max-w-2xl',
  lg: 'max-w-5xl',
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

      <div className="fixed inset-0 flex items-center justify-center p-6">
        <DialogPanel
          transition
          className={cn(
            'border-line relative flex max-h-full w-full flex-col overflow-hidden rounded-3xl border bg-white shadow-xl transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0',
            sizeClasses[size],
          )}
        >
          <div className="absolute top-5 right-5 z-10">
            <IconButton onClick={onClose} icon={<X size={18} />} label={closeLabel} />
          </div>
          <div className="overflow-y-auto p-7">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

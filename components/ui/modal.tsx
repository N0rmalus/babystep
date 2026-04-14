'use client';
import { Fragment, ReactNode, useEffect, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import IconButton from '@/components/ui/icon-button';
import { X } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ open, onClose, children }: Props) => {
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
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-neutral-950/55 fixed inset-0 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-3 text-center sm:items-center sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white text-left align-middle shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-neutral-50 to-transparent" />
                <div className="absolute right-4 top-4 z-20">
                  <IconButton
                    onClick={onClose}
                    variant="primary"
                    icon={<X size={16} className="text-neutral-700" />}
                    title="Close preview"
                  />
                </div>
                <div className="relative max-h-[85vh] overflow-y-auto px-8 pb-8 pt-16">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

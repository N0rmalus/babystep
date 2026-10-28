'use client';

import { QuickView } from '@/components/quick-view';
import useMounted from '@/hooks/use-mounted';

export const ModalProvider = () => {
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }

  return <QuickView />;
};

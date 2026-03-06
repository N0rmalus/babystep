'use client';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import useFocusRefresh from '@/hooks/use-focus-refresh';

export const RouteFocusRefresh = () => {
  const router = useRouter();

  const onRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  useFocusRefresh({ onRefresh });

  return null;
};

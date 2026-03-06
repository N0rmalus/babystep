'use client';

import { useEffect, useRef } from 'react';

interface UseFocusRefreshOptions {
  onRefresh: () => void;
  minIntervalMs?: number;
  enabled?: boolean;
}

const DEFAULT_MIN_INTERVAL_MS = 1200;

const useFocusRefresh = ({ onRefresh, minIntervalMs = DEFAULT_MIN_INTERVAL_MS, enabled = true }: UseFocusRefreshOptions) => {
  const lastRefreshAt = useRef(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const refreshIfAllowed = () => {
      const now = Date.now();

      if (now - lastRefreshAt.current < minIntervalMs) {
        return;
      }

      lastRefreshAt.current = now;
      onRefresh();
    };

    const onWindowFocus = () => {
      refreshIfAllowed();
    };

    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        return;
      }

      refreshIfAllowed();
    };

    window.addEventListener('focus', onWindowFocus);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('focus', onWindowFocus);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [enabled, minIntervalMs, onRefresh]);
};

export default useFocusRefresh;

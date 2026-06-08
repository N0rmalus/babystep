import { useCallback, useMemo, useSyncExternalStore } from 'react';

export type ScreenBreakpoint = 'xs' | 'sm' | 'md' | 'lg';

const MAP_SCREEN_BREAKPOINT_TO_PIXELS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
} satisfies Record<ScreenBreakpoint, number>;

const getMediaQuery = (breakpoint: ScreenBreakpoint) => {
  return `(max-width: ${MAP_SCREEN_BREAKPOINT_TO_PIXELS[breakpoint] - 1}px)`;
};

const getMediaQueryList = (mediaQuery: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.matchMedia(mediaQuery);
};

const getServerSnapshot = () => false;

export const useIsMobile = (breakpoint: ScreenBreakpoint) => {
  const mediaQuery = useMemo(() => getMediaQuery(breakpoint), [breakpoint]);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = getMediaQueryList(mediaQuery);

      if (!mediaQueryList) {
        return () => {};
      }

      mediaQueryList.addEventListener('change', onStoreChange);

      return () => {
        mediaQueryList.removeEventListener('change', onStoreChange);
      };
    },
    [mediaQuery],
  );

  const getSnapshot = useCallback(() => getMediaQueryList(mediaQuery)?.matches ?? false, [mediaQuery]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

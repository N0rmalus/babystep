import { LoadingSpinner } from 'babysteps-store';

export const Default = () => (
  <div className="text-ink">
    <LoadingSpinner />
  </div>
);

export const InContext = () => (
  <div className="text-ink-muted flex items-center gap-3 text-sm">
    <LoadingSpinner />
    Kraunamos prekės…
  </div>
);

export const OnDark = () => (
  <div className="bg-ink inline-flex rounded-full px-5 py-3 text-white">
    <LoadingSpinner />
  </div>
);

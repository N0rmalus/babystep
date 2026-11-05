'use client';

import { useEffect, useId, useState } from 'react';
import { Search } from 'lucide-react';

import { TextField } from '@/components/ui/text-field';
import { getPickupPoints, type PickupPoint } from '@/lib/checkout-api';
import { cn } from '@/lib/utils';
import { CarrierLogo } from './carrier-logo';

type Props = {
  selectedId: string | null;
  error?: string;
  onSelect: (point: PickupPoint) => void;
};

const SEARCH_DEBOUNCE_MS = 250;

export const PickupPointPicker = ({ selectedId, error, onSelect }: Props) => {
  const listLabelId = useId();
  const [query, setQuery] = useState('');
  const [points, setPoints] = useState<PickupPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const timeout = setTimeout(async () => {
      setIsLoading(true);

      try {
        const result = await getPickupPoints({ query });

        if (!isCancelled) {
          setPoints(result);
          setHasFailed(false);
        }
      } catch {
        if (!isCancelled) {
          setHasFailed(true);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <div className="mt-1 flex flex-col gap-2.5">
      <TextField
        label={<span id={listLabelId}>Pasirink paštomatą</span>}
        type="search"
        placeholder="Ieškok pagal miestą ar adresą"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        elementBefore={<Search size={16} aria-hidden="true" />}
      />

      <div
        role="radiogroup"
        aria-labelledby={listLabelId}
        aria-busy={isLoading}
        className={cn(
          'scrollbar-soft max-h-70 overflow-y-auto rounded-2xl border bg-white p-1.5',
          error ? 'border-danger-line' : 'border-line',
        )}
      >
        {points.map((point) => {
          const isChecked = point.id === selectedId;

          return (
            <label
              key={point.id}
              className={cn(
                'has-focus-visible:outline-tumbleweed-500 flex cursor-pointer items-center gap-3.5 rounded-xl px-3 py-2.5 has-focus-visible:outline-2',
                isChecked ? 'bg-tumbleweed-50' : 'hover:bg-muted-soft',
              )}
            >
              <input
                type="radio"
                name="pickupPoint"
                value={point.id}
                checked={isChecked}
                onChange={() => onSelect(point)}
                className="accent-ink size-4.5 shrink-0"
              />
              <span className="flex w-16 shrink-0 justify-center">
                <CarrierLogo carrier={point.carrier} size="md" />
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-ink text-base font-semibold">{point.name}</span>
                <span className="text-ink-muted text-sm">{point.address}</span>
              </span>
            </label>
          );
        })}

        {!isLoading && points.length === 0 && !hasFailed && (
          <p className="text-ink-muted p-3.5 text-sm">Nieko neradome. Pabandyk įvesti miestą.</p>
        )}
        {hasFailed && (
          <p className="text-danger p-3.5 text-sm">Nepavyko įkelti paštomatų. Pabandyk dar kartą po akimirkos.</p>
        )}
        {isLoading && points.length === 0 && <p className="text-ink-muted p-3.5 text-sm">Ieškome paštomatų…</p>}
      </div>

      {error && (
        <span role="alert" className="text-danger pl-4.5 text-sm">
          {error}
        </span>
      )}
    </div>
  );
};

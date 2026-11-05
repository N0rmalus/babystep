'use client';

import type { OrderStatus } from '@/lib/checkout-api';
import { setMockOrderStatus } from '@/lib/mocks/checkout';
import { cn } from '@/lib/utils';

type Props = {
  orderId: string;
  status: OrderStatus;
  onChange: () => void;
};

const MOCK_STATUS_OPTIONS = [
  { status: 'paid', label: 'Apmokėta' },
  { status: 'pending', label: 'Laukiama' },
  { status: 'failed', label: 'Neapmokėta' },
] satisfies { status: OrderStatus; label: string }[];

// MOCK: development-only switch between confirmation states until the admin returns real order statuses.
export const MockStatusSwitcher = ({ orderId, status, onChange }: Props) => (
  <div
    role="group"
    aria-label="Testinė užsakymo būsena"
    className="border-line fixed right-4 bottom-20 z-50 flex items-center gap-1 rounded-full border bg-white p-1 text-xs shadow-lg"
  >
    <span className="text-ink-muted px-2 font-semibold">MOCK</span>
    {MOCK_STATUS_OPTIONS.map((option) => (
      <button
        key={option.status}
        type="button"
        aria-pressed={option.status === status}
        onClick={() => {
          setMockOrderStatus(orderId, option.status);
          onChange();
        }}
        className={cn(
          'rounded-full px-3 py-1.5 font-semibold transition',
          option.status === status ? 'bg-ink text-white' : 'text-ink hover:bg-muted',
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);

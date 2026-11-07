'use client';

import { useCallback, useEffect, useState } from 'react';

import useCart from '@/hooks/use-cart';
import { getOrderStatus, type Order } from '@/lib/checkout-api';
import { ConfirmationMessage } from './confirmation-message';
import { FailedState } from './failed-state';
import { MockStatusSwitcher } from './mock-status-switcher';
import { PaidState } from './paid-state';
import { WaitingState } from './waiting-state';

type Props = {
  orderId: string;
};

type ViewState =
  | { status: 'loading' }
  | { status: 'missing' }
  | { status: 'error' }
  | { status: 'loaded'; order: Order };

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_COUNT = 40;

export const OrderConfirmation = ({ orderId }: Props) => {
  const removeAllFromCart = useCart((state) => state.removeAll);
  const [view, setView] = useState<ViewState>({ status: 'loading' });
  const [pollCount, setPollCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const order = await getOrderStatus(orderId);
      setView(order ? { status: 'loaded', order } : { status: 'missing' });
    } catch {
      setView({ status: 'error' });
    }
  }, [orderId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setPollCount(0);
    await load();
    setIsRefreshing(false);
  };

  useEffect(() => {
    let isCancelled = false;

    getOrderStatus(orderId)
      .then((order) => {
        if (!isCancelled) {
          setView(order ? { status: 'loaded', order } : { status: 'missing' });
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setView({ status: 'error' });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [orderId]);

  const orderStatus = view.status === 'loaded' ? view.order.status : null;

  useEffect(() => {
    if (orderStatus !== 'pending' || pollCount >= MAX_POLL_COUNT) {
      return;
    }

    const timeout = setTimeout(async () => {
      await load();
      setPollCount((current) => current + 1);
    }, POLL_INTERVAL_MS);

    return () => clearTimeout(timeout);
  }, [load, orderStatus, pollCount]);

  useEffect(() => {
    if (orderStatus === 'paid') {
      removeAllFromCart();
    }
  }, [orderStatus, removeAllFromCart]);

  return (
    <>
      <ConfirmationContent view={view} isRefreshing={isRefreshing} onRefresh={handleRefresh} />
      {process.env.NODE_ENV === 'development' && view.status === 'loaded' && (
        <MockStatusSwitcher orderId={orderId} status={view.order.status} onChange={handleRefresh} />
      )}
    </>
  );
};

const ConfirmationContent = ({
  view,
  isRefreshing,
  onRefresh,
}: {
  view: ViewState;
  isRefreshing: boolean;
  onRefresh: () => void;
}) => {
  if (view.status === 'loading') {
    return <div aria-busy="true" className="min-h-96" />;
  }

  if (view.status === 'missing') {
    return (
      <ConfirmationMessage
        title="Užsakymo neradome"
        text="Gal nuoroda nebegalioja? Patikrink el. laišką su užsakymo patvirtinimu arba parašyk mums."
      />
    );
  }

  if (view.status === 'error') {
    return (
      <ConfirmationMessage
        title="Nepavyko įkelti užsakymo"
        text="Užsakymas niekur nedingo. Atnaujink puslapį po akimirkos."
      />
    );
  }

  if (view.order.status === 'paid') {
    return <PaidState order={view.order} />;
  }

  if (view.order.status === 'pending') {
    return <WaitingState order={view.order} isRefreshing={isRefreshing} onRefresh={onRefresh} />;
  }

  return <FailedState order={view.order} />;
};

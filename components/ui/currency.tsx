'use client';

import useMounted from '@/hooks/use-mounted';

const formatter = new Intl.NumberFormat('lt-LT', {
  style: 'currency',
  currency: 'EUR',
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }

  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
};

export default Currency;

const currencyFormatter = new Intl.NumberFormat('lt-LT', {
  style: 'currency',
  currency: 'EUR',
});

const roundedCurrencyFormatter = new Intl.NumberFormat('lt-LT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

const normalizeCurrencyValue = (value: number | string) => {
  const numericValue = typeof value === 'number' ? value : Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
};

export const toCurrency = (value: number | string) => {
  return currencyFormatter.format(normalizeCurrencyValue(value));
};

export const toCurrencyRounded = (value: number | string) => {
  return roundedCurrencyFormatter.format(normalizeCurrencyValue(value));
};

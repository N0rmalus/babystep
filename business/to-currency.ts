export const toCurrency = (value: number) => {
  return new Intl.NumberFormat('lt-LT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

export const toCurrencyRounded = (value: number) => {
  if (isNaN(value)) {
    return 0;
  }

  return new Intl.NumberFormat('lt-LT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
};

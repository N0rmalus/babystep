type PluralForms = {
  one: string;
  few: string;
  many: string;
};

export const pluralize = (count: number, forms: PluralForms): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  const isTeen = lastTwoDigits >= 10 && lastTwoDigits <= 20;

  if (lastDigit === 1 && !isTeen) {
    return forms.one;
  }

  if (lastDigit >= 2 && !isTeen) {
    return forms.few;
  }

  return forms.many;
};

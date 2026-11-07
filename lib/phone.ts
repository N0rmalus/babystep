export const PHONE_PREFIX = '+370';

const COUNTRY_CODE_DIGITS = '370';
const NATIONAL_PHONE_LENGTH = 8;
const TRUNK_PREFIX = '8';
const AREA_CODE_LENGTH = 3;

export const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, '');

  if (digits.startsWith(COUNTRY_CODE_DIGITS) && digits.length === COUNTRY_CODE_DIGITS.length + NATIONAL_PHONE_LENGTH) {
    return digits.slice(COUNTRY_CODE_DIGITS.length);
  }

  if (digits.startsWith(TRUNK_PREFIX) && digits.length === NATIONAL_PHONE_LENGTH + 1) {
    return digits.slice(1);
  }

  return digits;
};

export const formatPhone = (value: string) => {
  const digits = normalizePhone(value);

  return `${PHONE_PREFIX} ${digits.slice(0, AREA_CODE_LENGTH)} ${digits.slice(AREA_CODE_LENGTH)}`;
};

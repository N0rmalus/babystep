import { Facebook, Instagram } from 'lucide-react';

export const CONTACT_EMAIL = 'info@babystep.lt';

export const FREE_SHIPPING_THRESHOLD = 80;
export const RETURN_PERIOD_DAYS = 14;
export const LOW_STOCK_THRESHOLD = 3;
export const IMAGE_PLACEHOLDER_URL = '/placeholder.svg';
export const PRODUCT_REFRESH_INTERVAL_MS = 60_000;
export const VARIANT_ID_PARAM = 'variantId';
export const OPTION_PICKER_ID = 'option-picker';

export const INSTAGRAM_HANDLE = 'babystep.lt';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: INSTAGRAM_URL,
    icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100093058595396',
    icon: Facebook,
  },
];

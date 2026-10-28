export type ProductSizeOption = {
  id: string;
  label: string;
  isAvailable: boolean;
};

export type ProductColorOption = {
  id: string;
  label: string;
  hex: string;
  isAvailable: boolean;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductReview = {
  id: string;
  name: string;
  date: string;
  rating: number;
  variant: string;
  text: string;
};

export type SizeGuideRow = {
  id: string;
  label: string;
  height: string;
  weight: string;
  length: string;
};

export const MOCK_PRODUCT_SIZES: ProductSizeOption[] = [
  { id: 's0', label: '0–6 mėn.', isAvailable: true },
  { id: 's1', label: '6–12 mėn.', isAvailable: true },
  { id: 's2', label: '12–18 mėn.', isAvailable: true },
  { id: 's3', label: '18–36 mėn.', isAvailable: false },
];

export const MOCK_PRODUCT_COLORS: ProductColorOption[] = [
  { id: 'sage', label: 'Šalavijų', hex: '#b9c4ad', isAvailable: true },
  { id: 'oat', label: 'Avižų', hex: '#e8dcc8', isAvailable: true },
  { id: 'clay', label: 'Molio', hex: '#c9937a', isAvailable: false },
];

export const MOCK_PRODUCT_SPECS: ProductSpec[] = [
  { label: 'Matmenys', value: 'Ilgis 70 cm (0–6 mėn.)' },
  { label: 'Medžiaga', value: 'Dvisluoksnis muslinas' },
  { label: 'Sudėtis', value: '100 % medvilnė' },
  { label: 'Priežiūra', value: 'Skalbti 30 °C, švelniu režimu. Nedžiovinti džiovyklėje.' },
];

export const MOCK_PRODUCT_RATING = {
  average: 4.8,
  count: 23,
  distribution: [
    { stars: 5, count: 19 },
    { stars: 4, count: 3 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ],
};

export const MOCK_PRODUCT_REVIEWS: ProductReview[] = [
  {
    id: 'r1',
    name: 'Austėja K.',
    date: '2026-10-12',
    rating: 5,
    variant: '0–6 mėn. · Šalavijų',
    text: 'Paėmėm 0–6 mėn. dydį ir jau žiūrim kitą. Audinys plonas ir minkštas, vasarą mažylis visai neprakaitavo.',
  },
  {
    id: 'r2',
    name: 'Mantas R.',
    date: '2026-09-28',
    rating: 5,
    variant: '6–12 mėn. · Avižų',
    text: 'Užtrauktukas apačioje yra geriausia, kas nutiko mūsų naktims. Sauskelnes pakeičiu beveik nepažadinęs.',
  },
  {
    id: 'r3',
    name: 'Ieva P.',
    date: '2026-09-03',
    rating: 4,
    variant: '0–6 mėn. · Avižų',
    text: 'Gražus ir gerai pasiūtas. Po kelių skalbimų truputį susitraukė, tad rinkčiausi dydžiu didesnį.',
  },
];

export const MOCK_SIZE_GUIDE_ROWS: SizeGuideRow[] = [
  { id: 's0', label: '0–6 mėn.', height: '[56–68] cm', weight: '[4–8] kg', length: '70 cm' },
  { id: 's1', label: '6–12 mėn.', height: '[68–80] cm', weight: '[8–10] kg', length: '80 cm' },
  { id: 's2', label: '12–18 mėn.', height: '[80–86] cm', weight: '[10–12] kg', length: '90 cm' },
  { id: 's3', label: '18–36 mėn.', height: '[86–98] cm', weight: '[12–15] kg', length: '100 cm' },
];

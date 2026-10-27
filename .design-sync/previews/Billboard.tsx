import { Billboard } from 'babysteps-store';

const art = (a: string, b: string) =>
  `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="1200" height="500" fill="url(#g)"/><circle cx="980" cy="120" r="70" fill="#fff" opacity="0.55"/><circle cx="180" cy="420" r="160" fill="#fff" opacity="0.18"/></svg>`,
  )}`;

export const WithLabel = () => (
  <div className="w-[720px]">
    <Billboard data={{ id: 'b1', label: 'Ramesnės naktys visai šeimai', imageUrl: art('#f6e9de', '#ebd1bd') }} />
  </div>
);

export const Sale = () => (
  <div className="w-[720px]">
    <Billboard data={{ id: 'b2', label: 'Rudens akcijos iki -30%', imageUrl: art('#fef1f0', '#fcc5bf') }} />
  </div>
);

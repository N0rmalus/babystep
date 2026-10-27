import { ProductCard } from 'babysteps-store';

const photo = (bg: string, fg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="${bg}"/><ellipse cx="200" cy="250" rx="120" ry="14" fill="#000" opacity="0.06"/><rect x="130" y="70" width="140" height="170" rx="56" fill="${fg}"/><circle cx="200" cy="70" r="34" fill="${fg}"/><rect x="170" y="120" width="60" height="8" rx="4" fill="#fff" opacity="0.5"/></svg>`,
  )}`;

const category = { id: 'c1', name: 'Miegui', billboard: { id: 'b1', label: '', imageUrl: '' } };

const product = (over: Record<string, unknown>) => ({
  id: 'p1',
  subcategoryId: 's1',
  name: 'Muslino miegmaišis 0–6 mėn.',
  price: '39.99',
  salePrice: null,
  saleStartsAt: null,
  saleEndsAt: null,
  amountInStock: 12,
  isFeatured: true,
  description: null,
  images: [{ id: 'i1', url: photo('#f1ebe3', '#d9a37f') }],
  subcategory: { id: 's1', name: 'Miegmaišiai', categoryId: 'c1', category },
  ...over,
});

export const Default = () => (
  <div className="w-72">
    <ProductCard data={product({})} />
  </div>
);

export const OnSale = () => (
  <div className="w-72">
    <ProductCard
      data={product({
        id: 'p2',
        name: 'Baltojo triukšmo aparatas „Debesėlis“',
        price: '49.00',
        salePrice: '36.75',
        images: [{ id: 'i2', url: photo('#fef1f0', '#faaaa2') }],
        subcategory: { id: 's2', name: 'Miego pagalbininkai', categoryId: 'c1', category },
      })}
    />
  </div>
);

export const SoldOut = () => (
  <div className="w-72">
    <ProductCard
      data={product({
        id: 'p3',
        name: 'Vystyklai iš muslino, 3 vnt.',
        price: '24.90',
        amountInStock: 0,
        images: [{ id: 'i3', url: photo('#e6eee1', '#4d6b47') }],
        subcategory: { id: 's3', name: 'Vystyklai', categoryId: 'c1', category },
      })}
    />
  </div>
);

export const InWishlist = () => (
  <div className="w-72">
    <ProductCard
      wishlistAction="remove"
      data={product({
        id: 'p4',
        name: 'Naktinė lempa „Mėnulis“',
        price: '29.00',
        amountInStock: 3,
        images: [{ id: 'i4', url: photo('#f6e9de', '#c76e48') }],
        subcategory: { id: 's4', name: 'Naktinės lempos', categoryId: 'c1', category },
      })}
    />
  </div>
);

export const Grid = () => (
  <div className="grid w-[600px] grid-cols-2 gap-4">
    <ProductCard data={product({})} />
    <ProductCard
      data={product({
        id: 'p2',
        name: 'Baltojo triukšmo aparatas „Debesėlis“',
        price: '49.00',
        salePrice: '36.75',
        images: [{ id: 'i2', url: photo('#fef1f0', '#faaaa2') }],
      })}
    />
  </div>
);

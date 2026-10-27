import { IconButton, Icons } from 'babysteps-store';

const noop = () => {};

export const Primary = () => <IconButton icon={<Icons.Heart size={16} />} label="Įtraukti į norų sąrašą" onClick={noop} />;

export const Variants = () => (
  <div className="flex items-center gap-4">
    <IconButton variant="primary" icon={<Icons.Search size={16} />} label="Ieškoti" onClick={noop} />
    <IconButton variant="secondary" icon={<Icons.Menu size={16} />} label="Meniu" onClick={noop} />
    <IconButton variant="danger" icon={<Icons.Trash2 size={16} />} label="Pašalinti" onClick={noop} />
  </div>
);

export const WithCount = () => (
  <div className="flex items-center gap-6 p-3">
    <IconButton
      icon={<Icons.ShoppingCart size={16} />}
      label="Krepšelis"
      onClick={noop}
      badge={
        <span className="bg-ink flex size-5 items-center justify-center rounded-full text-xs font-semibold text-white tabular-nums">
          3
        </span>
      }
    />
    <IconButton href="/wishlist" icon={<Icons.Heart size={16} />} label="Norų sąrašas" />
  </div>
);

export const Disabled = () => (
  <IconButton icon={<Icons.ChevronLeft size={16} />} label="Ankstesnis puslapis" onClick={noop} disabled />
);

export const OnImage = () => (
  <div className="bg-muted relative flex h-40 w-56 flex-col items-end gap-2.5 rounded-2xl p-3">
    <IconButton icon={<Icons.Expand size={16} />} label="Greita peržiūra" onClick={noop} />
    <IconButton icon={<Icons.Heart size={16} />} label="Įtraukti į norų sąrašą" onClick={noop} />
  </div>
);

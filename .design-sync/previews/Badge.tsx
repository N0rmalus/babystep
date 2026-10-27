import { Badge } from 'babysteps-store';

export const Colors = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge color="tumbleweed" label="Naujiena" />
    <Badge color="tumbleweed-outlined" label="Miegmaišiai" />
    <Badge color="success" label="Yra sandėlyje" />
    <Badge color="neutral" label="Išparduota" />
    <Badge color="sale" label="-25%" />
  </div>
);

export const Sale = () => <Badge color="sale" label="-15%" />;

export const FilterChips = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge color="tumbleweed-outlined" label="Miegmaišiai" onClick={() => {}} />
    <Badge color="tumbleweed-outlined" label="Vystyklai" onClick={() => {}} />
    <Badge color="tumbleweed" label="Naktinės lempos" onClick={() => {}} />
  </div>
);

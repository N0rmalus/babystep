import { QuantitySelector } from 'babysteps-store';

export const Default = () => <QuantitySelector value={2} max={12} onChange={() => {}} />;

export const Sizes = () => (
  <div className="flex items-center gap-4">
    <QuantitySelector value={1} max={12} onChange={() => {}} size="sm" />
    <QuantitySelector value={1} max={12} onChange={() => {}} size="md" />
  </div>
);

export const AtStockLimit = () => (
  <div className="flex flex-col items-start gap-1">
    <QuantitySelector value={3} max={3} onChange={() => {}} size="sm" />
    <span className="text-danger text-xs font-semibold">Liko tik 3 vnt.</span>
  </div>
);

export const Disabled = () => <QuantitySelector value={1} max={12} onChange={() => {}} isDisabled />;

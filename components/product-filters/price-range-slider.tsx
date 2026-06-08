type Props = {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  disabled: boolean;
  onChange: (valueMin: number, valueMax: number) => void;
};

const getPercent = (value: number, min: number, max: number) => {
  const range = max - min;

  if (range <= 0) {
    return 0;
  }

  return ((value - min) / range) * 100;
};

export const PriceRangeSlider = ({ min, max, valueMin, valueMax, disabled, onChange }: Props) => {
  const minPercent = getPercent(valueMin, min, max);
  const maxPercent = getPercent(valueMax, min, max);

  return (
    <div>
      <div className="font-accent flex items-center justify-between gap-3 text-sm font-semibold text-neutral-900">
        <span>{valueMin}€</span>
        <span>{valueMax}€</span>
      </div>

      <div className="relative h-8">
        <div className="absolute top-1/2 right-0 left-0 h-1.5 -translate-y-1/2 rounded-full bg-neutral-200" />
        <div
          className="bg-tumbleweed-500 absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />

        <input
          aria-label="Mažiausia kaina"
          type="range"
          min={min}
          max={max}
          step={1}
          value={valueMin}
          disabled={disabled}
          onChange={(event) => onChange(Math.min(Number(event.target.value), valueMax), valueMax)}
          className="pointer-events-none absolute top-1/2 right-0 left-0 z-20 h-8 w-full -translate-y-1/2 appearance-none bg-transparent disabled:cursor-not-allowed [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-neutral-950 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neutral-950 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
        />
        <input
          aria-label="Didžiausia kaina"
          type="range"
          min={min}
          max={max}
          step={1}
          value={valueMax}
          disabled={disabled}
          onChange={(event) => onChange(valueMin, Math.max(Number(event.target.value), valueMin))}
          className="pointer-events-none absolute top-1/2 right-0 left-0 z-30 h-8 w-full -translate-y-1/2 appearance-none bg-transparent disabled:cursor-not-allowed [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-neutral-950 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neutral-950 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
        />
      </div>
    </div>
  );
};

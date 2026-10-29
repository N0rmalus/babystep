import { BottomSheet, Button } from 'babysteps-store';

const ROWS = [
  { size: '0–6 mėn.', height: '50–68 cm', weight: '3–8 kg' },
  { size: '6–18 mėn.', height: '68–86 cm', weight: '8–12 kg' },
  { size: '18–36 mėn.', height: '86–98 cm', weight: '12–16 kg' },
];

export const SizeGuide = () => (
  <BottomSheet open onClose={() => {}}>
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2 className="font-accent text-ink text-2xl leading-tight font-bold">Kaip išsirinkti dydį?</h2>
        <p className="text-ink-soft text-sm leading-relaxed">
          Rinkis pagal mažylio ūgį, ne tik amžių. Jei abejoji tarp dviejų dydžių, imk didesnį.
        </p>
      </div>
      <div className="border-line overflow-hidden rounded-2xl border text-sm tabular-nums">
        <div className="bg-muted-soft text-ink-muted eyebrow grid grid-cols-3">
          <span className="px-3 py-2.5">Dydis</span>
          <span className="px-3 py-2.5">Ūgis</span>
          <span className="px-3 py-2.5">Svoris</span>
        </div>
        {ROWS.map((row) => (
          <div key={row.size} className="border-line grid min-h-12 grid-cols-3 items-center border-t bg-white">
            <span className="text-ink px-3 font-bold">{row.size}</span>
            <span className="text-ink-soft px-3">{row.height}</span>
            <span className="text-ink-soft px-3">{row.weight}</span>
          </div>
        ))}
      </div>
      <Button label="Supratau" onClick={() => {}} fullWidth />
    </div>
  </BottomSheet>
);

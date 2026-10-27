import { Button, PaperWrapper } from 'babysteps-store';

export const OrderSummary = () => (
  <PaperWrapper className="w-80">
    <h2 className="text-ink text-xl font-semibold">Užsakymo suvestinė</h2>
    <dl className="mt-4 flex flex-col gap-2 text-sm">
      <div className="text-ink-muted flex justify-between">
        <dt>Prekės</dt>
        <dd className="tabular-nums">88,74 €</dd>
      </div>
      <div className="text-success flex justify-between">
        <dt>Pristatymas</dt>
        <dd>Nemokamas</dd>
      </div>
      <div className="border-line text-ink flex justify-between border-t pt-3 text-base font-bold">
        <dt>Iš viso</dt>
        <dd className="tabular-nums">88,74 €</dd>
      </div>
    </dl>
    <div className="mt-5">
      <Button fullWidth label="Apmokėti" onClick={() => {}} />
    </div>
  </PaperWrapper>
);

export const InfoPanel = () => (
  <PaperWrapper className="w-96">
    <p className="eyebrow text-tumbleweed-700">Pristatymas</p>
    <p className="text-ink-soft mt-2 text-sm leading-relaxed">
      Užsakymus išsiunčiame per 1–2 darbo dienas. Nuo 80 € pristatymas nemokamas visoje Lietuvoje.
    </p>
  </PaperWrapper>
);

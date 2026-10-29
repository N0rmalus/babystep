import { Button, Modal } from 'babysteps-store';

export const Open = () => (
  <Modal open onClose={() => {}} size="md">
    <div className="flex flex-col gap-4 pr-12">
      <h2 className="font-accent text-ink text-3xl font-bold">Muslino miegmaišis 0–6 mėn.</h2>
      <p className="text-ink-soft max-w-prose text-sm leading-relaxed">
        Lengvas, kvėpuojantis miegmaišis, kuris padeda kūdikiui išlaikyti pastovią temperatūrą visą naktį.
      </p>
      <p className="text-ink text-lg font-bold tabular-nums">39,99 €</p>
      <div className="flex gap-3">
        <Button label="Į krepšelį" onClick={() => {}} />
        <Button variant="secondary" label="Plačiau apie prekę" onClick={() => {}} />
      </div>
    </div>
  </Modal>
);

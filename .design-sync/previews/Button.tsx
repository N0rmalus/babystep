import { Button, Icons } from 'babysteps-store';

const noop = () => {};

export const Primary = () => <Button label="Į krepšelį" onClick={noop} elementBefore={<Icons.ShoppingCart size={16} />} />;

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button variant="primary" label="Apmokėti" onClick={noop} />
    <Button variant="secondary" label="Tęsti apsipirkimą" onClick={noop} />
    <Button variant="danger" label="Ištuštinti krepšelį" onClick={noop} />
    <Button variant="danger-outlined" label="Pašalinti" onClick={noop} elementBefore={<Icons.Trash2 size={16} />} />
  </div>
);

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm" label="Mažas" onClick={noop} />
    <Button size="md" label="Vidutinis" onClick={noop} />
    <Button size="lg" label="Didelis" onClick={noop} />
    <Button size="xl" label="Labai didelis" onClick={noop} />
  </div>
);

export const States = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button label="Išparduota" onClick={noop} disabled />
    <Button label="Apmokėti" onClick={noop} loading />
    <Button href="/akcijos" variant="secondary" label="Visos akcijos" elementAfter={<Icons.ArrowRight size={16} />} />
  </div>
);

export const FullWidth = () => (
  <div className="w-80">
    <Button fullWidth label="Pereiti prie apmokėjimo" onClick={noop} elementAfter={<Icons.Lock size={16} />} />
  </div>
);
